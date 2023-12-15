'use client';

import Link from 'next/link';
import { Button } from '@/components/Button';
import { State, createVault } from '@/logic/actions';
import { useFormState } from 'react-dom';

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createVault, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter a title"
                aria-describedby="title-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            {state.errors?.title ? (
              <div
                id="title-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.title.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="description"
                name="description"
                placeholder="Enter a description"
                aria-describedby="description-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
              ></textarea>
            </div>
            {state.errors?.description ? (
              <div
                id="description-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.description.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {state.message ? (
          <div className="mt-2 text-sm text-red-500">
            <p>{state.message}</p>
          </div>
        ) : null}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/vault"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Vault</Button>
      </div>
    </form>
  );
}
