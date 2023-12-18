// This file contains placeholder data for development
const USERS = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@a-domain.com',
    password: '123456',
  },
];

const VAULTS = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    title: 'Dev',
    description: 'All for code.',
    user_id: USERS[0].id,
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442b',
    title: 'Tuto',
    user_id: USERS[0].id,
    vault_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a'
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442c',
    title: 'Packages',
    user_id: USERS[0].id,
    vault_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a'
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442d',
    title: 'Notes',
    user_id: USERS[0].id,
  },
];

const ELEMENTS = [
  {
    url: 'https://github.com/',
    title: 'Github',
    description: 'The developer platform.',
    vault_id: VAULTS[0].id,
    user_id: USERS[0].id,
  },
  {
    url: 'https://grafikart.fr/',
    title: 'Grafikart',
    vault_id: VAULTS[1].id,
    user_id: USERS[0].id,
  },
  {
    url: 'https://devtheory.fr/',
    title: 'Dev Theory',
    vault_id: VAULTS[1].id,
    user_id: USERS[0].id,
  },
  {
    url: 'https://www.npmjs.com/package/@erniamor/formater',
    title: 'Formater',
    vault_id: VAULTS[2].id,
    user_id: USERS[0].id,
  },
  {
    url: 'https://www.npmjs.com/package/@erniamor/colorer',
    title: 'Colorer',
    vault_id: VAULTS[2].id,
    user_id: USERS[0].id,
  },
  {
    title: 'First note',
    vault_id: VAULTS[3].id,
    user_id: USERS[0].id,
  },
];

module.exports = {
  USERS,
  VAULTS,
  ELEMENTS,
};
