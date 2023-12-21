import { Metadata } from 'next';
import { fetchRootFolders } from '@/api/folder';
import { fetchRootNotes } from '@/api/note';
import CreateMenu from '@/components/CreateMenu';
import Main from '@/components/Main';
import FolderCard from '@/components/folder/FolderCard';
import NoteCard from '@/components/note/NoteCard';

export const metadata: Metadata = {
  title: 'Folders',
};

export default async function Page() {
  const folders = await fetchRootFolders();
  const notes = await fetchRootNotes();
  // TODO : add empty message if no folder found
  return (
    <Main>
      <div className="w-full flex flex-col gap-3 mb-16">
        {folders.map((folder) => (
          <FolderCard key={folder.id} folder={folder} />
        ))}
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
      <CreateMenu />
    </Main>
  );
}