import { NextRequest, NextResponse } from 'next/server';

const ICONIFY_API_BASE = 'https://api.iconify.design';
const FLUENT_PREFIX = 'fluent';
const ICONS_PER_PAGE = 50;

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

// Cache the icon list in memory
let cachedIconList: string[] | null = null;

async function fetchIconList(): Promise<string[]> {
    if (cachedIconList) return cachedIconList;

    const response = await fetch(
        `${ICONIFY_API_BASE}/collection?prefix=${FLUENT_PREFIX}`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch icon collection: ${response.statusText}`);
    }

    const data: IconifyCollectionResponse = await response.json();

    const allIcons: string[] = [...(data.uncategorized || [])];
    if (data.categories) {
        Object.values(data.categories).forEach(icons => {
            allIcons.push(...icons);
        });
    }

    cachedIconList = allIcons.sort((a, b) => a.localeCompare(b));
    return cachedIconList;
}

function parseIconName(iconId: string): { name: string; size: number; style: 'regular' | 'filled' } {
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

async function getIconsSvg(iconIds: string[]): Promise<Record<string, string>> {
    if (iconIds.length === 0) return {};

    const response = await fetch(
        `${ICONIFY_API_BASE}/${FLUENT_PREFIX}.json?icons=${iconIds.join(',')}`
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

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const style = searchParams.get('style') as 'regular' | 'filled' | null;
        const search = searchParams.get('search');

        // Handle search
        if (search) {
            const searchResponse = await fetch(
                `${ICONIFY_API_BASE}/search?query=${encodeURIComponent(search)}&prefix=${FLUENT_PREFIX}&limit=100`
            );

            if (!searchResponse.ok) {
                throw new Error('Search failed');
            }

            const searchData = await searchResponse.json();
            let iconIds: string[] = (searchData.icons || []).map((id: string) =>
                id.replace(`${FLUENT_PREFIX}:`, '')
            );

            // Apply style filter to search results
            if (style) {
                iconIds = iconIds.filter((id: string) => id.endsWith(`-${style}`));
            }

            const svgMap = await getIconsSvg(iconIds);

            const icons = iconIds.map((id: string) => {
                const { name, size, style: iconStyle } = parseIconName(id);
                return { id, name, style: iconStyle, size, svg: svgMap[id] || '' };
            });

            return NextResponse.json({
                icons,
                total: icons.length,
                page: 1,
                totalPages: 1
            });
        }

        // Handle paginated list
        const allIcons = await fetchIconList();

        let filteredIcons = allIcons;
        if (style) {
            filteredIcons = allIcons.filter(id => id.endsWith(`-${style}`));
        }

        const total = filteredIcons.length;
        const totalPages = Math.ceil(total / ICONS_PER_PAGE);
        const startIndex = (page - 1) * ICONS_PER_PAGE;
        const endIndex = startIndex + ICONS_PER_PAGE;
        const pageIcons = filteredIcons.slice(startIndex, endIndex);

        const svgMap = await getIconsSvg(pageIcons);

        const icons = pageIcons.map(id => {
            const { name, size, style: iconStyle } = parseIconName(id);
            return { id, name, style: iconStyle, size, svg: svgMap[id] || '' };
        });

        return NextResponse.json({
            icons,
            total,
            page,
            totalPages
        });

    } catch (error) {
        console.error('Icons API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch icons' },
            { status: 500 }
        );
    }
}
