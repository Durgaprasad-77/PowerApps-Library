"use client";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { History, ChevronDown, ChevronUp, RotateCcw, Clock, X } from "lucide-react";
import { toast } from "sonner";
import { getComponentVersions, restoreComponentVersion, createComponentVersion, ComponentVersion } from "../version-actions";

interface VersionHistoryPanelProps {
    componentId: string;
}

export function VersionHistoryPanel({ componentId }: VersionHistoryPanelProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [versions, setVersions] = useState<ComponentVersion[]>([]);
    const [loading, setLoading] = useState(false);
    const [restoring, setRestoring] = useState<string | null>(null);
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [changeSummary, setChangeSummary] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isOpen && versions.length === 0) {
            loadVersions();
        }
    }, [isOpen]);

    const loadVersions = async () => {
        setLoading(true);
        try {
            const data = await getComponentVersions(componentId);
            setVersions(data);
        } catch {
            toast.error("Failed to load versions");
        } finally {
            setLoading(false);
        }
    };

    const handleRestore = async (versionId: string, versionNumber: number) => {
        setRestoring(versionId);
        try {
            const result = await restoreComponentVersion(componentId, versionId);
            if (result.success) {
                toast.success(`Restored to version ${versionNumber}`);
                loadVersions();
            } else {
                toast.error(result.error || "Failed to restore");
            }
        } catch {
            toast.error("Failed to restore version");
        } finally {
            setRestoring(null);
        }
    };

    const handleSaveVersion = async () => {
        if (!changeSummary.trim()) {
            toast.error("Please enter a change summary");
            return;
        }

        setSaving(true);
        try {
            const result = await createComponentVersion(componentId, changeSummary);
            if (result.success) {
                toast.success("Version saved successfully");
                setShowSaveDialog(false);
                setChangeSummary("");
                loadVersions();
            } else {
                toast.error(result.error || "Failed to save version");
            }
        } catch {
            toast.error("Failed to save version");
        } finally {
            setSaving(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="border border-[#262626] rounded-lg overflow-hidden">
            {/* Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-[#111] hover:bg-[#161616] transition-colors"
            >
                <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-white">Version History</span>
                    {versions.length > 0 && (
                        <span className="px-2 py-0.5 text-xs bg-purple-500/10 text-purple-400 rounded">
                            {versions.length}
                        </span>
                    )}
                </div>
                {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#6b6b6b]" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-[#6b6b6b]" />
                )}
            </button>

            {/* Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 border-t border-[#262626] space-y-4">
                            {/* Save Current Version Button */}
                            <button
                                onClick={() => setShowSaveDialog(true)}
                                className="w-full py-2 text-sm font-medium text-purple-400 hover:text-white hover:bg-purple-600 border border-purple-500/20 rounded-lg transition-colors"
                            >
                                Save Current Version
                            </button>

                            {/* Save Dialog */}
                            {showSaveDialog && (
                                <div className="p-3 bg-[#161616] rounded-lg space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-white">Save Version</span>
                                        <button
                                            aria-label="Close save dialog"
                                            onClick={() => setShowSaveDialog(false)}
                                            className="text-[#6b6b6b] hover:text-white"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        value={changeSummary}
                                        onChange={(e) => setChangeSummary(e.target.value)}
                                        placeholder="What changed? (e.g., Updated animation)"
                                        className="w-full px-3 py-2 text-sm bg-[#111] border border-[#262626] rounded-lg text-white placeholder-[#6b6b6b] focus:outline-none focus:border-purple-500"
                                    />
                                    <button
                                        onClick={handleSaveVersion}
                                        disabled={saving}
                                        className="w-full py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {saving ? "Saving..." : "Save Version"}
                                    </button>
                                </div>
                            )}

                            {/* Versions List */}
                            {loading ? (
                                <div className="text-center py-4 text-sm text-[#6b6b6b]">
                                    Loading versions...
                                </div>
                            ) : versions.length === 0 ? (
                                <div className="text-center py-4 text-sm text-[#6b6b6b]">
                                    No versions saved yet. Save your first version above.
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {versions.map((version) => (
                                        <div
                                            key={version.id}
                                            className="flex items-center justify-between p-3 bg-[#161616] rounded-lg group"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-white">
                                                        v{version.version_number}
                                                    </span>
                                                    {version.version_number === Math.max(...versions.map(v => v.version_number)) && (
                                                        <span className="px-1.5 py-0.5 text-[10px] bg-green-500/10 text-green-400 rounded">
                                                            Latest
                                                        </span>
                                                    )}
                                                </div>
                                                {version.change_summary && (
                                                    <p className="text-xs text-[#a1a1a1] truncate mt-0.5">
                                                        {version.change_summary}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-1 mt-1 text-xs text-[#6b6b6b]">
                                                    <Clock className="w-3 h-3" />
                                                    {formatDate(version.created_at)}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRestore(version.id, version.version_number)}
                                                disabled={restoring === version.id}
                                                className="flex items-center gap-1 px-2 py-1 text-xs text-[#6b6b6b] hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                                                title="Restore this version"
                                            >
                                                <RotateCcw className={`w-3 h-3 ${restoring === version.id ? "animate-spin" : ""}`} />
                                                {restoring === version.id ? "..." : "Restore"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
