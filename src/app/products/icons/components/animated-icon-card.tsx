"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatedIcon } from "../data/animated-icons";
import { processAnimatedSvg } from "../lib/animated-svg-to-yaml";

interface AnimatedIconCardProps {
    icon: AnimatedIcon;
    onClick: () => void;
}

export function AnimatedIconCard({ icon, onClick }: AnimatedIconCardProps) {
    const [isToggled, setIsToggled] = useState(false);
    const [timestamp, setTimestamp] = useState(() => Date.now().toString());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // For continuous animations (loaders), auto-restart the animation
    const isContinuous = icon.category === 'loaders';

    useEffect(() => {
        if (isContinuous && isToggled) {
            // For continuous animations, the CSS handles looping
            // No need for interval
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isContinuous, isToggled]);

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsToggled(!isToggled);
        setTimestamp(Date.now().toString());
    };

    // Generate the preview SVG
    const previewSvg = processAnimatedSvg(icon.svgTemplate, {
        size: 40,
        color: '#6366f1', // Indigo color for preview
        timestamp,
        isToggled,
    });

    return (
        <div
            onClick={onClick}
            className="group relative p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all cursor-pointer"
        >
            {/* Category Badge */}
            <div className="absolute top-2 right-2">
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 capitalize">
                    {icon.category}
                </span>
            </div>

            {/* Icon Preview */}
            <div className="flex flex-col items-center">
                <div
                    className="w-16 h-16 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800/50 mb-3"
                    dangerouslySetInnerHTML={{ __html: previewSvg }}
                />

                {/* Toggle Button */}
                <button
                    onClick={handleToggle}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors mb-2 ${isToggled
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                >
                    {isContinuous ? (isToggled ? 'Stop' : 'Play') : (isToggled ? 'Reset' : 'Animate')}
                </button>

                {/* Icon Name */}
                <h3 className="text-sm font-medium text-gray-900 dark:text-white text-center">
                    {icon.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1 line-clamp-2">
                    {icon.description}
                </p>
            </div>
        </div>
    );
}
