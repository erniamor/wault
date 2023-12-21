import { auth } from "../auth"
import HeaderNav from './HeaderNav';
import HeaderLogo from './HeaderLogo';

export default async function Header() {
  const session = await auth()
  return (
    <div className="w-full p-4 bg-gray-800">
      <div className="w-full flex flex-row items-center justify-between ">
        <HeaderLogo />
        {session && <HeaderNav />}
      </div>
    </div >
  );
}