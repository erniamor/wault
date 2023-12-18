import { fetchVaultById } from '@/api/data';
import { notFound } from 'next/navigation';
import VaultMenu from '@/components/vault/VaultMenu';
import Title from '@/components/Title';
import Main from '@/components/Main';

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
    <div className="pt-12">
      <Title>{vault.title}</Title>
    </div>
    {children}
  </Main>

}
