import Button from '@/components/Button';

export default function NoteUrl({ url }: { url: string }) {
  return <div>
    <Button href={url} styling="primary">Follow the link</Button>
    <p className="text-xs text-slate-200 italic mt-1 truncate text-center">{url}</p>
  </div>
}