import clsx from 'clsx';
import Link from 'next/link';

type Styling = 'normal' | 'primary' | 'success' | 'danger' | 'warning';

const styles: Record<Styling, string> = {
  normal: 'bg-gray-200 text-black hover:bg-gray-400 focus-visible:outline-gray-500 active:bg-gray-600',
  primary: 'bg-blue-500 text-white hover:bg-blue-400 focus-visible:outline-blue-500 active:bg-blue-600',
  success: 'bg-green-500 text-white hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 active:bg-green-600',
  danger: 'bg-red-500 text-white hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-red-600',
  warning: 'bg-yellow-500 text-white hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 active:bg-yellow-600',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  styling?: Styling;
  children: React.ReactNode;
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
}

export default function Button({ href, className, styling = 'normal', target = '_blank', children, ...props }: ButtonProps) {

  const computedClassName = clsx(
    'flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
    styles[styling],
    className,
  )

  if (href) {
    if (href.startsWith('http')) {
      return <a
        href={href}
        target={target}
        className={computedClassName}
      >
        {children}
      </a>;
    } else {
      return <Link
        href={href}
        className={computedClassName}
      >
        {children}
      </Link>;
    }
  } else {
    return <button
      className={computedClassName}
      {...props}
    >
      {children}
    </button>;
  }
}
