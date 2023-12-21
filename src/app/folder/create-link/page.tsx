import { Metadata } from 'next';
import Main from '@/components/Main';
import Title from '@/components/Title';
import CreateNoteFormFromUrl from '@/components/note/CreateNoteFormFromUrl';
export const metadata: Metadata = {
  title: 'Create a Link',
};

export default async function Page() {
  return <Main>
    <div className="mb-5">
      <Title>Create a Link</Title>
    </div>
    <CreateNoteFormFromUrl />
  </Main>
}