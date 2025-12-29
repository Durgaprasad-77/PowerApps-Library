"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { X, Copy, Check, RotateCcw } from "lucide-react";
import { BackgroundPattern } from "../data/patterns";
import { ColorPicker } from "./color-picker";
import { SliderControl } from "./slider-control";
import { DeviceMode, DEVICE_DIMENSIONS } from "./device-toggle";
import {
    processSvgTemplate,
    generateYamlCode,
    copyToClipboard,
    defaultConfig,
    BackgroundConfig,
} from "../lib/svg-to-yaml";

interface BackgroundCustomizerProps {
    pattern: BackgroundPattern;
    isOpen: boolean;
    onClose: () => void;
    deviceMode?: DeviceMode;
}

export function BackgroundCustomizer({
    pattern,
    isOpen,
    onClose,
    deviceMode = "web",
}: BackgroundCustomizerProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Track mounting for hydration safety
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: hydration safety pattern
        setMounted(true);
    }, []);

    // Theme-aware default config (only after mounted)
    const getThemeAwareConfig = (): BackgroundConfig => ({
        ...defaultConfig,
        backgroundColor: mounted && resolvedTheme === 'light' ? '#f5f5f5' : '#0A0A0A',
    });

    const [config, setConfig] = useState<BackgroundConfig>(defaultConfig);
    const [copied, setCopied] = useState(false);
    const [yamlCode, setYamlCode] = useState("");

    // Update config when theme changes after mount
    useEffect(() => {
        if (mounted) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: syncing with external system theme
            setConfig(prev => ({
                ...prev,
                backgroundColor: resolvedTheme === 'light' ? '#f5f5f5' : '#0A0A0A',
            }));
        }
    }, [mounted, resolvedTheme]);

    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: resetting config when modal opens
            setConfig(getThemeAwareConfig());
            setCopied(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- getThemeAwareConfig is stable
    }, [isOpen, pattern]);

    useEffect(() => {
        const processedSvg = processSvgTemplate(pattern.svgTemplate, config);
        const code = generateYamlCode(
            `img${pattern.name.replace(/\s+/g, "")}Background`,
            processedSvg,
            pattern.imagePosition
        );
        setYamlCode(code);
    }, [config, pattern]);

    const handleCopy = async () => {
        const success = await copyToClipboard(yamlCode);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleReset = () => {
        setConfig(getThemeAwareConfig());
    };

    const updateConfig = (key: keyof BackgroundConfig, value: string | number) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
    };

    if (!isOpen) return null;

    const processedSvg = processSvgTemplate(pattern.svgTemplate, config);
    const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(processedSvg)}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-5xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            {pattern.name}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {pattern.description}
                        </p>
                    </div>
                    <button
                        aria-label="Close customizer"
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                    {/* Preview Area */}
                    <div className="lg:col-span-2">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Live Preview ({deviceMode === "web" ? "Web 16:9" : "Mobile 9:16"})
                            </h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded">
                                {DEVICE_DIMENSIONS[deviceMode].width} × {DEVICE_DIMENSIONS[deviceMode].height}
                            </span>
                        </div>
                        <div className="flex justify-center items-center bg-gray-50 dark:bg-black rounded-xl p-4 border border-gray-200 dark:border-zinc-800">
                            <div
                                className={`rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-lg ${deviceMode === "mobile"
                                    ? "w-48 aspect-[9/16]"
                                    : "w-full max-w-lg aspect-[16/9]"
                                    }`}
                                style={{
                                    backgroundColor: config.backgroundColor,
                                    backgroundImage: `url("${svgDataUri}")`,
                                    backgroundRepeat: pattern.imagePosition === "Tile" ? "repeat" : "no-repeat",
                                    backgroundSize: pattern.imagePosition === "Fill"
                                        ? "cover"
                                        : `${config.scale * 30}px`, // Smaller size for tiled patterns to show full pattern
                                    backgroundPosition: "center",
                                }}
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                Customize
                            </h3>
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                            >
                                <RotateCcw className="w-3 h-3" />
                                Reset
                            </button>
                        </div>

                        <ColorPicker
                            label="Primary Color"
                            value={config.primaryColor}
                            onChange={(color) => updateConfig("primaryColor", color)}
                        />

                        <ColorPicker
                            label="Background Color"
                            value={config.backgroundColor}
                            onChange={(color) => updateConfig("backgroundColor", color)}
                        />

                        <SliderControl
                            label="Opacity"
                            value={config.opacity}
                            min={0.05}
                            max={1}
                            step={0.05}
                            onChange={(value) => updateConfig("opacity", value)}
                        />

                        <SliderControl
                            label="Scale"
                            value={config.scale}
                            min={0.5}
                            max={3}
                            step={0.1}
                            unit="x"
                            onChange={(value) => updateConfig("scale", value)}
                        />
                    </div>
                </div>

                {/* YAML Code Section */}
                <div className="px-6 pb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Power Apps YAML Code
                        </h3>
                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${copied
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
                                    Copy YAML
                                </>
                            )}
                        </button>
                    </div>
                    <pre className="p-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl overflow-x-auto text-sm font-mono text-gray-600 dark:text-gray-400 max-h-48">
                        <code>{yamlCode}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
