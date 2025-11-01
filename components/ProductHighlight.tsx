import Image from 'next/image';
import Link from 'next/link';


export function ProductHighlight() {
return (
<section className="px-8 flex flex-col gap-10">
{/* ZX9 Speaker */}
<div className="bg-orange-500 rounded-lg text-white flex flex-col md:flex-row items-center justify-between px-10 py-16">
<Image src="/images/zx9.png" alt="ZX9 Speaker" width={300} height={300} className="mb-6 md:mb-0" />
<div className="max-w-md">
<h2 className="text-4xl font-bold mb-4">ZX9 SPEAKER</h2>
<p className="mb-8 leading-relaxed">Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
<Link href="/products/zx9-speaker" className="bg-black text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-gray-900">
See Product
</Link>
</div>
</div>


{/* ZX7 Speaker */}
<div className="relative">
<Image src="/images/zx7.png" alt="ZX7 Speaker" width={1110} height={560} className="rounded-lg" />
<div className="absolute top-1/2 left-10 transform -translate-y-1/2">
<h3 className="text-xl font-bold mb-4">ZX7 SPEAKER</h3>
<Link href="/products/zx7-speaker" className="border border-black px-5 py-2 text-sm uppercase tracking-widest hover:bg-black hover:text-white">
See Product
</Link>
</div>
</div>


{/* YX1 Earphones */}
<div className="grid md:grid-cols-2 gap-6">
<Image src="/images/yx1.png" alt="YX1 Earphones" width={540} height={320} className="rounded-lg" />
<div className="bg-gray-100 flex flex-col justify-center px-10 rounded-lg">
<h3 className="text-xl font-bold mb-4">YX1 EARPHONES</h3>
<Link href="/products/yx1-earphones" className="border border-black px-5 py-2 text-sm uppercase tracking-widest w-fit hover:bg-black hover:text-white">
See Product
</Link>
</div>
</div>
</section>
);
}