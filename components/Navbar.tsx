'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="relative flex items-center justify-between w-full bg-black text-white py-10 px-8">
      {/* Inner content container (1100px max width) */}
      <div className="flex items-center  justify-between w-full max-w-[1100px] mx-auto">
        {/* Left Section */}
        <div className="flex items-center gap-15">
          <Link href="/" className="text-xl font-bold tracking-wide">
            audiophile
          </Link>
          <ul className="hidden md:flex ml-40 gap-8 w-[429px] text-sm uppercase tracking-widest">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/headphones">Headphones</Link></li>
            <li><Link href="/speakers">Speakers</Link></li>
            <li><Link href="/earphones">Earphones</Link></li>
          </ul>
        </div>

        {/* Cart Icon */}
        <ShoppingCart size={22} />
      </div>

      {/* Centered line (max width 1100px) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full max-w-[1100px] h-[1px] bg-white/20"></div>
    </nav>
  );
}
