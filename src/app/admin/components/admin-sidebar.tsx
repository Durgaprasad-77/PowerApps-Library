"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Box,
    Layers,
    Users,
    Settings,
    LogOut,
    ShieldCheck,
    Shield,
    Menu,
    X,
    BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Components", href: "/admin/components", icon: Box },
    { name: "Categories", href: "/admin/categories", icon: Layers },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Security", href: "/admin/security", icon: Shield },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === "/admin") {
            return pathname === "/admin";
        }
        return pathname.startsWith(href);
    };

    const sidebarContent = (
        <>
            {/* Logo */}
            <div className="p-6 border-b border-[#262626]">
                <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-white">
                    <ShieldCheck className="w-6 h-6 text-blue-500" />
                    <span>Admin</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                                "relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                                active
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                    : "text-[#a1a1a1] hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                            {active && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-blue-600 rounded-lg -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-[#262626] space-y-1">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-[#a1a1a1] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Back to Site
                </Link>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#111] border border-[#262626] rounded-lg text-white"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Desktop sidebar */}
            <div className="hidden lg:flex flex-col h-full bg-[#0a0a0a] border-r border-[#262626] w-64">
                {sidebarContent}
            </div>

            {/* Mobile sidebar */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/60 z-40"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                            className="lg:hidden fixed inset-y-0 left-0 w-64 bg-[#0a0a0a] border-r border-[#262626] z-50 flex flex-col"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="absolute top-4 right-4 p-2 text-[#6b6b6b] hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            {sidebarContent}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
