import { fetchNoteById } from '@/api/note';
import { notFound } from 'next/navigation';
import NoteMenu from '@/components/note/NoteMenu';
import Title from '@/components/Title';
import Main from '@/components/Main';

export default async function VaultLayout({ children, params }: {
  children: React.ReactNode,
  params: { id: string }
}) {

  const id = params.id;
  const note = await fetchNoteById(id);
  if (!note) {
    notFound();
  }

  return <Main>
    <div className="relative -mt-5">
      <NoteMenu note={note} />
    </div>
    <div className="pt-12">
      <Title>{note.title}</Title>
    </div>
    {children}
  </Main>

}
