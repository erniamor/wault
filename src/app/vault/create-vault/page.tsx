import { Metadata } from 'next';
import Title from '@/components/Title';
import CreateVaultForm from '@/components/vault/CreateVaultForm';
import Main from '@/components/Main';
export const metadata: Metadata = {
  title: 'Create Vault',
};

export default async function Page() {
  return <Main>
    <Title>Create a Vault</Title>
    <CreateVaultForm />
  </Main>
}