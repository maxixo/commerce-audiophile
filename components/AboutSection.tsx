import Image from 'next/image';

export function AboutSection() {
  return (
    <section className="w-[1100px] mx-auto grid md:grid-cols-2 gap-20 items-center px-8 py-24">
      {/* Text Section */}
      <div className="max-w-md order-2 md:order-1 text-center md:text-left">
        <h2 className="text-4xl font-bold leading-snug mb-8 tracking-wide">
          BRINGING YOU THE <span className="text-orange-500">BEST</span> AUDIO GEAR
        </h2>
        <p className="text-gray-500 leading-relaxed">
          Located at the heart of New York City, Audiophile is the premier store for high end
          headphones, earphones, speakers, and audio accessories. We have a large showroom and
          luxury demonstration rooms available for you to browse and experience a wide range of
          our products. Stop by our store to meet some of the fantastic people who make Audiophile
          the best place to buy your portable audio equipment.
        </p>
      </div>

      {/* Image Section */}
      <div className="order-1 md:order-2 flex justify-center md:justify-end">
        <Image
          src="/assets/image-best-gear.jpg"
          alt="About Audiophile"
          width={540}
          height={480}
          className="rounded-lg object-cover"
        />
      </div>
    </section>
  );
}
