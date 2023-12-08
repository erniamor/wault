import Image from 'next/image';
import Lien from '@/components/Lien';

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
          <h1 className='text-6xl text-white'>Wault</h1>
          <p className='text-white'>A vault for your notes, links and more.</p>
        </div>

        <div className='flex flex-row gap-3 mt-20'>
          <Lien href="/login">
            Log in
          </Lien>
          <Lien href="/login">
            Sign in
          </Lien>

          <Lien href="/vault">
            Vault
          </Lien>
        </div>

      </div>

    </main>
  )
}
