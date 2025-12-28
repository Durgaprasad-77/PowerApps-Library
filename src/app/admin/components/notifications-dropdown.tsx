"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, Box, UserPlus, Settings, X } from "lucide-react";
import Link from "next/link";
import { getAdminNotifications, markNotificationAsRead, markAllNotificationsAsRead, AdminNotification } from "../notification-actions";

export function NotificationsDropdown() {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<AdminNotification[]>([]);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.is_read).length;

    useEffect(() => {
        loadNotifications();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const loadNotifications = async () => {
        setLoading(true);
        try {
            const data = await getAdminNotifications();
            setNotifications(data);
        } catch (e) {
            // Table might not exist yet
            console.log("Notifications table not ready");
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id: string) => {
        await markNotificationAsRead(id);
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    };

    const handleMarkAllRead = async () => {
        await markAllNotificationsAsRead();
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    };

    const getIcon = (type: string) => {
        if (type.includes("component")) return <Box className="w-4 h-4 text-blue-400" />;
        if (type.includes("user")) return <UserPlus className="w-4 h-4 text-green-400" />;
        return <Settings className="w-4 h-4 text-purple-400" />;
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const mins = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (mins < 1) return "Just now";
        if (mins < 60) return `${mins}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-lg text-[#6b6b6b] hover:text-white hover:bg-white/5 transition-colors relative"
                title="Notifications"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-12 w-80 bg-[#111] border border-[#262626] rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-[#262626]">
                            <h3 className="text-sm font-semibold text-white">Notifications</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={handleMarkAllRead}
                                    className="text-xs text-blue-400 hover:text-blue-300"
                                >
                                    Mark all read
                                </button>
                            )}
                        </div>

                        {/* Content */}
                        <div className="max-h-80 overflow-y-auto">
                            {loading ? (
                                <div className="p-4 text-center text-sm text-[#6b6b6b]">
                                    Loading...
                                </div>
                            ) : notifications.length === 0 ? (
                                <div className="p-8 text-center">
                                    <Bell className="w-8 h-8 text-[#333] mx-auto mb-2" />
                                    <p className="text-sm text-[#6b6b6b]">No notifications yet</p>
                                </div>
                            ) : (
                                notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        className={`flex gap-3 p-4 border-b border-[#262626] last:border-0 hover:bg-white/5 transition-colors ${!notif.is_read ? "bg-blue-500/5" : ""
                                            }`}
                                    >
                                        <div className="flex-shrink-0 mt-0.5">
                                            {getIcon(notif.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            {notif.href ? (
                                                <Link
                                                    href={notif.href}
                                                    onClick={() => {
                                                        handleMarkAsRead(notif.id);
                                                        setOpen(false);
                                                    }}
                                                    className="block"
                                                >
                                                    <p className="text-sm text-white font-medium truncate">
                                                        {notif.title}
                                                    </p>
                                                    {notif.message && (
                                                        <p className="text-xs text-[#6b6b6b] truncate mt-0.5">
                                                            {notif.message}
                                                        </p>
                                                    )}
                                                </Link>
                                            ) : (
                                                <>
                                                    <p className="text-sm text-white font-medium truncate">
                                                        {notif.title}
                                                    </p>
                                                    {notif.message && (
                                                        <p className="text-xs text-[#6b6b6b] truncate mt-0.5">
                                                            {notif.message}
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                            <p className="text-xs text-[#4a4a4a] mt-1">
                                                {formatTime(notif.created_at)}
                                            </p>
                                        </div>
                                        {!notif.is_read && (
                                            <button
                                                onClick={() => handleMarkAsRead(notif.id)}
                                                className="flex-shrink-0 p-1 text-[#6b6b6b] hover:text-white"
                                                title="Mark as read"
                                            >
                                                <Check className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
