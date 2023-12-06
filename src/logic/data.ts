// import { sql } from '@vercel/postgres';
import {
  Vault,
  Element,
  User,
} from './definitions';
import { VAULTS, ELEMENTS } from './placeholder';

export async function fetchVaults() {

  const vaults = VAULTS.filter((vault) => !vault.vault_id);
  return vaults as Vault[];

  /* return sql<Vault[]>`
    SELECT * FROM vaults
  `; */
}
export async function fetchVault(id: string) {

  const vault = VAULTS.find((vault) => vault.id === id) as Vault;
  return vault

  /* return sql<Vault[]>`
    SELECT * FROM vaults
    WHERE id = ${id}
  `; */
}
export async function fetchVaultVaults(id: string) {

  const vaults = VAULTS.filter((vault) => vault.vault_id === id) as Vault[];
  return vaults

}
export async function fetchVaultElements(id: string) {

  const elements = ELEMENTS.filter((element) => element.vault_id === id) as Element[];
  return elements

}