"use client";

import { Monitor, Smartphone } from "lucide-react";

export type DeviceMode = "web" | "mobile";

interface DeviceToggleProps {
    mode: DeviceMode;
    onModeChange: (mode: DeviceMode) => void;
}

export function DeviceToggle({ mode, onModeChange }: DeviceToggleProps) {
    return (
        <div className="inline-flex items-center gap-1 p-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg">
            <button
                onClick={() => onModeChange("web")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${mode === "web"
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-800"
                    }`}
            >
                <Monitor className="w-4 h-4" />
                Web
            </button>
            <button
                onClick={() => onModeChange("mobile")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${mode === "mobile"
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-800"
                    }`}
            >
                <Smartphone className="w-4 h-4" />
                Mobile
            </button>
        </div>
    );
}

// Standard dimensions for Power Apps
export const DEVICE_DIMENSIONS = {
    web: {
        width: 1366,
        height: 768,
        aspectRatio: "16/9",
        label: "Web (16:9)"
    },
    mobile: {
        width: 375,
        height: 667,
        aspectRatio: "9/16",
        label: "Mobile (9:16)"
    }
} as const;
