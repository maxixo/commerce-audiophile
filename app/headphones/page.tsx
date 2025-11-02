import Image from 'next/image';
import Link from 'next/link';
import { CategoryCards } from '@/components/CategoryCards';
import { AboutSection } from '@/components/AboutSection';

// ✅ Correct static import

export default function HeadphonesPage() {
  return (
    <main className="flex flex-col items-center bg-white">
      {/* Header */}
      <section className="bg-black w-full text-center text-white py-24">
        <h1 className="text-3xl font-bold tracking-widest uppercase">Headphones</h1>
      </section>

      {/* Product 1 */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-20 py-24 w-[1100px]">
        <Image src="/assets/image-xx99-mark-two-headphones.jpg" alt="XX99 Mark II" width={540} height={560} className="rounded-lg" />
        <div className="max-w-md">
          <h2 className="text-3xl font-bold uppercase mb-4">XX99 Mark II Headphones</h2>
          <p className="text-gray-500 mb-8">
            The new XX99 Mark II headphones are the pinnacle of pristine audio. Redefine your premium listening experience with
            high-fidelity sound and exceptional build quality.
          </p>
          <Link href="/products/xx99-mark-ii" className="bg-orange-500 text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-orange-600">
            See Product
          </Link>
        </div>
      </section>

      {/* Product 2 - reverse layout */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-between gap-20 py-24 w-[1100px]">
        <Image src="/assets/image-xx99-mark-one-headphones.jpg" alt="XX99 Mark I" width={540} height={560} className="rounded-lg" />
        <div className="max-w-md">
          <h2 className="text-3xl font-bold uppercase mb-4">XX99 Mark I Headphones</h2>
          <p className="text-gray-500 mb-8">
            As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles.
          </p>
          <Link href="/products/xx99-mark-i" className="bg-orange-500 text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-orange-600">
            See Product
          </Link>
        </div>
      </section>

      {/* Product 3 */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-20 py-24 w-[1100px]">
        <Image src="/assets/product/image-product.jpg" alt="XX59 Headphones" width={540} height={560} className="rounded-lg" />
        <div className="max-w-md">
          <h2 className="text-3xl font-bold uppercase mb-4">XX59 Headphones</h2>
          <p className="text-gray-500 mb-8">
            Enjoy your music with the versatile XX59 headphones. Its balanced sound and comfortable design make it perfect for daily listening.
          </p>
          <Link href="/products/xx59" className="bg-orange-500 text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-orange-600">
            See Product
          </Link>
        </div>
      </section>

      {/* Other sections */}
      <CategoryCards />
      <AboutSection />
     
    </main>
  );
}
