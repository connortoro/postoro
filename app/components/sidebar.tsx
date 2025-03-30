'use client';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCog, FaHome, FaPlus, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  const pathname = usePathname();
  const iconClass = "mr-[16px] text-xl";

  useKindeBrowserClient

  return (
    <div className="w-64 fixed left-0 top-[65px] h-[calc(100vh-65px)] p-4 border-r-[1px] border-neutral-800">
      <nav className="space-y-[1rem] flex flex-col items-start pl-[2rem]">
        <Link
          href="/home"
          className={`flex flex-row items-center text-white p-2 text-lg hover:bg-neutral-900 rounded-[20px] py-[.7rem] px-4 ${pathname === '/home' ? 'outline-1 outline-neutral-300' : ''}`}
        >
          <FaHome className={iconClass}/> Home
        </Link>
        <Link
          href="/create"
          className={`flex flex-row items-center text-white p-2 text-lg hover:bg-neutral-900 rounded-[20px] py-[.7rem] px-4 ${pathname === '/create' ? 'outline-1 outline-neutral-300' : ''}`}
        >
          <FaPlus className={iconClass}/> Create
        </Link>
        <Link
          href="/settings"
          className={`flex flex-row items-center text-white p-2 text-lg hover:bg-neutral-900 rounded-[20px] py-[.7rem] px-4 ${pathname === '/settings' ? 'outline-1 outline-neutral-300' : ''}`}
        >
          <FaCog className={iconClass}/> Settings
        </Link>
        <Link
          href="/profile"
          className={`flex flex-row items-center text-white p-2 text-lg hover:bg-neutral-900 rounded-[20px] py-[.7rem] px-4 ${pathname === '/about' ? 'outline-1 outline-neutral-300' : ''}`}
        >
          <FaUser className={iconClass}/> Profile
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
