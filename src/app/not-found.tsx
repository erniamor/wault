import Link from 'next/link';
import Header from '@/components/Header';
import Main from '@/components/Main';
import Title from '@/components/Title';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <div className="w-full">
      <Header />
      <Main>
        <div className="mb-5">
          <Title>Not Found</Title>
        </div>
        <div className="rounded-md bg-gray-50 text-black p-4 text-center">
          <p>Could not find the requested resource.</p>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/" styling='primary'>
            Back to root
          </Button>
        </div>
      </Main>
    </div>
  );
}