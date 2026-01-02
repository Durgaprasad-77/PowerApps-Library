import { getCategories, getComponents } from "@/lib/data";
import { LibraryClient } from "@/components/library/library-client";

export const metadata = {
    title: "Component Library | PowerUI",
    description: "Browse all Power Apps components with copy-paste ready YAML code.",
};

export default async function LibraryPage() {
    const categories = await getCategories();
    const components = await getComponents();

    const totalComponents = components.length;
    const freeComponents = components.filter(c => !c.isPro).length;

    return (
        <div className="min-h-screen pt-20 bg-black">
            {/* Header */}
            <div className="border-b border-neutral-800">
                <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-2xl font-bold text-white mb-1">
                        Component Library
                    </h1>
                    <p className="text-neutral-500 text-sm">
                        {totalComponents} components • {freeComponents} free
                    </p>
                </div>
            </div>

            <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <LibraryClient components={components} categories={categories} />
            </div>
        </div>
    );
}
