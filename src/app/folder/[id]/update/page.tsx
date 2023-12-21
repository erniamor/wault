import { fetchFolderById } from '@/api/folder';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import UpdateFolderForm from '@/components/folder/UpdateFolderForm';

export const metadata: Metadata = {
  title: 'Update a Folder',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const folder = await fetchFolderById(id);
  if (!folder) {
    notFound();
  }
  return (
    <UpdateFolderForm folder={folder} />
  );
}