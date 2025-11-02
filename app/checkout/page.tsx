'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';
import { useRouter } from 'next/navigation';

function formatPrice(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

type Errors = Record<string, string>;

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [showThanks, setShowThanks] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    city: '',
    country: '',
    pm: 'emoney',
    emoneyNumber: '',
    emoneyPin: '',
  });

  const shipping = 50;
  const vat = Math.round(total * 0.2);
  const grandTotal = total + (items.length ? shipping : 0);

  const setField = (k: keyof typeof form, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.zip.trim()) e.zip = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.country.trim()) e.country = 'Required';
    if (form.pm === 'emoney') {
      if (!form.emoneyNumber.trim()) e.emoneyNumber = 'Required';
      if (!form.emoneyPin.trim()) e.emoneyPin = 'Required';
    }
    if (!items.length) e.items = 'Your cart is empty';
    if (items.some((i) => i.qty < 1)) e.quantities = 'Invalid item quantity';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;
    try {
      setSubmitting(true);
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { name: form.name, email: form.email, phone: form.phone },
          shipping: { address: form.address, zip: form.zip, city: form.city, country: form.country },
          payment: { method: form.pm, emoneyNumber: form.emoneyNumber, emoneyPin: form.emoneyPin },
          items,
          totals: { total, shipping, vat, grandTotal },
        }),
      });
      if (!res.ok) throw new Error('Order submission failed');
      const data = await res.json();
      const id: string = data.id;
      const order = {
        id,
        customer: { name: form.name, email: form.email },
        items,
        totals: data.totals ?? { total, shippingTotal: shipping, vat, grandTotal },
      };
      try {
        localStorage.setItem(`order:${id}`, JSON.stringify(order));
      } catch {}
    setOrderId(id);
    await new Promise((r) => setTimeout(r, 50)); // ensure state flush
    setShowThanks(true);
    } catch (err) {
      setErrors((e) => ({ ...e, submit: 'Unable to place order. Please try again.' }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1100px] mx-auto px-8 py-10">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">Go Back</Link>

        <div className="mt-6 grid md:grid-cols-[2fr_1fr] gap-8">
          {/* Left: Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-sm">
            <h1 className="text-2xl font-bold uppercase tracking-widest mb-6">Checkout</h1>

            {/* Billing Details */}
            <section className="mb-8">
              <h2 className="text-xs uppercase tracking-widest text-orange-500 font-bold mb-4">Billing Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" htmlFor="name">Name</label>
                  <input id="name" className="w-full border rounded px-3 py-2" placeholder="Alexei Ward" aria-invalid={!!errors.name} onChange={(e)=>setField('name', e.target.value)} />
                  {errors.name && <p className="text-xs text-red-600 mt-1" role="alert">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" htmlFor="email">Email Address</label>
                  <input id="email" type="email" className="w-full border rounded px-3 py-2" placeholder="alexei@mail.com" aria-invalid={!!errors.email} onChange={(e)=>setField('email', e.target.value)} />
                  {errors.email && <p className="text-xs text-red-600 mt-1" role="alert">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" htmlFor="phone">Phone Number</label>
                  <input id="phone" className="w-full border rounded px-3 py-2" placeholder="+1 202-555-0136" aria-invalid={!!errors.phone} onChange={(e)=>setField('phone', e.target.value)} />
                  {errors.phone && <p className="text-xs text-red-600 mt-1" role="alert">{errors.phone}</p>}
                </div>
              </div>
            </section>

            {/* Shipping Info */}
            <section className="mb-8">
              <h2 className="text-xs uppercase tracking-widest text-orange-500 font-bold mb-4">Shipping Info</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" htmlFor="address">Address</label>
                  <input id="address" className="w-full border rounded px-3 py-2" placeholder="1137 Williams Avenue" aria-invalid={!!errors.address} onChange={(e)=>setField('address', e.target.value)} />
                  {errors.address && <p className="text-xs text-red-600 mt-1" role="alert">{errors.address}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1" htmlFor="zip">ZIP Code</label>
                    <input id="zip" className="w-full border rounded px-3 py-2" placeholder="10001" aria-invalid={!!errors.zip} onChange={(e)=>setField('zip', e.target.value)} />
                    {errors.zip && <p className="text-xs text-red-600 mt-1" role="alert">{errors.zip}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1" htmlFor="city">City</label>
                    <input id="city" className="w-full border rounded px-3 py-2" placeholder="New York" aria-invalid={!!errors.city} onChange={(e)=>setField('city', e.target.value)} />
                    {errors.city && <p className="text-xs text-red-600 mt-1" role="alert">{errors.city}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" htmlFor="country">Country</label>
                  <input id="country" className="w-full border rounded px-3 py-2" placeholder="United States" aria-invalid={!!errors.country} onChange={(e)=>setField('country', e.target.value)} />
                  {errors.country && <p className="text-xs text-red-600 mt-1" role="alert">{errors.country}</p>}
                </div>
              </div>
            </section>

            {/* Payment Details */}
            <section className="mb-2">
              <h2 className="text-xs uppercase tracking-widest text-orange-500 font-bold mb-4">Payment Details</h2>
              <div className="grid md:grid-cols-2 gap-4 items-start">
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-xs font-semibold">Payment Method</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 border rounded px-3 py-2 cursor-pointer">
                      <input type="radio" name="pm" checked={form.pm==='emoney'} onChange={()=>setField('pm','emoney')} />
                      <span>e-Money</span>
                    </label>
                    <label className="flex items-center gap-2 border rounded px-3 py-2 cursor-pointer">
                      <input type="radio" name="pm" checked={form.pm==='cod'} onChange={()=>setField('pm','cod')} />
                      <span>Cash on Delivery</span>
                    </label>
                  </div>
                </div>
                {form.pm === 'emoney' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold mb-1" htmlFor="emoneyNumber">e-Money Number</label>
                      <input id="emoneyNumber" className="w-full border rounded px-3 py-2" placeholder="238521993" aria-invalid={!!errors.emoneyNumber} onChange={(e)=>setField('emoneyNumber', e.target.value)} />
                      {errors.emoneyNumber && <p className="text-xs text-red-600 mt-1" role="alert">{errors.emoneyNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1" htmlFor="emoneyPin">e-Money PIN</label>
                      <input id="emoneyPin" className="w-full border rounded px-3 py-2" placeholder="6891" aria-invalid={!!errors.emoneyPin} onChange={(e)=>setField('emoneyPin', e.target.value)} />
                      {errors.emoneyPin && <p className="text-xs text-red-600 mt-1" role="alert">{errors.emoneyPin}</p>}
                    </div>
                  </>
                )}
              </div>
            </section>
            {errors.submit && <p className="text-sm text-red-600" role="alert">{errors.submit}</p>}
          </form>

          {/* Right: Summary */}
          <aside className="bg-white rounded-lg p-6 shadow-sm h-fit">
            <h3 className="uppercase font-bold tracking-widest mb-4">Summary</h3>
            <div className="space-y-4">
              {items.map((i) => (
                <div key={i.slug} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image src={i.image} alt={i.name} width={48} height={48} className="rounded-md object-cover" />
                    <div>
                      <p className="text-sm font-semibold leading-tight">{i.name}</p>
                      <p className="text-xs text-gray-500">{formatPrice(i.price)}</p>
                    </div>
                  </div>
                  <span className="text-gray-500">x{i.qty}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Total</span>
                <span className="font-semibold text-gray-900">{formatPrice(total)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-gray-900">{formatPrice(items.length ? shipping : 0)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>VAT (Included)</span>
                <span className="font-semibold text-gray-900">{formatPrice(vat)}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-4">
                <span className="uppercase text-gray-600">Grand Total</span>
                <span className="font-bold text-orange-500">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <button
              className="w-full mt-6 bg-orange-500 text-white py-3 rounded text-sm uppercase tracking-widest hover:bg-orange-600 disabled:opacity-50"
              disabled={!items.length || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Processing…' : 'Continue & Pay'}
            </button>
          </aside>
        </div>
      </div>
      {/* Thank You Modal */}
      {showThanks && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[540px] max-w-[92vw] rounded-lg p-8 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center mb-6">✓</div>
            <h2 className="text-2xl font-bold uppercase leading-snug">Thank you for your order</h2>
            <p className="text-sm text-gray-500 mt-2">You will receive an email confirmation shortly.</p>

            <div className="mt-6 grid md:grid-cols-[1fr_auto] gap-4 items-stretch">
              <div className="bg-gray-100 rounded-md p-4">
                {items[0] ? (
                  <div>
                    <div className="flex items-center gap-3">
                      <Image src={items[0].image} alt={items[0].name} width={48} height={48} className="rounded-md" />
                      <div>
                        <p className="text-sm font-semibold leading-tight">{items[0].name}</p>
                        <p className="text-xs text-gray-500">{formatPrice(items[0].price)}</p>
                      </div>
                      <span className="ml-auto text-gray-500">x{items[0].qty}</span>
                    </div>
                    {items.length - 1 > 0 && (
                      <p className="text-center text-xs text-gray-500 mt-3">and {items.length - 1} other item(s)</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Cart is empty.</p>
                )}
              </div>
              <div className="bg-black text-white rounded-md p-4 flex flex-col justify-center">
                <span className="uppercase text-xs text-gray-400">Grand Total</span>
                <span className="text-lg font-bold">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                className="flex-1 bg-orange-500 text-white py-3 rounded text-sm uppercase tracking-widest hover:bg-orange-600"
                onClick={() => {
                  clear();
                  router.push('/');
                }}
              >
                Back to Home
              </button>
                  {orderId ? (
      <button
        className="flex-1 border border-gray-300 text-gray-800 py-3 rounded text-sm uppercase tracking-widest hover:bg-gray-50"
        onClick={() => {
          clear();
          router.push(`/order/${orderId}`);
        }}
      >
        View Order
      </button>
    ) : (
      <button
        disabled
        className="flex-1 border border-gray-300 text-gray-400 py-3 rounded text-sm uppercase tracking-widest cursor-not-allowed"
      >
        View Order
      </button>
    )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
