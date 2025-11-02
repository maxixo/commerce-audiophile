import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryCards } from "@/components/CategoryCards";
import { AboutSection } from "@/components/AboutSection";
import AddToCartControls from "@/components/AddToCartControls";

// Enable dynamic static generation for product pages
export const dynamicParams = true;

// ---------- Types ----------
type Product = {
  slug: string;
  name: string;
  category: "Headphones" | "Speakers" | "Earphones";
  description: string;
  price: number;
  image: string;
  features: string;
  inBox: { qty: number; item: string }[];
  gallery: string[];
  related: { name: string; slug: string; image: string }[];
};

// ---------- Product Data ----------
const PRODUCTS: Record<string, Product> = {
  "xx99-mark-ii": {
    slug: "xx99-mark-ii",
    name: "XX99 Mark II Headphones",
    category: "Headphones",
    description:
      "The pinnacle of pristine audio with high-fidelity sound and exceptional build quality for the discerning listener.",
    price: 2999,
    image: "/assets/product/xx99-mark-two-headphones/image-product.jpg",
    features:
      "Featuring a new, improved driver unit that delivers crystal-clear highs and powerful lows. The reinforced headband and plush ear cushions ensure comfort during long listening sessions.",
    inBox: [
      { qty: 1, item: "Hard travel case" },
      { qty: 1, item: "User manual" },
      { qty: 1, item: "3.5mm cable" },
      { qty: 1, item: "6.5mm adapter" },
    ],
    gallery: [
      "/assets/product/xx99-mark-two-headphones/image-gallery-1.jpg",
      "/assets/product/xx99-mark-two-headphones/image-gallery-2.jpg",
      "/assets/product/xx99-mark-two-headphones/image-gallery-3.jpg",
    ],
    related: [
      {
        name: "XX99 Mark I",
        slug: "xx99-mark-i",
        image: "/assets/product/xx99-mark-one-headphones/image-category-page-preview.jpg",
      },
      {
        name: "ZX9 Speaker",
        slug: "zx9-speaker",
        image: "/assets/product/zx9-speaker/image-category-page-preview.jpg",
      },
      {
        name: "YX1 Earphones",
        slug: "yx1-earphones",
        image: "/assets/product/yx1-earphones/image-category-page-preview.jpg",
      },
    ],
  },
  "xx99-mark-i": {
    slug: "xx99-mark-i",
    name: "XX99 Mark I Headphones",
    category: "Headphones",
    description:
      "Classic reference-grade headphones known for accurate reproduction and timeless comfort.",
    price: 1999,
    image: "/assets/product/xx99-mark-one-headphones/image-product.jpg",
    features:
      "Engineered with balanced tuning for studio monitoring and casual listening. Detachable cable system and durable build quality make it a reliable companion.",
    inBox: [
      { qty: 1, item: "Soft pouch" },
      { qty: 1, item: "User manual" },
      { qty: 1, item: "3.5mm cable" },
    ],
    gallery: [
      "/assets/product/xx99-mark-one-headphones/image-gallery-1.jpg",
      "/assets/product/xx99-mark-one-headphones/image-gallery-2.jpg",
      "/assets/product/xx99-mark-one-headphones/image-gallery-3.jpg",
    ],
    related: [
      {
        name: "XX99 Mark II",
        slug: "xx99-mark-ii",
        image: "/assets/product/xx99-mark-two-headphones/image-category-page-preview.jpg",
      },
      {
        name: "XX59",
        slug: "xx59",
        image: "/assets/product/image-category-page-preview.jpg",
      },
      {
        name: "ZX7 Speaker",
        slug: "zx7-speaker",
        image: "/assets/product/zx7-speaker/image-category-page-preview.jpg",
      },
    ],
  },
  "xx59": {
    slug: "xx59",
    name: "XX59 Headphones",
    category: "Headphones",
    description:
      "Versatile everyday headphones offering a balanced sound signature and comfortable fit.",
    price: 899,
    image: "/assets/product/image-product.jpg",
    features:
      "Lightweight construction with enhanced midrange detail for podcasts and music. Foldable design and detachable cable add convenience on the go.",
    inBox: [
      { qty: 1, item: "Carry pouch" },
      { qty: 1, item: "User manual" },
      { qty: 1, item: "3.5mm cable" },
    ],
    gallery: [
      "/assets/product/image-gallery-1.jpg",
      "/assets/product/image-gallery-2.jpg",
      "/assets/product/image-gallery-3.jpg",
    ],
    related: [
      {
        name: "XX99 Mark I",
        slug: "xx99-mark-i",
        image: "/assets/product/xx99-mark-one-headphones/image-category-page-preview.jpg",
      },
      {
        name: "ZX7 Speaker",
        slug: "zx7-speaker",
        image: "/assets/product/zx7-speaker/image-category-page-preview.jpg",
      },
      {
        name: "YX1 Earphones",
        slug: "yx1-earphones",
        image: "/assets/product/yx1-earphones/image-category-page-preview.jpg",
      },
    ],
  },
  "zx9-speaker": {
    slug: "zx9-speaker",
    name: "ZX9 Speaker",
    category: "Speakers",
    description:
      "Upgrade to premium speakers that deliver room-filling, detailed sound with a sleek, modern design.",
    price: 4500,
    image: "/assets/product/zx9-speaker/image-product.jpg",
    features:
      "The ZX9 uses a high-fidelity driver array and a rigid enclosure to minimize distortion at all volumes. Bluetooth support and wired inputs ensure compatibility across your setup.",
    inBox: [
      { qty: 2, item: "Speaker unit" },
      { qty: 2, item: "Cloth panel" },
      { qty: 1, item: "User manual" },
      { qty: 1, item: "3.5mm 10m cable" },
      { qty: 1, item: "Power cord" },
    ],
    gallery: [
      "/assets/product/zx9-speaker/image-gallery-1.jpg",
      "/assets/product/zx9-speaker/image-gallery-2.jpg",
      "/assets/product/zx9-speaker/image-gallery-3.jpg",
    ],
    related: [
      {
        name: "ZX7 Speaker",
        slug: "zx7-speaker",
        image: "/assets/product/zx7-speaker/image-category-page-preview.jpg",
      },
      {
        name: "YX1 Earphones",
        slug: "yx1-earphones",
        image: "/assets/product/yx1-earphones/image-category-page-preview.jpg",
      },
      {
        name: "XX99 Mark II",
        slug: "xx99-mark-ii",
        image: "/assets/product/xx99-mark-two-headphones/image-category-page-preview.jpg",
      },
    ],
  },
  "zx7-speaker": {
    slug: "zx7-speaker",
    name: "ZX7 Speaker",
    category: "Speakers",
    description:
      "A versatile speaker with balanced tuning, ideal for both music and movies in medium-sized rooms.",
    price: 3500,
    image: "/assets/product/zx7-speaker/image-product.jpg",
    features:
      "ZX7 combines refined acoustics with robust build quality. Enjoy crisp highs and powerful lows with intuitive controls and broad connectivity.",
    inBox: [
      { qty: 2, item: "Speaker unit" },
      { qty: 2, item: "Cloth panel" },
      { qty: 1, item: "User manual" },
      { qty: 1, item: "3.5mm 7m cable" },
      { qty: 1, item: "Power cord" },
    ],
    gallery: [
      "/assets/product/zx7-speaker/image-gallery-1.jpg",
      "/assets/product/zx7-speaker/image-gallery-2.jpg",
      "/assets/product/zx7-speaker/image-gallery-3.jpg",
    ],
    related: [
      {
        name: "ZX9 Speaker",
        slug: "zx9-speaker",
        image: "/assets/product/zx9-speaker/image-category-page-preview.jpg",
      },
      {
        name: "YX1 Earphones",
        slug: "yx1-earphones",
        image: "/assets/product/yx1-earphones/image-category-page-preview.jpg",
      },
      {
        name: "XX99 Mark I",
        slug: "xx99-mark-i",
        image: "/assets/product/xx99-mark-one-headphones/image-category-page-preview.jpg",
      },
    ],
  },
  "yx1-earphones": {
    slug: "yx1-earphones",
    name: "YX1 Earphones",
    category: "Earphones",
    description:
      "Compact and comfortable earphones that deliver detailed sound for everyday listening.",
    price: 599,
    image: "/assets/product/yx1-earphones/image-product.jpg",
    features:
      "A custom driver in a lightweight enclosure provides clear mids and crisp treble. Includes multiple ear tip sizes and a tangle-resistant cable.",
    inBox: [
      { qty: 2, item: "Earphone unit" },
      { qty: 1, item: "User manual" },
      { qty: 3, item: "Pairs of ear tips" },
      { qty: 1, item: "Carrying pouch" },
    ],
    gallery: [
      "/assets/product/yx1-earphones/image-gallery-1.jpg",
      "/assets/product/yx1-earphones/image-gallery-2.jpg",
      "/assets/product/yx1-earphones/image-gallery-3.jpg",
    ],
    related: [
      {
        name: "ZX7 Speaker",
        slug: "zx7-speaker",
        image: "/assets/product/zx7-speaker/image-category-page-preview.jpg",
      },
      {
        name: "ZX9 Speaker",
        slug: "zx9-speaker",
        image: "/assets/product/zx9-speaker/image-category-page-preview.jpg",
      },
      {
        name: "XX99 Mark I",
        slug: "xx99-mark-i",
        image: "/assets/product/xx99-mark-one-headphones/image-category-page-preview.jpg",
      },
    ],
  },
};

// ✅ Alias map for backward compatibility
const ALIASES: Record<string, string> = {
  "xx99-mark-one": "xx99-mark-i",
  "xx99-mark-two": "xx99-mark-ii",
};

// ---------- Utility ----------
function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// ✅ Generate static params from product keys
export async function generateStaticParams() {
  return Object.keys(PRODUCTS).map((slug) => ({ slug }));
}

// ---------- Product Page ----------
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Resolve alias if necessary
  const resolvedSlug = PRODUCTS[slug]
    ? slug
    : ALIASES[slug]
    ? ALIASES[slug]
    : undefined;

  if (!resolvedSlug) return notFound();

  const product = PRODUCTS[resolvedSlug];

  return (
    <main className="flex flex-col items-center bg-white">
      {/* Product Header Section */}
      <section className="w-full max-w-[1100px] px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={540}
            height={560}
            className="rounded-lg object-cover"
          />
        </div>

        <div className="max-w-md">
          <p className="uppercase text-orange-500 tracking-widest text-xs mb-2">
            New Product
          </p>
          <h1 className="text-3xl font-bold uppercase mb-6 leading-tight">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-lg font-bold tracking-wide mb-6">
            {formatPrice(product.price)}
          </p>

          <AddToCartControls
            slug={product.slug}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        </div>
      </section>

      {/* Features + In The Box */}
      <section className="w-full max-w-[1100px] px-8 grid md:grid-cols-3 gap-16 py-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold uppercase mb-4">Features</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {product.features}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold uppercase mb-4">In The Box</h2>
          <ul className="space-y-2">
            {product.inBox.map((b) => (
              <li key={b.item} className="text-gray-600">
                <span className="text-orange-500 font-bold mr-3">{b.qty}x</span>
                {b.item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="w-full max-w-[1100px] px-8 grid md:grid-cols-2 gap-6 py-8">
        <div className="grid gap-6">
          <Image
            src={product.gallery[0]}
            alt={`${product.name} gallery 1`}
            width={540}
            height={320}
            className="rounded-lg object-cover"
          />
          <Image
            src={product.gallery[1]}
            alt={`${product.name} gallery 2`}
            width={540}
            height={320}
            className="rounded-lg object-cover"
          />
        </div>

        <div>
          <Image
            src={product.gallery[2]}
            alt={`${product.name} gallery 3`}
            width={540}
            height={672}
            className="rounded-lg object-cover h-full w-full"
          />
        </div>
      </section>

      {/* Related Products */}
      <section className="w-full max-w-[1100px] px-8 py-16">
        <h3 className="text-2xl font-bold uppercase text-center mb-10">
          You May Also Like
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {product.related.map((r) => (
            <div
              key={r.slug}
              className="bg-gray-100 rounded-lg p-6 flex flex-col items-center text-center"
            >
              <Image
                src={r.image}
                alt={r.name}
                width={300}
                height={300}
                className="rounded-md mb-6 object-cover"
              />
              <h4 className="font-bold uppercase mb-4">{r.name}</h4>
              <Link
                href={`/products/${r.slug}`}
                className="bg-orange-500 text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-orange-600"
              >
                See Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      <CategoryCards />
      <AboutSection />
    </main>
  );
}
