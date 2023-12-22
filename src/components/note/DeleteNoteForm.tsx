'use client';

import type { Note } from '@/types/note';
import { useState } from 'react';
import { deleteNote } from '@/api/note';
import Button from '@/components/Button';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';
import FormError from '../form/FormError';

export default function Form({ note }: { note: Note }) {

  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const deleteNoteBinded = deleteNote.bind(null, note);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const result = await deleteNoteBinded();
    if (result && result.message) {
      setMessage(result.message);
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormFields>
        <p className="text-black">Are you sure you want to delete this note?</p>
      </FormFields>
      <FormButtons>
        <Button href={`/note/${note.id}`} disabled={pending}>Cancel</Button>
        <Button type="submit" styling='danger' loading={pending}>Delete</Button>
      </FormButtons>
      <FormError message={message} />
    </form>
  );
}
