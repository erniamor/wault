'use server';

import type { Vault } from '../types/vault';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { unstable_noStore as noStore } from 'next/cache';
import { redirect } from 'next/navigation';
import { USERS } from '../../scripts/placeholder';

export async function searchVaults() {
  noStore();
  try {
    const vaults = await sql<Vault>`
      SELECT * FROM vaults 
    `;
    return vaults.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to search vaults.');
  }
}

export async function fetchRootVaults() {
  noStore();
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
  noStore();
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
  noStore();
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




const VaultFormSchema = z.object({
  id: z.string(),
  title: z.string()
    .trim()
    .max(255, { message: "Title must be less than 255 characters." })
    .refine((val) => val !== '', {
      message: "Title is required.",
    }),
  description: z.string()
    .max(255, { message: "Description must be less than 255 characters." })
    .optional(),
  // vaultId: z.string().optional(),
  // date: z.string(),
});

const CreateVault = VaultFormSchema.omit({ id: true/* , date: true */ });

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    // vaultId?: string[];
    title?: string[];
    description?: string[];
  };
  message?: string | null;
};

export async function createVault(vaultId: string | null, prevState: State, formData: FormData) {

  // Validate form fields using Zod
  const validatedFields = CreateVault.safeParse({
    // vaultId: formData.get('vaultId'),
    title: formData.get('title'),
    description: formData.get('description'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Vault.',
    };
  }

  // Prepare data for insertion into the database
  const { title, description } = validatedFields.data;
  const userId = USERS[0].id;
  // const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO vaults (title, description, user_id, vault_id)
      VALUES (${title}, ${description}, ${userId}, ${vaultId})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Vault.',
    };
  }

  revalidatePath(`/vault${vaultId ? `/${vaultId}` : ''}`);
  revalidatePath(`/search`);
  redirect(`/vault${vaultId ? `/${vaultId}` : ''}`);
}



// Use Zod to update the expected types
const UpdateVault = VaultFormSchema.omit({ id: true/* , date: true */ });

export async function updateVault(vault: Vault, prevState: State, formData: FormData) {

  // Validate form fields using Zod
  const validatedFields = UpdateVault.safeParse({
    // vaultId: formData.get('vaultId'),
    title: formData.get('title'),
    description: formData.get('description'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Vault.',
    };
  }

  // Prepare data for insertion into the database
  const { title, description } = validatedFields.data;
  const userId = USERS[0].id;
  // const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      UPDATE vaults
      SET title = ${title}, description = ${description}
      WHERE id = ${vault.id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Vault.',
    };
  }

  revalidatePath(`/vault/${vault.id}`);
  revalidatePath(`/vault${vault.vault_id ? `/${vault.vault_id}` : ''}`);
  revalidatePath(`/search`);
  redirect(`/vault/${vault.id}`);

}

export async function deleteVault(vault: Vault) {

  // TODO: delete all vault children

  try {
    await sql`DELETE FROM vaults WHERE id = ${vault.id}`;
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Vault.' };
  }

  revalidatePath(`/vault${vault.vault_id ? `/${vault.vault_id}` : ''}`);
  revalidatePath(`/search`);
  redirect(`/vault${vault.vault_id ? `/${vault.vault_id}` : ''}`);

}