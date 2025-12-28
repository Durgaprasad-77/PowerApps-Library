"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
    return (
        <Sonner
            theme="dark"
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-[#1a1a1a] group-[.toaster]:text-white group-[.toaster]:border-[#333] group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-[#a1a1a1]",
                    actionButton:
                        "group-[.toast]:bg-white group-[.toast]:text-black",
                    cancelButton:
                        "group-[.toast]:bg-[#262626] group-[.toast]:text-white",
                    success: "group-[.toaster]:border-green-500/20",
                    error: "group-[.toaster]:border-red-500/20",
                },
            }}
            position="bottom-right"
            richColors
        />
    );
}

// Re-export toast function for easy use
export { toast } from "sonner";
