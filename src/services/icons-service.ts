/**
 * Icons Service - Fetches Fluent UI icons from Iconify API
 * https://api.iconify.design/
 */

const ICONIFY_API_BASE = 'https://api.iconify.design';
const FLUENT_PREFIX = 'fluent';
const ICONS_PER_PAGE = 50;

export interface FluentIcon {
    id: string;         // e.g., "home-24-regular"
    name: string;       // Display name, e.g., "Home"
    style: 'regular' | 'filled';
    size: number;
    svg: string;        // Full SVG markup
}

interface IconifyCollectionResponse {
    prefix: string;
    total: number;
    title: string;
    uncategorized: string[];
    categories?: Record<string, string[]>;
}

interface IconifySvgResponse {
    icons: Record<string, { body: string; width?: number; height?: number }>;
    width?: number;
    height?: number;
}

// Cache for icon list to avoid repeated API calls
let cachedIconList: string[] | null = null;
let cachedTotalCount: number = 0;

/**
 * Fetch the complete list of icon names from Fluent collection
 */
async function fetchIconList(): Promise<string[]> {
    if (cachedIconList) return cachedIconList;

    const response = await fetch(
        `${ICONIFY_API_BASE}/collection?prefix=${FLUENT_PREFIX}`,
        { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch icon collection: ${response.statusText}`);
    }

    const data: IconifyCollectionResponse = await response.json();

    // Combine all icons from categories and uncategorized
    const allIcons: string[] = [...(data.uncategorized || [])];
    if (data.categories) {
        Object.values(data.categories).forEach(icons => {
            allIcons.push(...icons);
        });
    }

    // Sort alphabetically
    cachedIconList = allIcons.sort((a, b) => a.localeCompare(b));
    cachedTotalCount = cachedIconList.length;

    return cachedIconList;
}

/**
 * Parse icon name into components
 */
function parseIconName(iconId: string): { name: string; size: number; style: 'regular' | 'filled' } {
    // Format: name-size-style (e.g., "home-24-regular")
    const parts = iconId.split('-');
    const style = parts[parts.length - 1] as 'regular' | 'filled';
    const size = parseInt(parts[parts.length - 2]) || 24;
    const name = parts.slice(0, -2).join('-');

    return {
        name: name.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        size,
        style: style === 'filled' ? 'filled' : 'regular'
    };
}

/**
 * Fetch SVG content for a single icon
 */
export async function getIconSvg(iconId: string): Promise<string> {
    const response = await fetch(
        `${ICONIFY_API_BASE}/${FLUENT_PREFIX}/${iconId}.svg`,
        { next: { revalidate: 86400 } } // Cache for 24 hours
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch icon SVG: ${response.statusText}`);
    }

    return await response.text();
}

/**
 * Fetch SVG content for multiple icons
 */
async function getIconsSvg(iconIds: string[]): Promise<Record<string, string>> {
    if (iconIds.length === 0) return {};

    const response = await fetch(
        `${ICONIFY_API_BASE}/${FLUENT_PREFIX}.json?icons=${iconIds.join(',')}`,
        { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch icons: ${response.statusText}`);
    }

    const data: IconifySvgResponse = await response.json();
    const result: Record<string, string> = {};

    const defaultWidth = data.width || 24;
    const defaultHeight = data.height || 24;

    Object.entries(data.icons).forEach(([id, iconData]) => {
        const width = iconData.width || defaultWidth;
        const height = iconData.height || defaultHeight;
        result[id] = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${iconData.body}</svg>`;
    });

    return result;
}

/**
 * Get paginated list of Fluent icons
 */
export async function getFluentIcons(
    page: number = 1,
    style?: 'regular' | 'filled'
): Promise<{ icons: FluentIcon[]; total: number; page: number; totalPages: number }> {
    const allIcons = await fetchIconList();

    // Filter by style if specified
    let filteredIcons = allIcons;
    if (style) {
        filteredIcons = allIcons.filter(id => id.endsWith(`-${style}`));
    }

    const total = filteredIcons.length;
    const totalPages = Math.ceil(total / ICONS_PER_PAGE);
    const startIndex = (page - 1) * ICONS_PER_PAGE;
    const endIndex = startIndex + ICONS_PER_PAGE;
    const pageIcons = filteredIcons.slice(startIndex, endIndex);

    // Fetch SVG content for this page
    const svgMap = await getIconsSvg(pageIcons);

    const icons: FluentIcon[] = pageIcons.map(id => {
        const { name, size, style: iconStyle } = parseIconName(id);
        return {
            id,
            name,
            style: iconStyle,
            size,
            svg: svgMap[id] || ''
        };
    });

    return { icons, total, page, totalPages };
}

/**
 * Search icons by name
 */
export async function searchFluentIcons(
    query: string,
    limit: number = 50
): Promise<FluentIcon[]> {
    if (!query.trim()) return [];

    // Use Iconify search API
    const response = await fetch(
        `${ICONIFY_API_BASE}/search?query=${encodeURIComponent(query)}&prefix=${FLUENT_PREFIX}&limit=${limit}`,
        { next: { revalidate: 300 } } // Cache for 5 minutes
    );

    if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
    }

    const data = await response.json();
    const iconIds: string[] = data.icons || [];

    if (iconIds.length === 0) return [];

    // Extract just the icon name (remove prefix)
    const cleanIds = iconIds.map(id => id.replace(`${FLUENT_PREFIX}:`, ''));

    // Fetch SVG content
    const svgMap = await getIconsSvg(cleanIds);

    return cleanIds.map(id => {
        const { name, size, style } = parseIconName(id);
        return {
            id,
            name,
            style,
            size,
            svg: svgMap[id] || ''
        };
    });
}

/**
 * Get total count of icons
 */
export async function getIconCount(): Promise<number> {
    if (cachedTotalCount > 0) return cachedTotalCount;
    await fetchIconList();
    return cachedTotalCount;
}
