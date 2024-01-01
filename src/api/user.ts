'use server';

import type { Folder } from '@/types/folder';
import type { Note } from '@/types/note';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { auth } from "../auth"

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

export async function exportUserData() {

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

  return JSON.stringify({ folders, notes });

}