'use client';

import { CiTurnL1, CiExport, CiImport, CiTrash } from "react-icons/ci";
import MenuLink from '@/components/MenuLink';

export default function NoteMenu() {
  return <div className='absolute top-0 left-0 w-full flex flex-row justify-between'>
    <div className='flex flex-row items-start gap-2'>
      <MenuLink href={`/profile`}>
        <CiTurnL1 />
      </MenuLink>
    </div>
    <div className='flex flex-row items-start gap-2'>
      <MenuLink href={`/profile/import`} activeColor='bg-green-600'>
        <CiImport />
      </MenuLink>
      <MenuLink href={`/profile/export`} activeColor='bg-sky-600'>
        <CiExport />
      </MenuLink>
      <MenuLink href={`/profile/delete`} activeColor='bg-red-600'>
        <CiTrash />
      </MenuLink>
    </div>
  </div>
}
