import { getCategories, getComponents } from "@/lib/data";
import { LibraryLayout } from "@/components/library/library-layout";
import { LibraryGrid } from "@/components/library/library-grid";

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
        <LibraryLayout categories={categories} components={components}>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">
                    Component Library
                </h1>
                <p className="text-neutral-400 text-sm">
                    {totalComponents} components • {freeComponents} free
                </p>
            </div>

            {/* Component Grid */}
            <LibraryGrid components={components} categories={categories} />
        </LibraryLayout>
    );
}
