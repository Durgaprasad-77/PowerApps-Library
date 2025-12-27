import Link from "next/link";
import { Check, Copy, Zap, Shield, Sparkles, ArrowRight } from "lucide-react";
import { getCategories, getComponents } from "@/lib/data";
import { getCategoryIcon } from "@/components/category-icons";

export default async function HomePage() {
  const components = await getComponents();
  const categories = await getCategories();

  const freeCount = components.filter(c => !c.isPro).length;
  const totalCount = components.length;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#262626] rounded-full text-sm text-[#a1a1a1] mb-8">
              <Sparkles className="w-4 h-4 text-white" />
              <span>{totalCount}+ Power Apps Components</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Copy-Paste Ready
              <br />
              <span className="text-[#6b6b6b]">Power Apps Components</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-[#a1a1a1] mb-10 max-w-xl mx-auto leading-relaxed">
              The largest library of tested YAML components. Build beautiful canvas apps in minutes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/library" className="btn-primary inline-flex items-center justify-center gap-2">
                Browse Library
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="btn-secondary inline-flex items-center justify-center gap-2">
                View Pricing
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-8 justify-center mt-12 text-sm text-[#6b6b6b]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white" />
                <span>{freeCount} Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Copy className="w-4 h-4 text-white" />
                <span>Copy-Paste YAML</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-white" />
                <span>Tested & Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-[#6b6b6b] max-w-lg mx-auto">
              Every component is built with best practices and tested in Power Apps Studio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="card p-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4">
                <Copy className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Copy-Paste Ready
              </h3>
              <p className="text-[#6b6b6b] text-sm leading-relaxed">
                Tested YAML code. Just copy and paste directly into Power Apps Studio.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Modern Design
              </h3>
              <p className="text-[#6b6b6b] text-sm leading-relaxed">
                Beautiful, responsive components with animations and hover effects.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Production Ready
              </h3>
              <p className="text-[#6b6b6b] text-sm leading-relaxed">
                All components follow Power Apps best practices and are fully responsive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-24 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Browse by Category
              </h2>
              <p className="text-[#6b6b6b]">
                {totalCount}+ components across {categories.length} categories
              </p>
            </div>
            <Link
              href="/library"
              className="hidden sm:inline-flex items-center gap-2 text-white text-sm font-medium hover:text-[#a1a1a1] transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const IconComponent = getCategoryIcon(category.slug);
              return (
                <Link
                  key={category.id}
                  href={`/library/${category.slug}`}
                  className="card p-5 group"
                >
                  <IconComponent className="w-8 h-8 text-[#6b6b6b] mb-4 group-hover:text-white transition-colors" />
                  <h3 className="font-medium text-white group-hover:text-[#a1a1a1] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[#6b6b6b] mt-1">
                    {category.componentsCount} components
                  </p>
                  {category.freeCount > 0 && (
                    <span className="inline-block mt-3 text-xs font-medium badge-free px-2 py-0.5 rounded">
                      {category.freeCount} Free
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Simple Pricing
            </h2>
            <p className="text-[#6b6b6b]">
              Start free, upgrade when you need more.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Free */}
            <div className="card p-6">
              <h3 className="text-lg font-medium text-white">Free</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-[#6b6b6b] text-sm ml-1">/forever</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-[#a1a1a1] text-sm">
                  <Check className="w-4 h-4 text-white" />
                  {freeCount} Components
                </li>
                <li className="flex items-center gap-3 text-[#a1a1a1] text-sm">
                  <Check className="w-4 h-4 text-white" />
                  Copy-Paste YAML
                </li>
                <li className="flex items-center gap-3 text-[#a1a1a1] text-sm">
                  <Check className="w-4 h-4 text-white" />
                  Community Support
                </li>
              </ul>
              <Link href="/library" className="btn-secondary block text-center w-full">
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="card p-6 border-white/20 relative glow">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-xs font-medium rounded-full">
                Popular
              </div>
              <h3 className="text-lg font-medium text-white">Pro</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-white">$49</span>
                <span className="text-[#6b6b6b] text-sm ml-1">/year</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-[#a1a1a1] text-sm">
                  <Check className="w-4 h-4 text-white" />
                  All {totalCount}+ Components
                </li>
                <li className="flex items-center gap-3 text-[#a1a1a1] text-sm">
                  <Check className="w-4 h-4 text-white" />
                  Settings Panel
                </li>
                <li className="flex items-center gap-3 text-[#a1a1a1] text-sm">
                  <Check className="w-4 h-4 text-white" />
                  Priority Support
                </li>
                <li className="flex items-center gap-3 text-[#a1a1a1] text-sm">
                  <Check className="w-4 h-4 text-white" />
                  Future Updates
                </li>
              </ul>
              <Link href="/pricing" className="btn-primary block text-center w-full">
                Get Pro Access
              </Link>
            </div>

            {/* Lifetime */}
            <div className="card p-6">
              <h3 className="text-lg font-medium text-white">Lifetime</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-white">$99</span>
                <span className="text-[#6b6b6b] text-sm ml-1">/once</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-[#a1a1a1] text-sm">
                  <Check className="w-4 h-4 text-white" />
                  Everything in Pro
                </li>
                <li className="flex items-center gap-3 text-[#a1a1a1] text-sm">
                  <Check className="w-4 h-4 text-white" />
                  Lifetime Access
                </li>
                <li className="flex items-center gap-3 text-[#a1a1a1] text-sm">
                  <Check className="w-4 h-4 text-white" />
                  All Future Components
                </li>
              </ul>
              <Link href="/pricing" className="btn-secondary block text-center w-full">
                Get Lifetime
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Build?
          </h2>
          <p className="text-[#6b6b6b] mb-8">
            Start with our free components and see the difference.
          </p>
          <Link href="/library" className="btn-primary inline-flex items-center gap-2">
            Browse Free Components
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
