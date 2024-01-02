import { Metadata } from 'next';
import Title from '@/components/Title';
import DownloadForm from '@/components/profile/DownloadForm';

export const metadata: Metadata = {
  title: 'Download Data',
};

export default async function Page() {
  return <>
    <div className="pt-12 mb-5">
      <Title>Download Data</Title>
    </div>
    <DownloadForm />
  </>
}
