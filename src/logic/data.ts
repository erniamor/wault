import { sql } from '@vercel/postgres';
import {
  Vault,
  Element,
  User,
} from './definitions';

export async function fetchRootVaults() {
  try {
    const vaults = await sql<Vault>`
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
  try {
    const vaults = await sql<Vault>`
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
  try {
    const vaults = await sql<Vault>`
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