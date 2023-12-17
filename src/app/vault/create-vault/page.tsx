import { Metadata } from 'next';
import CreateVaultForm from '@/components/vault/CreateVaultForm';
export const metadata: Metadata = {
  title: 'Create Vault',
};

export default async function Page() {

  return <main className="w-full p-5">
    <h1 className='text-3xl text-white font-bold mb-5 text-center'>Create a Vault</h1>
    <CreateVaultForm />
  </main>
}