import { fetchNoteById } from '@/api/note';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import DeleteNoteForm from '@/components/note/DeleteNoteForm';

export const metadata: Metadata = {
  title: 'Delete a Note',
};

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