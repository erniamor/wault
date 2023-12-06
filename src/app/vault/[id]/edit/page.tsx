import { fetchVaultVaults, fetchVaultElements } from '@/logic/data';
import { Metadata } from 'next';
import VaultCard from '@/components/VaultCard';
import ElementCard from '@/components/ElementCard';

export const metadata: Metadata = {
  title: 'Edit a Vault',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (

    <div className="w-full flex flex-col gap-3">
      Edit form
    </div>

  );
}