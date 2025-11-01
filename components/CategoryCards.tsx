import Image from 'next/image';
import Link from 'next/link';

import Headphone from "./../public/assets/image-category-thumbnail-headphones.png";
import Speaker from "./../public/assets/image-category-thumbnail-speakers.png";
import Earphones from "./../public/assets/image-category-thumbnail-earphones.png";

const categories = [
  { name: 'Headphones', image: Headphone, link: '/headphones' },
  { name: 'Speakers', image: Speaker, link: '/speakers' },
  { name: 'Earphones', image: Earphones, link: '/earphones' },
];

export function CategoryCards() {
  return (
    <section className="flex w-[1100px] flex-col md:flex-row justify-between gap-6 px-8 py-20 bg-white mx-auto">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="relative flex flex-col items-center bg-gray-100 rounded-lg pt-16 pb-8 w-[350px]"
        >
          {/* Image positioned to overlap upward */}
          <div className="absolute -top-10">
            <Image
              src={cat.image}
              alt={cat.name}
              width={120}
              height={120}
              className="drop-shadow-lg"
            />
          </div>

          <h3 className="mt-10 text-sm font-bold uppercase">{cat.name}</h3>
          <Link
            href={cat.link}
            className="text-gray-400 text-xs uppercase mt-2 tracking-wider hover:text-orange-500"
          >
            Shop →
          </Link>
        </div>
      ))}
    </section>
  );
}
