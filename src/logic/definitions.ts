// This file contains type definitions for your data.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Vault = {
  id: string;
  title: string;
  description?: string;
  vault_id?: string;
  user_id: string;
}

export type Element = {
  id: string;
  title: string;
  description?: string;
  url?: string;
  vault_id: string;
  user_id: string;
}
