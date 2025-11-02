'use client';
import { useState, useMemo } from 'react';
import { useCart } from './cart/CartProvider';

function derivePreview(imagePath: string, slug: string) {
  // If path uses per-product folder, use its category preview; else fall back
  const perProduct = imagePath.includes(`/product/`) && imagePath.includes(slug);
  if (perProduct) {
    const base = imagePath.replace(/image-product\.jpg$/, 'image-category-page-preview.jpg');
    return base;
  }
  if (imagePath.includes('/product/image-product.jpg')) {
    return '/assets/product/image-category-page-preview.jpg';
  }
  return imagePath; // fallback to given image
}

export default function AddToCartControls({
  slug,
  name,
  price,
  image,
}: {
  slug: string;
  name: string;
  price: number;
  image: string;
}) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  const preview = useMemo(() => derivePreview(image, slug), [image, slug]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center bg-gray-100 px-3 py-2 select-none">
        <button
          className="px-2 text-gray-500"
          aria-label="decrease"
          onClick={() => setQty((n) => Math.max(1, n - 1))}
        >
          -
        </button>
        <span className="px-4">{qty}</span>
        <button className="px-2 text-gray-500" aria-label="increase" onClick={() => setQty((n) => n + 1)}>
          +
        </button>
      </div>
      <button
        className="bg-orange-500 text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-orange-600"
        onClick={() => addItem({ slug, name, price, image: preview }, qty)}
      >
        Add to Cart
      </button>
    </div>
  );
}

