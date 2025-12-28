"use client";

import { motion } from "framer-motion";
import { Box, Layers, User, Shield, Star, Clock } from "lucide-react";
import { formatDistanceToNow } from "./date-utils";

export interface Activity {
    id: string;
    type: "component_created" | "component_updated" | "category_created" | "user_joined" | "component_deleted";
    title: string;
    description?: string;
    timestamp: string;
}

interface ActivityFeedProps {
    activities: Activity[];
}

const iconMap = {
    component_created: { icon: Box, color: "text-green-500", bg: "bg-green-500/10" },
    component_updated: { icon: Box, color: "text-blue-500", bg: "bg-blue-500/10" },
    category_created: { icon: Layers, color: "text-purple-500", bg: "bg-purple-500/10" },
    user_joined: { icon: User, color: "text-orange-500", bg: "bg-orange-500/10" },
    component_deleted: { icon: Box, color: "text-red-500", bg: "bg-red-500/10" },
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
    if (activities.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-center">
                <Clock className="w-10 h-10 text-[#2a2a2a] mb-3" />
                <p className="text-[#6b6b6b]">No recent activity</p>
                <p className="text-[#4a4a4a] text-sm">Activities will appear here as you make changes</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {activities.map((activity, index) => {
                const { icon: Icon, color, bg } = iconMap[activity.type] || iconMap.component_created;

                return (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex items-start gap-3"
                    >
                        <div className={`p-2 rounded-lg ${bg} shrink-0`}>
                            <Icon className={`w-4 h-4 ${color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-white font-medium truncate">
                                {activity.title}
                            </p>
                            {activity.description && (
                                <p className="text-xs text-[#6b6b6b] truncate">
                                    {activity.description}
                                </p>
                            )}
                            <p className="text-xs text-[#4a4a4a] mt-1">
                                {formatDistanceToNow(new Date(activity.timestamp))}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
