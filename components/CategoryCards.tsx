import Image from 'next/image';
import Link from 'next/link';


const categories = [
{ name: 'Headphones', image: '/images/hero-headphone', link: '/headphones' },
{ name: 'Speakers', image: '/images/zx9.png', link: '/speakers' },
{ name: 'Earphones', image: '/images/yx1.png', link: '/earphones' },
];


export function CategoryCards() {
return (
<section className="flex flex-col md:flex-row justify-center gap-6 px-8 py-20 bg-white">
{categories.map((cat) => (
<div key={cat.name} className="flex flex-col items-center bg-gray-100 rounded-lg py-8 w-full md:w-1/4">
<Image src={cat.image} alt={cat.name} width={120} height={120} />
<h3 className="mt-6 text-sm font-bold uppercase">{cat.name}</h3>
<Link href={cat.link} className="text-gray-400 text-xs uppercase mt-2 tracking-wider hover:text-orange-500">
Shop →
</Link>
</div>
))}
</section>
);
}