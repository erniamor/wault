import { searchNotes } from '@/api/note';
import NoteCard from '@/components/note/NoteCard';

type SearchResultProps = {
  query: string;
  currentPage: number;
}
export default async function SearchResult({ query, currentPage }: SearchResultProps) {
  const notes = await searchNotes(query, currentPage);
  return notes.length > 0 ? (
    <div className="w-full flex flex-col gap-3 mb-12">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  ) : <p className='text-center text-white'>No result</p>;
}
