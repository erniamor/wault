import { useId } from 'react'
import Field from './common/Field'
export type InputProps = {
  name: string
  value?: string
  type?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  errors?: string[]
  [key: string]: any
}
export default function Input({
  name,
  value,
  type = "text",
  label,
  placeholder,
  disabled,
  errors,
  ...props
}: InputProps) {
  const id = useId()
  return <Field id={id} label={label} errors={errors}>
    <input
      id={id}
      name={name}
      type={type}
      defaultValue={value}
      placeholder={placeholder}
      disabled={disabled}
      aria-describedby={`${id}-error`}
      className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm text-gray-900 outline-2 placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  </Field>
}