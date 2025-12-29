"use client";

import { useState } from "react";
import { Save, AlertCircle } from "lucide-react";
import { Category } from "@/lib/types";
import { upsertCategory } from "../actions";

interface CategoryFormProps {
    initialData?: Category | null;
}

export function CategoryForm({ initialData }: CategoryFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <form
            action={async (formData) => {
                setLoading(true);
                setError(null);
                try {
                    await upsertCategory(formData);
                } catch (e) {
                    const message = e instanceof Error ? e.message : "Failed to save category";
                    setError(message);
                    setLoading(false);
                }
            }}
            className="space-y-8 max-w-2xl"
        >
            {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">
                    {initialData ? `Edit ${initialData.name}` : "New Category"}
                </h1>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    <Save className="w-4 h-4" />
                    {loading ? "Saving..." : "Save Category"}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            <div className="card p-6 space-y-4 bg-[#0a0a0a] border border-[#262626] rounded-xl">
                <div className="space-y-2">
                    <label htmlFor="category-name" className="text-sm font-medium text-[#a1a1a1]">Name</label>
                    <input
                        id="category-name"
                        name="name"
                        defaultValue={initialData?.name}
                        required
                        className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="category-slug" className="text-sm font-medium text-[#a1a1a1]">Slug</label>
                    <input
                        id="category-slug"
                        name="slug"
                        defaultValue={initialData?.slug}
                        required
                        className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="category-description" className="text-sm font-medium text-[#a1a1a1]">Description</label>
                    <textarea
                        id="category-description"
                        name="description"
                        defaultValue={initialData?.description}
                        rows={3}
                        className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="category-order" className="text-sm font-medium text-[#a1a1a1]">Order Index</label>
                        <input
                            id="category-order"
                            type="number"
                            name="order_index"
                            defaultValue={initialData?.orderIndex}
                            className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="category-icon" className="text-sm font-medium text-[#a1a1a1]">Icon Name (Lucide)</label>
                        <input
                            id="category-icon"
                            name="icon"
                            defaultValue={initialData?.icon}
                            className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
