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
    <div className="fixed inset-0 z-100">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={closeCart} />

      {/* Panel */}
      <div className="fixed top-20 left-4 right-4 max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-xl p-4 z-101 lg:top-24 lg:right-8 lg:left-auto lg:w-[400px] lg:max-h-[calc(100vh-8rem)] lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold uppercase tracking-widest text-base md:text-lg">Cart ({count})</h3>
          {items.length > 0 && (
            <button onClick={clear} className="text-xs md:text-sm text-gray-500 hover:text-gray-700 underline">
              Remove all
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <p className="text-xs md:text-sm text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4 max-h-[50vh] overflow-auto pr-2 md:max-h-80 md:pr-1">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center justify-between gap-2 md:gap-3">
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <Image src={item.image} alt={item.name} width={40} height={40} className="w-10 h-10 md:w-12 md:h-12 rounded-md object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm font-semibold leading-tight truncate">{item.name}</p>
                    <p className="text-[10px] md:text-xs text-gray-500">{formatPrice(item.price)}</p>
                  </div>
                </div>
                <div className="flex items-center bg-gray-100 rounded px-1.5 py-1 md:px-2 md:py-1 shrink-0">
                  <button onClick={() => decrement(item.slug)} className="px-1.5 md:px-2 text-gray-500 text-sm md:text-base" aria-label="decrease">
                    -
                  </button>
                  <span className="px-1.5 md:px-2 text-xs md:text-sm w-5 md:w-6 text-center">{item.qty}</span>
                  <button onClick={() => increment(item.slug)} className="px-1.5 md:px-2 text-gray-500 text-sm md:text-base" aria-label="increase">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-4 md:mt-6">
          <span className="uppercase text-xs text-gray-500">Total</span>
          <span className="font-bold text-sm md:text-base">{formatPrice(total)}</span>
        </div>

        <Link
          href="/checkout"
          className=" text-center mt-3 md:mt-4 bg-orange-500 text-white py-2.5 md:py-3 rounded text-xs md:text-sm uppercase tracking-widest hover:bg-orange-600 min-h-11 flex items-center justify-center"
          onClick={closeCart}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}