"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import Image from "next/image";
import { LogOut, Settings, Shield, ChevronDown } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function AuthButtons() {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [supabase] = useState(() => createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ));

    useEffect(() => {
        // Get initial user
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => subscription.unsubscribe();
    }, [supabase]);

    async function handleLogout() {
        await supabase.auth.signOut();
        setDropdownOpen(false);
        window.location.href = "/";
    }

    if (loading) {
        return (
            <div className="w-8 h-8 rounded-full bg-[#262626] animate-pulse" />
        );
    }

    if (!user) {
        return (
            <>
                <Link
                    href="/login"
                    className="text-[#a1a1a1] hover:text-white font-medium transition-colors"
                >
                    Log in
                </Link>
                <Link
                    href="/login"
                    className="btn-primary"
                >
                    Get Started
                </Link>
            </>
        );
    }

    // User is logged in
    const avatarUrl = user.user_metadata?.avatar_url;
    const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
    const initials = name.charAt(0).toUpperCase();

    return (
        <div className="relative">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-white/5 transition-colors"
            >
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt={name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover border border-white/10"
                        unoptimized
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                        {initials}
                    </div>
                )}
                <ChevronDown className={`w-4 h-4 text-[#a1a1a1] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setDropdownOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-56 rounded-lg bg-[#1a1a1a] border border-[#333] shadow-xl z-50 animate-fade-in overflow-hidden">
                        {/* User info */}
                        <div className="px-4 py-3 border-b border-[#333]">
                            <p className="text-sm font-medium text-white truncate">{name}</p>
                            <p className="text-xs text-[#a1a1a1] truncate">{user.email}</p>
                        </div>

                        {/* Menu items */}
                        <div className="py-1">
                            <Link
                                href="/admin"
                                className="flex items-center gap-3 px-4 py-2 text-sm text-[#a1a1a1] hover:text-white hover:bg-white/5 transition-colors"
                                onClick={() => setDropdownOpen(false)}
                            >
                                <Shield className="w-4 h-4" />
                                Admin Dashboard
                            </Link>
                            <Link
                                href="/admin/security"
                                className="flex items-center gap-3 px-4 py-2 text-sm text-[#a1a1a1] hover:text-white hover:bg-white/5 transition-colors"
                                onClick={() => setDropdownOpen(false)}
                            >
                                <Settings className="w-4 h-4" />
                                Security Settings
                            </Link>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-[#333] py-1">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
