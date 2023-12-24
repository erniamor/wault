export default function List({ children }: { children: React.ReactNode }) {
  return <ul className="w-full flex flex-col gap-3 mb-16">
    {children}
  </ul>
}