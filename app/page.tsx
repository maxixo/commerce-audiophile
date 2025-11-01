import { HeroSection } from "@/components/HeroSection";
import { CategoryCards } from "@/components/CategoryCards";
import { ProductHighlight } from "@/components/ProductHighlight";
import { AboutSection } from "@/components/AboutSection";


export default function HomePage() {
return (
<div className="flex flex-col mx-auto items-center bg-gray-50">
<HeroSection />
<CategoryCards />
<ProductHighlight />
<AboutSection />
</div>
);
}