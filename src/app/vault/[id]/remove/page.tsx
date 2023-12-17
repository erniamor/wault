import { fetchVaultById } from '@/logic/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import DeleteVaultForm from '@/components/vault/DeleteVaultForm';

export const metadata: Metadata = {
  title: 'Remove a Vault',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const vault = await fetchVaultById(id);
  if (!vault) {
    notFound();
  }
  return (
    <DeleteVaultForm vault={vault} />
  );
}