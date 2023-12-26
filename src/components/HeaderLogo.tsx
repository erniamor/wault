import Link from 'next/link';
import Image from 'next/image';
import { lusitana } from '@/assets/fonts';

export default async function HeaderLogo() {
  return (
    <Link href={`/`} className="flex flex-row items-center justify-center gap-3">
      <Image
        src="/wault-logo-40.png"
        width={40}
        height={40}
        alt="Wault logo"
      />
      <h1 className={`${lusitana.className} text-3xl text-white `}>Wault</h1>
    </Link>
  );
}