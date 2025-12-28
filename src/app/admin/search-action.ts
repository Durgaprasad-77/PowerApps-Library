"use server";

import { createClient } from "@/lib/supabase/server";
import { checkAdminAccess } from "@/lib/auth";

export interface SearchResult {
    type: "component" | "category" | "user";
    id: string;
    title: string;
    subtitle: string;
    href: string;
}

export async function globalSearch(query: string): Promise<SearchResult[]> {
    await checkAdminAccess();

    if (!query || query.length < 2) return [];

    const supabase = await createClient();
    const results: SearchResult[] = [];
    const searchTerm = `%${query.toLowerCase()}%`;

    // Search components
    const { data: components } = await supabase
        .from("components")
        .select("id, name, slug, category_slug")
        .or(`name.ilike.${searchTerm},slug.ilike.${searchTerm}`)
        .limit(5);

    components?.forEach(c => {
        results.push({
            type: "component",
            id: c.id,
            title: c.name,
            subtitle: `/${c.category_slug}/${c.slug}`,
            href: `/admin/components/${c.id}`,
        });
    });

    // Search categories
    const { data: categories } = await supabase
        .from("categories")
        .select("id, name, slug")
        .or(`name.ilike.${searchTerm},slug.ilike.${searchTerm}`)
        .limit(3);

    categories?.forEach(c => {
        results.push({
            type: "category",
            id: c.id,
            title: c.name,
            subtitle: `/${c.slug}`,
            href: `/admin/categories/${c.id}`,
        });
    });

    return results;
}
