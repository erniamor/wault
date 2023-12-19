import { Metadata } from 'next';
import Title from '@/components/Title';
import Main from '@/components/Main';
import { searchVaults } from '@/api/vault';
import { searchNotes } from '@/api/note';
import VaultCard from '@/components/vault/VaultCard';
import NoteCard from '@/components/NoteCard';
export const metadata: Metadata = {
  title: 'Search',
};

export default async function Page() {
  const vaults = await searchVaults();
  const notes = await searchNotes();
  return <Main>
    <Title>Search</Title>
    {vaults.length + notes.length > 0 ? <div className="w-full flex flex-col gap-3 mb-12">
      {vaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} />
      ))}
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div> : <p>No result</p>}
  </Main>
}