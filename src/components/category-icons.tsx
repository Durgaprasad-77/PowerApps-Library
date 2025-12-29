// Skeleton SVG icons for each category
// These are minimalist line-art representations

export const CategoryIcons: Record<string, React.FC<{ className?: string }>> = {
    tabs: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="6" width="6" height="4" rx="1" />
            <rect x="9" y="6" width="6" height="4" rx="1" strokeOpacity="0.4" />
            <rect x="16" y="6" width="6" height="4" rx="1" strokeOpacity="0.4" />
            <rect x="2" y="10" width="20" height="10" rx="1" />
        </svg>
    ),

    buttons: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="8" width="18" height="8" rx="4" />
            <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
    ),

    navigation: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="4" rx="1" />
            <line x1="5" y1="5" x2="7" y2="5" />
            <line x1="10" y1="5" x2="12" y2="5" strokeOpacity="0.4" />
            <line x1="15" y1="5" x2="17" y2="5" strokeOpacity="0.4" />
            <rect x="2" y="9" width="20" height="12" rx="1" strokeOpacity="0.3" />
        </svg>
    ),

    feedback: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 6h18v10a2 2 0 0 1-2 2H7l-4 4V6z" />
            <line x1="7" y1="10" x2="17" y2="10" strokeOpacity="0.4" />
            <line x1="7" y1="13" x2="13" y2="13" strokeOpacity="0.4" />
        </svg>
    ),

    forms: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="5" rx="1" />
            <line x1="6" y1="6.5" x2="8" y2="6.5" strokeOpacity="0.4" />
            <rect x="3" y="11" width="18" height="5" rx="1" />
            <line x1="6" y1="13.5" x2="12" y2="13.5" strokeOpacity="0.4" />
            <rect x="3" y="18" width="8" height="3" rx="1" fill="currentColor" fillOpacity="0.2" />
        </svg>
    ),

    "app-shells": ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="2" />
            <line x1="2" y1="6" x2="22" y2="6" />
            <line x1="8" y1="6" x2="8" y2="22" />
            <circle cx="4.5" cy="4" r="0.5" fill="currentColor" />
            <circle cx="6.5" cy="4" r="0.5" fill="currentColor" />
        </svg>
    ),

    modals: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="16" height="16" rx="2" strokeOpacity="0.3" />
            <rect x="6" y="6" width="16" height="14" rx="2" fill="currentColor" fillOpacity="0.05" />
            <line x1="10" y1="10" x2="18" y2="10" strokeOpacity="0.4" />
            <line x1="10" y1="13" x2="16" y2="13" strokeOpacity="0.4" />
            <line x1="10" y1="16" x2="14" y2="16" strokeOpacity="0.4" />
        </svg>
    ),

    cards: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <rect x="6" y="6" width="12" height="5" rx="1" fill="currentColor" fillOpacity="0.1" />
            <line x1="6" y1="14" x2="18" y2="14" strokeOpacity="0.4" />
            <line x1="6" y1="17" x2="14" y2="17" strokeOpacity="0.4" />
        </svg>
    ),
};

// Get icon component by category slug
export function getCategoryIcon(slug: string): React.FC<{ className?: string }> {
    return CategoryIcons[slug] || CategoryIcons.cards;
}

// Stable CategoryIcon component that avoids creating components during render
export function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
    const Icon = CategoryIcons[slug] || CategoryIcons.cards;
    return <Icon className={className} />;
}
