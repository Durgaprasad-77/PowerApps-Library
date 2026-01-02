"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Copy, Check, Lock, Settings, Eye, Code2, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

import { SettingsPanel } from "@/components/settings/settings-panel";
import { useComponentSettings } from "@/hooks/use-component-settings";
import { generateComponentYAML } from "@/lib/yaml-generator";
import { PreviewFrame } from "@/components/preview/preview-frame";
import { ComponentPreview } from "@/components/preview/component-mapper";
import { getComponentInstructions, hasInstructions } from "@/lib/component-instructions";
import { Component, Category } from "@/lib/types";
import { CodeHighlighter } from "@/components/ui/code-highlighter";

interface Props {
    component: Component;
    category: Category;
    categories: Category[];
    allComponents: Component[];
}

export function ComponentDetailClient({ component, category, categories, allComponents }: Props) {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const [showSettings, setShowSettings] = useState(false);

    const componentSlug = component.slug;

    // Get settings schema and instructions for this component
    const settingsSchema = component.settingsSchema;
    const hasSettings = !!settingsSchema && settingsSchema.fields && settingsSchema.fields.length > 0;
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
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">
                    {component.name}
                </h1>
                <p className="text-neutral-400 text-sm mb-4">{component.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {component.isNew && (
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium px-2.5 py-1 rounded-full">
                            New
                        </span>
                    )}
                    {component.isPro ? (
                        <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[11px] font-medium px-2.5 py-1 rounded-full">
                            Pro
                        </span>
                    ) : (
                        <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-medium px-2.5 py-1 rounded-full">
                            Free
                        </span>
                    )}
                    {hasSettings && (
                        <span className="bg-neutral-800 text-neutral-300 border border-neutral-700 text-[11px] font-medium px-2.5 py-1 rounded-full">
                            Customizable
                        </span>
                    )}
                    <span className="bg-neutral-800 text-neutral-400 border border-neutral-700 text-[11px] font-medium px-2.5 py-1 rounded-full capitalize">
                        {category.name}
                    </span>
                </div>
            </div>

            {/* Tab Bar */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-0">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-[1px] transition-colors ${activeTab === 'preview'
                            ? 'text-white border-white bg-neutral-900/50'
                            : 'text-neutral-400 border-transparent hover:text-white'
                            }`}
                    >
                        <Eye className="w-4 h-4" />
                        Preview
                    </button>
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-[1px] transition-colors ${activeTab === 'code'
                            ? 'text-white border-white bg-neutral-900/50'
                            : 'text-neutral-400 border-transparent hover:text-white'
                            }`}
                    >
                        <Code2 className="w-4 h-4" />
                        Code
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden">
                {activeTab === 'preview' ? (
                    <div className="min-h-[400px] p-6">
                        <PreviewFrame>
                            <ComponentPreview
                                componentSlug={componentSlug}
                                settings={settings}
                            />
                        </PreviewFrame>
                    </div>
                ) : (
                    <div className="relative">
                        {/* Copy Button - Top Right */}
                        {hasAccess && (
                            <div className="absolute top-3 right-3 z-10">
                                <button
                                    onClick={handleCopy}
                                    className="group p-2 rounded-md bg-neutral-800/80 hover:bg-neutral-700 border border-neutral-700 transition-all duration-200"
                                    title="Copy YAML"
                                >
                                    <div className="relative w-4 h-4">
                                        {/* Copy Icon */}
                                        <Copy
                                            className={`w-4 h-4 text-neutral-400 group-hover:text-white absolute inset-0 transition-all duration-300 ${copied ? 'opacity-0 scale-50 rotate-12' : 'opacity-100 scale-100 rotate-0'}`}
                                        />
                                        {/* Check Icon */}
                                        <Check
                                            className={`w-4 h-4 text-emerald-400 absolute inset-0 transition-all duration-300 ${copied ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-12'}`}
                                        />
                                    </div>
                                </button>
                            </div>
                        )}
                        {!hasAccess && (
                            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-10">
                                <div className="text-center p-8">
                                    <Lock className="w-10 h-10 text-neutral-500 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-white mb-2">
                                        PRO Component
                                    </h3>
                                    <p className="text-neutral-400 text-sm mb-4">
                                        Upgrade to unlock this component
                                    </p>
                                    <Link href="/pricing" className="btn-primary text-sm">
                                        Get PRO Access
                                    </Link>
                                </div>
                            </div>
                        )}
                        <CodeHighlighter
                            code={generatedYAML}
                            language="yaml"
                            showLineNumbers={true}
                            showCopyButton={false}
                            maxHeight="500px"
                        />
                    </div>
                )}
            </div>

            {/* Settings Section (Collapsible) */}
            {hasSettings && (
                <div className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-900/50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Settings className="w-5 h-5 text-neutral-400" />
                            <div>
                                <h3 className="text-white font-medium">Customize Settings</h3>
                                <p className="text-neutral-500 text-sm">Adjust component properties before copying</p>
                            </div>
                            {hasChanges && (
                                <span className="ml-2 w-2 h-2 bg-indigo-500 rounded-full" />
                            )}
                        </div>
                        {showSettings ? (
                            <ChevronUp className="w-5 h-5 text-neutral-400" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-neutral-400" />
                        )}
                    </button>
                    {showSettings && (
                        <div className="px-6 pb-6 border-t border-neutral-800">
                            <SettingsPanel
                                schema={settingsSchema!}
                                settings={settings}
                                onSettingChange={updateSetting}
                                onReset={resetToDefaults}
                                hasChanges={hasChanges}
                                isPro={!component.isPro || hasAccess}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Instructions Section */}
            {hasSetupInstructions && instructions && (
                <div className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden">
                    <div className="px-6 py-4 border-b border-neutral-800">
                        <h3 className="text-white font-medium">Instructions</h3>
                        <p className="text-neutral-500 text-sm">Setup requirements for this component</p>
                    </div>
                    <div className="p-6 space-y-6">
                        {/* Variables Section */}
                        {instructions.variables.length > 0 && (
                            <div>
                                <h4 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                                    <Code2 className="w-4 h-4 text-blue-400" />
                                    Required Variables
                                </h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-neutral-800">
                                                <th className="text-left py-2 px-3 text-neutral-400 font-medium">Variable</th>
                                                <th className="text-left py-2 px-3 text-neutral-400 font-medium">Description</th>
                                                <th className="text-left py-2 px-3 text-neutral-400 font-medium">Default</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {instructions.variables.map((variable) => (
                                                <tr key={variable.name} className="border-b border-neutral-800/50">
                                                    <td className="py-2 px-3">
                                                        <code className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded text-xs">
                                                            {variable.name}
                                                        </code>
                                                    </td>
                                                    <td className="py-2 px-3 text-neutral-400">{variable.description}</td>
                                                    <td className="py-2 px-3">
                                                        <code className="text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded text-xs">
                                                            {variable.defaultValue}
                                                        </code>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Screen.OnVisible Section */}
                        {instructions.screenOnVisible && (
                            <div>
                                <h4 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                                    <Code2 className="w-4 h-4 text-green-400" />
                                    Add to Screen.OnVisible
                                </h4>
                                <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden">
                                    <div className="px-3 py-2 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
                                        <span className="text-xs text-neutral-500">Power Fx</span>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(instructions.screenOnVisible!);
                                            }}
                                            className="text-xs text-neutral-400 hover:text-white transition-colors"
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
                                <h4 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                                    Pro Tips
                                </h4>
                                <ul className="space-y-2">
                                    {instructions.tips.map((tip, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2 text-sm text-neutral-400"
                                        >
                                            <span className="text-yellow-400 mt-0.5">•</span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Quick Start Guide */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
                <h3 className="text-white font-medium mb-4">Quick Start</h3>
                <ol className="space-y-3 text-neutral-400 text-sm">
                    <li className="flex gap-3">
                        <span className="flex-shrink-0 w-5 h-5 bg-neutral-800 text-white border border-neutral-700 rounded-full flex items-center justify-center text-xs font-medium">
                            1
                        </span>
                        <span>
                            {hasSettings ? 'Customize settings, then copy the YAML code' : 'Copy the YAML code above'}
                        </span>
                    </li>
                    <li className="flex gap-3">
                        <span className="flex-shrink-0 w-5 h-5 bg-neutral-800 text-white border border-neutral-700 rounded-full flex items-center justify-center text-xs font-medium">
                            2
                        </span>
                        <span>Open Power Apps Studio and select a Screen or Container</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="flex-shrink-0 w-5 h-5 bg-neutral-800 text-white border border-neutral-700 rounded-full flex items-center justify-center text-xs font-medium">
                            3
                        </span>
                        <span>Paste the YAML code (Ctrl/Cmd + V)</span>
                    </li>
                    {hasSetupInstructions && instructions?.screenOnVisible && (
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-5 h-5 bg-neutral-800 text-white border border-neutral-700 rounded-full flex items-center justify-center text-xs font-medium">
                                4
                            </span>
                            <span>
                                Add the required code from the Instructions section above
                            </span>
                        </li>
                    )}
                </ol>
            </div>
        </div>
    );
}
