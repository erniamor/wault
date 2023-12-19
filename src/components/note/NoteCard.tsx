import type { Note } from '@/types/note';
import Link from 'next/link';
import { FaLink } from "react-icons/fa6";

export default function NoteCard({ note }: { note: Note }) {
  return (
    <Link href={`/note/${note.id}`} className="w-full p-4 bg-gray-100 rounded flex flex-row gap-2 items-center">
      <div>
        <FaLink />
      </div>
      <div>
        <div>{note.title}</div>
        <div className='text-sm text-gray-500 truncate'><span>{note.url}</span></div>
      </div>
    </Link>
  )
}