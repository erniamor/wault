import { Metadata } from 'next';
import CreateNoteFormFromUrl from '@/components/note/CreateNoteFormFromUrl';
export const metadata: Metadata = {
  title: 'Create Note from URL',
};

export default async function Page({ params }: { params: { id: string } }) {
  return <CreateNoteFormFromUrl vaultId={params.id} />
}