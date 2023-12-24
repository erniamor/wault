import type { Folder } from '@/types/folder';
import { fetchFolderById, fetchFolders } from '@/api/folder';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import UpdateFolderForm from '@/components/folder/UpdateFolderForm';

export const metadata: Metadata = {
  title: 'Update a Folder',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const folder = await fetchFolderById(id);
  const folders = await fetchFolders();
  const foldersWithoutItself = folders.filter((folder) => folder.id !== id);
  const foldersForOptions = getFoldersForOptions(foldersWithoutItself);
  if (!folder) {
    notFound();
  }
  return (
    <UpdateFolderForm folder={folder} folders={foldersForOptions} />
  );
}

function getFoldersForOptions(folders: Folder[]) {
  const options: Folder[] = [
    { id: 'null', title: 'Root', user_id: '' },
  ];
  const rootFolders = folders.filter((folder) => !folder.folder_id);
  for (const folder of rootFolders) {
    addFolderToOptions(folder, folders, options);
  }
  return options;
}
function addFolderToOptions(folder: Folder, folders: Folder[], options: Folder[], level = 1) {
  options.push({ ...folder, title: `${getIndentation(level)} ${folder.title}` });
  const subFolders = folders.filter((f) => f.folder_id === folder.id);
  for (const subFolder of subFolders) {
    addFolderToOptions(subFolder, folders, options, level + 1);
  }
}
function getIndentation(level: number) {
  return '-'.repeat(level);
}