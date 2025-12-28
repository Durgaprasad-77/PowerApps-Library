"use client";

import { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface ProductCardPreviewProps {
    settings: SettingsValues;
}

export function ProductCardPreview({ settings }: ProductCardPreviewProps) {
    const { theme } = usePreviewTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    const name = (settings.name as string) || 'Premium Headphones';
    const price = (settings.price as number) || 299;
    const rating = (settings.rating as number) || 4.5;
    const backgroundColor = (settings.backgroundColor as string) || (theme === 'dark' ? '#111111' : '#ffffff');
    const borderColor = theme === 'dark' ? '#262626' : '#e5e7eb';
    const textColor = theme === 'dark' ? '#ffffff' : '#111827';
    const mutedColor = theme === 'dark' ? '#a1a1a1' : '#6b7280';
    const buttonColor = (settings.buttonColor as string) || '#3b82f6';
    const borderRadius = (settings.borderRadius as number) || 12;

    return (
        <div
            className="w-full max-w-[200px] overflow-hidden shadow-lg transition-transform duration-200"
            style={{
                backgroundColor,
                borderRadius: `${borderRadius}px`,
                border: `1px solid ${borderColor}`,
                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image placeholder */}
            <div
                className="h-24 flex items-center justify-center"
                style={{ background: theme === 'dark' ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)' }}
            >
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: theme === 'dark' ? '#374151' : '#d1d5db' }}
                >
                    <span className="text-2xl">🎧</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-3">
                <h3 className="text-sm font-semibold truncate" style={{ color: textColor }}>{name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1 my-1">
                    <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
                    <span className="text-xs" style={{ color: mutedColor }}>{rating}</span>
                </div>

                {/* Price + Button */}
                <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-bold" style={{ color: textColor }}>${price}</span>
                    <button
                        onClick={() => setIsInCart(!isInCart)}
                        title={isInCart ? 'Remove from cart' : 'Add to cart'}
                        className="p-1.5 rounded-full transition-colors"
                        style={{
                            backgroundColor: isInCart ? buttonColor : 'transparent',
                            border: `1.5px solid ${buttonColor}`,
                        }}
                    >
                        <ShoppingCart
                            className="w-4 h-4"
                            style={{ color: isInCart ? '#ffffff' : buttonColor }}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
