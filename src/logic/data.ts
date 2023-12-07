import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
  Vault,
  Element,
  User,
} from './definitions';

export async function fetchRootVaults() {
  noStore();

  try {
    const vaults = await sql<Vault[]>`
      SELECT * FROM vaults
      WHERE vault_id IS NULL
    `;

    return vaults.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch root vaults.');
  }

}
export async function fetchVaultById(id: string) {
  noStore();

  try {
    const vaults = await sql<Vault[]>`
      SELECT * FROM vaults
      WHERE id = ${id}
    `;

    return vaults.rows[0];

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch vault by id.');
  }

}
export async function fetchVaultsByVaultId(id: string) {
  noStore();

  try {
    const vaults = await sql<Vault[]>`
      SELECT * FROM vaults
      WHERE vault_id = ${id}
    `;

    return vaults.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch vaults by vault id.');
  }

}
export async function fetchElementsByVaultId(id: string) {
  noStore();

  try {
    const elements = await sql<Element[]>`
      SELECT * FROM elements
      WHERE vault_id = ${id}
    `;

    return elements.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch elements by vault id.');
  }

}