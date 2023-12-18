

export default function FormButtons({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 flex justify-end gap-3">
    {children}
  </div>
}