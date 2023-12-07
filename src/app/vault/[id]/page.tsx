import { fetchVaultsByVaultId, fetchElementsByVaultId } from '@/logic/data';
import { Metadata } from 'next';
import VaultCard from '@/components/VaultCard';
import ElementCard from '@/components/ElementCard';

export const metadata: Metadata = {
  title: 'Vault',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const vaults = await fetchVaultsByVaultId(id);
  const elements = await fetchElementsByVaultId(id);
  return (

    <div className="w-full flex flex-col gap-3">
      {vaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} />
      ))}
      {elements.map((element) => (
        <ElementCard key={element.id} element={element} />
      ))}
    </div>

  );
}