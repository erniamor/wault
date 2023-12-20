'use client';

import { State, createVault } from '@/api/vault';
import { useFormState } from 'react-dom';
import Input from '../fields/Input';
import TextArea from '../fields/TextArea';
import FormError from '../form/FormError';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';
import FormSubmitButton from '../form/FormSubmitButton';
import FormCancelButton from '../form/FormCancelButton';

type FormProps = {
  vaultId?: string;
}

export default function Form({ vaultId }: FormProps) {
  const initialState: State = { message: null, errors: {} };
  const createVaultBinded = createVault.bind(null, vaultId || null);
  const [state, dispatch] = useFormState(createVaultBinded, initialState);
  return (
    <form action={dispatch}>
      <FormFields>
        <Input name="title" label="Title" errors={state.errors?.title} />
        <TextArea name="description" label="Description" errors={state.errors?.description} />
      </FormFields>
      <FormButtons>
        <FormCancelButton href={`/vault${vaultId ? `/${vaultId}` : ''}`}>Cancel</FormCancelButton>
        <FormSubmitButton>Create Vault</FormSubmitButton>
      </FormButtons>
      <FormError message={state.message} />
    </form>
  );
}
