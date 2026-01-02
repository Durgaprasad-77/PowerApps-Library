"use client";

import { ChevronRight, Home } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';

interface BreadcrumbPreviewProps {
    settings: SettingsValues;
}

export function BreadcrumbPreview({ settings }: BreadcrumbPreviewProps) {
    const items = (settings.items as string[]) || ['Home', 'Products', 'Electronics'];
    const separatorColor = (settings.separatorColor as string) || '#6b6b6b';
    const textColor = (settings.textColor as string) || '#6b6b6b';
    const activeColor = (settings.activeColor as string) || '#999999';

    return (
        <nav className="flex items-center gap-1">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                    {index === 0 && (
                        <Home className="w-4 h-4" style={{ color: textColor }} />
                    )}
                    <span
                        className="text-sm hover:underline cursor-pointer"
                        style={{
                            color: index === items.length - 1 ? activeColor : textColor,
                            fontWeight: index === items.length - 1 ? 500 : 400,
                        }}
                    >
                        {item}
                    </span>
                    {index < items.length - 1 && (
                        <ChevronRight className="w-4 h-4" style={{ color: separatorColor }} />
                    )}
                </div>
            ))}
        </nav>
    );
}
