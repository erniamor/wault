import Link from 'next/link';
import { AiFillFolderAdd } from "react-icons/ai";
import { TiDocumentAdd } from "react-icons/ti";
import { FaLink } from "react-icons/fa6";

type CreateMenuProps = {
  vaultId?: string,
  isNoteVisible?: boolean,
  isLinkVisible?: boolean,
  isFolderVisible?: boolean
}

export default function CreateMenu({ vaultId, isNoteVisible = true, isLinkVisible = true, isFolderVisible = true }: CreateMenuProps) {
  return (
    <div className="fixed bottom-5 right-5 drop-shadow-lg">
      <div className="flex flex-row gap-2 items-baseline">

        {isLinkVisible && <Link
          href={vaultId ? `/vault/${vaultId}/create-link` : "/vault/create-link"}
          className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white"
        >
          <FaLink size={16} />
        </Link>}

        {isNoteVisible && <Link
          href={vaultId ? `/vault/${vaultId}/create-note` : "/vault/create-note"}
          className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white"
        >
          <TiDocumentAdd size={22} />
        </Link>}

        {isFolderVisible && <Link
          href={vaultId ? `/vault/${vaultId}/create-vault` : "/vault/create-vault"}
          className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white"
        >
          <AiFillFolderAdd size={32} />
        </Link>}

      </div>
    </div>
  )
}