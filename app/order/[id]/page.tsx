'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

type Order = {
  id: string;
  customer: { name: string; email: string; phone?: string };
  shipping?: { address: string; zip: string; city: string; country: string };
  items: { slug: string; name: string; price: number; qty: number; image?: string }[];
  totals: { total: number; shippingTotal: number; vat: number; grandTotal: number };
  status?: string;
  createdAt?: number;
};

function formatPrice(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export default function OrderConfirmation({ params }: { params: Promise<{ id: string }> }) {
  // ✅ Unwrap params (Next.js 15+)
  const { id } = use(params);

  const [fallbackOrder, setFallbackOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch from Convex only when id exists
  const convexOrder = id ? useQuery(api.orders.get as any, { id: id as any }) : null;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (convexOrder) {
        setFallbackOrder(convexOrder as Order);
        setLoading(false);
        return;
      }

      try {
        const raw = localStorage.getItem(`order:${id}`);
        if (raw && !cancelled) {
          setFallbackOrder(JSON.parse(raw));
        }
      } catch {
        // ignore JSON parse errors
      }

      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [id, convexOrder]);

  const order = convexOrder || fallbackOrder;

  // 🌀 Loading state
  if (loading && !order) {
    return (
      <div className="max-w-[1100px] mx-auto px-8 py-16">
        <p className="text-gray-600">Loading order…</p>
      </div>
    );
  }

  // ❌ No order found
  if (!order) {
    return (
      <div className="max-w-[1100px] mx-auto px-8 py-16">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn’t load your order details.</p>
        <Link href="/" className="text-orange-600 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const first = order.items?.[0];
  const rest = Math.max(0, order.items.length - 1);

  return (
    <div className="max-w-[1100px] mx-auto px-8 py-16">
      <div className="bg-white rounded-lg p-8 shadow">
        <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center mb-6">
          ✓
        </div>

        <h2 className="text-2xl font-bold uppercase leading-snug">Thank you for your order</h2>
        <p className="text-sm text-gray-500 mt-2">
          You will receive an email confirmation shortly.
        </p>

        <div className="mt-6 grid md:grid-cols-[1fr_auto] gap-4 items-stretch">
          <div className="bg-gray-100 rounded-md p-4">
            {first && (
              <div>
                <div className="flex items-center gap-3">
                  {first.image ? (
                    <img
                      src={first.image}
                      alt={first.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded" />
                  )}
                  <div>
                    <p className="text-sm font-semibold leading-tight">{first.name}</p>
                    <p className="text-xs text-gray-500">{formatPrice(first.price)}</p>
                  </div>
                  <span className="ml-auto text-gray-500">x{first.qty}</span>
                </div>
                {rest > 0 && (
                  <p className="text-center text-xs text-gray-500 mt-3">
                    and {rest} other item(s)
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="bg-black text-white rounded-md p-4 flex flex-col justify-center">
            <span className="uppercase text-xs text-gray-400">Grand Total</span>
            <span className="text-lg font-bold">{formatPrice(order.totals.grandTotal)}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 text-center bg-orange-500 text-white py-3 rounded text-sm uppercase tracking-widest hover:bg-orange-600"
          >
            Back to Home
          </Link>

          <Link
            href={`/order/${order.id}`}
            className="flex-1 text-center border border-gray-300 text-gray-800 py-3 rounded text-sm uppercase tracking-widest hover:bg-gray-50"
          >
            View Again
          </Link>
        </div>
      </div>
    </div>
  );
}
