export type FieldLabelProps = {
  label?: string
  id: string
}
export default function FieldLabel({ label, id }: FieldLabelProps) {
  return label ? <label htmlFor={id} className="mb-2 block text-sm font-medium">
    {label}
  </label> : null;
}