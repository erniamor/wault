import Image from 'next/image';
import Button from '@/components/Button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className='flex flex-col gap-5'>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/wault-logo.png"
            width={200}
            height={200}
            alt="Wault logo"
          />
          <h1 className='text-6xl text-white mb-2'>Wault</h1>
          <p className='text-white text-center'>A vault for your notes, links and more.</p>
        </div>
        <div className='flex flex-row items-center justify-center gap-3 mt-20'>
          <Button href="/auth/login">Login</Button>
          <Button href="/auth/register">Register</Button>
        </div>
      </div>
    </main>
  )
}
