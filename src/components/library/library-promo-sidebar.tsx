"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles, Zap, Copy, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LibraryPromoSidebar() {
    const features = [
        { text: "Built with Power Fx and YAML" },
        { text: "40+ templates and components" },
        { text: "One click copy and paste" },
        { text: "Weekly updates with new components" },
    ];

    return (
        <aside className="hidden xl:block w-56 flex-shrink-0">
            <div className="sticky top-20 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
                {/* Preview Image */}
                <div className="mb-3 rounded-md overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900 aspect-video flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-10 h-10 mx-auto mb-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] text-neutral-500">PowerUI Pro</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-white mb-0.5">
                    Build apps faster
                </h3>
                <p className="text-[12px] text-neutral-400 mb-3">
                    with <span className="text-blue-400 font-medium">PowerUI Pro</span>
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-4">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px]">
                            <div className="w-3.5 h-3.5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                <Check className="w-2 h-2 text-blue-400" />
                            </div>
                            <span className="text-neutral-400">{feature.text}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Link href="/pricing">
                    <Button className="w-full bg-white text-black hover:bg-neutral-200 font-medium text-[12px] h-8">
                        Get lifetime access
                    </Button>
                </Link>

                {/* Social Proof */}
                <p className="text-[10px] text-neutral-500 text-center mt-3">
                    Trusted by 1,000+ Power Apps developers
                </p>
            </div>
        </aside>
    );
}
