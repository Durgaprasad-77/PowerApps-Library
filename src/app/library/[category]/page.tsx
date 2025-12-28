import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getComponents } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import { getCategoryIcon } from "@/components/category-icons";
import { CardPreview } from "@/components/preview/card-preview";

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
    const categories = await getCategories();
    const category = categories.find(c => c.slug === categorySlug);

    if (!category) {
        notFound();
    }

    const categoryComponents = await getComponents(categorySlug);
    const CategoryIcon = getCategoryIcon(categorySlug);

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="border-b border-[#1a1a1a]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link
                        href="/library"
                        className="inline-flex items-center gap-2 text-[#6b6b6b] hover:text-white text-sm mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Library
                    </Link>
                    <div className="flex items-center gap-3">
                        <CategoryIcon className="w-8 h-8 text-[#6b6b6b]" />
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                {category.name}
                            </h1>
                            <p className="text-[#6b6b6b] text-sm">
                                {category.description} • {categoryComponents.length} components
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {categoryComponents.map((component) => (
                                <Link
                                    key={component.id}
                                    href={`/library/${categorySlug}/${component.slug}`}
                                    className="card overflow-hidden group border border-[#1a1a1a] hover:border-[#333333] transition-colors"
                                >
                                    {/* Preview */}
                                    <div className="h-32 bg-[#0a0a0a] flex items-center justify-center border-b border-[#1a1a1a] overflow-hidden relative">
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
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors text-sm">
                                                {component.name}
                                            </h3>
                                            <div className="flex gap-1">
                                                {component.isNew && (
                                                    <span className="badge-new text-xs font-medium px-2 py-0.5 rounded">
                                                        New
                                                    </span>
                                                )}
                                                {component.isPro ? (
                                                    <span className="badge-pro text-xs font-medium px-2 py-0.5 rounded">
                                                        PRO
                                                    </span>
                                                ) : (
                                                    <span className="badge-free text-xs font-medium px-2 py-0.5 rounded">
                                                        Free
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-xs text-[#6b6b6b] line-clamp-2">
                                            {component.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {categoryComponents.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-[#6b6b6b] text-sm">No components in this category yet.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
