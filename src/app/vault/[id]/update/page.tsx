import { fetchVaultById } from '@/api/vault';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import UpdateVaultForm from '@/components/vault/UpdateVaultForm';

export const metadata: Metadata = {
  title: 'Update a Vault',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const vault = await fetchVaultById(id);
  if (!vault) {
    notFound();
  }
  return (
    <UpdateVaultForm vault={vault} />
  );
}