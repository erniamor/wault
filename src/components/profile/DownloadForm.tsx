'use client';
import { downloadUserData } from '@/api/user';
import FileSaver from 'file-saver';
import { useServerAction } from '@/hooks/useServerAction';
import Button from '@/components/Button';
import FormButtons from '../form/FormButtons';
import dayjs from 'dayjs';
export default function DownloadForm() {

  const [runAction, loading] = useServerAction(downloadUserData);
  const onSubmit = async (formData: FormData) => {
    const data = await runAction(formData);
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const filenameWithDate = `wault-${dayjs().format('YYYY-MM-DD_HH:mm:ss')}.json`;
      FileSaver.saveAs(blob, filenameWithDate);
    }
  };

  return <>
    <div className="rounded-md bg-gray-50 text-black p-4 text-center">
      You can download your data here.
    </div>
    <form action={onSubmit}>
      <FormButtons>
        <Button href={`/profile`} disabled={loading}>Cancel</Button>
        <Button type="submit" styling='primary' loading={loading}>Download</Button>
      </FormButtons>
    </form>
  </>
}