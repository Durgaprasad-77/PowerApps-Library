import Link from "next/link";
import { getCategories, getComponents } from "@/lib/data";
import { getCategoryIcon } from "@/components/category-icons";
import { ComponentSearch } from "@/components/library/component-search";

export const metadata = {
    title: "Component Library | PowerAppLibs",
    description: "Browse all Power Apps components with copy-paste ready YAML code.",
};

export default async function LibraryPage() {
    const categories = await getCategories();
    const components = await getComponents();

    const totalComponents = components.length;
    const freeComponents = components.filter(c => !c.isPro).length;

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="border-b border-[#1a1a1a]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-2xl font-bold text-white mb-1">
                        Component Library
                    </h1>
                    <p className="text-[#6b6b6b] text-sm">
                        {totalComponents} components • {freeComponents} free
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-56 flex-shrink-0">
                        <div className="card p-4 sticky top-24">
                            <h2 className="font-medium text-white text-sm mb-4">Categories</h2>
                            <nav className="space-y-1">
                                <Link
                                    href="/library"
                                    className="flex items-center justify-between px-3 py-2 rounded-lg text-white bg-[#1a1a1a] text-sm font-medium"
                                >
                                    <span>All Components</span>
                                    <span className="text-[#6b6b6b]">{totalComponents}</span>
                                </Link>
                                {categories.map((category) => {
                                    const IconComponent = getCategoryIcon(category.slug);
                                    return (
                                        <Link
                                            key={category.id}
                                            href={`/library/${category.slug}`}
                                            className="flex items-center justify-between px-3 py-2 rounded-lg text-[#a1a1a1] hover:text-white hover:bg-[#1a1a1a] transition-colors text-sm"
                                        >
                                            <span className="flex items-center gap-2">
                                                <IconComponent className="w-4 h-4" />
                                                <span>{category.name}</span>
                                            </span>
                                            <span className="text-[#6b6b6b]">{category.componentsCount}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <ComponentSearch components={components} />
                    </main>
                </div>
            </div>
        </div>
    );
}
