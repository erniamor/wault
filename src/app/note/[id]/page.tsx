import { fetchNoteById } from '@/api/note';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NoteContent from '@/components/note/NoteContent';
import NoteUrl from '@/components/note/NoteLink';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;
  const note = await fetchNoteById(id);
  return {
    title: `${note.title} | Note`,
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const note = await fetchNoteById(id);
  if (!note) {
    notFound();
  }
  return <div className="w-full flex flex-col gap-3">
    {note.content && <NoteContent content={note.content} />}
    {note.url && <NoteUrl url={note.url} />}
  </div>
}