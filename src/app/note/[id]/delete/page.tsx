import { fetchNoteById } from '@/api/note';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import DeleteNoteForm from '@/components/note/DeleteNoteForm';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;
  const note = await fetchNoteById(id);
  return {
    title: `Delete ${note.title} | Note`,
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const note = await fetchNoteById(id);
  if (!note) {
    notFound();
  }
  return (
    <DeleteNoteForm note={note} />
  );
}