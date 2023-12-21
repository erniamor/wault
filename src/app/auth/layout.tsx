import Header from '@/components/Header'
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      <Header />
      <div>{children}</div>
    </div>
  )
}
