import Image from "next/image";
import Link from "next/link";
import Speaker from "./../public/assets/image-speaker-zx9.png";

export function ProductHighlight() {
  return (
    <section className="flex flex-col w-full max-w-[1100px] mx-auto px-6 py-20 gap-6">
      {/* ===== ZX9 SPEAKER ===== */}
      <div className="relative bg-[#D87D4A] rounded-lg text-white flex flex-col items-center justify-center overflow-hidden py-16 px-6 text-center md:flex-row md:text-left md:justify-between md:px-20 md:py-20">
        {/* Decorative circles */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full border border-white/25"></div>
          <div className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full border border-white/20"></div>
          <div className="absolute w-[550px] h-[550px] sm:w-[800px] sm:h-[800px] rounded-full border border-white/15"></div>
        </div>

        {/* Image */}
        <div className="relative z-10 flex justify-center md:justify-start">
          <Image
            src={Speaker}
            alt="ZX9 Speaker"
            width={200}
            height={240}
            className="md:w-[410px] md:h-[493px] drop-shadow-2xl mb-8 md:mb-0"
          />
        </div>

        {/* Text */}
        <div className="relative z-20 max-w-[350px] md:ml-10">
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold mb-6 leading-tight tracking-widest">
            ZX9 SPEAKER
          </h2>
          <p className="mb-8 leading-relaxed text-white/90">
            Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
          </p>
          <Link
            href="/products/zx9-speaker"
            className="bg-black text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-gray-900 transition"
          >
            See Product
          </Link>
        </div>
      </div>

      {/* ===== ZX7 SPEAKER ===== */}
      <div className="relative rounded-lg sm:h-[500px] overflow-hidden">
        <Image
          src="/assets/image-speaker-zx7.jpg"
          alt="ZX7 Speaker"
          width={1110}
          height={560}
          className="w-full h-80 sm:h-[500px] object-cover"
        />
        <div className="absolute top-1/2 left-6 sm:left-12 transform -translate-y-1/2">
          <h3 className="text-[28px] font-bold text-black mb-6 tracking-wider">
            ZX7 SPEAKER
          </h3>
          <Link
            href="/products/zx7-speaker"
            className="border border-black px-5 py-2.5 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition"
          >
            See Product
          </Link>
        </div>
      </div>

      {/* ===== YX1 EARPHONES ===== */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6">
        <div>
          <Image
            src="/assets/image-earphones-yx1.jpg"
            alt="YX1 Earphones"
            width={540}
            height={320}
            className="w-full h-[200px] sm:h-[320px] object-cover rounded-lg"
          />
        </div>

        <div className="bg-gray-100 rounded-lg flex flex-col justify-center px-6 sm:px-12 py-10">
          <h3 className="text-[28px] font-bold text-black mb-6 tracking-wider">
            YX1 EARPHONES
          </h3>
          <Link
            href="/products/yx1-earphones"
            className="border border-black px-6 py-3 text-sm uppercase tracking-widest w-fit hover:bg-black hover:text-white transition"
          >
            See Product
          </Link>
        </div>
      </div>
    </section>
  );
}
