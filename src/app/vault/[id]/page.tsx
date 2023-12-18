import { fetchVaultsByVaultId } from '@/api/vault';
import { fetchElementsByVaultId } from '@/api/element';
import { Metadata } from 'next';
import VaultCard from '@/components/vault/VaultCard';
import ElementCard from '@/components/ElementCard';
import CreateMenu from '@/components/CreateMenu';
import VaultEmpty from '@/components/vault/VaultEmpty';

export const metadata: Metadata = {
  title: 'Vault',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const vaults = await fetchVaultsByVaultId(id);
  const elements = await fetchElementsByVaultId(id);
  return <>
    {vaults.length + elements.length > 0 ? <div className="w-full flex flex-col gap-3">
      {vaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} />
      ))}
      {elements.map((element) => (
        <ElementCard key={element.id} element={element} />
      ))}
    </div> : <VaultEmpty vaultId={id} />}
    <CreateMenu vaultId={id} />
  </>
}