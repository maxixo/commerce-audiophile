import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";


export const metadata = {
title: "Audiophile E-commerce",
description: "High-end audio products built with Next.js",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="font-sans bg-gray-50 text-gray-900">
<Navbar />
<main>{children}</main>
<Footer />
</body>
</html>
);
}