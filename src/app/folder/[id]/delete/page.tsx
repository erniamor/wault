import { fetchFolderById } from '@/api/folder';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import DeleteFolderForm from '@/components/folder/DeleteFolderForm';

export const metadata: Metadata = {
  title: 'Delete a Folder',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const folder = await fetchFolderById(id);
  if (!folder) {
    notFound();
  }
  return (
    <DeleteFolderForm folder={folder} />
  );
}