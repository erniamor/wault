'use client';

import Button from '@/components/Button';
import { State, createVault } from '@/api/actions';
import { useFormState } from 'react-dom';
import Input from '../fields/Input';
import TextArea from '../fields/TextArea';
import FormError from '../form/FormError';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createVault, initialState);
  return (
    <form action={dispatch}>
      <FormFields>
        <Input name="title" label="Title" errors={state.errors?.title} />
        <TextArea name="description" label="Description" errors={state.errors?.description} />
        <FormError message={state.message} />
      </FormFields>
      <FormButtons>
        <Button href={`/vault`}>Cancel</Button>
        <Button type="submit" styling='primary'>Create Vault</Button>
      </FormButtons>
    </form>
  );
}
