

export default function FormFields({ children }: { children: React.ReactNode }) {
  return <div className="rounded-md bg-gray-50 p-4 md:p-6 flex flex-col gap-4">
    {children}
  </div>
}