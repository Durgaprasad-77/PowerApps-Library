import Link from "next/link";
import { Plus } from "lucide-react";
import { getCategories } from "@/lib/data";
import { CategoriesTable } from "./categories-table";

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
    const categories = await getCategories();

    // Transform to plain data for client component
    const data = categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        orderIndex: cat.orderIndex,
        componentsCount: cat.componentsCount,
        freeCount: cat.freeCount,
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Categories</h1>
                <Link
                    href="/admin/categories/new"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Category
                </Link>
            </div>

            <CategoriesTable categories={data} />
        </div>
    );
}
