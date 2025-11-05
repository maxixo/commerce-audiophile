import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

import Headphone from "./../public/assets/image-category-thumbnail-headphones.png";
import Speaker from "./../public/assets/image-category-thumbnail-speakers.png";
import Earphones from "./../public/assets/image-category-thumbnail-earphones.png";

const categories = [
  { name: "Headphones", image: Headphone, link: "/headphones" },
  { name: "Speakers", image: Speaker, link: "/speakers" },
  { name: "Earphones", image: Earphones, link: "/earphones" },
];

export function CategoryCards() {
  return (
    <section
      className="
        flex flex-col md:flex-row
        justify-center md:justify-between
        items-center md:items-end
        w-full max-w-[1100px] mx-auto
        px-4 py-16 gap-6
      "
    >
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="
            relative flex flex-col items-center justify-end
            bg-gray-100 rounded-lg
            w-full md:w-[32%] lg:w-[340px]
            h-[200px] sm:h-[190px] md:h-[204px]
            pt-16 pb-8
            transition-all duration-300
            hover:shadow-lg hover:scale-[1.02]
          "
        >
          {/* Floating image */}
          <div className="absolute -top-10">
            <Image
              src={cat.image}
              alt={cat.name}
              width={120}
              height={150}
              className="drop-shadow-lg object-contain"
            />
          </div>

          {/* Category name */}
          <h3 className="mt-10 text-sm md:text-base text-center text-black font-bold uppercase tracking-wider">
            {cat.name}
          </h3>

          {/* Shop link */}
          <Link
            href={cat.link}
            className="
              flex items-center justify-center
              text-gray-500 text-xs md:text-sm uppercase mt-2
              tracking-wide hover:text-orange-500 transition-colors
            "
          >
            Shop
            <MdKeyboardArrowRight className="ml-1 text-lg" />
          </Link>
        </div>
      ))}
    </section>
  );
}
