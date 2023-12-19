import VaultCard from '@/components/vault/VaultCard';
import { Metadata } from 'next';
import { fetchRootVaults } from '@/api/vault';
import CreateMenu from '@/components/CreateMenu';
import Main from '@/components/Main';

export const metadata: Metadata = {
  title: 'Vaults',
};

export default async function Page() {
  const vaults = await fetchRootVaults();

  return (
    <Main>
      <div className="w-full flex flex-col gap-3 mb-20">
        {vaults.map((vault) => (
          <VaultCard key={vault.id} vault={vault} />
        ))}
      </div>
      <CreateMenu isNoteVisible={false} isLinkVisible={false} />
    </Main>
  );
}