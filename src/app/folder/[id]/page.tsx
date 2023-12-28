import { fetchFolderById, fetchFoldersByFolderId } from '@/api/folder';
import { fetchNotesByFolderId } from '@/api/note';
import { Metadata } from 'next';
import FolderCard from '@/components/folder/FolderCard';
import NoteCard from '@/components/note/NoteCard';
import CreateMenu from '@/components/CreateMenu';
import FolderEmpty from '@/components/folder/FolderEmpty';
import List from '@/components/List';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;
  const folder = await fetchFolderById(id);
  return {
    title: `${folder.title} | Folder`,
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const folders = await fetchFoldersByFolderId(id);
  const notes = await fetchNotesByFolderId(id);
  return <>
    {folders.length + notes.length > 0 ? <List>
      {folders.map((folder) => (
        <FolderCard key={folder.id} folder={folder} />
      ))}
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </List> : <FolderEmpty folderId={id} />}
    <CreateMenu folderId={id} />
  </>
}