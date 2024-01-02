'use client';
import { downloadUserData } from '@/api/user';
import FileSaver from 'file-saver';
import { useState } from 'react';
import Button from '@/components/Button';
export default function DownloadForm() {

  const [loading, setLoading] = useState(false);

  async function downloadData() {
    setLoading(true);
    const data = await downloadUserData();
    const blob = new Blob([data], { type: 'application/json' });
    FileSaver.saveAs(blob, "wault.json");
    setLoading(false);
  }

  return <>
    <div className="rounded-md bg-gray-50 text-black p-4">
      You can download your data here.
    </div>
    <div className="mt-6 flex justify-center gap-3">
      <form action={downloadData}>
        <Button type="submit" styling='primary' loading={loading}>Download</Button>
      </form>
    </div>
  </>
}