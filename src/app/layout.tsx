import type { Metadata } from 'next'
import { inter } from '@/assets/fonts';
import '@/assets/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Wault',
    default: 'Wault',
  },
  description: 'A folder for your notes, links and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
