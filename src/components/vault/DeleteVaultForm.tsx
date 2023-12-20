'use client';

import type { Vault } from '@/types/vault';
import Button from '@/components/Button';
import { deleteVault } from '@/api/vault';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';
import FormError from '../form/FormError';
import { useState } from 'react';

export default function Form({ vault }: { vault: Vault }) {

  const [message, setMessage] = useState<string | null>(null);
  const deleteVaultBinded = deleteVault.bind(null, vault);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await deleteVaultBinded();
    if (result && result.message) {
      setMessage(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormFields>
        Are you sure you want to delete this vault and all of its children?
      </FormFields>
      <FormButtons>
        <Button href={`/vault/${vault.id}`}>Cancel</Button>
        <Button type="submit" styling='danger'>Delete</Button>
      </FormButtons>
      <FormError message={message} />
    </form>
  );
}
