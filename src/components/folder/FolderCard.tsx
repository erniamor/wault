import type { Folder } from '@/types/folder';
import Link from 'next/link';
import { FaFolder } from "react-icons/fa";

export default function FolderCard({ folder }: { folder: Folder }) {
  return (
    <Link href={`/folder/${folder.id}`} className="w-full px-4 py-3 bg-gray-300 rounded flex flex-row gap-2 items-top text-black">
      <div className='pt-1'>
        <FaFolder />
      </div>
      <div>
        <div>{folder.title}</div>
        <div className='text-sm text-gray-500'>{folder.description}</div>
      </div>
    </Link>
  )
}