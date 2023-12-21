'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

type NavLinkProps = {
  href: string;
  exact?: boolean;
  children?: React.ReactNode;
  className?: string;
  activeClass?: string;
  inactiveClass?: string;
}

export default function HeaderNavLink({
  href,
  exact = false,
  className = '',
  activeClass = 'active',
  inactiveClass = '',
  children, ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link href={href} {...props} className={clsx(className, isActive ? activeClass : inactiveClass)}>
      {children}
    </Link>
  );
}