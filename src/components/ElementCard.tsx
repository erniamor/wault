import type { Element } from '@/types/element';
import Link from 'next/link';
import { FaLink } from "react-icons/fa6";

export default function ElementCard({ element }: { element: Element }) {
  return (
    <Link href={`/element/${element.id}`} className="w-full p-4 bg-gray-100 rounded flex flex-row gap-2 items-center">
      <div>
        <FaLink />
      </div>
      <div>
        <div>{element.title}</div>
        <div className='text-sm text-gray-500 truncate'><span>{element.url}</span></div>
      </div>

    </Link>
  )
}