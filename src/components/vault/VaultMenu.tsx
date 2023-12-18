'use client';

import type { Vault } from '@/types/vault';
import { CiTurnL1, CiMenuBurger, CiEdit, CiTrash } from "react-icons/ci";
import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function VaultInfo({ vault }: { vault: Vault }) {
  return <div className='absolute top-0 left-0 w-full flex flex-row justify-between'>
    <div>
      <VaultMenuLink href={`/vault${vault.vault_id ? `/${vault.vault_id}` : ''}`}>
        <CiTurnL1 />
      </VaultMenuLink>
    </div>
    <div className='flex flex-row items-start gap-2'>
      <VaultMenuLink href={`/vault/${vault.id}`} activeColor='bg-green-600'>
        <CiMenuBurger />
      </VaultMenuLink>
      <VaultMenuLink href={`/vault/${vault.id}/edit`} activeColor='bg-sky-600'>
        <CiEdit />
      </VaultMenuLink>
      <VaultMenuLink href={`/vault/${vault.id}/remove`} activeColor='bg-red-600'>
        <CiTrash />
      </VaultMenuLink>
    </div>
  </div>
}

function VaultMenuLink({ href, children, activeColor = 'bg-gray-600' }: { href: string, activeColor?: string, children: React.ReactNode }) {
  const pathname = usePathname()
  const active = pathname === href;
  return (
    <Link href={href} className={
      `px-2 pb-2 bg-gray-200 rounded-b flex items-center justify-center transition-all  duration-500 ease-out
      ${active ? `pt-4 text-white ${activeColor}` : 'pt-2 bg-gray-200 text-black'}
      `}>
      {children}
    </Link>
  )
}