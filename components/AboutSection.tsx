import Image from "next/image";

export function AboutSection() {
  return (
    <section
      className="
        flex flex-col-reverse md:grid md:grid-cols-2
        items-center justify-center
        gap-10 md:gap-20
        w-full max-w-[1100px] mx-auto
        px-6 sm:px-5 md:px-8
        py-20 md:py-32
      "
    >
      {/* ===== Text Section ===== */}
      <div className="text-center md:text-left md:max-w-md">
        <h2
          className="
            text-[28px] sm:text-[32px] md:text-[40px]
            font-bold leading-snug tracking-wide
            mb-6 sm:mb-8
          "
        >
          BRINGING YOU THE{" "}
          <span className="text-[#D87D4A]">BEST</span> AUDIO GEAR
        </h2>

        <p
          className="
            text-gray-500 text-[15px] leading-relaxed
            max-w-[90%] mx-auto md:mx-0
          "
        >
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>

      {/* ===== Image Section ===== */}
      <div className="flex justify-center md:justify-end">
        <Image
          src="/assets/image-best-gear.jpg"
          alt="Man listening to music"
          width={540}
          height={480}
          className="
            w-full xs:w-[500px] h-auto rounded-lg object-cover
            mb-10 md:mb-0
          "
          priority
        />
      </div>
    </section>
  );
}
