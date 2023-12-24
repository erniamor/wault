
export type Folder = {
  id: string;
  title: string;
  description?: string;
  folder_id?: string;
  user_id: string;
}

export interface FolderWithChildren extends Folder {
  children: FolderWithChildren[];
}