import Link from 'next/link';
import Image from 'next/image';
import { inter } from '@/assets/fonts';

export default async function HeaderLogo() {
  return (
    <Link href={`/`} className="flex flex-row items-center gap-3">
      <Image
        src="/wault-logo.png"
        width={40}
        height={40}
        alt="Wault logo"
      />
      <h1 className={`${inter.className} text-2xl text-white`}>Wault</h1>
    </Link>
  );
}