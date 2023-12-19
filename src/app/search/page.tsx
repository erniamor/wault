import { Metadata } from 'next';
import Title from '@/components/Title';
import Main from '@/components/Main';
import { searchVaults } from '@/api/vault';
import { searchElements } from '@/api/element';
import VaultCard from '@/components/vault/VaultCard';
import ElementCard from '@/components/ElementCard';
export const metadata: Metadata = {
  title: 'Search',
};

export default async function Page() {
  const vaults = await searchVaults();
  const elements = await searchElements();
  return <Main>
    <Title>Search</Title>
    {vaults.length + elements.length > 0 ? <div className="w-full flex flex-col gap-3 mb-12">
      {vaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} />
      ))}
      {elements.map((element) => (
        <ElementCard key={element.id} element={element} />
      ))}
    </div> : <p>No result</p>}
  </Main>
}