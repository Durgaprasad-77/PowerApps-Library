import { createClient } from './supabase/server';
import { Category, Component } from './types';

// Helper to map DB snake_case to TS camelCase
function mapCategory(row: any): Category {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        icon: row.icon,
        orderIndex: row.order_index,
        componentsCount: row.components_count,
        freeCount: row.free_count,
    };
}

function mapComponent(row: any): Component {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        category: row.category_slug,
        description: row.description,
        yamlCode: row.yaml_code,
        previewImage: row.preview_image,
        isPro: row.is_pro,
        isNew: row.is_new,
        settingsSchema: row.settings_schema,
        defaultSettings: row.default_settings,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export async function getCategories(): Promise<Category[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('order_index');

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return data.map(mapCategory);
}

export async function getComponents(categorySlug?: string): Promise<Component[]> {
    const supabase = await createClient();
    let query = supabase.from('components').select('*');

    if (categorySlug) {
        query = query.eq('category_slug', categorySlug);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching components:', error);
        return [];
    }

    return data.map(mapComponent);
}

export async function getComponent(slug: string, categorySlug: string): Promise<Component | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('components')
        .select('*')
        .eq('slug', slug)
        .eq('category_slug', categorySlug)
        .single();

    if (error) {
        console.error('Error fetching component:', error);
        return null;
    }

    return mapComponent(data);
}

export async function getFeaturedComponents(): Promise<Component[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('components')
        .select('*')
        .eq('is_new', true)
        .limit(4);

    if (error) {
        console.error('Error fetching featured components:', error);
        return [];
    }

    return data.map(mapComponent);
}
