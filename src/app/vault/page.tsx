import VaultCard from '@/components/VaultCard';
import { Metadata } from 'next';
import { fetchRootVaults } from '@/logic/data';

export const metadata: Metadata = {
  title: 'Vaults',
};

export default async function Page() {
  const vaults = await fetchRootVaults();

  return (
    <main className="w-full">
      <div className="w-full flex flex-col gap-3 p-5">
        {vaults.map((vault) => (
          <VaultCard key={vault.id} vault={vault} />
        ))}
      </div>
    </main>
  );
}