import { Metadata } from 'next';
import CreateNoteForm from '@/components/note/CreateNoteForm';
export const metadata: Metadata = {
  title: 'Create Note',
};

export default async function Page({ params }: { params: { id: string } }) {
  return <CreateNoteForm folderId={params.id} />
}