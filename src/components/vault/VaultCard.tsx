import type { Vault } from '@/types/vault';
import Link from 'next/link';
import { FaFolder } from "react-icons/fa";

export default function VaultCard({ vault }: { vault: Vault }) {
  return (
    <Link href={`/vault/${vault.id}`} className="w-full p-4 bg-gray-300 rounded flex flex-row gap-2 items-top">
      <div className='p-1'>
        <FaFolder />
      </div>
      <div>
        <div>{vault.title}</div>
        <div className='text-sm text-gray-500'>{vault.description}</div>
      </div>
    </Link>
  )
}