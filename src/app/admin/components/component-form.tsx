"use client";

import { useState } from "react";
import { Save, AlertCircle, Eye, Wand2 } from "lucide-react";
import { Component, Category } from "@/lib/types";
import { upsertComponent } from "../actions";
import { YamlPreview } from "./yaml-preview";
import { VersionHistoryPanel } from "./version-history-panel";

interface ComponentFormProps {
    initialData?: Component | null;
    categories: Category[];
}

// Helper to convert name to slug
function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-');     // Replace multiple hyphens with single
}

export function ComponentForm({ initialData, categories }: ComponentFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [yamlCode, setYamlCode] = useState(initialData?.yamlCode || "");
    const [showPreview, setShowPreview] = useState(false);
    const [name, setName] = useState(initialData?.name || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [autoSlug, setAutoSlug] = useState(!initialData); // Auto-generate for new components

    // Helper to stringify JSON for textareas
    const formatJSON = (val: unknown) => val ? JSON.stringify(val, null, 2) : "";

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        if (autoSlug) {
            setSlug(generateSlug(newName));
        }
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlug(e.target.value);
        setAutoSlug(false); // Disable auto-slug when manually edited
    };

    const handleGenerateSlug = () => {
        setSlug(generateSlug(name));
    };

    return (
        <form
            action={async (formData) => {
                setLoading(true);
                setError(null);
                try {
                    await upsertComponent(formData);
                    // Redirect handled in action
                } catch (e) {
                    const message = e instanceof Error ? e.message : "Failed to save component";
                    setError(message);
                    setLoading(false);
                }
            }}
            className="space-y-8"
        >
            {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">
                    {initialData ? `Edit ${initialData.name}` : "New Component"}
                </h1>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors ${showPreview
                            ? "bg-purple-600 text-white"
                            : "bg-[#262626] text-white hover:bg-[#333]"
                            }`}
                    >
                        <Eye className="w-4 h-4" />
                        Preview
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        {loading ? "Saving..." : "Save Component"}
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className={`${showPreview ? "lg:col-span-1" : "lg:col-span-2"} space-y-6`}>
                    <div className="card p-6 space-y-4">
                        <h2 className="text-lg font-medium text-white mb-4">Basic Information</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#a1a1a1]">Name</label>
                                <input
                                    name="name"
                                    value={name}
                                    onChange={handleNameChange}
                                    required
                                    className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                    placeholder="e.g., Gradient Button"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#a1a1a1] flex items-center justify-between">
                                    Slug
                                    <button
                                        type="button"
                                        onClick={handleGenerateSlug}
                                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                        title="Generate from name"
                                    >
                                        <Wand2 className="w-3 h-3" />
                                        Auto
                                    </button>
                                </label>
                                <input
                                    name="slug"
                                    value={slug}
                                    onChange={handleSlugChange}
                                    required
                                    className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                    placeholder="e.g., gradient-button"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#a1a1a1]">Description</label>
                            <textarea
                                name="description"
                                defaultValue={initialData?.description}
                                rows={2}
                                className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#a1a1a1]">Category</label>
                            <select
                                name="category_slug"
                                defaultValue={initialData?.category || categories[0]?.slug}
                                className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            >
                                {categories.map(c => (
                                    <option key={c.slug} value={c.slug}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="card p-6 space-y-4">
                        <h2 className="text-lg font-medium text-white mb-4">YAML Code</h2>
                        <div className="space-y-2">
                            <textarea
                                name="yaml_code"
                                value={yamlCode}
                                onChange={(e) => setYamlCode(e.target.value)}
                                rows={showPreview ? 20 : 15}
                                className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* YAML Preview (when visible) */}
                {showPreview && (
                    <div className="lg:col-span-1 space-y-6">
                        <div className="card p-6 space-y-4">
                            <h2 className="text-lg font-medium text-white mb-4">YAML Preview</h2>
                            <YamlPreview code={yamlCode} />
                        </div>
                    </div>
                )}

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="card p-6 space-y-4">
                        <h2 className="text-lg font-medium text-white mb-4">Status & Visibility</h2>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-[#a1a1a1]">Pro Component</label>
                            <input
                                type="checkbox"
                                name="is_pro"
                                defaultChecked={initialData?.isPro}
                                className="w-4 h-4 rounded border-[#262626] bg-[#111] text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-[#a1a1a1]">New Label</label>
                            <input
                                type="checkbox"
                                name="is_new"
                                defaultChecked={initialData?.isNew}
                                className="w-4 h-4 rounded border-[#262626] bg-[#111] text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                            />
                        </div>
                    </div>

                    <div className="card p-6 space-y-4">
                        <h2 className="text-lg font-medium text-white mb-4">Settings Schema</h2>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#a1a1a1] uppercase">Schema (JSON)</label>
                            <textarea
                                name="settings_schema"
                                defaultValue={formatJSON(initialData?.settingsSchema)}
                                rows={8}
                                className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-[#a1a1a1] uppercase">Defaults (JSON)</label>
                            <textarea
                                name="default_settings"
                                defaultValue={formatJSON(initialData?.defaultSettings)}
                                rows={6}
                                className="w-full bg-[#111] border border-[#262626] rounded-md px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Version History - only for existing components */}
                    {initialData?.id && (
                        <VersionHistoryPanel componentId={initialData.id} />
                    )}
                </div>
            </div>
        </form>
    );
}
