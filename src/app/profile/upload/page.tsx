import { Metadata } from 'next';
import Title from '@/components/Title';
import UploadForm from '@/components/profile/UploadForm';

export const metadata: Metadata = {
  title: 'Upload data',
};

export default async function Page() {
  return <>
    <div className="pt-12 mb-5">
      <Title>Upload Data</Title>
    </div>
    <UploadForm />
  </>
}
