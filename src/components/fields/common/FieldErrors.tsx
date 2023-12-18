export type FieldErrorsProps = {
  id: string
  errors?: string[]
}
export default function FieldLabel({ id, errors }: FieldErrorsProps) {
  return errors ? (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-2 text-sm text-red-500"
    >
      {errors.map((error: string) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  ) : null;
}