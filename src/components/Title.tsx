
export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-3xl text-white font-bold text-center mb-5">
      {children}
    </div>
  )
}