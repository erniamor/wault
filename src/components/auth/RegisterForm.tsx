'use client';

import { RegisterState, register } from '@/api/auth';
import { useFormState } from 'react-dom';
import Input from '../fields/Input';
import FormError from '../form/FormError';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';
import FormSubmitButton from '../form/FormSubmitButton';
import FormCancelButton from '../form/FormCancelButton';

export default function Form() {
  const initialState: RegisterState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(register, initialState);
  return (
    <form action={dispatch}>
      <FormFields>
        <Input name="name" label="Your name" errors={state.errors?.name} />
        <Input name="email" type="email" label="Your email" errors={state.errors?.email} />
        <Input name="password" type="password" label="Your password" errors={state.errors?.password} />
        <Input name="confirmPassword" type="password" label="Confirm your password" errors={state.errors?.confirmPassword} />
      </FormFields>
      <FormButtons>
        <FormCancelButton href="/">Cancel</FormCancelButton>
        <FormSubmitButton>Register</FormSubmitButton>
      </FormButtons>
      <FormError message={state.message} />
    </form>
  );
}

