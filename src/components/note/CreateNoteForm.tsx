'use client';

import { State, createNote } from '@/api/note';
import { useFormState } from 'react-dom';
import Input from '../fields/Input';
import TextArea from '../fields/TextArea';
import FormError from '../form/FormError';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';
import FormSubmitButton from '../form/FormSubmitButton';
import FormCancelButton from '../form/FormCancelButton';

type FormProps = {
  folderId: string;
}

export default function Form({ folderId }: FormProps) {
  const initialState: State = { message: null, errors: {} };
  const createNoteBinded = createNote.bind(null, folderId);
  const [state, dispatch] = useFormState(createNoteBinded, initialState);
  return (
    <form action={dispatch}>
      <FormFields>
        <Input name="title" label="Title" errors={state.errors?.title} />
        <TextArea name="description" label="Description" errors={state.errors?.description} rows={2} />
        <TextArea name="content" label="Content" errors={state.errors?.content} rows={10} />
        <Input name="url" label="Url" errors={state.errors?.url} />
      </FormFields>
      <FormButtons>
        <FormCancelButton href={`/folder/${folderId}`}>Cancel</FormCancelButton>
        <FormSubmitButton>Create Note</FormSubmitButton>
      </FormButtons>
      <FormError message={state.message} />
    </form>
  );
}

