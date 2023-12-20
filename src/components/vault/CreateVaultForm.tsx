'use client';

import Button from '@/components/Button';
import { State, createVault } from '@/api/vault';
import { useFormState } from 'react-dom';
import Input from '../fields/Input';
import TextArea from '../fields/TextArea';
import FormError from '../form/FormError';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';

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
        <Button href={`/vault${vaultId ? `/${vaultId}` : ''}`}>Cancel</Button>
        <Button type="submit" styling='primary'>Create Vault</Button>
      </FormButtons>
      <FormError message={state.message} />
    </form>
  );
}
