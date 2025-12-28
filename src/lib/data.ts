import { createClient } from './supabase/server';
import { Category, Component } from './types';
import { ComponentSettingsSchema } from './settings-types';

// Database row types for proper typing
interface CategoryRow {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    icon: string | null;
    order_index: number;
    components_count?: number;
    free_count?: number;
}

interface ComponentRow {
    id: string;
    name: string;
    slug: string;
    category_slug: string;
    description: string | null;
    yaml_code: string;
    preview_image: string | null;
    is_pro: boolean;
    is_new: boolean;
    settings_schema: Record<string, unknown> | null;
    default_settings: Record<string, unknown> | null;
    created_at: string;
    updated_at: string;
}

// Helper to map DB snake_case to TS camelCase
function mapCategory(row: CategoryRow): Category {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description ?? '',
        icon: row.icon ?? '',
        orderIndex: row.order_index,
        componentsCount: row.components_count ?? 0,
        freeCount: row.free_count ?? 0,
    };
}

function mapComponent(row: ComponentRow): Component {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        category: row.category_slug,
        description: row.description ?? '',
        yamlCode: row.yaml_code,
        previewImage: row.preview_image ?? undefined,
        isPro: row.is_pro,
        isNew: row.is_new,
        settingsSchema: row.settings_schema as unknown as ComponentSettingsSchema | undefined,
        defaultSettings: row.default_settings ?? undefined,
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

export async function getCategoryById(id: string): Promise<Category | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return null;
    return mapCategory(data);
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

export async function getComponentById(id: string): Promise<Component | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('components')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching component by id:', error);
        return null;
    }

    return mapComponent(data);
}

// ============================================
// ADMIN STATISTICS
// ============================================

export interface AdminStats {
    totalComponents: number;
    totalCategories: number;
    totalUsers: number;
    proComponents: number;
    freeComponents: number;
    newComponents: number;
    recentComponents: Component[];
}

export async function getAdminStats(): Promise<AdminStats> {
    const supabase = await createClient();

    // Fetch all counts in parallel
    const [componentsResult, categoriesResult, proResult, newResult, recentResult] = await Promise.all([
        supabase.from('components').select('*', { count: 'exact', head: true }),
        supabase.from('categories').select('*', { count: 'exact', head: true }),
        supabase.from('components').select('*', { count: 'exact', head: true }).eq('is_pro', true),
        supabase.from('components').select('*', { count: 'exact', head: true }).eq('is_new', true),
        supabase.from('components').select('*').order('created_at', { ascending: false }).limit(5),
    ]);

    const totalComponents = componentsResult.count || 0;
    const totalCategories = categoriesResult.count || 0;
    const proComponents = proResult.count || 0;
    const newComponents = newResult.count || 0;
    const recentComponents = (recentResult.data || []).map(mapComponent);

    return {
        totalComponents,
        totalCategories,
        totalUsers: 0, // Will be fetched separately with admin client
        proComponents,
        freeComponents: totalComponents - proComponents,
        newComponents,
        recentComponents,
    };
}
