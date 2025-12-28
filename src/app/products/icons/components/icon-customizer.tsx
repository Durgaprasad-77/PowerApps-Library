"use client";

import { useState, useCallback, useEffect } from "react";
import { FluentIcon } from "@/services/icons-service";
import { generateIconYaml, generateImageFormula } from "../lib/svg-to-yaml";
import { X, Copy, Check } from "lucide-react";

interface IconCustomizerProps {
    icon: FluentIcon;
    isOpen: boolean;
    onClose: () => void;
}

// Well-spaced color palette
const PRESET_COLORS = [
    "#000000", "#6B7280", "#3B82F6", "#8B5CF6", "#10B981",
    "#F59E0B", "#EF4444", "#EC4899", "#FFFFFF",
];

const SIZES = [16, 20, 24, 32, 48, 64];

type CodeTab = 'yaml' | 'formula';

export function IconCustomizer({ icon, isOpen, onClose }: IconCustomizerProps) {
    const [color, setColor] = useState("#000000");
    const [size, setSize] = useState(24);
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<CodeTab>('yaml');

    // Apply color to SVG for preview
    const coloredSvg = icon.svg
        .replace(/currentColor/gi, color)
        .replace(/fill="(?!none)[^"]*"/gi, `fill="${color}"`);

    // Generate YAML code
    const yamlCode = generateIconYaml(icon.svg, {
        controlName: `img${icon.name.replace(/\s+/g, '')}`,
        width: size,
        height: size,
        color: color
    });

    // Generate Image formula only
    const imageFormula = generateImageFormula(icon.svg, color);

    const handleCopy = useCallback(async () => {
        try {
            const textToCopy = activeTab === 'yaml' ? yamlCode : imageFormula;
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }, [activeTab, yamlCode, imageFormula]);

    // Close on escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // Reset copied state when tab changes
    useEffect(() => {
        setCopied(false);
    }, [activeTab]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal - Spacious Layout */}
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-950 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800/50 overflow-hidden">
                {/* Header with Large Preview */}
                <div className="flex items-center gap-5 px-6 py-5 border-b border-gray-200 dark:border-gray-800/50">
                    {/* Large Preview */}
                    <div
                        className="w-16 h-16 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800/50"
                        dangerouslySetInnerHTML={{ __html: coloredSvg }}
                        style={{ color: color }}
                    />
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {icon.name}
                        </h2>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {icon.id} • {icon.style}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Main Content */}
                <div className="p-6 space-y-6">
                    {/* Color Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Color
                        </label>
                        <div className="flex items-center gap-4">
                            {/* Color Swatches */}
                            <div className="flex items-center gap-2">
                                {PRESET_COLORS.map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={`w-8 h-8 rounded-lg transition-all ${color === c
                                            ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-950 scale-110'
                                            : 'hover:scale-105'
                                            } ${c === '#FFFFFF' ? 'border border-gray-300 dark:border-gray-600' : ''}`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>

                            {/* Custom Color Picker */}
                            <div className="flex items-center gap-2 pl-4 border-l border-gray-200 dark:border-gray-700">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent"
                                />
                                <input
                                    type="text"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-24 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-mono text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Size Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Size (px)
                        </label>
                        <div className="flex items-center gap-2">
                            {SIZES.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSize(s)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${size === s
                                        ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-2 border-purple-300 dark:border-purple-500/50'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Code Section */}
                    <div>
                        {/* Tab Header */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800/50">
                                <button
                                    onClick={() => setActiveTab('yaml')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'yaml'
                                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                >
                                    YAML
                                </button>
                                <button
                                    onClick={() => setActiveTab('formula')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'formula'
                                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                >
                                    Image Formula
                                </button>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>

                        {/* Code Block */}
                        <pre className="p-5 rounded-xl bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-300 text-sm overflow-x-auto max-h-48 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            <code className={activeTab === 'formula' ? 'break-all' : ''}>
                                {activeTab === 'yaml' ? yamlCode : imageFormula}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
