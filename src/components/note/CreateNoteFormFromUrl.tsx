'use client';

import { useFormState } from 'react-dom';
import { UrlState, createNoteFromUrl } from '@/api/note';
import Input from '../fields/Input';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';
import FormError from '../form/FormError';
import FormSubmitButton from '../form/FormSubmitButton';
import FormCancelButton from '../form/FormCancelButton';

type FormProps = {
  vaultId: string;
}

export default function Form({ vaultId }: FormProps) {
  const initialState: UrlState = { message: null, errors: {} };
  const createNoteFromUrlBinded = createNoteFromUrl.bind(null, vaultId);
  const [state, dispatch] = useFormState(createNoteFromUrlBinded, initialState);
  return (
    <form action={dispatch}>
      <FormFields>
        <Input name="url" label="Url" errors={state?.errors?.url} />
      </FormFields>
      <FormButtons>
        <FormCancelButton href={`/vault/${vaultId}`}>Cancel</FormCancelButton>
        <FormSubmitButton>Add Link</FormSubmitButton>
      </FormButtons>
      <FormError message={state.message} />
    </form>
  );
}
