import { sql } from '@vercel/postgres';
import type { Note } from '../types/note';

export async function searchNotes() {
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