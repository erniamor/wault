'use client';

import type { Note } from '@/types/note';
import { State, updateNote } from '@/api/note';
import { useFormState } from 'react-dom';
import Input from '../fields/Input';
import TextArea from '../fields/TextArea';
import FormError from '../form/FormError';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';
import FormSubmitButton from '../form/FormSubmitButton';
import FormCancelButton from '../form/FormCancelButton';

type FormProps = {
  note: Note;
}

export default function Form({ note }: FormProps) {
  const initialState: State = { message: null, errors: {} };
  const updateNoteBinded = updateNote.bind(null, note);
  const [state, dispatch] = useFormState(updateNoteBinded, initialState);
  return (
    <form action={dispatch}>
      <FormFields>
        <Input name="title" label="Title" value={note.title} errors={state.errors?.title} />
        <TextArea name="description" label="Description" value={note.description || ''} errors={state.errors?.description} rows={2} />
        <TextArea name="content" label="Content" value={note.content || ''} errors={state.errors?.content} rows={10} />
        <Input name="url" label="Url" value={note.url || ''} errors={state.errors?.url} />
      </FormFields>
      <FormButtons>
        <FormCancelButton href={`/note/${note.id}`}>Cancel</FormCancelButton>
        <FormSubmitButton>Save</FormSubmitButton>
      </FormButtons>
      <FormError message={state.message} />
    </form>
  );
}