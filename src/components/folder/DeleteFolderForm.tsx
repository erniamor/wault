'use client';

import type { Folder } from '@/types/folder';
import Button from '@/components/Button';
import { deleteFolder } from '@/api/folder';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';
import FormError from '../form/FormError';
import { useState } from 'react';

export default function Form({ folder }: { folder: Folder }) {

  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const deleteFolderBinded = deleteFolder.bind(null, folder);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const result = await deleteFolderBinded();
    if (result && result.message) {
      setMessage(result.message);
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormFields>
        <p className="text-black">Are you sure you want to delete this folder and all of its children?</p>
      </FormFields>
      <FormButtons>
        <Button href={`/folder/${folder.id}`} disabled={pending}>Cancel</Button>
        <Button type="submit" styling='danger' loading={pending}>Delete</Button>
      </FormButtons>
      <FormError message={message} />
    </form>
  );
}
