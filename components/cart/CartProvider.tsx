'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string; // preview image path
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  clear: () => void;
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  increment: (slug: string) => void;
  decrement: (slug: string) => void;
  remove: (slug: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);

  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);
  const clear = () => setItems([]);

  const addItem = (item: Omit<CartItem, 'qty'>, qty: number = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.slug === item.slug);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { ...item, qty }];
    });
    setOpen(true);
  };

  const increment = (slug: string) =>
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + 1 } : i)));

  const decrement = (slug: string) =>
    setItems((prev) =>
      prev
        .map((i) => (i.slug === slug ? { ...i, qty: Math.max(0, i.qty - 1) } : i))
        .filter((i) => i.qty > 0)
    );

  const remove = (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug));

  const { count, total } = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const total = items.reduce((n, i) => n + i.qty * i.price, 0);
    return { count, total };
  }, [items]);

  const value: CartContextType = {
    items,
    count,
    total,
    isOpen,
    openCart,
    closeCart,
    clear,
    addItem,
    increment,
    decrement,
    remove,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

