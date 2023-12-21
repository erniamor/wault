import { Metadata } from 'next';
import Title from '@/components/Title';
import Main from '@/components/Main';
export const metadata: Metadata = {
  title: 'Register',
};

export default async function Page() {
  return <Main>
    <div className="mb-5">
      <Title>Register</Title>
    </div>
  </Main>
}
