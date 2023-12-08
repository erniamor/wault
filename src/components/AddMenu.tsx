import Link from 'next/link';
import { AiFillFolderAdd } from "react-icons/ai";
import { TbLinkPlus } from "react-icons/tb";
import { TiDocumentAdd } from "react-icons/ti";

export default function AddMenu({ vaultId, isNoteVisible = true, isLinkVisible = true, isFolderVisible = true }: { vaultId?: string, isNoteVisible?: boolean, isLinkVisible?: boolean, isFolderVisible?: boolean }) {
  return (
    <div className="fixed bottom-5 right-5 drop-shadow-lg">

      <div className="flex flex-row gap-2 items-baseline">

        {isNoteVisible && <Link
          href="/vault/create-note"
          className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white"
        >
          <TiDocumentAdd size={22} />
        </Link>}

        {isLinkVisible && <Link
          href="/vault/create-link"
          className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white"
        >
          <TbLinkPlus size={28} />
        </Link>}

        {isFolderVisible && <Link
          href="/vault/create-vault"
          className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white"
        >
          <AiFillFolderAdd size={36} />
        </Link>}

      </div>

    </div>
  )
}