"use client";

interface FluentIcon {
    id: string;
    name: string;
    style: 'regular' | 'filled';
    size: number;
    svg: string;
}

interface IconCardProps {
    icon: FluentIcon;
    onClick: () => void;
}

export function IconCard({ icon, onClick }: IconCardProps) {
    // Clean SVG: ensure it has proper viewBox and sizing
    const cleanSvg = icon.svg
        .replace(/width="[^"]*"/gi, '')
        .replace(/height="[^"]*"/gi, '')
        .replace('<svg', '<svg class="w-5 h-5"');

    return (
        <button
            onClick={onClick}
            className="group aspect-square flex items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            title={`${icon.name} (${icon.style})`}
        >
            {/* SVG Icon Container - Fixed size */}
            <div
                className="w-5 h-5 flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors [&>svg]:w-full [&>svg]:h-full"
                dangerouslySetInnerHTML={{ __html: cleanSvg }}
            />
        </button>
    );
}

