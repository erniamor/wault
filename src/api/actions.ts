'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { USERS } from '../../scripts/placeholder';
import type { Vault } from '../types/vault';

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
  // vaultId: z.string({
  //   invalid_type_error: 'Please select a vault.',
  // }),
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

export async function createVault(prevState: State, formData: FormData) {

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
      INSERT INTO vaults (title, description, user_id)
      VALUES (${title}, ${description}, ${userId})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Vault.',
    };
  }

  revalidatePath('/vault');
  redirect('/vault');
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
  redirect(`/vault${vault.vault_id ? `/${vault.vault_id}` : ''}`);

}