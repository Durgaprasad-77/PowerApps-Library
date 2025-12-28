"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Settings2, Heart, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { BackgroundPattern } from "../data/patterns";
import {
    processSvgTemplate,
    generateYamlCode,
    copyToClipboard,
    defaultConfig,
    BackgroundConfig
} from "../lib/svg-to-yaml";
import { DeviceMode } from "./device-toggle";

interface BackgroundCardProps {
    pattern: BackgroundPattern;
    config?: BackgroundConfig;
    onCustomize?: (pattern: BackgroundPattern) => void;
    isFavorite?: boolean;
    onToggleFavorite?: (id: string) => void;
    deviceMode?: DeviceMode;
}

export function BackgroundCard({
    pattern,
    config: providedConfig,
    onCustomize,
    isFavorite = false,
    onToggleFavorite,
    deviceMode = "web"
}: BackgroundCardProps) {
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    // Track mounting for hydration safety
    useEffect(() => {
        setMounted(true);
    }, []);

    // Use theme-aware default background color (only after mounted)
    const backgroundColor = mounted && resolvedTheme === 'light' ? '#f5f5f5' : '#0A0A0A';
    const themeAwareConfig: BackgroundConfig = {
        ...defaultConfig,
        backgroundColor,
        ...providedConfig,
    };

    const processedSvg = processSvgTemplate(pattern.svgTemplate, themeAwareConfig);
    const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(processedSvg)}`;

    const isPremium = pattern.category === "animated" || pattern.subcategory === "premium";

    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const yamlCode = generateYamlCode(
            `img${pattern.name.replace(/\s+/g, "")}Background`,
            processedSvg,
            pattern.imagePosition
        );

        const success = await copyToClipboard(yamlCode);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleCustomize = (e: React.MouseEvent) => {
        e.stopPropagation();
        onCustomize?.(pattern);
    };

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleFavorite?.(pattern.id);
    };

    return (
        <div
            className="group relative rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCustomize}
        >
            {/* Badges */}
            <div className="absolute top-2 left-2 z-10 flex gap-2">
                {isPremium && (
                    <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        Premium
                    </span>
                )}
                {pattern.category === "animated" && (
                    <span className="px-2 py-1 text-xs font-medium bg-blue-500/90 text-white rounded-full">
                        Animated
                    </span>
                )}
            </div>

            {/* Favorite Button */}
            <button
                onClick={handleFavorite}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-all duration-200 ${isFavorite
                    ? "bg-red-500 text-white"
                    : "bg-black/40 text-white/70 hover:bg-black/60 hover:text-white"
                    }`}
            >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            </button>

            {/* Preview Area */}
            <div
                className={`w-full relative ${deviceMode === "mobile" ? "aspect-[9/16]" : "aspect-[16/9]"
                    }`}
                style={{
                    backgroundColor: themeAwareConfig.backgroundColor,
                    backgroundImage: `url("${svgDataUri}")`,
                    backgroundRepeat: pattern.imagePosition === "Tile" ? "repeat" : "no-repeat",
                    backgroundSize: pattern.imagePosition === "Fill" ? "cover" : "auto",
                    backgroundPosition: "center",
                }}
            >
                {/* Hover Overlay */}
                <div
                    className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-3 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <button
                        onClick={handleCustomize}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors border border-white/20"
                    >
                        <Settings2 className="w-4 h-4" />
                        Customize
                    </button>
                    <button
                        onClick={handleCopy}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${copied
                            ? "bg-green-500 text-white"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                            }`}
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" />
                                Copy
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Info Section */}
            <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{pattern.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{pattern.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                    {pattern.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
