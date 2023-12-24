import { Folder, FolderWithChildren } from "@/types/folder";

export function convertFoldersToTree(folders: Folder[]): FolderWithChildren[] {
  return folders
    .filter(folder => folder.folder_id === null)
    .map(folder => addChildrenToFolder(folder, folders));
}
function addChildrenToFolder(folder: Folder, folders: Folder[]): FolderWithChildren {
  const children = folders
    .filter(currentFolder => currentFolder.folder_id === folder.id)
    .map(currentFolder => addChildrenToFolder(currentFolder, folders));
  return { ...folder, children };
}
