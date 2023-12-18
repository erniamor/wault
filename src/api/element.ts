import { sql } from '@vercel/postgres';
import type { Element } from '../types/element';

export async function fetchElementsByVaultId(id: string) {
  try {
    const elements = await sql<Element>`
      SELECT * FROM elements
      WHERE vault_id = ${id}
    `;
    return elements.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch elements by vault id.');
  }
}