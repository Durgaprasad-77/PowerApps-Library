"use client";

import React from "react";
import { Category, Component } from "@/lib/types";
import { LibrarySidebar } from "./library-sidebar";
import { LibraryPromoSidebar } from "./library-promo-sidebar";

interface LibraryLayoutProps {
    categories: Category[];
    components: Component[];
    children: React.ReactNode;
}

export function LibraryLayout({
    categories,
    components,
    children,
}: LibraryLayoutProps) {
    return (
        <div className="min-h-screen pt-20 bg-black">
            <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Left Sidebar - Component Navigation */}
                    <LibrarySidebar
                        categories={categories}
                        components={components}
                    />

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>

                    {/* Right Sidebar - Promo */}
                    <LibraryPromoSidebar />
                </div>
            </div>
        </div>
    );
}
