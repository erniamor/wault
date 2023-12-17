import { Vault } from '@/logic/definitions';
import VaultMenuLink from '@/components/vault/VaultMenuLink';
import { CiTurnL1, CiMenuBurger, CiEdit, CiTrash } from "react-icons/ci";

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