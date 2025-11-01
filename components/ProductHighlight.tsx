import Image from 'next/image';
import Link from 'next/link';
import Speaker from "./../public/assets/image-speaker-zx9.png";

export function ProductHighlight() {
  return (
    <section className="px-8 flex w-[1100px]   flex-col gap-5 mx-auto">
      
      {/* ZX9 Speaker */}
      <div className="relative h-[560px] bg-orange-500 rounded-lg text-white flex flex-col md:flex-row items-center justify-between px-10 py-16 overflow-hidden ">
        {/* Decorative Circles */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="absolute w-[400px] h-[400px] rounded-full border border-white/25"></div>
          <div className="absolute w-[600px] h-[600px] rounded-full border border-white/20"></div>
          <div className="absolute w-[800px] h-[800px] rounded-full border border-white/15"></div>
        </div>

        {/* Speaker Image */}
        <div className="relative z-10 flex justify-center md:justify-start w-full md:w-1/2">
          <Image
            src={Speaker}
            alt="ZX9 Speaker"
            width={410}
            height={493}
            className="relative mt-22 ml-10  md:mb-0 drop-shadow-2xl"
          />
        </div>

        {/* Text Section */}
        <div className="relative mr-5 mb-25 z-20 max-w-[350px] text-center md:text-left md:w-1/2">
          <h2 className="text-5xl font-bold mb-6 tracking-widest">ZX9 SPEAKER</h2>
          <p className="mb-8 leading-relaxed opacity-90">
            Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
          </p>
          <Link
            href="/products/zx9-speaker"
            className="bg-black text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-gray-900"
          >
            See Product
          </Link>
        </div>
      </div>

      {/* ZX7 Speaker */}
      <div className="relative">
        <Image
          src="/assets/image-speaker-zx7.jpg"
          alt="ZX7 Speaker"
          width={1110}
          height={560}
          className="rounded-lg"
        />
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2">
          <h3 className="text-xl font-bold mb-4">ZX7 SPEAKER</h3>
          <Link
            href="/products/zx7-speaker"
            className="border border-black px-5 py-2 text-sm uppercase tracking-widest hover:bg-black hover:text-white"
          >
            See Product
          </Link>
        </div>
      </div>

      {/* YX1 Earphones */}
      <div className="grid md:grid-cols-2 gap-6">
        <Image
          src="/assets/image-earphones-yx1.jpg"
          alt="YX1 Earphones"
          width={540}
          height={320}
          className="rounded-lg"
        />
        <div className="bg-gray-100 flex flex-col justify-center px-10 rounded-lg">
          <h3 className="text-xl font-bold mb-4">YX1 EARPHONES</h3>
          <Link
            href="/products/yx1-earphones"
            className="border border-black px-5 py-2 text-sm uppercase tracking-widest w-fit hover:bg-black hover:text-white"
          >
            See Product
          </Link>
        </div>
      </div>

    </section>
  );
}
