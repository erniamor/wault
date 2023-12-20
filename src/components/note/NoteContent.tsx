

export default function NoteContent({ children }: { children: React.ReactNode }) {
  return <div className="rounded-md bg-gray-50 p-4">
    <p>{children}</p>
  </div>
}