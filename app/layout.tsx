import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import CartModal from "@/components/cart/CartModal";
import { ConvexClientProvider } from "./../components/ConvexClientProvider";

// ✅ Server-only metadata (SEO-friendly)
export const metadata = {
  title: "Audiophile E-commerce",
  description: "High-end audio products built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-[#F2F2F2] text-gray-900">
        <ConvexClientProvider>
          <CartProvider>
            <Navbar />
            <CartModal />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
