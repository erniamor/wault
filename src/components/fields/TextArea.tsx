import { useId } from 'react'
import Field from './common/Field'
export type InputProps = {
  name: string
  value?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  rows?: number
  errors?: string[]
}
export default function TextArea({
  name,
  value,
  label,
  placeholder,
  disabled,
  rows = 3,
  errors
}: InputProps) {
  const id = useId()
  return <Field id={id} label={label} errors={errors}>
    <textarea
      id={id}
      name={name}
      defaultValue={value}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      aria-describedby={`${id}-error`}
      className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
    ></textarea>
  </Field>
}