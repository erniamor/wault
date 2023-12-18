'use client';

import Button from '@/components/Button';
import { State, updateVault } from '@/api/actions';
import { useFormState } from 'react-dom';
import { Vault } from '@/logic/definitions';
import Input from '../fields/Input';
import TextArea from '../fields/TextArea';
import FormError from '../form/FormError';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';

export default function Form({ vault }: { vault: Vault }) {

  const initialState: State = { message: null, errors: {} };
  const updateVaultBinded = updateVault.bind(null, vault);
  const [state, dispatch] = useFormState(updateVaultBinded, initialState);

  return (
    <form action={dispatch}>
      <FormFields>
        <Input name="title" value={vault.title} label="Title" errors={state.errors?.title} />
        <TextArea name="description" value={vault.description || ''} label="Description" errors={state.errors?.description} />
        <FormError message={state.message} />
      </FormFields>
      <FormButtons>
        <Button href={`/vault/${vault.id}`}>Cancel</Button>
        <Button type="submit" styling='primary'>Save</Button>
      </FormButtons>
    </form>
  );
}
