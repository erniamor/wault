import FieldLabel from "./FieldLabel"
import FieldErrors from "./FieldErrors"

export type FieldProps = {
  id: string
  label?: string
  children: React.ReactNode
  errors?: string[]
}

export default function Field({
  id,
  label,
  children,
  errors
}: FieldProps) {
  return (
    <div className="">
      <FieldLabel id={id} label={label} />
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          {children}
        </div>
        <FieldErrors id={id} errors={errors} />
      </div>
    </div>
  )
}