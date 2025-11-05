import Image from "next/image";
import Link from "next/link";
import { CategoryCards } from "@/components/CategoryCards";
import { AboutSection } from "@/components/AboutSection";

export default function EarphonesPage() {
  return (
    <main className="flex flex-col items-center bg-white">
      {/* ===== Header ===== */}
      <section className="bg-black w-full text-center text-white py-20 sm:py-28">
        <h1 className="text-[28px] sm:text-[36px] md:text-[40px] font-bold tracking-[6px] uppercase">
          Earphones
        </h1>
      </section>

      {/* ===== YX1 Earphones ===== */}
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
        {/* Image */}
        <div className="w-full md:w-1/2">
          <Image
            src="/assets/image-earphones-yx1.jpg"
            alt="YX1 Earphones"
            width={540}
            height={560}
            className="rounded-lg w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold uppercase mb-6 leading-snug">
            YX1 Earphones
          </h2>
          <p className="text-gray-500 mb-8 text-[15px] leading-relaxed px-2 md:px-0">
            Experience detail and clarity with compact, comfortable earphones
            built for everyday listening and on-the-go convenience.
          </p>
          <Link
            href="/products/yx1-earphones"
            className="bg-[#D87D4A] text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-[#FBAF85] transition"
          >
            See Product
          </Link>
        </div>
      </section>

      {/* ===== Shared Sections ===== */}
      <div className="w-full px-6 sm:px-8 md:px-10">
        <CategoryCards />
        <AboutSection />
      </div>
    </main>
  );
}
