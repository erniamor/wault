'use client';

import { UploadUserDataState, uploadUserData } from '@/api/user';
import Input from '../fields/Input';
import FormError from '../form/FormError';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';
import Button from '@/components/Button';
import { useState } from 'react';
import { useServerAction } from '@/hooks/useServerAction';
import { FaCheckCircle } from "react-icons/fa";


export default function UploadForm() {
  const [result, setResult] = useState<UploadUserDataState | null>(null);
  const [runAction, loading] = useServerAction(uploadUserData);
  const onSubmit = async (formData: FormData) => {
    const result = await runAction(formData);
    if (result) setResult(result);
  };
  return (
    result?.success
      ? <UploadSuccess result={result} />
      : <Form handleSubmit={onSubmit} loading={loading} result={result} />

  );
}

function Form({ handleSubmit, loading, result }: { handleSubmit: (formData: FormData) => void, loading: boolean, result: UploadUserDataState | null }) {
  return <form action={handleSubmit}>
    <FormFields>
      <p className="text-black text-center">Please select a JSON file to upload.</p>
      <Input name="file" label="File" type="file" accept="application/json" errors={result?.errors?.file} />
    </FormFields>
    <FormButtons>
      <Button href={`/profile`} disabled={loading}>Cancel</Button>
      <Button type="submit" styling='primary' loading={loading}>Upload</Button>
    </FormButtons>
    {result?.message && <FormError message={result?.message} />}
  </form>
}

function UploadSuccess({ result }: { result: UploadUserDataState }) {
  return <>
    <div className="rounded-md bg-gray-50 text-black p-4">
      <div className="flex items-center gap-2 mb-4">
        <FaCheckCircle size={20} className="text-green-500" />
        <div>Data uploaded successfully.</div>
      </div>
      <p>
        <strong>Created folders:</strong> {result.createdFolders} <br />
        <strong>Updated folders:</strong> {result.updatedFolders} <br />
        <strong>Created notes:</strong> {result.createdNotes} <br />
        <strong>Updated notes:</strong> {result.updatedNotes}
      </p>
    </div>
    <div className="mt-6 flex justify-center gap-3">
      <Button href={`/folder`}>Back to Root</Button>
    </div>
  </>
}