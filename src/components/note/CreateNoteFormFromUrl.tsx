'use client';

import Button from '@/components/Button';
import { useFormState } from 'react-dom';
import Input from '../fields/Input';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';
import { UrlState, createNoteFromUrl } from '@/api/note';

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
        <Button href={`/vault/${vaultId}`}>Cancel</Button>
        <Button type="submit" styling='primary'>Add Link</Button>
      </FormButtons>
    </form>
  );
}
