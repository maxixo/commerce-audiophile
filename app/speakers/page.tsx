import Image from 'next/image';
import Link from 'next/link';
import { CategoryCards } from '@/components/CategoryCards';
import { AboutSection } from '@/components/AboutSection';

export default function SpeakersPage() {
  return (
    <main className="flex flex-col items-center bg-white">
      {/* Header */}
      <section className="bg-black w-full text-center text-white py-24">
        <h1 className="text-3xl font-bold tracking-widest uppercase">Speakers</h1>
      </section>

      {/* ZX9 Speaker */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-20 py-24 w-[1100px]">
        <Image
          src="/assets/image-zx9-speaker.jpg"
          alt="ZX9 Speaker"
          width={540}
          height={560}
          className="rounded-lg"
        />
        <div className="max-w-md">
          <h2 className="text-3xl font-bold uppercase mb-4">ZX9 Speaker</h2>
          <p className="text-gray-500 mb-8">
            Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
          </p>
          <Link href="/products/zx9-speaker" className="bg-orange-500 text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-orange-600">
            See Product
          </Link>
        </div>
      </section>

      {/* ZX7 Speaker - reverse layout */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-between gap-20 py-24 w-[1100px]">
        <Image
          src="/assets/image-zx7-speaker.jpg"
          alt="ZX7 Speaker"
          width={540}
          height={560} 
          className="rounded-lg"
        />
        <div className="max-w-md">
          <h2 className="text-3xl font-bold uppercase mb-4">ZX7 Speaker</h2>
          <p className="text-gray-500 mb-8">
            Streamlined design with rich, room-filling sound for both music and movies.
          </p>
          <Link href="/products/zx7-speaker" className="bg-orange-500 text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-orange-600">
            See Product
          </Link>
        </div>
      </section>

      {/* Common sections */}
      <CategoryCards />
      <AboutSection />
    </main>
  );
}
