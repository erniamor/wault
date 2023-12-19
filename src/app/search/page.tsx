import { Metadata } from 'next';
import Title from '@/components/Title';
import Main from '@/components/Main';
import { searchNotes } from '@/api/note';
import NoteCard from '@/components/note/NoteCard';
export const metadata: Metadata = {
  title: 'Search',
};

export default async function Page() {
  const notes = await searchNotes();
  return <Main>
    <Title>Search</Title>
    {notes.length > 0 ? <div className="w-full flex flex-col gap-3 mb-12">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div> : <p>No result</p>}
  </Main>
}