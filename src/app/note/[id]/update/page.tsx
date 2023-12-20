import { fetchNoteById } from '@/api/note';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import UpdateNoteForm from '@/components/note/UpdateNoteForm';

export const metadata: Metadata = {
  title: 'Update a Note',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const note = await fetchNoteById(id);
  if (!note) {
    notFound();
  }
  return (
    <UpdateNoteForm note={note} />
  );
}