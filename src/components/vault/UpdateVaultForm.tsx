'use client';

import type { Vault } from '@/types/vault';
import { State, updateVault } from '@/api/vault';
import { useFormState } from 'react-dom';
import Input from '../fields/Input';
import TextArea from '../fields/TextArea';
import FormError from '../form/FormError';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';
import FormSubmitButton from '../form/FormSubmitButton';
import FormCancelButton from '../form/FormCancelButton';

type FormProps = {
  vault: Vault
}

export default function Form({ vault }: FormProps) {
  const initialState: State = { message: null, errors: {} };
  const updateVaultBinded = updateVault.bind(null, vault);
  const [state, dispatch] = useFormState(updateVaultBinded, initialState);
  return (
    <form action={dispatch}>
      <FormFields>
        <Input name="title" value={vault.title} label="Title" errors={state.errors?.title} />
        <TextArea name="description" value={vault.description || ''} label="Description" errors={state.errors?.description} />
      </FormFields>
      <FormButtons>
        <FormCancelButton href={`/vault/${vault.id}`}>Cancel</FormCancelButton>
        <FormSubmitButton>Save</FormSubmitButton>
      </FormButtons>
      <FormError message={state.message} />
    </form>
  );
}
