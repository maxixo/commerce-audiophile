import Image from 'next/image';
import Link from 'next/link';
import { CategoryCards } from '@/components/CategoryCards';
import { AboutSection } from '@/components/AboutSection';

export default function EarphonesPage() {
  return (
    <main className="flex flex-col items-center bg-white">
      {/* Header */}
      <section className="bg-black w-full text-center text-white py-24">
        <h1 className="text-3xl font-bold tracking-widest uppercase">Earphones</h1>
      </section>

      {/* YX1 Earphones */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-20 py-24 w-[1100px]">
        <Image
          src="/assets/image-earphones-yx1.jpg"
          alt="YX1 Earphones"
          width={540}
          height={560}
          className="rounded-lg object-cover"
        />
        <div className="max-w-md">
          <h2 className="text-3xl font-bold uppercase mb-4">YX1 Earphones</h2>
          <p className="text-gray-500 mb-8">
            Experience detail and clarity with compact, comfortable earphones built for everyday listening and on-the-go convenience.
          </p>
          <Link href="/products/yx1-earphones" className="bg-orange-500 text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-orange-600">
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
