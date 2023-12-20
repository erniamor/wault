import { fetchNoteById } from '@/api/note';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NoteContent from '@/components/note/NoteContent';
import Button from '@/components/Button';

export const metadata: Metadata = {
  title: 'Note',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const note = await fetchNoteById(id);
  if (!note) {
    notFound();
  }
  return <div className="w-full flex flex-col gap-3">
    {note.content && <NoteContent>{note.content}</NoteContent>}
    {note.url && <div>
      <Button href={note.url} styling="primary">Follow the link</Button>
      <p className="text-xs text-slate-400 italic mt-1 truncate text-center">{note.url}</p>
    </div>}

  </div>
}