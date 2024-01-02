import type { Note } from '@/types/note';
import type { Folder, FolderWithChildren } from '@/types/folder';
export function addNotesToFolders(notes: Note[], folders: Folder[]): FolderWithChildren[] {
  return folders.map(folder => {
    const folderNotes = notes.filter(note => note.folder_id === folder.id);
    return {
      ...folder,
      notes: folderNotes
    }
  })
}