"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-4",
                className
            )}
        >
            {children}
        </div>
    );
}

interface BentoCardProps {
    name: string;
    description: string;
    href: string;
    Icon: React.ComponentType<{ className?: string }>;
    className?: string;
    background?: React.ReactNode;
    cta?: string;
    isUpcoming?: boolean;
}

export function BentoCard({
    name,
    description,
    href,
    Icon,
    className,
    background,
    cta = "Learn more",
    isUpcoming = false,
}: BentoCardProps) {
    const CardWrapper = isUpcoming ? "div" : Link;

    return (
        <CardWrapper
            href={isUpcoming ? undefined : href}
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl",
                "bg-neutral-950 border border-neutral-800",
                "h-[280px] md:h-[320px]",
                !isUpcoming && "hover:border-neutral-700 cursor-pointer",
                isUpcoming && "opacity-60 cursor-not-allowed",
                "transition-all duration-300",
                className
            )}
        >
            {/* Background Visual */}
            <div className="absolute inset-0 overflow-hidden">
                {background}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent z-10" />

            {/* Content */}
            <div className="relative z-20 p-6 flex flex-col h-full">
                {/* Header with Icon and Badge */}
                <div className="flex items-start justify-between mb-auto">
                    <div className={cn(
                        "p-3 rounded-xl border",
                        isUpcoming
                            ? "bg-neutral-900 border-neutral-800"
                            : "bg-neutral-900 border-neutral-800 group-hover:bg-neutral-800 group-hover:border-neutral-700"
                    )}>
                        <Icon className={cn(
                            "w-6 h-6",
                            isUpcoming ? "text-neutral-500" : "text-white"
                        )} />
                    </div>
                    {isUpcoming && (
                        <span className="text-[10px] font-medium px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            Upcoming
                        </span>
                    )}
                </div>

                {/* Footer with Title, Description, CTA */}
                <div className="mt-auto">
                    <h3 className={cn(
                        "text-xl font-semibold mb-2",
                        isUpcoming ? "text-neutral-400" : "text-white"
                    )}>
                        {name}
                    </h3>
                    <p className={cn(
                        "text-sm mb-4 line-clamp-2",
                        isUpcoming ? "text-neutral-500" : "text-neutral-400"
                    )}>
                        {description}
                    </p>
                    {!isUpcoming && (
                        <div className="flex items-center gap-1 text-sm text-neutral-500 group-hover:text-white transition-colors">
                            <span>{cta}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    )}
                </div>
            </div>
        </CardWrapper>
    );
}
