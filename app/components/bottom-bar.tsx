'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCog, FaHome, FaPlus, FaUser } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';

type sidebarProps = {
  username: string
}

const BottomBar = ({username}: sidebarProps) => {

  const pathname = usePathname();
  const iconClass = "text-xl";

  return (
    <div className="fixed left-0 bottom-[-1rem] py-[10px] w-full border-t-[1px] border-neutral-800 bg-neutral-950">
      <nav className="space-y-[1rem] flex flex-row items-start justify-between px-[1rem]">
        <Link
          href="/app/home"
          className={`flex flex-row items-center text-neutral-200 p-2 text-lg hover:bg-neutral-900 rounded-[20px] py-[.7rem] px-4 ${pathname === '/app/home' ? 'outline-1 outline-neutral-300' : ''}`}
        >
          <FaHome className={iconClass}/>
        </Link>
        <Link
          href="/app/search"
          className={`flex flex-row items-center text-neutral-200 p-2 text-lg hover:bg-neutral-900 rounded-[20px] py-[.7rem] px-4 ${pathname === '/app/search' ? 'outline-1 outline-neutral-300' : ''}`}
        >
          <FaMagnifyingGlass className={iconClass}/>
        </Link>
        <Link
          href="/app/create"
          className={`flex flex-row items-center text-neutral-200 p-2 text-lg hover:bg-neutral-900 rounded-[20px] py-[.7rem] px-4 ${pathname === '/app/create' ? 'outline-1 outline-neutral-300' : ''}`}
        >
          <FaPlus className={iconClass}/>
        </Link>
        <Link
          href="/app/settings"
          className={`flex flex-row items-center text-neutral-200 p-2 text-lg hover:bg-neutral-900 rounded-[20px] py-[.7rem] px-4 ${pathname === '/app/settings' ? 'outline-1 outline-neutral-300' : ''}`}
        >
          <FaCog className={iconClass}/>
        </Link>
        <Link
          href={`/app/profile/${username}`}
          className={`flex flex-row items-center text-neutral-200 p-2 text-lg hover:bg-neutral-900 rounded-[20px] py-[.7rem] px-4 ${pathname === '/app/about' ? 'outline-1 outline-neutral-300' : ''}`}
        >
          <FaUser className={iconClass}/>
        </Link>
      </nav>
    </div>
  );
};

export default BottomBar;
