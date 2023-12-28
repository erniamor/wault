import { fetchFolders } from '@/api/folder';
import { fetchNoteById } from '@/api/note';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import UpdateNoteForm from '@/components/note/UpdateNoteForm';
import { convertFoldersForOptions } from '@/utils/convertFoldersForOptions';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;
  const note = await fetchNoteById(id);
  return {
    title: `Update ${note.title} | Note`,
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const note = await fetchNoteById(id);
  const folders = await fetchFolders();
  const foldersForOptions = convertFoldersForOptions(folders);
  if (!note) {
    notFound();
  }
  return (
    <UpdateNoteForm note={note} folders={foldersForOptions} />
  );
}