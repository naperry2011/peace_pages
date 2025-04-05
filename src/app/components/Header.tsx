'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
  const pathname = usePathname();
  
  return (
    <header className="w-full py-4 px-6 md:px-10 bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-indigo-600">Peace & Pages</h1>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          <Link 
            href="/" 
            className={`transition-colors ${pathname === '/' ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-500'}`}
          >
            Home
          </Link>
          <Link 
            href="/library" 
            className={`transition-colors ${pathname === '/library' ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-500'}`}
          >
            Library
          </Link>
          <Link 
            href="/login" 
            className={`transition-colors ${pathname === '/login' ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-500'}`}
          >
            Login
          </Link>
        </nav>
        
        <button className="md:hidden text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header; 