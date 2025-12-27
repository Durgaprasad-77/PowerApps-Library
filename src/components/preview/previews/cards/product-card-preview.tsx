"use client";

import { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';

interface ProductCardPreviewProps {
    settings: SettingsValues;
}

export function ProductCardPreview({ settings }: ProductCardPreviewProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    const name = (settings.name as string) || 'Premium Headphones';
    const price = (settings.price as number) || 299;
    const rating = (settings.rating as number) || 4.5;
    const backgroundColor = (settings.backgroundColor as string) || '#ffffff';
    const buttonColor = (settings.buttonColor as string) || '#3b82f6';
    const borderRadius = (settings.borderRadius as number) || 12;

    return (
        <div
            className="w-full max-w-[200px] overflow-hidden shadow-lg transition-transform duration-200"
            style={{
                backgroundColor,
                borderRadius: `${borderRadius}px`,
                border: '1px solid #e5e7eb',
                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image placeholder */}
            <div className="h-24 bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#d1d5db] flex items-center justify-center">
                    <span className="text-2xl">🎧</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-3">
                <h3 className="text-sm font-semibold text-[#111827] truncate">{name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1 my-1">
                    <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
                    <span className="text-xs text-[#6b7280]">{rating}</span>
                </div>

                {/* Price + Button */}
                <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-bold text-[#111827]">${price}</span>
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
