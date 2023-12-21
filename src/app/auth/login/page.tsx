import { Metadata } from 'next';
import Title from '@/components/Title';
import Main from '@/components/Main';
import LoginForm from '@/components/auth/LoginForm';
export const metadata: Metadata = {
  title: 'Login',
};

export default async function Page() {
  return <Main>
    <div className="mb-5">
      <Title>Login</Title>
    </div>
    <LoginForm />
  </Main>
}
