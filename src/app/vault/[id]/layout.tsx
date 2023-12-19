import { fetchVaultById } from '@/api/vault';
import { notFound } from 'next/navigation';
import VaultMenu from '@/components/vault/VaultMenu';
import Title from '@/components/Title';
import Main from '@/components/Main';
import Description from '@/components/Description';

export default async function VaultLayout({ children, params }: {
  children: React.ReactNode,
  params: { id: string }
}) {

  const id = params.id;
  const vault = await fetchVaultById(id);
  if (!vault) {
    notFound();
  }

  return <Main>
    <div className="relative -mt-5">
      <VaultMenu vault={vault} />
    </div>
    <div className="pt-12 mb-5">
      <Title>{vault.title}</Title>
      {vault.description && <Description>{vault.description}</Description>}
    </div>
    {children}
  </Main>

}
