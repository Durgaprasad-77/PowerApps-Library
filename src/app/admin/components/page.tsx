import Link from "next/link";
import { Plus } from "lucide-react";
import { getComponents, getCategories } from "@/lib/data";
import { ComponentsTable } from "./components-table";

export const dynamic = 'force-dynamic';

export default async function AdminComponentsPage() {
    const [components, categories] = await Promise.all([
        getComponents(),
        getCategories(),
    ]);

    // Transform to plain data for client component
    const data = components.map(comp => ({
        id: comp.id,
        name: comp.name,
        slug: comp.slug,
        category: comp.category,
        isPro: comp.isPro,
        isNew: comp.isNew ?? false,
        hasSettingsSchema: !!comp.settingsSchema,
    }));

    // Categories for filter dropdown
    const categoryOptions = categories.map(cat => ({
        slug: cat.slug,
        name: cat.name,
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Components</h1>
                    <p className="text-[#6b6b6b] text-sm mt-1">Manage your component library</p>
                </div>
                <Link
                    href="/admin/components/new"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Component
                </Link>
            </div>

            <ComponentsTable components={data} categories={categoryOptions} />
        </div>
    );
}
