import { Metadata } from 'next';
import CreateFolderForm from '@/components/folder/CreateFolderForm';
export const metadata: Metadata = {
  title: 'Create a Folder',
};

export default async function Page({ params }: { params: { id: string } }) {
  return <CreateFolderForm folderId={params.id} />
}