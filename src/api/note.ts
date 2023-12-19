'use server';

import type { Note } from '../types/note';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

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