import { fetchFolderById } from '@/api/folder';
import { notFound } from 'next/navigation';
import FolderMenu from '@/components/folder/FolderMenu';
import Title from '@/components/Title';
import Main from '@/components/Main';
import Description from '@/components/Description';

export default async function FolderLayout({ children, params }: {
  children: React.ReactNode,
  params: { id: string }
}) {

  const id = params.id;
  const folder = await fetchFolderById(id);
  if (!folder) {
    notFound();
  }

  return <Main>
    <div className="relative -mt-5">
      <FolderMenu folder={folder} />
    </div>
    <div className="pt-12 mb-5">
      <Title>{folder.title}</Title>
      {folder.description && <Description>{folder.description}</Description>}
    </div>
    {children}
  </Main>

}
