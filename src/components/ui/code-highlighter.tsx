"use client";

import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface CodeHighlighterProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
    showCopyButton?: boolean;
    maxHeight?: string;
    className?: string;
}

// Custom dark theme inspired by VSCode Dark+
const customTheme = {
    ...themes.vsDark,
    plain: {
        color: "#d4d4d4",
        backgroundColor: "#0a0a0a",
    },
    styles: [
        ...themes.vsDark.styles,
        {
            types: ["property"],
            style: { color: "#9cdcfe" },
        },
        {
            types: ["string"],
            style: { color: "#ce9178" },
        },
        {
            types: ["keyword"],
            style: { color: "#569cd6" },
        },
        {
            types: ["comment"],
            style: { color: "#6a9955", fontStyle: "italic" as const },
        },
        {
            types: ["number", "boolean"],
            style: { color: "#b5cea8" },
        },
        {
            types: ["punctuation"],
            style: { color: "#808080" },
        },
    ],
};

export function CodeHighlighter({
    code,
    language = "yaml",
    showLineNumbers = true,
    showCopyButton = true,
    maxHeight = "500px",
    className = "",
}: CodeHighlighterProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            toast.success("Code copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
            toast.error("Failed to copy code");
        }
    };

    return (
        <div className={`relative group rounded-xl overflow-hidden ${className}`}>
            {/* Copy Button */}
            {showCopyButton && (
                <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg 
                     bg-[#1a1a1a] border border-[#333] text-[#a1a1a1] text-sm font-medium
                     opacity-0 group-hover:opacity-100 hover:bg-[#262626] hover:text-white 
                     transition-all duration-200"
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4 text-green-500" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            Copy
                        </>
                    )}
                </button>
            )}

            {/* Code Block */}
            <div
                className="overflow-auto"
                style={{ maxHeight }}
            >
                <Highlight theme={customTheme} code={code.trim()} language={language}>
                    {({ className: highlightClass, style, tokens, getLineProps, getTokenProps }) => (
                        <pre
                            className={`${highlightClass} p-4 text-sm leading-relaxed font-mono`}
                            style={{ ...style, margin: 0, background: "#0a0a0a" }}
                        >
                            {tokens.map((line, lineIndex) => {
                                // Destructure key from lineProps to pass it separately
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { key: _lineKey, ...lineProps } = getLineProps({ line });
                                return (
                                    <div
                                        key={lineIndex}
                                        {...lineProps}
                                        className="table-row"
                                    >
                                        {showLineNumbers && (
                                            <span className="table-cell pr-4 text-[#525252] text-right select-none w-12">
                                                {lineIndex + 1}
                                            </span>
                                        )}
                                        <span className="table-cell">
                                            {line.map((token, tokenIndex) => {
                                                // Destructure key from tokenProps to pass it separately
                                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                                const { key: _tokenKey, ...tokenProps } = getTokenProps({ token });
                                                return (
                                                    <span key={tokenIndex} {...tokenProps} />
                                                );
                                            })}
                                        </span>
                                    </div>
                                );
                            })}
                        </pre>
                    )}
                </Highlight>
            </div>
        </div>
    );
}

// Simpler version without line numbers for inline use
export function InlineCode({ children }: { children: string }) {
    return (
        <code className="px-1.5 py-0.5 rounded bg-[#1a1a1a] text-[#ce9178] font-mono text-sm">
            {children}
        </code>
    );
}
