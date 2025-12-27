"use client";

import { useState, use, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Copy, Check, Lock, Settings, Eye, BookOpen, Lightbulb, Code2 } from "lucide-react";
import { categories, getComponentBySlug, getCategoryBySlug } from "@/lib/components-data";
import { getCategoryIcon } from "@/components/category-icons";
import { SettingsPanel } from "@/components/settings/settings-panel";
import { getComponentSettingsSchema, hasComponentSettings } from "@/components/settings/schemas";
import { useComponentSettings } from "@/hooks/use-component-settings";
import { generateComponentYAML } from "@/lib/yaml-generator";
import { getDefaultSettings } from "@/lib/settings-types";
import { PreviewFrame } from "@/components/preview/preview-frame";
import { ComponentPreview, hasPreview } from "@/components/preview/component-mapper";
import { getComponentInstructions, hasInstructions } from "@/lib/component-instructions";

interface Props {
    params: Promise<{ category: string; component: string }>;
}

export default function ComponentDetailPage({ params }: Props) {
    const [copied, setCopied] = useState(false);
    const [activeView, setActiveView] = useState<'preview' | 'settings' | 'instructions'>('preview');
    const { category: categorySlug, component: componentSlug } = use(params);

    const component = getComponentBySlug(componentSlug);
    const category = getCategoryBySlug(categorySlug);

    // Get settings schema and instructions for this component
    const settingsSchema = getComponentSettingsSchema(componentSlug);
    const hasSettings = hasComponentSettings(componentSlug);
    const instructions = getComponentInstructions(componentSlug);
    const hasSetupInstructions = hasInstructions(componentSlug);

    // Use settings hook (with fallback for components without schemas)
    const fallbackSchema = { componentId: componentSlug, fields: [] };
    const {
        settings,
        updateSetting,
        resetToDefaults,
        hasChanges,
    } = useComponentSettings(settingsSchema || fallbackSchema);

    // Generate YAML with current settings (remove comments)
    const generatedYAML = useMemo(() => {
        if (!component) return '';
        let yaml = '';
        if (hasSettings && settingsSchema) {
            yaml = generateComponentYAML(componentSlug, component.yamlCode, settings);
        } else {
            yaml = component.yamlCode;
        }
        // Remove setup comments from YAML
        return yaml.replace(/\n\n?# Add to Screen\.OnVisible:[\s\S]*/g, '')
            .replace(/# Set\(.*\)/g, '')
            .trim();
    }, [component, componentSlug, settings, hasSettings, settingsSchema]);

    if (!component || !category) {
        notFound();
    }

    const CategoryIcon = getCategoryIcon(categorySlug);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(generatedYAML);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    // Check if user has access (TEMP: allow all for testing - Pro tag still visible)
    const hasAccess = true;

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="border-b border-[#1a1a1a]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href={`/library/${categorySlug}`}
                        className="inline-flex items-center gap-2 text-[#6b6b6b] hover:text-white text-sm mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to {category.name}
                    </Link>
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-xl font-bold text-white">
                                    {component.name}
                                </h1>
                                <div className="flex gap-2">
                                    {component.isNew && (
                                        <span className="badge-new text-xs font-medium px-2 py-0.5 rounded">
                                            New
                                        </span>
                                    )}
                                    {component.isPro ? (
                                        <span className="badge-pro text-xs font-medium px-2 py-0.5 rounded">
                                            PRO
                                        </span>
                                    ) : (
                                        <span className="badge-free text-xs font-medium px-2 py-0.5 rounded">
                                            Free
                                        </span>
                                    )}
                                    {hasSettings && (
                                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
                                            Customizable
                                        </span>
                                    )}
                                </div>
                            </div>
                            <p className="text-[#6b6b6b] text-sm">{component.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Column: Preview / Settings / Instructions */}
                    <div className="card overflow-hidden">
                        {/* Toggle Header with 3 tabs */}
                        <div className="px-4 py-3 border-b border-[#1a1a1a] bg-[#0a0a0a] flex items-center gap-2">
                            <button
                                onClick={() => setActiveView('preview')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeView === 'preview'
                                    ? 'bg-white text-black'
                                    : 'text-[#a1a1a1] hover:text-white'
                                    }`}
                            >
                                <Eye className="w-4 h-4" />
                                Preview
                            </button>
                            {hasSettings && (
                                <button
                                    onClick={() => setActiveView('settings')}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeView === 'settings'
                                        ? 'bg-white text-black'
                                        : 'text-[#a1a1a1] hover:text-white'
                                        }`}
                                >
                                    <Settings className="w-4 h-4" />
                                    Settings
                                    {hasChanges && (
                                        <span className="w-2 h-2 bg-white rounded-full" />
                                    )}
                                </button>
                            )}
                            {hasSetupInstructions && (
                                <button
                                    onClick={() => setActiveView('instructions')}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeView === 'instructions'
                                        ? 'bg-white text-black'
                                        : 'text-[#a1a1a1] hover:text-white'
                                        }`}
                                >
                                    <BookOpen className="w-4 h-4" />
                                    Instructions
                                </button>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-6 min-h-[400px]">
                            {activeView === 'preview' ? (
                                // Preview - live interactive component
                                <PreviewFrame>
                                    <ComponentPreview
                                        componentSlug={componentSlug}
                                        settings={settings}
                                    />
                                </PreviewFrame>
                            ) : activeView === 'settings' && hasSettings ? (
                                // Settings Panel
                                <SettingsPanel
                                    schema={settingsSchema!}
                                    settings={settings}
                                    onSettingChange={updateSetting}
                                    onReset={resetToDefaults}
                                    hasChanges={hasChanges}
                                    isPro={!component.isPro || hasAccess}
                                />
                            ) : activeView === 'instructions' && instructions ? (
                                // Instructions Panel
                                <div className="space-y-6">
                                    {/* Variables Section */}
                                    {instructions.variables.length > 0 && (
                                        <div>
                                            <h3 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                                                <Code2 className="w-4 h-4 text-blue-400" />
                                                Required Variables
                                            </h3>
                                            <div className="space-y-2">
                                                {instructions.variables.map((variable) => (
                                                    <div
                                                        key={variable.name}
                                                        className="bg-[#0a0a0a] rounded-lg p-3 border border-[#1a1a1a]"
                                                    >
                                                        <div className="flex items-center justify-between mb-1">
                                                            <code className="text-blue-400 text-sm font-mono">
                                                                {variable.name}
                                                            </code>
                                                            <code className="text-[#6b6b6b] text-xs font-mono">
                                                                default: {variable.defaultValue}
                                                            </code>
                                                        </div>
                                                        <p className="text-[#a1a1a1] text-xs">
                                                            {variable.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Screen.OnVisible Section */}
                                    {instructions.screenOnVisible && (
                                        <div>
                                            <h3 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                                                <Code2 className="w-4 h-4 text-green-400" />
                                                Add to Screen.OnVisible
                                            </h3>
                                            <div className="bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] overflow-hidden">
                                                <div className="px-3 py-2 border-b border-[#1a1a1a] flex items-center justify-between bg-[#111]">
                                                    <span className="text-xs text-[#6b6b6b]">Power Fx</span>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(instructions.screenOnVisible!);
                                                        }}
                                                        className="text-xs text-[#a1a1a1] hover:text-white transition-colors"
                                                    >
                                                        Copy
                                                    </button>
                                                </div>
                                                <pre className="p-3 text-sm font-mono text-green-400 overflow-x-auto">
                                                    <code>{instructions.screenOnVisible}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    )}

                                    {/* Tips Section */}
                                    {instructions.tips && instructions.tips.length > 0 && (
                                        <div>
                                            <h3 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                                                <Lightbulb className="w-4 h-4 text-yellow-400" />
                                                Pro Tips
                                            </h3>
                                            <ul className="space-y-2">
                                                {instructions.tips.map((tip, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-start gap-2 text-sm text-[#a1a1a1]"
                                                    >
                                                        <span className="text-yellow-400 mt-0.5">•</span>
                                                        {tip}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Empty state if no instructions */}
                                    {instructions.variables.length === 0 && !instructions.screenOnVisible && (!instructions.tips || instructions.tips.length === 0) && (
                                        <div className="text-center py-8 text-[#6b6b6b]">
                                            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No special setup required</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Fallback to Preview
                                <PreviewFrame>
                                    <ComponentPreview
                                        componentSlug={componentSlug}
                                        settings={settings}
                                    />
                                </PreviewFrame>
                            )}
                        </div>
                    </div>

                    {/* Right Column: YAML Code */}
                    <div className="card overflow-hidden">
                        <div className="px-4 py-3 border-b border-[#1a1a1a] bg-[#0a0a0a] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h2 className="font-medium text-white text-sm">YAML Code</h2>
                                {hasChanges && (
                                    <span className="text-xs text-[#a1a1a1]">• Modified</span>
                                )}
                            </div>
                            {hasAccess ? (
                                <button
                                    onClick={handleCopy}
                                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${copied
                                        ? "bg-white/10 text-white"
                                        : "bg-white text-black hover:bg-white/90"
                                        }`}
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3 h-3" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3 h-3" />
                                            Copy YAML
                                        </>
                                    )}
                                </button>
                            ) : (
                                <Link
                                    href="/pricing"
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium bg-white text-black hover:bg-white/90 transition-colors"
                                >
                                    <Lock className="w-3 h-3" />
                                    Unlock PRO
                                </Link>
                            )}
                        </div>
                        <div className="relative">
                            {!hasAccess && (
                                <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-10">
                                    <div className="text-center p-8">
                                        <Lock className="w-10 h-10 text-[#6b6b6b] mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-white mb-2">
                                            PRO Component
                                        </h3>
                                        <p className="text-[#6b6b6b] text-sm mb-4">
                                            Upgrade to unlock this component
                                        </p>
                                        <Link href="/pricing" className="btn-primary text-sm">
                                            Get PRO Access
                                        </Link>
                                    </div>
                                </div>
                            )}
                            <pre className="p-4 overflow-x-auto text-xs max-h-[450px] overflow-y-auto bg-[#0a0a0a] text-[#a1a1a1] leading-relaxed">
                                <code>{generatedYAML}</code>
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Quick Start Guide */}
                <div className="mt-8 card p-6">
                    <h2 className="font-medium text-white text-sm mb-4">Quick Start</h2>
                    <ol className="space-y-3 text-[#a1a1a1] text-sm">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-xs font-medium">
                                1
                            </span>
                            <span>
                                {hasSettings ? 'Customize settings, then copy the YAML code' : 'Copy the YAML code above'}
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-xs font-medium">
                                2
                            </span>
                            <span>Open Power Apps Studio and select a Screen or Container</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-xs font-medium">
                                3
                            </span>
                            <span>Paste the YAML code (Ctrl/Cmd + V)</span>
                        </li>
                        {hasSetupInstructions && instructions?.screenOnVisible && (
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-xs font-medium">
                                    4
                                </span>
                                <span>
                                    Check the <button
                                        onClick={() => setActiveView('instructions')}
                                        className="text-blue-400 hover:underline"
                                    >
                                        Instructions tab
                                    </button> for required setup code
                                </span>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
}
