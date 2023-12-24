import { useId } from 'react'
import Field from './common/Field'

type SelectOption = {
  value: string
  label: string
}
export type InputProps = {
  name: string
  value?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  errors?: string[]
  options: SelectOption[]
}
export default function Select({
  name,
  value,
  label,
  placeholder,
  disabled,
  errors,
  options = []
}: InputProps) {
  const id = useId()
  return <Field id={id} label={label} errors={errors}>
    <select
      id={id}
      name={name}
      className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm text-gray-900 outline-2 placeholder:text-gray-500"
      defaultValue={value}
      aria-describedby={`${id}-error`}
      disabled={disabled}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </Field>
}