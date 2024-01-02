'use server';

import type { Folder, FolderWithChildren } from '@/types/folder';
import type { Note } from '@/types/note';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { auth } from "../auth"
import { addNotesToFolders } from '@/utils/addNotesToFolders';
import { convertFoldersToTree } from '@/utils/convertFoldersToTree';
import dayjs from 'dayjs';

export type RegisterState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export async function register(prevState: RegisterState, formData: FormData) {

  const RegisterFormSchema = z.object({
    name: z.string()
      .trim()
      .max(255, { message: "Name must be less than 255 characters." })
      .refine((val: string) => val !== '', {
        message: "Name is required.",
      }),
    email: z.string()
      .trim()
      .email({ message: "Invalid email." })
      .max(255, { message: "Email must be less than 255 characters." })
      .refine((val: string) => val !== '', {
        message: "Email is required.",
      }),
    password: z.string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters." })
      .max(255, { message: "Password must be less than 255 characters." })
      .refine((val: string) => val !== '', {
        message: "Password is required.",
      }),
    confirmPassword: z.string()
      .trim()
      .min(6, { message: "Password confirmation must be at least 6 characters." })
      .max(255, { message: "Password confirmation must be less than 255 characters." })
      .refine((val: string) => val === formData.get('password'), {
        message: "Passwords do not match.",
      })
      .refine((val: string) => val !== '', {
        message: "Password confirmation is required.",
      }),
  });

  // Validate form fields using Zod
  const validatedFields = RegisterFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Register.',
    };
  }

  // Prepare data for insertion into the database
  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  // const date = new Date().toISOString().split('T')[0];

  try {
    const sqlResult = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword});
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Register.',
    };
  }

  redirect(`/auth/login`);
}



export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}

export async function downloadUserData() {

  const session = await auth()
  if (!session) {
    redirect("/auth/login")
  }

  const userId = session.user?.id;
  if (!userId) {
    throw new Error('Authentication Error: User not found.');
  }

  const foldersResult = await sql<Folder>`
      SELECT * FROM folders
      WHERE user_id = ${userId}
      ORDER BY folders.title ASC
    `;
  const folders = foldersResult.rows;

  const notesResult = await sql<Note>`
      SELECT * FROM notes
      WHERE user_id = ${userId}
      ORDER BY notes.title ASC
    `;
  const notes = notesResult.rows;

  const foldersWithNotes = addNotesToFolders(notes, folders);
  const tree = convertFoldersToTree(foldersWithNotes)

  return JSON.stringify({
    data: tree,
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    version: '1.0.0',
  });

}

export type UploadUserDataState = {
  errors?: {
    file?: string[];
  };
  message?: string | null;
  success?: boolean;
  createdFolders?: number;
  updatedFolders?: number;
  createdNotes?: number;
  updatedNotes?: number;
};

export async function uploadUserData(formData: FormData): Promise<UploadUserDataState> {

  const session = await auth()
  if (!session) {
    redirect("/auth/login")
  }

  const userId = session.user?.id;
  if (!userId) {
    return { message: 'Authentication Error: User not found.' };
  }

  // Validate form fields using Zod
  const file: File | null = formData.get('file') as unknown as File;

  // If form validation fails, return errors early. Otherwise, continue.
  if (!file) {
    return {
      errors: {
        file: ['No file selected.'],
      },
      message: 'Missing Fields. Failed to upload data.',
    };
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const data = JSON.parse(buffer.toString());

  const uploadResult = await uploadFoldersAndNotes(userId, data.data);

  revalidatePath(`/folder`);

  return {
    success: true,
    createdFolders: uploadResult.createdFolders,
    updatedFolders: uploadResult.updatedFolders,
    createdNotes: uploadResult.createdNotes,
    updatedNotes: uploadResult.updatedNotes,
  }
}

type UploadUserDataResult = {
  createdFolders: number;
  updatedFolders: number;
  createdNotes: number;
  updatedNotes: number;
}
async function uploadFoldersAndNotes(userId: string, data: FolderWithChildren[], uploadResult: UploadUserDataResult = { createdFolders: 0, updatedFolders: 0, createdNotes: 0, updatedNotes: 0 }) {
  for (const folder of data) {
    if (folder.folders) {
      await uploadFoldersAndNotes(userId, folder.folders, uploadResult);
    }
    if (folder.notes) {
      for (const note of folder.notes) {
        await uploadNote(userId, note, uploadResult);
      }
    }
    await uploadFolder(userId, folder, uploadResult);
  }
  return uploadResult;
}

async function folderExists(userId: string, folderId: string) {
  const folders = await sql<Folder>`
    SELECT * FROM folders
    WHERE id = ${folderId} AND user_id = ${userId}
  `;
  return folders.rows.length > 0;
}
async function uploadFolder(userId: string, folder: FolderWithChildren, uploadResult: UploadUserDataResult) {
  const folderAlreadyExists = await folderExists(userId, folder.id);
  if (folderAlreadyExists) {
    await sql`
      UPDATE folders
      SET title = ${folder.title}, description = ${folder.description}, folder_id = ${folder.folder_id}
      WHERE id = ${folder.id} AND user_id = ${userId}
    `;
    uploadResult.updatedFolders++;
  } else {
    await sql`
      INSERT INTO folders (id, title, description, user_id, folder_id)
      VALUES (${folder.id}, ${folder.title}, ${folder.description}, ${userId}, ${folder.folder_id})
    `;
    uploadResult.createdFolders++;
  }
}

async function noteExists(userId: string, noteId: string) {
  const notes = await sql<Note>`
    SELECT * FROM notes
    WHERE id = ${noteId} AND user_id = ${userId}
  `;
  return notes.rows.length > 0;
}
async function uploadNote(userId: string, note: Note, uploadResult: UploadUserDataResult) {
  const noteAlreadyExists = await noteExists(userId, note.id);
  if (noteAlreadyExists) {
    await sql`
      UPDATE notes
      SET title = ${note.title}, description = ${note.description}, content = ${note.content}, url = ${note.url}, folder_id = ${note.folder_id}
      WHERE id = ${note.id} AND user_id = ${userId}
    `;
    uploadResult.updatedNotes++;
  } else {
    await sql`
      INSERT INTO notes (id, title, description, content, url, user_id, folder_id)
      VALUES (${note.id}, ${note.title}, ${note.description}, ${note.content}, ${note.url}, ${userId}, ${note.folder_id})
    `;
    uploadResult.createdNotes++;
  }
}