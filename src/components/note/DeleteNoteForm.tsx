'use client';

import type { Note } from '@/types/note';
import Button from '@/components/Button';
import { deleteNote } from '@/api/note';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';

export default function Form({ note }: { note: Note }) {

  const deleteNoteBinded = deleteNote.bind(null, note);

  return (
    <form action={deleteNoteBinded}>
      <FormFields>
        Are you sure you want to delete this note?
      </FormFields>
      <FormButtons>
        <Button href={`/note/${note.id}`}>Cancel</Button>
        <Button type="submit" styling='danger'>Delete</Button>
      </FormButtons>
    </form>
  );
}
