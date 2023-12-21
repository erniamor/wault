import { Metadata } from 'next';
import Main from '@/components/Main';
import Title from '@/components/Title';
import CreateNoteForm from '@/components/note/CreateNoteForm';
export const metadata: Metadata = {
  title: 'Create a Note',
};

export default async function Page() {
  return <Main>
    <div className="mb-5">
      <Title>Create a Note</Title>
    </div>
    <CreateNoteForm />
  </Main>
}