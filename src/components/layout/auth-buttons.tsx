"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { LogOut, Settings, Shield, ChevronDown } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 rounded-full hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Avatar className="h-8 w-8 border border-border">
                        <AvatarImage src={avatarUrl} alt={name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 border-b mb-1">
                    <p className="text-sm font-medium leading-none truncate">{name}</p>
                    <p className="text-xs text-muted-foreground truncate mt-1">{user.email}</p>
                </div>

                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer w-full">
                            <Shield className="mr-2 h-4 w-4" />
                            Admin Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/admin/security" className="cursor-pointer w-full">
                            <Settings className="mr-2 h-4 w-4" />
                            Security Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
