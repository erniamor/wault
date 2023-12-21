import FolderCard from '@/components/folder/FolderCard';
import { Metadata } from 'next';
import { fetchRootFolders } from '@/api/folder';
import CreateMenu from '@/components/CreateMenu';
import Main from '@/components/Main';

export const metadata: Metadata = {
  title: 'Folders',
};

export default async function Page() {
  const folders = await fetchRootFolders();
  // TODO : add empty message if no folder found
  // TODO : make notes available at root level
  return (
    <Main>
      <div className="w-full flex flex-col gap-3 mb-16">
        {folders.map((folder) => (
          <FolderCard key={folder.id} folder={folder} />
        ))}
      </div>
      <CreateMenu />
    </Main>
  );
}