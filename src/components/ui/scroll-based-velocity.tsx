"use client";

import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

interface ScrollVelocityContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function ScrollVelocityContainer({
    children,
    className,
}: ScrollVelocityContainerProps) {
    return (
        <div className={cn("relative w-full overflow-hidden", className)}>
            {children}
        </div>
    );
}

interface ScrollVelocityRowProps {
    children: React.ReactNode;
    className?: string;
    baseVelocity?: number;
    direction?: 1 | -1;
}

function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function ScrollVelocityRow({
    children,
    className,
    baseVelocity = 5,
    direction = 1,
}: ScrollVelocityRowProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    const x = useTransform(baseX, (v: number) => `${wrap(-25, 0, v)}%`);

    useAnimationFrame((_, delta) => {
        let moveBy = direction * baseVelocity * (delta / 1000);

        // Add scroll velocity influence
        moveBy += direction * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    // Repeat children 4 times for seamless loop
    return (
        <div className="flex overflow-hidden whitespace-nowrap">
            <motion.div
                className={cn("flex gap-8 whitespace-nowrap", className)}
                style={{ x }}
            >
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="flex gap-8">
                        {children}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
