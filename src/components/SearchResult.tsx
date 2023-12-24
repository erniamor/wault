import { searchNotes } from '@/api/note';
import NoteCard from '@/components/note/NoteCard';
import List from './List';

type SearchResultProps = {
  query: string;
  currentPage: number;
}
export default async function SearchResult({ query, currentPage }: SearchResultProps) {
  const notes = await searchNotes(query, currentPage);
  return notes.length > 0 ? (
    <List>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </List>
  ) : <p className='text-center text-white'>No result</p>;
}
