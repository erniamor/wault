import type { Folder } from '@/types/folder';
export function convertFoldersForOptions(folders: Folder[]) {
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