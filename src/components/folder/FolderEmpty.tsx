import Button from "../Button"
import { AiFillFolderAdd } from "react-icons/ai";
import { TiDocumentAdd } from "react-icons/ti";

export default function FolderEmpty({ folderId, message = 'Nothing found in this folder' }: { folderId?: string, message?: string }) {
  return (
    <div className="w-full pt-4">
      <p className="text-center text-white text-sm mb-4">{message}</p>
      <div className="flex flex-row gap-4 justify-center">
        <Button href={`/folder/${folderId ? `/${folderId}` : ""}/create-folder`}>
          <AiFillFolderAdd size={22} className="mr-2" /> Add Folder
        </Button>
        <Button href={`/folder/${folderId ? `/${folderId}` : ""}/create-note`}>
          <TiDocumentAdd size={22} className="mr-2" /> Add Note
        </Button>
      </div>
    </div>
  )
}