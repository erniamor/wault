import { fetchFoldersByFolderId } from '@/api/folder';
import { fetchNotesByFolderId } from '@/api/note';
import { Metadata } from 'next';
import FolderCard from '@/components/folder/FolderCard';
import NoteCard from '@/components/note/NoteCard';
import CreateMenu from '@/components/CreateMenu';
import FolderEmpty from '@/components/folder/FolderEmpty';

export const metadata: Metadata = {
  title: 'Folder',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const folders = await fetchFoldersByFolderId(id);
  const notes = await fetchNotesByFolderId(id);
  return <>
    {folders.length + notes.length > 0 ? <div className="w-full flex flex-col gap-3 mb-16">
      {folders.map((folder) => (
        <FolderCard key={folder.id} folder={folder} />
      ))}
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div> : <FolderEmpty folderId={id} />}
    <CreateMenu folderId={id} />
  </>
}