import Image from 'next/image';


export function AboutSection() {
return (
<section className="grid md:grid-cols-2 gap-10 items-center px-8 py-20">
<div>
<h2 className="text-3xl font-bold mb-6">
BRINGING YOU THE <span className="text-orange-500">BEST</span> AUDIO GEAR
</h2>
<p className="text-gray-500 leading-relaxed">
Located at the heart of New York City, Audiophile is the premier store for high-end headphones, speakers, earphones, and audio accessories.
Visit our demo facility to experience world-class sound equipment in person.
</p>
</div>
<Image src="/images/about.jpg" alt="About Audiophile" width={540} height={320} className="rounded-lg" />
</section>
);
}