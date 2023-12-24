import type { Folder } from '@/types/folder';
import { LuFolderTree } from "react-icons/lu";
import MenuLink from '@/components/MenuLink';

export default function RootMenu() {
  return <div className='absolute top-0 left-0 w-full flex flex-row justify-between'>
    <div>
      <MenuLink href={`/tree`}>
        <LuFolderTree />
      </MenuLink>
    </div>
  </div>
}
