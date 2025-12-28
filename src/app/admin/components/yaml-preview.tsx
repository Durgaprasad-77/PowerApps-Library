"use client";

import { useState } from "react";
import { Eye, Code, Copy, Check, Maximize2, Minimize2 } from "lucide-react";
import { toast } from "sonner";

interface YamlPreviewProps {
    code: string;
}

export function YamlPreview({ code }: YamlPreviewProps) {
    const [view, setView] = useState<"preview" | "raw">("preview");
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        toast.success("YAML copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    // Simple YAML syntax highlighting
    const highlightYaml = (yaml: string) => {
        if (!yaml) return "";

        return yaml.split("\n").map((line) => {
            // Comment lines
            if (line.trim().startsWith("#")) {
                return `<span class="text-[#6a9955]">${escapeHtml(line)}</span>`;
            }

            // Key-value pairs
            const match = line.match(/^(\s*)([\w-]+)(:)(.*)$/);
            if (match) {
                const [, indent, key, colon, value] = match;
                let highlightedValue = escapeHtml(value);

                // String values
                if (value.includes('"') || value.includes("'")) {
                    highlightedValue = `<span class="text-[#ce9178]">${escapeHtml(value)}</span>`;
                }
                // Boolean/number values
                else if (/^\s*(true|false|\d+)$/i.test(value)) {
                    highlightedValue = `<span class="text-[#b5cea8]">${escapeHtml(value)}</span>`;
                }
                // Formula values (starting with =)
                else if (value.trim().startsWith("=")) {
                    highlightedValue = `<span class="text-[#dcdcaa]">${escapeHtml(value)}</span>`;
                }

                return `${escapeHtml(indent)}<span class="text-[#9cdcfe]">${escapeHtml(key)}</span><span class="text-white">${colon}</span>${highlightedValue}`;
            }

            // Array items
            if (line.trim().startsWith("-")) {
                return `<span class="text-[#d4d4d4]">${escapeHtml(line)}</span>`;
            }

            return escapeHtml(line);
        }).join("\n");
    };

    const escapeHtml = (str: string) => {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    if (!code) {
        return (
            <div className="p-8 text-center text-[#6b6b6b] bg-[#0a0a0a] rounded-lg border border-[#262626]">
                <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Enter YAML code to see preview</p>
            </div>
        );
    }

    return (
        <div className={`bg-[#0a0a0a] rounded-lg border border-[#262626] overflow-hidden ${expanded ? "fixed inset-4 z-50" : ""}`}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#111] border-b border-[#262626]">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setView("preview")}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${view === "preview"
                            ? "bg-blue-600 text-white"
                            : "text-[#a1a1a1] hover:text-white hover:bg-[#262626]"
                            }`}
                    >
                        <Eye className="w-3 h-3 inline mr-1" />
                        Preview
                    </button>
                    <button
                        onClick={() => setView("raw")}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${view === "raw"
                            ? "bg-blue-600 text-white"
                            : "text-[#a1a1a1] hover:text-white hover:bg-[#262626]"
                            }`}
                    >
                        <Code className="w-3 h-3 inline mr-1" />
                        Raw
                    </button>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={handleCopy}
                        className="p-1.5 text-[#a1a1a1] hover:text-white hover:bg-[#262626] rounded-md transition-colors"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="p-1.5 text-[#a1a1a1] hover:text-white hover:bg-[#262626] rounded-md transition-colors"
                        title={expanded ? "Minimize" : "Expand"}
                    >
                        {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className={`overflow-auto ${expanded ? "h-[calc(100%-44px)]" : "max-h-[400px]"}`}>
                {view === "preview" ? (
                    <pre
                        className="p-4 text-xs font-mono leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: highlightYaml(code) }}
                    />
                ) : (
                    <pre className="p-4 text-xs font-mono text-[#d4d4d4] leading-relaxed whitespace-pre-wrap">
                        {code}
                    </pre>
                )}
            </div>

            {/* Stats footer */}
            <div className="px-4 py-2 bg-[#111] border-t border-[#262626] text-xs text-[#6b6b6b] flex items-center justify-between">
                <span>{code.split("\n").length} lines</span>
                <span>{code.length} characters</span>
            </div>

            {/* Expanded overlay backdrop */}
            {expanded && (
                <div
                    className="fixed inset-0 bg-black/60 -z-10"
                    onClick={() => setExpanded(false)}
                />
            )}
        </div>
    );
}
