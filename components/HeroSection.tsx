import Image from "next/image";
import Link from "next/link";
import heroImage from './../public/assets/image-hero.jpg'; // Adjust path as needed


export function HeroSection() {
  return (
    <section className="bg-black text-white w-full flex justify-center">
      {/* Centered content container */}
      <div className="relative flex flex-col md:flex-row items-center justify-between max-w-[1100px] w-full px-8 py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-15">
          <Image
            src={heroImage}
            alt="Hero Background"
            fill
            priority
            className="object-cover h-40 w-40 object-center opacity-90"
          />
        </div>

        {/* Left Text Section */}
        <div className="max-w-lg z-50 text-center md:text-left">
          <p className="uppercase text-gray-400 tracking-widest mb-4">New Product</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            XX99 MARK II HEADPHONES
          </h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
          </p>
          <Link
            href="/products/xx99-mark-ii"
            className="bg-orange-500 px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-orange-600"
          >
            See Product
          </Link>
        </div>
      </div>
    </section>
  );
}
