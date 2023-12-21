import { Metadata } from 'next';
import { fetchRootFolders } from '@/api/folder';
import { fetchRootNotes } from '@/api/note';
import CreateMenu from '@/components/CreateMenu';
import Main from '@/components/Main';
import FolderCard from '@/components/folder/FolderCard';
import NoteCard from '@/components/note/NoteCard';
import FolderEmpty from '@/components/folder/FolderEmpty';

export const metadata: Metadata = {
  title: 'Vault',
};

export default async function Page() {
  const folders = await fetchRootFolders();
  const notes = await fetchRootNotes();
  return (
    <Main>
      {folders.length + notes.length > 0 ? <div className="w-full flex flex-col gap-3 mb-16">
        {folders.map((folder) => (
          <FolderCard key={folder.id} folder={folder} />
        ))}
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div> : <FolderEmpty message='Your vault is currently empty' />}
      <CreateMenu />
    </Main>
  );
}