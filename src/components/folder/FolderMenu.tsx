'use client';

import type { Folder } from '@/types/folder';
import { CiTurnL1, CiMenuBurger, CiEdit, CiTrash } from "react-icons/ci";
import MenuLink from '@/components/MenuLink';

export default function FolderMenu({ folder }: { folder: Folder }) {
  return <div className='absolute top-0 left-0 w-full flex flex-row justify-between'>
    <div>
      <MenuLink href={`/folder${folder.folder_id ? `/${folder.folder_id}` : ''}`}>
        <CiTurnL1 />
      </MenuLink>
    </div>
    <div className='flex flex-row items-start gap-2'>
      <MenuLink href={`/folder/${folder.id}`} activeColor='bg-green-600'>
        <CiMenuBurger />
      </MenuLink>
      <MenuLink href={`/folder/${folder.id}/update`} activeColor='bg-sky-600'>
        <CiEdit />
      </MenuLink>
      <MenuLink href={`/folder/${folder.id}/delete`} activeColor='bg-red-600'>
        <CiTrash />
      </MenuLink>
    </div>
  </div>
}
