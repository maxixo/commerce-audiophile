import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import CartModal from "@/components/cart/CartModal";


export const metadata = {
title: "Audiophile E-commerce",
description: "High-end audio products built with Next.js",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="font-sans bg-gray-50 text-gray-900">
<CartProvider>
<Navbar />
<CartModal />
<main>{children}</main>
<Footer />
</CartProvider>
</body>
</html>
);
}
