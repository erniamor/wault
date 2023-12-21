'use client';

import { State, createFolder } from '@/api/folder';
import { useFormState } from 'react-dom';
import Input from '../fields/Input';
import TextArea from '../fields/TextArea';
import FormError from '../form/FormError';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';
import FormSubmitButton from '../form/FormSubmitButton';
import FormCancelButton from '../form/FormCancelButton';

type FormProps = {
  folderId?: string;
}

export default function Form({ folderId }: FormProps) {
  const initialState: State = { message: null, errors: {} };
  const createFolderBinded = createFolder.bind(null, folderId || null);
  const [state, dispatch] = useFormState(createFolderBinded, initialState);
  return (
    <form action={dispatch}>
      <FormFields>
        <Input name="title" label="Title" errors={state.errors?.title} />
        <TextArea name="description" label="Description" errors={state.errors?.description} />
      </FormFields>
      <FormButtons>
        <FormCancelButton href={`/folder${folderId ? `/${folderId}` : ''}`}>Cancel</FormCancelButton>
        <FormSubmitButton>Create Folder</FormSubmitButton>
      </FormButtons>
      <FormError message={state.message} />
    </form>
  );
}
