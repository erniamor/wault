import { Metadata } from 'next';
import { auth } from "@/auth";
import Button from '@/components/Button';
import Title from '@/components/Title';
import { logout } from '@/api/user';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function Page() {
  const session = await auth()
  return <>
    <div className="pt-12 mb-5">
      <Title>Profile</Title>
    </div>
    <div className="rounded-md bg-gray-50 text-black p-4">
      {session
        ? <div>
          <div>
            You are connected as <span className='font-bold'>{session.user?.name}.</span>
          </div>
          <div>
            Your email is <span className='font-bold'>{session.user?.email}.</span>
          </div>
        </div>
        : <div>You are not logged in</div>}
    </div>
    <div className="mt-6 flex justify-center gap-3">
      <form action={logout}>
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  </>
}
