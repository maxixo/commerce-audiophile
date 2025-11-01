import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 mt-20">
      {/* Main Container */}
      <div className="w-[1100px] mx-auto px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-8">
          <Link href="/" className="text-2xl font-bold mb-6 md:mb-0">
            audiophile
          </Link>
          <ul className="flex gap-8 text-sm uppercase tracking-widest text-gray-300">
            <li><Link href="/" className="hover:text-orange-500">Home</Link></li>
            <li><Link href="/headphones" className="hover:text-orange-500">Headphones</Link></li>
            <li><Link href="/speakers" className="hover:text-orange-500">Speakers</Link></li>
            <li><Link href="/earphones" className="hover:text-orange-500">Earphones</Link></li>
          </ul>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-6 text-center md:text-left">
          <p className="text-gray-400 max-w-md text-sm leading-relaxed">
            Audiophile is an all-in-one stop to fulfill your audio needs. Come and visit our demo
            facility to get the most out of personal audio.
          </p>
          <div className="flex gap-5 text-gray-300">
            <Facebook className="cursor-pointer hover:text-orange-500" />
            <Twitter className="cursor-pointer hover:text-orange-500" />
            <Instagram className="cursor-pointer hover:text-orange-500" />
          </div>
        </div>

        {/* Bottom Section */}
        <p className="text-gray-600 text-xs mt-10 text-center md:text-left">
          © 2025 Audiophile. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
