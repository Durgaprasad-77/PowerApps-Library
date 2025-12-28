"use client";

import { useState } from "react";
import { IconsGallery } from "./icons-gallery";
import { AnimatedIconsGallery } from "./animated-icons-gallery";
import { Sparkles, Grid3X3 } from "lucide-react";

// Type definition for icons (matches what the API returns)
interface FluentIcon {
    id: string;
    name: string;
    style: 'regular' | 'filled';
    size: number;
    svg: string;
}

interface IconsPageContentProps {
    initialIcons: FluentIcon[];
    initialTotal: number;
    initialTotalPages: number;
}

type IconTab = 'static' | 'animated';

export function IconsPageContent({
    initialIcons,
    initialTotal,
    initialTotalPages,
}: IconsPageContentProps) {
    const [activeTab, setActiveTab] = useState<IconTab>('static');

    return (
        <div>
            {/* Tab Switcher */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 w-fit mb-8">
                <button
                    onClick={() => setActiveTab('static')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'static'
                            ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                >
                    <Grid3X3 className="w-4 h-4" />
                    Static Icons
                </button>
                <button
                    onClick={() => setActiveTab('animated')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'animated'
                            ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                >
                    <Sparkles className="w-4 h-4" />
                    Animated Icons
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        NEW
                    </span>
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'static' ? (
                <IconsGallery
                    initialIcons={initialIcons}
                    initialTotal={initialTotal}
                    initialTotalPages={initialTotalPages}
                />
            ) : (
                <AnimatedIconsGallery />
            )}
        </div>
    );
}
