import { Metadata } from 'next';
import CreateVaultForm from '@/components/vault/CreateVaultForm';
export const metadata: Metadata = {
  title: 'Create Vault',
};

export default async function Page({ params }: { params: { id: string } }) {
  return <CreateVaultForm vaultId={params.id} />
}