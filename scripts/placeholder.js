// This file contains placeholder data for development
const USERS = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@a-domain.com',
    password: '123456',
  },
];

const FOLDERS = [
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
    folder_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a'
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442c',
    title: 'Packages',
    user_id: USERS[0].id,
    folder_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a'
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442d',
    title: 'Notes',
    user_id: USERS[0].id,
  },
];

const NOTES = [
  {
    url: 'https://github.com/',
    title: 'Github',
    description: 'The developer platform.',
    folder_id: FOLDERS[0].id,
    user_id: USERS[0].id,
  },
  {
    url: 'https://grafikart.fr/',
    title: 'Grafikart',
    folder_id: FOLDERS[1].id,
    user_id: USERS[0].id,
  },
  {
    url: 'https://devtheory.fr/',
    title: 'Dev Theory',
    folder_id: FOLDERS[1].id,
    user_id: USERS[0].id,
  },
  {
    url: 'https://www.npmjs.com/package/@erniamor/formater',
    title: 'Formater',
    folder_id: FOLDERS[2].id,
    user_id: USERS[0].id,
  },
  {
    url: 'https://www.npmjs.com/package/@erniamor/colorer',
    title: 'Colorer',
    folder_id: FOLDERS[2].id,
    user_id: USERS[0].id,
  },
  {
    title: 'First note',
    folder_id: FOLDERS[3].id,
    user_id: USERS[0].id,
  },
];

module.exports = {
  USERS,
  FOLDERS,
  NOTES,
};
