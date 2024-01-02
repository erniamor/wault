import { Folder, FolderWithChildren } from "@/types/folder";

export function convertFoldersToTree(folders: Folder[]): FolderWithChildren[] {
  return folders
    .filter(folder => folder.folder_id === null)
    .map(folder => addChildrenToFolder(folder, folders));
}
function addChildrenToFolder(folder: Folder, allFolders: Folder[]): FolderWithChildren {
  const folders = allFolders
    .filter(currentFolder => currentFolder.folder_id === folder.id)
    .map(currentFolder => addChildrenToFolder(currentFolder, allFolders));
  return { ...folder, folders };
}
