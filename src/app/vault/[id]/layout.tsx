import { fetchVaultById } from '@/logic/data';
import { notFound } from 'next/navigation';
import VaultMenu from '@/components/vault/VaultMenu';
import VaultTitle from '@/components/vault/VaultTitle';

export default async function VaultLayout({ children, params }: {
  children: React.ReactNode,
  params: { id: string }
}) {

  const id = params.id;
  const vault = await fetchVaultById(id);
  if (!vault) {
    notFound();
  }

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
