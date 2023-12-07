import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit a Vault',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (

    <div className="w-full flex flex-col gap-3">
      Remove confirmation
    </div>

  );
}