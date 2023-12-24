'use client';

import type { Folder } from '@/types/folder';
import { UpdateState, updateFolder } from '@/api/folder';
import { useFormState } from 'react-dom';
import Input from '../fields/Input';
import TextArea from '../fields/TextArea';
import Select from '../fields/Select';
import FormError from '../form/FormError';
import FormFields from '../form/FormFields';
import FormButtons from '../form/FormButtons';
import FormSubmitButton from '../form/FormSubmitButton';
import FormCancelButton from '../form/FormCancelButton';

type FormProps = {
  folder: Folder,
  folders: Folder[],
}

export default function Form({ folder, folders }: FormProps) {
  const initialState: UpdateState = { message: null, errors: {} };
  const updateFolderBinded = updateFolder.bind(null, folder);
  const [state, dispatch] = useFormState(updateFolderBinded, initialState);
  const folderOptions = folders.map((folder) => ({ value: folder.id, label: folder.title }));
  return (
    <form action={dispatch}>
      <FormFields>
        <Input name="title" value={folder.title} label="Title" errors={state.errors?.title} />
        <TextArea name="description" value={folder.description || ''} label="Description" errors={state.errors?.description} />
        <Select name="folder_id" value={folder.folder_id} label="Parent" errors={state.errors?.folder_id} options={folderOptions} />
      </FormFields>
      <FormButtons>
        <FormCancelButton href={`/folder/${folder.id}`}>Cancel</FormCancelButton>
        <FormSubmitButton>Save</FormSubmitButton>
      </FormButtons>
      <FormError message={state.message} />
    </form>
  );
}
