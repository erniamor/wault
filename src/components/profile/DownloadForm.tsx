'use client';
import { downloadUserData } from '@/api/user';
import FileSaver from 'file-saver';
import { useServerAction } from '@/hooks/useServerAction';
import Button from '@/components/Button';
export default function DownloadForm() {

  const [runAction, loading] = useServerAction(downloadUserData);
  const onSubmit = async (formData: FormData) => {
    const data = await runAction(formData);
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      FileSaver.saveAs(blob, "wault.json");
    }
  };

  return <>
    <div className="rounded-md bg-gray-50 text-black p-4">
      You can download your data here.
    </div>
    <div className="mt-6 flex justify-center gap-3">
      <form action={onSubmit}>
        <Button type="submit" styling='primary' loading={loading}>Download</Button>
      </form>
    </div>
  </>
}