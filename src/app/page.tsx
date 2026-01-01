import { getCategories, getComponents } from "@/lib/data";
import {
  HeroSection,
  ProductsShowcase,
  CTASection,
  CopyPasteSection
} from "@/components/home";

export default async function HomePage() {
  const components = await getComponents();
  const categories = await getCategories();

  const freeCount = components.filter(c => !c.isPro).length;
  const totalCount = components.length;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection totalCount={totalCount} freeCount={freeCount} />

      {/* Products Showcase - Linear Style */}
      <ProductsShowcase />

      {/* Copy Paste Section */}
      <CopyPasteSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
