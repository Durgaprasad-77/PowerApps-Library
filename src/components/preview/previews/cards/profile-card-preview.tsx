"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';

interface ProfileCardPreviewProps {
    settings: SettingsValues;
}

export function ProfileCardPreview({ settings }: ProfileCardPreviewProps) {
    const [isFollowing, setIsFollowing] = useState(false);

    const name = (settings.name as string) || 'John Doe';
    const role = (settings.role as string) || 'Software Engineer';
    const initials = (settings.initials as string) || 'JD';
    const avatarColor = (settings.avatarColor as string) || '#3b82f6';
    const backgroundColor = (settings.backgroundColor as string) || '#ffffff';
    const buttonColor = (settings.buttonColor as string) || '#3b82f6';
    const borderRadius = (settings.borderRadius as number) || 16;

    return (
        <div
            className="w-full max-w-[280px] p-6 text-center shadow-lg"
            style={{
                backgroundColor,
                borderRadius: `${borderRadius}px`,
                border: '1px solid #e5e7eb',
            }}
        >
            {/* Avatar */}
            <div
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: avatarColor }}
            >
                <span className="text-white text-2xl font-bold">{initials}</span>
            </div>

            {/* Name & Role */}
            <h3 className="text-[#111827] font-bold text-lg mb-1">{name}</h3>
            <p className="text-[#6b7280] text-sm mb-5">{role}</p>

            {/* Follow Button */}
            <button
                onClick={() => setIsFollowing(!isFollowing)}
                className="w-full py-2.5 rounded-full font-semibold text-sm transition-all duration-200"
                style={{
                    backgroundColor: isFollowing ? 'transparent' : buttonColor,
                    color: isFollowing ? buttonColor : '#ffffff',
                    border: `2px solid ${buttonColor}`,
                }}
            >
                {isFollowing ? 'Following' : 'Follow'}
            </button>
        </div>
    );
}
