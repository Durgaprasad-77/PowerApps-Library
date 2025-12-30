"use client";

import { cn } from "@/lib/utils";

interface ShineBorderProps {
    /**
     * The colors for the shine effect
     * @default "#000000"
     */
    shineColor?: string | string[];
    /**
     * The duration of the animation in seconds
     * @default 14
     */
    duration?: number;
    /**
     * The border width in pixels
     * @default 1
     */
    borderWidth?: number;
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Additional CSS styles
     */
    style?: React.CSSProperties;
}

export function ShineBorder({
    shineColor = "#000000",
    duration = 14,
    borderWidth = 1,
    className,
    style,
}: ShineBorderProps) {
    const colors = Array.isArray(shineColor) ? shineColor.join(",") : shineColor;

    return (
        <div
            className={cn(
                "pointer-events-none absolute inset-0 rounded-[inherit]",
                className
            )}
            style={{
                ...style,
                padding: borderWidth,
                background: `linear-gradient(var(--shine-angle), ${colors})`,
                WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                animation: `shine-border-spin ${duration}s linear infinite`,
            }}
        >
            <style jsx>{`
                @property --shine-angle {
                    syntax: "<angle>";
                    initial-value: 0deg;
                    inherits: false;
                }
                @keyframes shine-border-spin {
                    from {
                        --shine-angle: 0deg;
                    }
                    to {
                        --shine-angle: 360deg;
                    }
                }
            `}</style>
        </div>
    );
}
