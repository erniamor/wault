import Link from 'next/link';
export default function Button({ children, href }: { children: React.ReactNode, href: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
    >
      {children}
    </Link>
  );
}