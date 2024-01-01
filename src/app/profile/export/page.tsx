import { Metadata } from 'next';
import Title from '@/components/Title';
import ExportForm from '@/components/profile/ExportForm';

export const metadata: Metadata = {
  title: 'Export data',
};

export default async function Page() {
  return <>
    <div className="pt-12 mb-5">
      <Title>Export Data</Title>
    </div>
    <ExportForm />
  </>
}
