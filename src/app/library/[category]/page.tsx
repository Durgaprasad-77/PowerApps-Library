import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getComponents } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import { CategoryIcon } from "@/components/category-icons";
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

    return (
        <div className="min-h-screen pt-20 bg-black">
            {/* Header */}
            <div className="border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link
                        href="/library"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Library
                    </Link>
                    <div className="flex items-center gap-3">
                        <CategoryIcon slug={categorySlug} className="w-8 h-8 text-neutral-400" />
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                {category.name}
                            </h1>
                            <p className="text-neutral-400 text-sm">
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
                                    className="card overflow-hidden group border border-neutral-800 hover:border-neutral-700 bg-neutral-950 transition-colors"
                                >
                                    {/* Preview */}
                                    <div className="h-32 bg-neutral-900 flex items-center justify-center border-b border-neutral-800 overflow-hidden relative">
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
                                            <h3 className="font-medium text-white group-hover:text-neutral-300 transition-colors text-sm">
                                                {component.name}
                                            </h3>
                                            <div className="flex gap-1">
                                                {component.isNew && (
                                                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-medium px-2 py-0.5 rounded">
                                                        New
                                                    </span>
                                                )}
                                                {component.isPro ? (
                                                    <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-medium px-2 py-0.5 rounded">
                                                        PRO
                                                    </span>
                                                ) : (
                                                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-medium px-2 py-0.5 rounded">
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
                    </main>
                </div>
            </div>
        </div>
    );
}
