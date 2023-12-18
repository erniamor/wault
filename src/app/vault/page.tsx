import VaultCard from '@/components/vault/VaultCard';
import { Metadata } from 'next';
import { fetchRootVaults } from '@/api/vault';
import AddMenu from '@/components/AddMenu';

export const metadata: Metadata = {
  title: 'Vaults',
};

export default async function Page() {
  const vaults = await fetchRootVaults();

  return (
    <main className="w-full">
      <div className="w-full flex flex-col gap-3 p-5 mb-20">
        {vaults.map((vault) => (
          <VaultCard key={vault.id} vault={vault} />
        ))}
      </div>
      <AddMenu isLinkVisible={false} isNoteVisible={false} />
    </main>
  );
}