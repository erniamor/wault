'use client';

import Button from '@/components/Button';
import { State, createNote } from '@/api/note';
import { useFormState } from 'react-dom';
import Input from '../fields/Input';
import TextArea from '../fields/TextArea';
import FormError from '../form/FormError';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';

type FormProps = {
  vaultId: string;
}

export default function Form({ vaultId }: FormProps) {
  const initialState: State = { message: null, errors: {} };
  const createNoteBinded = createNote.bind(null, vaultId);
  const [state, dispatch] = useFormState(createNoteBinded, initialState);
  return (
    <form action={dispatch}>
      <FormFields>
        <Input name="title" label="Title" errors={state.errors?.title} />
        <TextArea name="description" label="Description" errors={state.errors?.description} rows={2} />
        <TextArea name="content" label="Content" errors={state.errors?.content} rows={10} />
        <Input name="url" label="Url" errors={state.errors?.url} />
        <FormError message={state.message} />
      </FormFields>
      <FormButtons>
        <Button href={`/vault/${vaultId}`}>Cancel</Button>
        <Button type="submit" styling='primary'>Create Note</Button>
      </FormButtons>
    </form>
  );
}
