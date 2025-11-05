import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-10 mt-20">
      <div className="max-w-[1100px] mx-auto px-6 flex flex-col items-center text-center md:text-left md:items-start">
        {/* Orange top bar */}
        <div className="w-24 h-1 bg-[#D87D4A] mb-10 md:mb-8"></div>

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold mb-8 md:mb-6 uppercase tracking-wide"
        >
          audiophile
        </Link>

        {/* Navigation Links */}
        <ul
          className="
            flex flex-col md:flex-row
            items-center md:items-start
            gap-4 md:gap-8
            text-sm uppercase tracking-widest
            text-gray-300 mb-8 md:mb-10
          "
        >
          <li>
            <Link href="/" className="hover:text-[#D87D4A] transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/headphones" className="hover:text-[#D87D4A] transition">
              Headphones
            </Link>
          </li>
          <li>
            <Link href="/speakers" className="hover:text-[#D87D4A] transition">
              Speakers
            </Link>
          </li>
          <li>
            <Link href="/earphones" className="hover:text-[#D87D4A] transition">
              Earphones
            </Link>
          </li>
        </ul>

        {/* Description */}
        <p
          className="
            text-gray-400 text-[15px] leading-relaxed
            max-w-[500px] mx-auto md:mx-0 mb-10 md:mb-12
          "
        >
          Audiophile is an all-in-one stop to fulfill your audio needs. We’re a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility – we’re open 7 days a week.
        </p>

        {/* Bottom Section: Copyright + Icons */}
        <div
          className="
            flex flex-col md:flex-row
            justify-between items-center
            w-full gap-6
          "
        >
          <p className="text-gray-600 text-xs">
            Copyright 2025. All Rights Reserved
          </p>

          <div className="flex gap-5 text-gray-300">
            <FaFacebook className="w-5 h-5 cursor-pointer hover:text-[#D87D4A]" />
            <FaTwitter className="w-5 h-5 cursor-pointer hover:text-[#D87D4A]" />
            <FaInstagram className="w-5 h-5 cursor-pointer hover:text-[#D87D4A]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
