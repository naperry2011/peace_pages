'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="w-full py-4 px-6 md:px-10 bg-[#482836] shadow-md relative z-30">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-12 w-12 md:h-14 md:w-14">
            <Image 
              src="/logo.png" 
              alt="Peace & Pages Logo" 
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white font-['Quicksand',sans-serif] drop-shadow-sm">Peace & Pages</h1>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          <Link 
            href="/" 
            className={`transition-colors font-['Quicksand',sans-serif] ${pathname === '/' ? 'text-white font-medium' : 'text-white hover:text-[#F7E8D4]'}`}
          >
            Home
          </Link>
          <Link 
            href="/library" 
            className={`transition-colors font-['Quicksand',sans-serif] ${pathname === '/library' ? 'text-white font-medium' : 'text-white hover:text-[#F7E8D4]'}`}
          >
            Library
          </Link>
          <Link 
            href="/login" 
            className={`transition-colors font-['Quicksand',sans-serif] ${pathname === '/login' ? 'text-white font-medium' : 'text-white hover:text-[#F7E8D4]'}`}
          >
            Login
          </Link>
        </nav>
        
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#482836] border-t border-[#764E5A] shadow-lg z-20 animate-fadeIn">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className={`py-2 px-4 rounded-md transition-colors font-['Quicksand',sans-serif] ${
                  pathname === '/' 
                    ? 'bg-[#764E5A] text-white font-medium' 
                    : 'text-white hover:bg-[#764E5A]/50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/library" 
                className={`py-2 px-4 rounded-md transition-colors font-['Quicksand',sans-serif] ${
                  pathname === '/library' 
                    ? 'bg-[#764E5A] text-white font-medium' 
                    : 'text-white hover:bg-[#764E5A]/50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Library
              </Link>
              <Link 
                href="/login" 
                className={`py-2 px-4 rounded-md transition-colors font-['Quicksand',sans-serif] ${
                  pathname === '/login' 
                    ? 'bg-[#764E5A] text-white font-medium' 
                    : 'text-white hover:bg-[#764E5A]/50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 