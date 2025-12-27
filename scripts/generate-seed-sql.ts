
import { categories, components } from '../src/lib/components-data';

const escapeSql = (str: string | undefined | null) => {
    if (str === undefined || str === null) return 'NULL';
    // Escape single quotes by doubling them
    return `'${String(str).replace(/'/g, "''")}'`;
};

const escapeJson = (obj: any) => {
    if (obj === undefined || obj === null) return 'NULL';
    return `'${JSON.stringify(obj).replace(/'/g, "''")}'`;
};

console.log(`-- Seeding categories`);
console.log(`INSERT INTO public.categories (slug, name, description, icon, order_index, components_count, free_count) VALUES`);
const categoryValues = categories.map(c => {
    return `(${escapeSql(c.slug)}, ${escapeSql(c.name)}, ${escapeSql(c.description)}, ${escapeSql(c.icon)}, ${c.orderIndex}, ${c.componentsCount}, ${c.freeCount})`;
}).join(',\n');
console.log(`${categoryValues};`);

console.log(`\n-- Seeding components`);
console.log(`\n-- Seeding components in batches`);
const BATCH_SIZE = 5;
for (let i = 0; i < components.length; i += BATCH_SIZE) {
    const batch = components.slice(i, i + BATCH_SIZE);
    console.log(`INSERT INTO public.components (slug, category_slug, name, description, yaml_code, preview_image, is_pro, is_new, settings_schema, default_settings) VALUES`);
    const values = batch.map(c => {
        return `(${escapeSql(c.slug)}, ${escapeSql(c.category)}, ${escapeSql(c.name)}, ${escapeSql(c.description)}, ${escapeSql(c.yamlCode)}, ${escapeSql(c.previewImage)}, ${c.isPro}, ${c.isNew || false}, ${escapeJson(c.settingsSchema)}, ${escapeJson(c.defaultSettings)})`;
    }).join(',\n');
    console.log(`${values}`);
    console.log(`ON CONFLICT (slug, category_slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    yaml_code = EXCLUDED.yaml_code,
    preview_image = EXCLUDED.preview_image,
    is_pro = EXCLUDED.is_pro,
    is_new = EXCLUDED.is_new,
    settings_schema = EXCLUDED.settings_schema,
    default_settings = EXCLUDED.default_settings;`);
    console.log(''); // Empty line separator
}
