import { Metadata } from 'next';
import { fetchTreeFolders } from '@/api/folder';
import Main from '@/components/Main';
import FolderEmpty from '@/components/folder/FolderEmpty';
import FolderTreeBranch from '@/components/folder/FolderTreeBranch';

export const metadata: Metadata = {
  title: 'Tree',
};

export default async function Page() {
  const folders = await fetchTreeFolders();
  return (
    <Main>
      {folders.length ? <div className="w-full flex flex-col gap-1 mb-16">
        {folders.map((folder) => (
          <FolderTreeBranch key={folder.id} folder={folder} level={0} />
        ))}
      </div> : <FolderEmpty message='Your vault is currently empty' />}
    </Main>
  );
}