import { fetchFolderById, fetchFolders } from '@/api/folder';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import UpdateFolderForm from '@/components/folder/UpdateFolderForm';
import { convertFoldersForOptions } from '@/utils/convertFoldersForOptions';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;
  const folder = await fetchFolderById(id);
  return {
    title: `Update ${folder.title} | Folder`,
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const folder = await fetchFolderById(id);
  const folders = await fetchFolders();
  const foldersWithoutItself = folders.filter((folder) => folder.id !== id);
  const foldersForOptions = convertFoldersForOptions(foldersWithoutItself);
  if (!folder) {
    notFound();
  }
  return (
    <UpdateFolderForm folder={folder} folders={foldersForOptions} />
  );
}
