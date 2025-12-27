"use client";

import { ComponentPreview, hasPreview } from './component-mapper';
import { getCategoryIcon } from '@/components/category-icons';

interface CardPreviewProps {
    componentSlug: string;
    category: string;
}

// Components that need different scaling for card preview
const previewScaling: Record<string, { scale: number; width: string }> = {
    // Large components - smaller scale
    'form-group': { scale: 0.35, width: '280%' },
    'app-shell': { scale: 0.3, width: '320%' },
    'dashboard-layout': { scale: 0.3, width: '320%' },
    'sidebar-nav': { scale: 0.4, width: '250%' },
    'top-navbar': { scale: 0.45, width: '220%' },

    // Medium components - default scale
    'modal-dialog': { scale: 0.45, width: '220%' },
    'simple-modal': { scale: 0.45, width: '220%' },
    'bottom-sheet': { scale: 0.45, width: '220%' },
    'confirm-dialog': { scale: 0.45, width: '220%' },
    'alert-dialog': { scale: 0.45, width: '220%' },

    // Compact components - larger scale
    'simple-badge': { scale: 0.9, width: '110%' },
    'outline-badge': { scale: 0.9, width: '110%' },
    'icon-badge': { scale: 0.9, width: '110%' },
    'counter-badge': { scale: 0.9, width: '110%' },
    'status-dot': { scale: 0.9, width: '110%' },
    'pulsing-badge': { scale: 0.9, width: '110%' },
    'dismissible-chip': { scale: 0.85, width: '115%' },
    'avatar-status': { scale: 0.8, width: '120%' },
    'gradient-badge': { scale: 0.7, width: '140%' },
    'loading-spinner': { scale: 0.8, width: '125%' },
    'toggle-switch': { scale: 0.8, width: '125%' },
};

// Default scaling for components not in the list
const defaultScaling = { scale: 0.6, width: '180%' };

export function CardPreview({ componentSlug, category }: CardPreviewProps) {
    const IconComponent = getCategoryIcon(category);

    // Check if we have a live preview for this component
    if (!hasPreview(componentSlug)) {
        return (
            <div className="h-full flex items-center justify-center">
                <IconComponent className="w-12 h-12 text-[#333333] group-hover:text-[#4a4a4a] transition-colors" />
            </div>
        );
    }

    const scaling = previewScaling[componentSlug] || defaultScaling;

    return (
        <div className="h-full flex items-center justify-center p-3 pointer-events-none">
            <div
                className="origin-center flex items-center justify-center"
                style={{
                    transform: `scale(${scaling.scale})`,
                    width: scaling.width,
                }}
            >
                <ComponentPreview
                    componentSlug={componentSlug}
                    settings={{}}
                    variant="card"
                />
            </div>
        </div>
    );
}
