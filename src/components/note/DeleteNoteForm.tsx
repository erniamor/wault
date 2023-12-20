'use client';

import type { Note } from '@/types/note';
import Button from '@/components/Button';
import { deleteNote } from '@/api/note';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';
import FormError from '../form/FormError';
import { useState } from 'react';

export default function Form({ note }: { note: Note }) {

  const [message, setMessage] = useState<string | null>(null);
  const deleteNoteBinded = deleteNote.bind(null, note);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await deleteNoteBinded();
    if (result && result.message) {
      setMessage(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormFields>
        Are you sure you want to delete this note?
      </FormFields>
      <FormButtons>
        <Button href={`/note/${note.id}`}>Cancel</Button>
        <Button type="submit" styling='danger'>Delete</Button>
      </FormButtons>
      <FormError message={message} />
    </form>
  );
}
