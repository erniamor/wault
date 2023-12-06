import { Vault } from '@/logic/definitions';
import Link from 'next/link';
import { FaFolder } from "react-icons/fa";

export default function VaultCard({ vault }: { vault: Vault }) {
  return (
    <Link href={`/vault/${vault.id}`} className="w-full p-4 bg-gray-300 rounded flex flex-row gap-2 items-center">
      <div>
        <FaFolder />
      </div>
      <div>
        {vault.title}
      </div>
    </Link>
  )
}