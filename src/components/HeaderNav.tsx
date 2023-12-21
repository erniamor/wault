import { FaFolderOpen } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import HeaderNavLink from './HeaderNavLink';

export default function HeaderNav() {
  const activeClass = 'text-white';
  const inactiveClass = 'text-slate-400';
  return (
    <div className='flex flex-row gap-5 text-white'>
      <HeaderNavLink href={`/folder`} activeClass={activeClass} inactiveClass={inactiveClass}><FaFolderOpen size={24} /></HeaderNavLink>
      <HeaderNavLink href={`/search`} activeClass={activeClass} inactiveClass={inactiveClass}><FaSearch size={24} /></HeaderNavLink>
      <HeaderNavLink href={`/profile`} activeClass={activeClass} inactiveClass={inactiveClass}><FaCircleUser size={24} /></HeaderNavLink>
    </div>
  );
}

