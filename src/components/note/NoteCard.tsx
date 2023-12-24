import type { Note } from '@/types/note';
import Link from 'next/link';
import { FaLink } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi";

export default function NoteCard({ note }: { note: Note }) {
  return (
    <Link href={`/note/${note.id}`} className="w-full px-4 py-3 bg-gray-100 rounded flex flex-row gap-2 items-top text-black">
      <div className='pt-1'>
        {note.url ? <FaLink /> : <HiOutlineDocumentText />}
      </div>
      <div>
        <div>{note.title}</div>
        <p className='text-sm text-gray-500 '>{note.description}</p>
      </div>
    </Link>
  )
}