import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getComponents } from "@/lib/data";
import { motion } from "framer-motion";
import { CategoryIcon } from "@/components/category-icons";
import { CardPreview } from "@/components/preview/card-preview";
import { LibraryLayout } from "@/components/library/library-layout";

interface Props {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { category: categorySlug } = await params;
    const categories = await getCategories();
    const category = categories.find(c => c.slug === categorySlug);

    if (!category) {
        return { title: "Category Not Found" };
    }

    return {
        title: `${category.name} Components | PowerUI`,
        description: category.description,
    };
}

export default async function CategoryPage({ params }: Props) {
    const { category: categorySlug } = await params;
    const [categories, allComponents] = await Promise.all([
        getCategories(),
        getComponents()
    ]);

    const category = categories.find(c => c.slug === categorySlug);

    if (!category) {
        notFound();
    }

    const categoryComponents = allComponents.filter(c => c.category === categorySlug);

    return (
        <LibraryLayout categories={categories} components={allComponents}>
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <CategoryIcon slug={categorySlug} className="w-8 h-8 text-neutral-400" />
                    <h1 className="text-2xl font-bold text-white">
                        {category.name}
                    </h1>
                </div>
                <p className="text-neutral-400 text-sm">
                    {category.description} • {categoryComponents.length} components
                </p>
            </div>

            {/* Component Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryComponents.map((component) => (
                    <Link
                        key={component.id}
                        href={`/library/${categorySlug}/${component.slug}`}
                        className="group block bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all hover:shadow-lg hover:shadow-black/20"
                    >
                        {/* Preview */}
                        <div className="aspect-[4/3] bg-neutral-950 border-b border-neutral-800 overflow-hidden relative">
                            <CardPreview componentSlug={component.slug} category={categorySlug} />

                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-xs font-medium px-3 py-1 bg-black/50 backdrop-blur rounded-full border border-white/10">
                                    View Details
                                </span>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-1">
                                <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors text-sm">
                                    {component.name}
                                </h3>
                                <div className="flex gap-1">
                                    {component.isNew && (
                                        <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded font-medium">
                                            New
                                        </span>
                                    )}
                                    {component.isPro ? (
                                        <span className="text-[9px] px-1.5 py-0.5 bg-purple-500/20 text-purple-400 rounded font-medium">
                                            Pro
                                        </span>
                                    ) : (
                                        <span className="text-[9px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded font-medium">
                                            Free
                                        </span>
                                    )}
                                </div>
                            </div>
                            <p className="text-xs text-neutral-500 line-clamp-2">
                                {component.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {categoryComponents.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-neutral-500 text-sm">No components in this category yet.</p>
                </div>
            )}
        </LibraryLayout>
    );
}
