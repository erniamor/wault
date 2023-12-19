import { fetchVaultsByVaultId } from '@/api/vault';
import { fetchNotesByVaultId } from '@/api/note';
import { Metadata } from 'next';
import VaultCard from '@/components/vault/VaultCard';
import NoteCard from '@/components/NoteCard';
import CreateMenu from '@/components/CreateMenu';
import VaultEmpty from '@/components/vault/VaultEmpty';

export const metadata: Metadata = {
  title: 'Vault',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const vaults = await fetchVaultsByVaultId(id);
  const notes = await fetchNotesByVaultId(id);
  return <>
    {vaults.length + notes.length > 0 ? <div className="w-full flex flex-col gap-3">
      {vaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} />
      ))}
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div> : <VaultEmpty vaultId={id} />}
    <CreateMenu vaultId={id} />
  </>
}