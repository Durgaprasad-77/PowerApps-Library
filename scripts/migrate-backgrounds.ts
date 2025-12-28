
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { patterns } from '../src/app/products/backgrounds/data/patterns';
import { gradients } from '../src/app/products/backgrounds/data/gradients';
import { shapes } from '../src/app/products/backgrounds/data/shapes';
import { textures } from '../src/app/products/backgrounds/data/textures';
import { animated } from '../src/app/products/backgrounds/data/animated';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Using service role key if available for write access, otherwise will fail if RLS blocks writes
// For this script, assume we might need SERVICE_ROLE_KEY if public write is disabled.
// But based on user context, we might only have anon key. Let's try with anon first, 
// if it fails we might need to ask user for service role key or temporarily enable public insert.
// Wait, I am the developer, I can enable public insert via SQL too if needed. 
// Let's use the provided keys.

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const allBackgrounds = [
    ...patterns,
    ...gradients,
    ...shapes,
    ...textures,
    ...animated,
];

async function migrate() {
    console.log(`Starting migration of ${allBackgrounds.length} backgrounds...`);

    // Transform data to snake_case for DB
    const dataToInsert = allBackgrounds.map(b => ({
        id: b.id,
        name: b.name,
        category: b.category,
        subcategory: b.subcategory,
        description: b.description,
        svg_template: b.svgTemplate,
        image_position: b.imagePosition,
        tags: b.tags,
    }));

    // Batch insert
    const { error } = await supabase.from('backgrounds').upsert(dataToInsert, { onConflict: 'id' });

    if (error) {
        console.error('Migration failed:', error);
    } else {
        console.log('Migration successful!');
    }
}

migrate();
