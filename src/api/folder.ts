'use server';

import type { Folder } from '../types/folder';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { auth } from "../auth"

export async function fetchRootFolders() {
  noStore();

  const session = await auth()
  if (!session) {
    redirect("/auth/login")
  }

  const userId = session.user?.id;
  if (!userId) {
    throw new Error('Authentication Error: User not found.');
  }

  try {
    const folders = await sql<Folder>`
      SELECT * FROM folders
      WHERE folder_id IS NULL AND user_id = ${userId}
    `;
    return folders.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch root folders.');
  }
}
export async function fetchFolderById(id: string) {
  noStore();

  const session = await auth()
  if (!session) {
    redirect("/auth/login")
  }

  const userId = session.user?.id;
  if (!userId) {
    throw new Error('Authentication Error: User not found.');
  }

  try {
    const folders = await sql<Folder>`
      SELECT * FROM folders
      WHERE id = ${id} AND user_id = ${userId}
    `;
    return folders.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch folder by id.');
  }
}
export async function fetchFoldersByFolderId(id: string) {
  noStore();

  const session = await auth()
  if (!session) {
    redirect("/auth/login")
  }

  const userId = session.user?.id;
  if (!userId) {
    throw new Error('Authentication Error: User not found.');
  }

  try {
    const folders = await sql<Folder>`
      SELECT * FROM folders
      WHERE folder_id = ${id} AND user_id = ${userId}
    `;
    return folders.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch folders by folder id.');
  }
}




const FolderFormSchema = z.object({
  id: z.string(),
  title: z.string()
    .trim()
    .max(255, { message: "Title must be less than 255 characters." })
    .refine((val: string) => val !== '', {
      message: "Title is required.",
    }),
  description: z.string()
    .max(255, { message: "Description must be less than 255 characters." })
    .optional(),
  // date: z.string(),
});

const CreateFolder = FolderFormSchema.omit({ id: true/* , date: true */ });

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    title?: string[];
    description?: string[];
  };
  message?: string | null;
};

export async function createFolder(folderId: string | null, prevState: State, formData: FormData) {

  const session = await auth()
  if (!session) {
    redirect("/auth/login")
  }

  const userId = session.user?.id;
  if (!userId) {
    return { message: 'Authentication Error: User not found.' };
  }

  // Validate form fields using Zod
  const validatedFields = CreateFolder.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Folder.',
    };
  }

  // Prepare data for insertion into the database
  const { title, description } = validatedFields.data;
  // const date = new Date().toISOString().split('T')[0];

  let insertedId: string;

  try {
    const sqlResult = await sql`
      INSERT INTO folders (title, description, user_id, folder_id)
      VALUES (${title}, ${description}, ${userId}, ${folderId})
      RETURNING id
    `;
    insertedId = sqlResult.rows[0].id;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Folder.',
    };
  }

  revalidatePath(`/folder${folderId ? `/${folderId}` : ''}`);
  redirect(`/folder/${insertedId}`);
}



// Use Zod to update the expected types
const UpdateFolder = FolderFormSchema.omit({ id: true/* , date: true */ });

export async function updateFolder(folder: Folder, prevState: State, formData: FormData) {

  const session = await auth()
  if (!session) {
    redirect("/auth/login")
  }

  const userId = session.user?.id;
  if (!userId) {
    return { message: 'Authentication Error: User not found.' };
  }

  // Validate form fields using Zod
  const validatedFields = UpdateFolder.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Folder.',
    };
  }

  // Prepare data for insertion into the database
  const { title, description } = validatedFields.data;
  // const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      UPDATE folders
      SET title = ${title}, description = ${description}
      WHERE id = ${folder.id} AND user_id = ${userId}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Folder.',
    };
  }

  revalidatePath(`/folder/${folder.id}`);
  revalidatePath(`/folder${folder.folder_id ? `/${folder.folder_id}` : ''}`);
  redirect(`/folder/${folder.id}`);

}

export async function deleteFolder(folder: Folder) {

  const session = await auth()
  if (!session) {
    redirect("/auth/login")
  }

  const userId = session.user?.id;
  if (!userId) {
    return { message: 'Authentication Error: User not found.' };
  }

  try {
    await deleteFolderRecursively(folder, userId);
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Folder.' };
  }

  revalidatePath(`/folder${folder.folder_id ? `/${folder.folder_id}` : ''}`);
  redirect(`/folder${folder.folder_id ? `/${folder.folder_id}` : ''}`);

}

async function deleteFolderRecursively(folder: Folder, userId: string) {

  // delete all folder notes
  await sql`DELETE FROM notes WHERE folder_id = ${folder.id} AND user_id = ${userId}`;

  const folders = await fetchFoldersByFolderId(folder.id);

  for (const folder of folders) {
    await deleteFolderRecursively(folder, userId);
  }

  await sql`DELETE FROM folders WHERE id = ${folder.id} AND user_id = ${userId}`;

}