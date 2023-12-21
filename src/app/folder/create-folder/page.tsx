import { Metadata } from 'next';
import Title from '@/components/Title';
import CreateFolderForm from '@/components/folder/CreateFolderForm';
import Main from '@/components/Main';
export const metadata: Metadata = {
  title: 'Create Folder',
};

export default async function Page() {
  return <Main>
    <div className="mb-5">
      <Title>Create a Folder</Title>
    </div>
    <CreateFolderForm />
  </Main>
}