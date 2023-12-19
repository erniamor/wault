'use server';

import type { Note } from '../types/note';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { USERS } from '../../scripts/placeholder';

export async function searchNotes() {
  noStore();
  try {
    const notes = await sql<Note>`
      SELECT * FROM notes 
    `;
    return notes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to search notes.');
  }
}

export async function fetchNotesByVaultId(id: string) {
  noStore();
  try {
    const notes = await sql<Note>`
      SELECT * FROM notes
      WHERE vault_id = ${id}
    `;
    return notes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch notes by vault id.');
  }
}
export async function fetchNoteById(id: string) {
  noStore();
  try {
    const notes = await sql<Note>`
      SELECT * FROM notes
      WHERE id = ${id}
    `;
    return notes.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch note by id.');
  }
}




const NoteFormSchema = z.object({
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
  content: z.string()
    .optional(),
  url: z.string().url({ message: "Url must be a valid URL." })
    .max(2000, { message: "Url must be less than 2000 characters." })
    .optional()
    .or(z.literal('')),
  // date: z.string(),
});

const CreateNote = NoteFormSchema.omit({ id: true/* , date: true */ });

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    content?: string[];
    url?: string[];
  };
  message?: string | null;
};

export async function createNote(vaultId: string, prevState: State, formData: FormData) {

  // Validate form fields using Zod
  const validatedFields = CreateNote.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    content: formData.get('content'),
    url: formData.get('url'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Note.',
    };
  }

  // Prepare data for insertion into the database
  const { title, description, content, url } = validatedFields.data;
  const userId = USERS[0].id;
  // const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO notes (title, description, content, url, user_id, vault_id)
      VALUES (${title}, ${description}, ${content}, ${url}, ${userId}, ${vaultId})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Note.',
    };
  }

  revalidatePath(`/vault/${vaultId}`);
  revalidatePath(`/search`);
  redirect(`/vault/${vaultId}`);
}



export async function deleteNote(note: Note) {

  try {
    await sql`DELETE FROM notes WHERE id = ${note.id}`;
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Note.' };
  }

  revalidatePath(`/vault/${note.vault_id}`);
  revalidatePath(`/search`);
  redirect(`/vault/${note.vault_id}`);

}