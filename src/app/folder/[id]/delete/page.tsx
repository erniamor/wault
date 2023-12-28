import { fetchFolderById } from '@/api/folder';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import DeleteFolderForm from '@/components/folder/DeleteFolderForm';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;
  const folder = await fetchFolderById(id);
  return {
    title: `Delete ${folder.title} | Folder`,
  }
}

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