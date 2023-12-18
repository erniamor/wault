import Link from 'next/link';
import { AiFillFolderAdd } from "react-icons/ai";
import { TiDocumentAdd } from "react-icons/ti";

type CreateMenuProps = {
  vaultId?: string,
  isNoteVisible?: boolean,
  isFolderVisible?: boolean
}

export default function CreateMenu({ vaultId, isNoteVisible = true, isFolderVisible = true }: CreateMenuProps) {
  return (
    <div className="fixed bottom-5 right-5 drop-shadow-lg">
      <div className="flex flex-row gap-2 items-baseline">

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