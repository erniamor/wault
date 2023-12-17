'use client';

import Link from 'next/link';
import { Button } from '@/components/Button';
import { deleteVault } from '@/logic/actions';
import { Vault } from '@/logic/definitions';

export default function Form({ vault }: { vault: Vault }) {

  const deleteVaultBinded = deleteVault.bind(null, vault);

  return (
    <form action={deleteVaultBinded}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        Are you sure you want to delete this vault and all of its children?
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/vault/${vault.id}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Delete</Button>
      </div>
    </form>
  );
}
