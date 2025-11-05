import Image from "next/image";
import Link from "next/link";
import { CategoryCards } from "@/components/CategoryCards";
import { AboutSection } from "@/components/AboutSection";

export default function HeadphonesPage() {
  return (
    <main className="flex flex-col items-center bg-white">
      {/* ===== Header ===== */}
      <section className="bg-black w-full text-center text-white py-20 sm:py-28">
        <h1 className="text-[28px] sm:text-[36px] md:text-[40px] font-bold tracking-[6px] uppercase">
          Headphones
        </h1>
      </section>

      {/* ===== Product 1 ===== */}
      <section
        className="
          flex flex-col md:flex-row
          items-center justify-between
          gap-12 md:gap-20
          px-6 sm:px-8 md:px-10
          py-20 md:py-24
          w-full max-w-[1100px]
        "
      >
        <div className="w-full md:w-1/2">
          <Image
            src="/assets/image-xx99-mark-two-headphones.jpg"
            alt="XX99 Mark II"
            width={540}
            height={560}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          <p className="text-[#D87D4A] tracking-[8px] text-sm uppercase mb-4">
            New Product
          </p>
          <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold uppercase mb-6 leading-snug">
            XX99 Mark II Headphones
          </h2>
          <p className="text-gray-500 mb-8 text-[15px] leading-relaxed px-2 md:px-0">
            The new XX99 Mark II headphones are the pinnacle of pristine audio.
            Redefine your premium listening experience with high-fidelity sound
            and exceptional build quality.
          </p>
          <Link
            href="/products/xx99-mark-ii"
            className="bg-[#D87D4A] text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-[#FBAF85] transition"
          >
            See Product
          </Link>
        </div>
      </section>

      {/* ===== Product 2 ===== */}
      <section
        className="
          flex flex-col md:flex-row-reverse
          items-center justify-between
          gap-12 md:gap-20
          px-6 sm:px-8 md:px-10
          py-20 md:py-24
          w-full max-w-[1100px]
        "
      >
        <div className="w-full md:w-1/2">
          <Image
            src="/assets/image-xx99-mark-one-headphones.jpg"
            alt="XX99 Mark I"
            width={540}
            height={560}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold uppercase mb-6 leading-snug">
            XX99 Mark I Headphones
          </h2>
          <p className="text-gray-500 mb-8 text-[15px] leading-relaxed px-2 md:px-0">
            As the gold standard for headphones, the classic XX99 Mark I offers
            detailed and accurate audio reproduction for audiophiles.
          </p>
          <Link
            href="/products/xx99-mark-i"
            className="bg-[#D87D4A] text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-[#FBAF85] transition"
          >
            See Product
          </Link>
        </div>
      </section>

      {/* ===== Product 3 ===== */}
      <section
        className="
          flex flex-col md:flex-row
          items-center justify-between
          gap-12 md:gap-20
          px-6 sm:px-8 md:px-10
          py-20 md:py-24
          w-full max-w-[1100px]
        "
      >
        <div className="w-full md:w-1/2">
          <Image
            src="/assets/product/image-product.jpg"
            alt="XX59 Headphones"
            width={540}
            height={560}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold uppercase mb-6 leading-snug">
            XX59 Headphones
          </h2>
          <p className="text-gray-500 mb-8 text-[15px] leading-relaxed px-2 md:px-0">
            Enjoy your music with the versatile XX59 headphones. Its balanced
            sound and comfortable design make it perfect for daily listening.
          </p>
          <Link
            href="/products/xx59"
            className="bg-[#D87D4A] text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-[#FBAF85] transition"
          >
            See Product
          </Link>
        </div>
      </section>

      {/* ===== Category Cards + About ===== */}
      <div className="w-full px-6 sm:px-8 md:px-10">
        <CategoryCards />
        <AboutSection />
      </div>
    </main>
  );
}
