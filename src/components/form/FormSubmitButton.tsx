
import { useFormStatus } from 'react-dom';
import Button from '@/components/Button';
export default function FormSubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return <Button type="submit" styling='primary' loading={pending}>{children}</Button>;
}