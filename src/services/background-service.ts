import { createClient } from '@/lib/supabase/server';
import { BackgroundPattern } from '@/app/products/backgrounds/data';

// Database row type (snake_case from Supabase)
interface BackgroundRow {
    id: string;
    name: string;
    category: string;
    subcategory: string;
    description: string;
    svg_template: string;
    image_position: string;
    tags: string[];
    created_at?: string;
}

// Map DB snake_case to camelCase
function mapBackground(bg: BackgroundRow): BackgroundPattern {
    return {
        id: bg.id,
        name: bg.name,
        category: bg.category as BackgroundPattern['category'],
        subcategory: bg.subcategory,
        description: bg.description,
        svgTemplate: bg.svg_template,
        imagePosition: bg.image_position as BackgroundPattern['imagePosition'],
        tags: bg.tags,
    };
}

export async function getBackgrounds(): Promise<BackgroundPattern[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('backgrounds')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching backgrounds:', error);
        return [];
    }

    return (data || []).map(mapBackground);
}

export async function getBackgroundsByCategory(category: string): Promise<BackgroundPattern[]> {
    const supabase = await createClient();
    let query = supabase.from('backgrounds').select('*');

    if (category !== 'all') {
        query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
        console.error(`Error fetching backgrounds for category ${category}:`, error);
        return [];
    }

    return (data || []).map(mapBackground);
}

export async function getBackgroundById(id: string): Promise<BackgroundPattern | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('backgrounds')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching background ${id}:`, error);
        return null;
    }

    return mapBackground(data);
}
