"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CardPreview } from "@/components/preview/card-preview";

interface RelatedComponent {
    id: string;
    name: string;
    slug: string;
    category: string;
    description: string;
    isPro: boolean;
    isNew?: boolean;
}

interface RelatedComponentsProps {
    components: RelatedComponent[];
    currentComponentId: string;
    title?: string;
}

export function RelatedComponents({
    components,
    currentComponentId,
    title = "Related Components"
}: RelatedComponentsProps) {
    // Filter out current component and limit to 3
    const relatedItems = components
        .filter(c => c.id !== currentComponentId)
        .slice(0, 3);

    if (relatedItems.length === 0) return null;

    return (
        <section className="mt-12 pt-8 border-t border-[#1a1a1a]">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <Link
                    href={`/library/${relatedItems[0]?.category}`}
                    className="text-sm text-[#6b6b6b] hover:text-white transition-colors flex items-center gap-1"
                >
                    View all
                    <ArrowRight className="w-3 h-3" />
                </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
                {relatedItems.map((component, index) => (
                    <motion.div
                        key={component.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link
                            href={`/library/${component.category}/${component.slug}`}
                            className="group block rounded-xl bg-[#111] border border-[#262626] 
                         hover:border-[#333] transition-all duration-300 overflow-hidden"
                        >
                            {/* Preview */}
                            <div className="h-24 bg-[#0a0a0a] border-b border-[#262626] relative overflow-hidden">
                                <CardPreview componentSlug={component.slug} category={component.category} />

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                               opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Info */}
                            <div className="p-3">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-medium text-white text-sm group-hover:text-blue-400 transition-colors truncate">
                                        {component.name}
                                    </h3>
                                    <div className="flex gap-1 flex-shrink-0 ml-2">
                                        {component.isNew && (
                                            <span className="badge badge-new text-[10px] px-1.5 py-0.5 rounded">
                                                New
                                            </span>
                                        )}
                                        {component.isPro ? (
                                            <span className="badge badge-pro text-[10px] px-1.5 py-0.5 rounded">
                                                PRO
                                            </span>
                                        ) : (
                                            <span className="badge badge-free text-[10px] px-1.5 py-0.5 rounded">
                                                Free
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-xs text-[#6b6b6b] line-clamp-1">
                                    {component.description}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
