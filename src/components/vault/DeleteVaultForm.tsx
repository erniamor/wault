'use client';

import type { Vault } from '@/types/vault';
import Button from '@/components/Button';
import { deleteVault } from '@/api/vault';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';

export default function Form({ vault }: { vault: Vault }) {

  const deleteVaultBinded = deleteVault.bind(null, vault);

  return (
    <form action={deleteVaultBinded}>
      <FormFields>
        Are you sure you want to delete this vault and all of its children?
      </FormFields>
      <FormButtons>
        <Button href={`/vault/${vault.id}`}>Cancel</Button>
        <Button type="submit" styling='danger'>Delete</Button>
      </FormButtons>
    </form>
  );
}
