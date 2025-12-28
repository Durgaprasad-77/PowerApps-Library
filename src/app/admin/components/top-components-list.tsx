"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Star, Eye, TrendingUp } from "lucide-react";

export interface TopComponent {
    id: string;
    name: string;
    slug: string;
    category: string;
    isPro: boolean;
    createdAt: string;
}

interface TopComponentsListProps {
    components: TopComponent[];
}

export function TopComponentsList({ components }: TopComponentsListProps) {
    if (components.length === 0) {
        return (
            <div className="text-center py-8 text-[#6b6b6b]">
                No components yet
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {components.map((component, index) => (
                <motion.div
                    key={component.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                    <Link
                        href={`/admin/components/${component.id}`}
                        className="group flex items-center justify-between p-3 rounded-lg bg-[#141414] hover:bg-[#1a1a1a] border border-[#262626] hover:border-[#3a3a3a] transition-all"
                    >
                        <div className="flex items-center gap-3">
                            {/* Rank indicator */}
                            <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${index === 0 ? "bg-yellow-500/20 text-yellow-400" :
                                    index === 1 ? "bg-gray-400/20 text-gray-300" :
                                        index === 2 ? "bg-orange-500/20 text-orange-400" :
                                            "bg-[#262626] text-[#6b6b6b]"
                                }`}>
                                {index + 1}
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                        {component.name}
                                    </span>
                                    {component.isPro && (
                                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                    )}
                                </div>
                                <span className="text-xs text-[#6b6b6b]">
                                    {component.category}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <ExternalLink className="w-4 h-4 text-[#6b6b6b] group-hover:text-blue-400 transition-colors" />
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
