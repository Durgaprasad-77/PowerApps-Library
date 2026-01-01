"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles, Zap, Copy, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LibraryPromoSidebar() {
    const features = [
        { icon: Sparkles, text: "Built with Power Fx and YAML" },
        { icon: Layers, text: "40+ templates and components" },
        { icon: Copy, text: "One click copy and paste" },
        { icon: Zap, text: "Weekly updates with new components" },
    ];

    return (
        <aside className="hidden xl:block w-72 flex-shrink-0">
            <div className="sticky top-20 p-5 rounded-xl bg-neutral-900/50 border border-neutral-800">
                {/* Preview Image */}
                <div className="mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900 aspect-video flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs text-neutral-500">PowerUI Pro</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-1">
                    Build apps faster
                </h3>
                <p className="text-sm text-neutral-400 mb-4">
                    with <span className="text-blue-400 font-medium">PowerUI Pro</span>
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm">
                            <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                <Check className="w-2.5 h-2.5 text-blue-400" />
                            </div>
                            <span className="text-neutral-400">{feature.text}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Link href="/pricing">
                    <Button className="w-full bg-white text-black hover:bg-neutral-200 font-medium">
                        Get lifetime access
                    </Button>
                </Link>

                {/* Social Proof */}
                <p className="text-[11px] text-neutral-500 text-center mt-4">
                    Trusted by 1,000+ Power Apps developers
                </p>
            </div>
        </aside>
    );
}
