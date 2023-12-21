import Link from 'next/link';
import { AiFillFolderAdd } from "react-icons/ai";
import { TiDocumentAdd } from "react-icons/ti";
import { FaLink } from "react-icons/fa6";

type CreateMenuProps = {
  folderId?: string,
}

export default function CreateMenu({ folderId }: CreateMenuProps) {
  return (
    <div className="fixed bottom-5 left-5 right-5 drop-shadow-lg">

      <div className="flex flex-row justify-between items-baseline">

        <div className="flex flex-row gap-2 items-baseline">

          <Link
            href={folderId ? `/folder/${folderId}/create-folder` : "/folder/create-folder"}
            className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white"
          >
            <AiFillFolderAdd size={26} />
          </Link>

        </div>


        <div className="flex flex-row gap-2 items-baseline">

          <Link
            href={folderId ? `/folder/${folderId}/create-link` : "/folder/create-link"}
            className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white"
          >
            <FaLink size={18} />
          </Link>

          <Link
            href={folderId ? `/folder/${folderId}/create-note` : "/folder/create-note"}
            className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white"
          >
            <TiDocumentAdd size={26} />
          </Link>

        </div>
      </div>


    </div>
  )
}