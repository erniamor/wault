import { fetchVaultById } from '@/logic/data';
import { notFound } from 'next/navigation';
import VaultMenu from '@/components/VaultMenu';
import VaultTitle from '@/components/VaultTitle';

export default async function VaultLayout({ children, params }: {
  children: React.ReactNode,
  params: { id: string }
}) {

  const id = params.id;
  const vault = await fetchVaultById(id);
  if (!vault) {
    notFound();
  }
  const hrefBack = vault.vault_id ? `/vault/${vault.vault_id}` : `/vault`;

  return <main>
    <div className="w-full px-5">
      <div className="relative">
        <VaultMenu vault={vault} />
      </div>
      <div className="pt-12">
        <VaultTitle>
          {vault.title}
        </VaultTitle>
      </div>
      <div className='mt-5'>
        {children}
      </div>
    </div>
  </main>

}
