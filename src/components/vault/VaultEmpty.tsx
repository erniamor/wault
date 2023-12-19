import Button from "../Button"
import { AiFillFolderAdd } from "react-icons/ai";
import { TiDocumentAdd } from "react-icons/ti";

export default function VaultEmpty({ vaultId }: { vaultId: string }) {
  return (
    <div className="w-full pt-4">
      <p className="text-center text-white text-sm mb-4">Nothing found in this vault</p>
      <div className="flex flex-row gap-4 justify-center">
        <Button href={`/vault/${vaultId}/create-vault`}>
          <AiFillFolderAdd size={22} className="mr-2" /> Add Folder
        </Button>
        <Button href={`/vault/${vaultId}/create-note`}>
          <TiDocumentAdd size={22} className="mr-2" /> Add Note
        </Button>
      </div>
    </div>
  )
}