export type FormErrorProps = {
  message?: string | null
}
export default function FormError({ message }: FormErrorProps) {
  return message ? (
    <div className="mt-2 text-sm text-red-500">
      <p>{message}</p>
    </div>
  ) : null
}