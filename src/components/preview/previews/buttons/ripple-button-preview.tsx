"use client";

import React, { useState, useRef, useEffect } from "react";
import { SettingsValues } from "@/lib/settings-types";

export function RippleButtonPreview({ settings }: { settings: SettingsValues }) {
    const text = (settings.text as string) || "Click me";
    const rippleColor = (settings.rippleColor as string) || "#e5e7eb"; // RGB or Hex
    const duration = (settings.duration as number) || 600;

    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (ripples.length > 0) {
            const timer = setTimeout(() => {
                setRipples((prevRipples) => prevRipples.slice(1));
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [ripples, duration]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Power Apps implementation centers the ripple, so we do the same here
        // regardless of click position, to match fidelity.
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            // Center of the button relative to the button itself
            const x = rect.width / 2;
            const y = rect.height / 2;

            setRipples((prev) => [...prev, { x, y, id: Date.now() }]);
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-full min-h-[200px]">
            <button
                ref={buttonRef}
                className="relative overflow-hidden rounded-full bg-white border border-gray-200 px-8 py-3 font-semibold text-black shadow-sm transition-transform active:scale-95 outline-none"
                onClick={handleClick}
                style={{
                    width: 240,
                    height: 56,
                }}
            >
                <span className="relative z-10 font-[Segoe UI]">{text}</span>

                {ripples.map((ripple) => (
                    <span
                        key={ripple.id}
                        className="absolute rounded-full bg-opacity-50 pointer-events-none"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: '200%', // 2x width to cover
                            height: '200%', // will be constrained by aspect-ratio if needed, but here simple expansion
                            transform: 'translate(-50%, -50%) scale(0)',
                            backgroundColor: rippleColor,
                            animation: `ripple-effect ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                        }}
                    />
                ))}

                <style jsx>{`
                    @keyframes ripple-effect {
                        to {
                            transform: translate(-50%, -50%) scale(1);
                            opacity: 0;
                        }
                    }
                `}</style>
            </button>
        </div>
    );
}
