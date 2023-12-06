"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function VaultNavButton({ href, children, activeColor = 'bg-gray-600' }: { href: string, activeColor?: string, children: React.ReactNode }) {
  const pathname = usePathname()
  const active = pathname === href;
  return (
    <Link href={href} className={
      `px-2 pb-2 bg-gray-200 rounded-b flex items-center justify-center transition-all  duration-500 ease-out
      ${active ? `pt-4 text-white ${activeColor}` : 'pt-2 bg-gray-200 text-black'}
      `}>
      {children}
    </Link>
  )
}