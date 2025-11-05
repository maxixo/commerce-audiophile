'use client';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa'; // ✅ changed icon import
import { useCart } from './cart/CartProvider';

export function Navbar() {
  const { openCart, count } = useCart();
  return (
    <nav className="relative flex items-center justify-between w-full bg-black text-white py-10 px-8">
      {/* Inner content container (1100px max width) */}
      <div className="flex items-center justify-between w-full max-w-[1100px] mx-auto">
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
        <button onClick={openCart} aria-label="Open cart" className="relative">
          <FaShoppingCart size={22} /> {/* ✅ replaced lucide icon */}
          {count > 0 && (
            <span className="absolute -top-2 -right-2  bg-[#DB7D4A] text-white text-[10px] leading-none px-1.5 py-1 rounded-full">
              {count}
            </span>
          )}
        </button>
      </div>

      {/* Centered line (max width 1100px) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full max-w-[1100px] h-px bg-white/20"></div>
    </nav>
  );
}

console.log("Convex URL:", process.env.NEXT_PUBLIC_CONVEX_URL);