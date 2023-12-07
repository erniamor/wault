import Link from 'next/link';
import Image from 'next/image';
import { inter } from '@/assets/fonts';
import { FaCircleUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
export default function Header() {
  return (
    <div className="w-full p-4 bg-gray-800">
      <div className="w-full flex flex-row items-center justify-between ">
        <Link href={`/`} className="flex flex-row items-center gap-3">
          <Image
            src="/wault-logo.png"
            width={40}
            height={40}
            alt="Wault logo"
          />
          <h1 className={`${inter.className} text-2xl text-white`}>Wault</h1>
        </Link>
        <div className='flex flex-row gap-5 text-white'>
          <FaSearch size={30} />
          <FaCircleUser size={30} />
        </div>
      </div>
    </div >
  );
}