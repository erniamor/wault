import type { FolderWithChildren } from '@/types/folder';
import clsx from 'clsx';
import Link from 'next/link';
import { FaFolder } from "react-icons/fa";

export default function FolderTreeBranch({ folder, level }: { folder: FolderWithChildren, level: number }) {
  const paddingByLevel = (level * 24) + "px";
  return <>
    <Link href={`/folder/${folder.id}`} className={clsx('w-full flex flex-row gap-2 items-top text-white hover:text-gray-400')} style={{ paddingLeft: paddingByLevel }}>
      <div className='pt-1'>
        <FaFolder />
      </div>
      <div>{folder.title}</div>
    </Link>

    {folder.folders && folder.folders.map((child) => (
      <FolderTreeBranch key={child.id} folder={child} level={level + 1} />
    ))}
  </>
}