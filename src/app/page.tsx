import { getCategories, getComponents } from "@/lib/data";
import {
  HeroSection,
  BentoGrid,
  ComponentShowcase,
  StatsSection,
  CategoryGrid,
  CTASection
} from "@/components/home";

export default async function HomePage() {
  const components = await getComponents();
  const categories = await getCategories();

  const freeCount = components.filter(c => !c.isPro).length;
  const totalCount = components.length;

  // Transform categories for the grid
  const categoryData = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    componentsCount: cat.componentsCount,
    freeCount: cat.freeCount,
  }));

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection totalCount={totalCount} freeCount={freeCount} />

      {/* Stats Section */}
      <StatsSection />

      {/* Bento Grid Features */}
      <BentoGrid />

      {/* Component Showcase */}
      <ComponentShowcase />

      {/* Categories */}
      <CategoryGrid categories={categoryData} />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
