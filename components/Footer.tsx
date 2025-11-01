import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';


export function Footer() {
return (
<footer className="bg-black text-white px-8 py-16 mt-20">
<div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-8">
<Link href="/" className="text-2xl font-bold mb-6 md:mb-0">audiophile</Link>
<ul className="flex gap-8 text-sm uppercase tracking-widest">
<li><Link href="/">Home</Link></li>
<li><Link href="/headphones">Headphones</Link></li>
<li><Link href="/speakers">Speakers</Link></li>
<li><Link href="/earphones">Earphones</Link></li>
</ul>
</div>


<div className="flex flex-col md:flex-row justify-between items-center mt-8">
<p className="text-gray-400 max-w-md text-sm">
Audiophile is an all-in-one stop to fulfill your audio needs. Come and visit our demo facility to get the most out of personal audio.
</p>
<div className="flex gap-4 mt-6 md:mt-0">
<Facebook className="cursor-pointer hover:text-orange-500" />
<Twitter className="cursor-pointer hover:text-orange-500" />
<Instagram className="cursor-pointer hover:text-orange-500" />
</div>
</div>


<p className="text-gray-600 text-xs mt-10">© 2025 Audiophile. All Rights Reserved.</p>
</footer>
);
}