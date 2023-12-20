
import { useFormStatus } from 'react-dom';
import Button from '@/components/Button';
export default function FormCancelButton({ href, children }: { href: string, children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return <Button href={href} disabled={pending}>{children}</Button>
}