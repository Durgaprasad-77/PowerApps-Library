"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatedIcon } from "../data/animated-icons";
import {
    processAnimatedSvg,
    generateAnimatedIconYaml,
    generateOnSelectFormula,
    generateInitFormula,
} from "../lib/animated-svg-to-yaml";
import { X, Copy, Check, Play, RotateCcw, Info } from "lucide-react";

interface AnimatedIconCustomizerProps {
    icon: AnimatedIcon;
    isOpen: boolean;
    onClose: () => void;
}

// Color palette
const PRESET_COLORS = [
    "#000000", "#6B7280", "#3B82F6", "#8B5CF6", "#10B981",
    "#F59E0B", "#EF4444", "#EC4899", "#FFFFFF",
];

const SIZES = [16, 20, 24, 32, 48, 64];

type CodeTab = 'yaml' | 'onselect' | 'init';

export function AnimatedIconCustomizer({ icon, isOpen, onClose }: AnimatedIconCustomizerProps) {
    const [color, setColor] = useState("#6366f1");
    const [size, setSize] = useState(32);
    const [toggleVariable, setToggleVariable] = useState(icon.toggleVariable);
    const [timestampVariable, setTimestampVariable] = useState(icon.timestampVariable);
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<CodeTab>('yaml');
    const [isToggled, setIsToggled] = useState(false);
    const [timestamp, setTimestamp] = useState(() => Date.now().toString());

    // Reset state when icon changes
    useEffect(() => {
        setToggleVariable(icon.toggleVariable);
        setTimestampVariable(icon.timestampVariable);
        setIsToggled(false);
        setTimestamp(Date.now().toString());
    }, [icon]);

    // Generate preview SVG
    const previewSvg = processAnimatedSvg(icon.svgTemplate, {
        size: 80,
        color,
        timestamp,
        isToggled,
    });

    // Generate code based on tab
    const getCode = useCallback(() => {
        switch (activeTab) {
            case 'yaml':
                return generateAnimatedIconYaml(icon, {
                    controlName: `img${icon.name.replace(/\s+/g, '')}`,
                    size,
                    color,
                    toggleVariable,
                    timestampVariable,
                });
            case 'onselect':
                return generateOnSelectFormula(toggleVariable, timestampVariable);
            case 'init':
                return generateInitFormula(toggleVariable, timestampVariable);
            default:
                return '';
        }
    }, [activeTab, icon, size, color, toggleVariable, timestampVariable]);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(getCode());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }, [getCode]);

    const handleTogglePreview = () => {
        setIsToggled(!isToggled);
        setTimestamp(Date.now().toString());
    };

    const handleResetPreview = () => {
        setIsToggled(false);
        setTimestamp(Date.now().toString());
    };

    // Close on escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    useEffect(() => {
        setCopied(false);
    }, [activeTab]);

    if (!isOpen) return null;

    const isContinuous = icon.category === 'loaders';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-3xl bg-white dark:bg-gray-950 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800/50 overflow-hidden max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-200 dark:border-gray-800/50">
                    <div
                        className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800/50"
                        dangerouslySetInnerHTML={{ __html: previewSvg }}
                    />
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {icon.name}
                        </h2>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {icon.description}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Preview Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Live Preview
                        </label>
                        <div className="flex items-center gap-4 p-6 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                            <div
                                className="w-24 h-24 flex items-center justify-center rounded-xl bg-white dark:bg-gray-900 shadow-inner"
                                dangerouslySetInnerHTML={{ __html: previewSvg }}
                            />
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={handleTogglePreview}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium transition-colors"
                                >
                                    <Play className="w-4 h-4" />
                                    {isContinuous ? (isToggled ? 'Stop' : 'Play') : 'Toggle Animation'}
                                </button>
                                <button
                                    onClick={handleResetPreview}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-medium transition-colors"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Color Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Color
                        </label>
                        <div className="flex items-center gap-4">
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
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Variable Names Section */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Toggle Variable
                            </label>
                            <input
                                type="text"
                                value={toggleVariable}
                                onChange={(e) => setToggleVariable(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-mono text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="gblToggle"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Timestamp Variable
                            </label>
                            <input
                                type="text"
                                value={timestampVariable}
                                onChange={(e) => setTimestampVariable(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-mono text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="gblTimestamp"
                            />
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-700 dark:text-blue-400">
                            <strong>Setup:</strong> Add the Init formula to your Screen's <code className="px-1 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20">OnVisible</code> property to initialize the variables.
                        </div>
                    </div>

                    {/* Code Section */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800/50">
                                <button
                                    onClick={() => setActiveTab('yaml')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'yaml'
                                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                >
                                    Full YAML
                                </button>
                                <button
                                    onClick={() => setActiveTab('onselect')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'onselect'
                                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                >
                                    OnSelect
                                </button>
                                <button
                                    onClick={() => setActiveTab('init')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'init'
                                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                >
                                    Init
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

                        <pre className="p-5 rounded-xl bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-300 text-sm overflow-x-auto max-h-64 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            <code>{getCode()}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
