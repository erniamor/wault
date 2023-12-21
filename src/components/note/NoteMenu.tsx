'use client';

import type { Note } from '@/types/note';
import { CiTurnL1, CiEdit, CiTrash } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import MenuLink from '@/components/MenuLink';

export default function NoteMenu({ note }: { note: Note }) {
  return <div className='absolute top-0 left-0 w-full flex flex-row justify-between'>
    <div>
      <MenuLink href={`/folder/${note.folder_id}`}>
        <CiTurnL1 />
      </MenuLink>
    </div>
    <div className='flex flex-row items-start gap-2'>
      <MenuLink href={`/note/${note.id}`} activeColor='bg-green-600'>
        <FaRegEye />
      </MenuLink>
      <MenuLink href={`/note/${note.id}/update`} activeColor='bg-sky-600'>
        <CiEdit />
      </MenuLink>
      <MenuLink href={`/note/${note.id}/delete`} activeColor='bg-red-600'>
        <CiTrash />
      </MenuLink>
    </div>
  </div>
}
