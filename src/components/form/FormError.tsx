export type FormErrorProps = {
  message?: string | null
}
export default function FormError({ message }: FormErrorProps) {
  return message ? (
    <div className="mt-6 text-sm bg-red-500 text-white p-4 rounded-lg">
      <p>{message}</p>
    </div>
  ) : null
}