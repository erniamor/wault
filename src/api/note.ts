'use server';

import type { Note } from '../types/note';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import * as cheerio from 'cheerio';
import { auth } from "../auth"

const ITEMS_PER_PAGE = 12;
export async function searchNotes(query: string, currentPage: number) {
  noStore();

  const session = await auth()
  if (!session) {
    redirect("/auth/login")
  }

  const userId = session.user?.id;
  if (!userId) {
    throw new Error('Authentication Error: User not found.');
  }

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const notes = await sql<Note>`
    SELECT *
    FROM notes
    WHERE
      notes.user_id = ${userId} AND
      (notes.title::text ILIKE ${`%${query}%`} OR
      notes.description::text ILIKE ${`%${query}%`} OR
      notes.content::text ILIKE ${`%${query}%`} OR
      notes.url ILIKE ${`%${query}%`})
    ORDER BY notes.title ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return notes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to search notes.');
  }
}
export async function searchNotesTotalPage(query: string) {
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
    const count = await sql`SELECT COUNT(*)
    FROM notes
    WHERE
      notes.user_id = ${userId} AND
      (notes.title::text ILIKE ${`%${query}%`} OR
      notes.description::text ILIKE ${`%${query}%`} OR
      notes.content::text ILIKE ${`%${query}%`} OR
      notes.url ILIKE ${`%${query}%`})
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of notes.');
  }
}

export async function fetchRootNotes() {
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
    const notes = await sql<Note>`
      SELECT * FROM notes
      WHERE folder_id IS NULL AND user_id = ${userId}
    `;
    return notes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch root notes.');
  }
}

export async function fetchNotesByFolderId(id: string) {
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
    const notes = await sql<Note>`
      SELECT * FROM notes
      WHERE folder_id = ${id} AND user_id = ${userId}
    `;
    return notes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch notes by folder id.');
  }
}
export async function fetchNoteById(id: string) {
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
    const notes = await sql<Note>`
      SELECT * FROM notes
      WHERE id = ${id} AND user_id = ${userId}
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
  folder_id: z.string({
    invalid_type_error: 'Please select a folder.',
  }),
  // date: z.string(),
});

const CreateNote = NoteFormSchema.omit({ id: true, folder_id: true /* , date: true */ });

// This is temporary until @types/react-dom is updated
export type CreateState = {
  errors?: {
    title?: string[];
    description?: string[];
    content?: string[];
    url?: string[];
  };
  message?: string | null;
};

export async function createNote(folderId: string | null, prevState: CreateState, formData: FormData) {

  const session = await auth()
  if (!session) {
    redirect("/auth/login")
  }

  const userId = session.user?.id;
  if (!userId) {
    return { message: 'Authentication Error: User not found.' };
  }

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
  // const date = new Date().toISOString().split('T')[0];

  let insertedId: string;

  try {
    const sqlResult = await sql`
      INSERT INTO notes (title, description, content, url, user_id, folder_id)
      VALUES (${title}, ${description}, ${content}, ${url}, ${userId}, ${folderId})
      RETURNING id
    `;
    insertedId = sqlResult.rows[0].id;

  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Note.',
    };
  }

  revalidatePath(`/folder${folderId ? `/${folderId}` : ''}`);
  revalidatePath(`/search`);
  redirect(`/note/${insertedId}`);
}


export type UrlState = {
  errors?: {
    url?: string[];
  };
  message?: string | null;
};


const UrlFormSchema = z.object({
  url: z.string().url({ message: "Url must be a valid URL." })
    .max(2000, { message: "Url must be less than 2000 characters." })
});

export async function createNoteFromUrl(folderId: string | null, prevState: UrlState, formData: FormData) {

  const session = await auth()
  if (!session) {
    redirect("/auth/login")
  }

  const userId = session.user?.id;
  if (!userId) {
    return { message: 'Authentication Error: User not found.' };
  }

  // Validate form fields using Zod
  const validatedFields = UrlFormSchema.safeParse({
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
  const { url } = validatedFields.data;
  // const date = new Date().toISOString().split('T')[0];

  const fetchResult = await fetch(url as string)
  const html = await fetchResult.text()
  const $ = cheerio.load(html);

  let title = $('meta[property="og:title"]').attr('content') || $('title').text() || $('meta[name="title"]').attr('content');
  let description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content')
  // const url = $('meta[property="og:url"]').attr('content')
  // const site_name = $('meta[property="og:site_name"]').attr('content')
  // const image = $('meta[property="og:image"]').attr('content') || $('meta[property="og:image:url"]').attr('content')
  // const icon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href')
  // const keywords = $('meta[property="og:keywords"]').attr('content') || $('meta[name="keywords"]').attr('content')

  if (!title) {
    return {
      message: 'Failed to Create Note. No title found.',
    };
  }

  if (title.length > 255) {
    title = title.slice(0, 252) + '...';
  }

  if (description && description.length > 255) {
    description = description.slice(0, 252) + '...';
  }

  let insertedId: string;

  try {
    const insertResult = await sql`
      INSERT INTO notes (title, description, url, user_id, folder_id)
      VALUES (${title}, ${description}, ${url}, ${userId}, ${folderId})
      RETURNING id
    `;

    insertedId = insertResult.rows[0].id;

  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Note by Url.',
    };
  }

  revalidatePath(`/folder${folderId ? `/${folderId}` : ''}`);
  revalidatePath(`/search`);
  redirect(`/note/${insertedId}`);
}


// Use Zod to update the expected types
const UpdateNote = NoteFormSchema.omit({ id: true/* , date: true */ });
export type UpdateState = {
  errors?: {
    title?: string[];
    description?: string[];
    content?: string[];
    url?: string[];
    folder_id?: string[];
  };
  message?: string | null;
};
export async function updateNote(note: Note, prevState: UpdateState, formData: FormData) {

  const session = await auth()
  if (!session) {
    redirect("/auth/login")
  }

  const userId = session.user?.id;
  if (!userId) {
    return { message: 'Authentication Error: User not found.' };
  }

  // Validate form fields using Zod
  const validatedFields = UpdateNote.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    content: formData.get('content'),
    url: formData.get('url'),
    folder_id: formData.get('folder_id'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Note.',
    };
  }

  // Prepare data for insertion into the database
  const { title, description, content, url, folder_id } = validatedFields.data;
  const folderOrNull = folder_id === 'null' ? null : folder_id;
  // const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      UPDATE notes
      SET title = ${title}, description = ${description}, content = ${content}, url = ${url}, folder_id = ${folderOrNull}
      WHERE id = ${note.id} AND user_id = ${userId}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Note.',
    };
  }

  revalidatePath(`/note/${note.id}`);
  revalidatePath(`/folder${note.folder_id ? `/${note.folder_id}` : ''}`);
  revalidatePath(`/folder${folderOrNull ? `/${folderOrNull}` : ''}`);
  revalidatePath(`/search`);
  redirect(`/note/${note.id}`);

}

export async function deleteNote(note: Note) {

  const session = await auth()
  if (!session) {
    redirect("/auth/login")
  }

  const userId = session.user?.id;
  if (!userId) {
    return { message: 'Authentication Error: User not found.' };
  }

  try {
    await sql`DELETE FROM notes WHERE id = ${note.id} AND user_id = ${userId}`;
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Note.' };
  }

  revalidatePath(`/folder${note.folder_id ? `/${note.folder_id}` : ''}`);
  revalidatePath(`/search`);
  redirect(`/folder${note.folder_id ? `/${note.folder_id}` : ''}`);

}