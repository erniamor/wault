import { Metadata } from 'next';
import { fetchRootFolders } from '@/api/folder';
import { fetchRootNotes } from '@/api/note';
import CreateMenu from '@/components/CreateMenu';
import Main from '@/components/Main';
import FolderCard from '@/components/folder/FolderCard';
import NoteCard from '@/components/note/NoteCard';
import FolderEmpty from '@/components/folder/FolderEmpty';
import Title from '@/components/Title';
import RootMenu from '@/components/folder/RootMenu';
import List from '@/components/List';

export const metadata: Metadata = {
  title: 'Vault',
};

export default async function Page() {
  const folders = await fetchRootFolders();
  const notes = await fetchRootNotes();
  return (
    <Main>
      <div className="relative -mt-5">
        <RootMenu />
      </div>
      <div className="pt-5 mb-5">
        <Title>Root</Title>
      </div>
      {folders.length + notes.length > 0 ? <List>
        {folders.map((folder) => (
          <FolderCard key={folder.id} folder={folder} />
        ))}
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </List> : <FolderEmpty message='Your vault is currently empty' />}
      <CreateMenu />
    </Main>
  );
}