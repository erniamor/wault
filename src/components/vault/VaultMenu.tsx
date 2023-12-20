'use client';

import type { Vault } from '@/types/vault';
import { CiTurnL1, CiMenuBurger, CiEdit, CiTrash } from "react-icons/ci";
import MenuLink from '@/components/MenuLink';

export default function VaultMenu({ vault }: { vault: Vault }) {
  return <div className='absolute top-0 left-0 w-full flex flex-row justify-between'>
    <div>
      <MenuLink href={`/vault${vault.vault_id ? `/${vault.vault_id}` : ''}`}>
        <CiTurnL1 />
      </MenuLink>
    </div>
    <div className='flex flex-row items-start gap-2'>
      <MenuLink href={`/vault/${vault.id}`} activeColor='bg-green-600'>
        <CiMenuBurger />
      </MenuLink>
      <MenuLink href={`/vault/${vault.id}/update`} activeColor='bg-sky-600'>
        <CiEdit />
      </MenuLink>
      <MenuLink href={`/vault/${vault.id}/delete`} activeColor='bg-red-600'>
        <CiTrash />
      </MenuLink>
    </div>
  </div>
}
