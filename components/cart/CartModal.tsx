'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartProvider';

function formatPrice(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export default function CartModal() {
  const { isOpen, closeCart, items, increment, decrement, clear, total, count } = useCart();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={closeCart} />

      {/* Panel */}
      <div className="absolute right-8 top-24 w-[380px] bg-white rounded-lg shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold uppercase tracking-widest">Cart ({count})</h3>
          {items.length > 0 && (
            <button onClick={clear} className="text-sm text-gray-500 hover:text-gray-700 underline">
              Remove all
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4 max-h-80 overflow-auto pr-1">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image src={item.image} alt={item.name} width={48} height={48} className="rounded-md object-cover" />
                  <div>
                    <p className="text-sm font-semibold leading-tight">{item.name}</p>
                    <p className="text-xs text-gray-500">{formatPrice(item.price)}</p>
                  </div>
                </div>
                <div className="flex items-center bg-gray-100 rounded px-2 py-1">
                  <button onClick={() => decrement(item.slug)} className="px-2 text-gray-500" aria-label="decrease">
                    -
                  </button>
                  <span className="px-2 text-sm w-6 text-center">{item.qty}</span>
                  <button onClick={() => increment(item.slug)} className="px-2 text-gray-500" aria-label="increase">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <span className="uppercase text-xs text-gray-500">Total</span>
          <span className="font-bold">{formatPrice(total)}</span>
        </div>

        <Link
          href="/checkout"
          className="block text-center mt-4 bg-orange-500 text-white py-3 rounded text-sm uppercase tracking-widest hover:bg-orange-600"
          onClick={closeCart}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
