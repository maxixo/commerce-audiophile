import { HeroSection } from "@/components/HeroSection";
import { CategoryCards } from "@/components/CategoryCards";
import { ProductHighlight } from "@/components/ProductHighlight";
import { AboutSection } from "@/components/AboutSection";


export default function HomePage() {
return (
<div>
<HeroSection />
<CategoryCards />
<ProductHighlight />
<AboutSection />
</div>
);
}