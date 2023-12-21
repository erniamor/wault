'use client';

import { useFormState } from 'react-dom';
import { authenticate } from '@/api/user';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';
import FormCancelButton from '../form/FormCancelButton';
import FormSubmitButton from '../form/FormSubmitButton';
import FormError from '../form/FormError';
import Input from '../fields/Input';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch}>
      <FormFields>
        <Input name="email" type="email" label="Email" />
        <Input name="password" type="password" label="Password" />
      </FormFields>
      <FormButtons>
        <FormCancelButton href={`/`}>Cancel</FormCancelButton>
        <FormSubmitButton>Login</FormSubmitButton>
      </FormButtons>
      <FormError message={errorMessage} />
    </form>
  );
}
