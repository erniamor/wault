import { useId } from 'react'
import Field from './common/Field'
export type InputProps = {
  name: string
  value?: string
  type?: string
  label?: string
  placeholder?: string
  errors?: string[]
}
export default function Input({
  name,
  value,
  type = "text",
  label,
  placeholder,
  errors
}: InputProps) {
  const id = useId()
  return <Field id={id} label={label} errors={errors}>
    <input
      id={id}
      name={name}
      type={type}
      defaultValue={value}
      placeholder={placeholder}
      aria-describedby={`${id}-error`}
      className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
    />
  </Field>
}