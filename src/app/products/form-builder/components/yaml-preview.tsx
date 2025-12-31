"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Code, Copy, Check } from "lucide-react";

interface YamlPreviewProps {
    code: string;
}

export function YamlPreview({ code }: YamlPreviewProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="gap-2 border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800"
                >
                    <Code className="w-4 h-4" />
                    View YAML
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] bg-neutral-950 border-neutral-800 text-white overflow-hidden flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <div className="flex items-center justify-between pr-8">
                        <DialogTitle>Generated YAML Code</DialogTitle>
                        <Button
                            onClick={handleCopy}
                            variant="outline"
                            size="sm"
                            className={
                                copied
                                    ? "bg-emerald-900/50 border-emerald-700 text-emerald-400"
                                    : "border-neutral-700 text-neutral-400 hover:text-white"
                            }
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy Code
                                </>
                            )}
                        </Button>
                    </div>
                </DialogHeader>
                <div className="flex-1 overflow-auto">
                    <pre className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-sm font-mono text-neutral-300 overflow-x-auto">
                        <code>{code}</code>
                    </pre>
                </div>
                <div className="flex-shrink-0 pt-4 border-t border-neutral-800">
                    <p className="text-xs text-neutral-500">
                        Copy this code and paste it into your Power Apps canvas. Make sure to adjust
                        screen references and data sources as needed.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
