"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, Layers, Palette, Wand2, PaintBucket, Sparkles, LayoutTemplate, FileCode } from "lucide-react";
import { LogoIcon } from "@/components/ui/logo-icon";
import { AuthButtons } from "./auth-buttons";
import { ThemeToggle } from "@/components/theme";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Core Features - Main products
const coreFeatures = [
    {
        name: "Components",
        description: "Copy-paste ready UI components",
        href: "/library",
        icon: Layers,
    },
    {
        name: "YAML Studio",
        description: "Build and preview components live",
        href: "/products/yaml-studio",
        icon: FileCode,
        isUpcoming: true,
    },
];

// More products
const moreProducts = [
    {
        name: "Backgrounds",
        description: "Dynamic animated backgrounds",
        href: "/products/backgrounds",
        icon: PaintBucket,
    },
    {
        name: "Icons",
        description: "Fluent 2 icon library",
        href: "/products/icons",
        icon: Sparkles,
    },
    {
        name: "Theme Builder",
        description: "Create custom themes",
        href: "/products/theme-builder",
        icon: Palette,
    },
    {
        name: "AI Generator",
        description: "AI-powered components",
        href: "/products/ai-generator",
        icon: Wand2,
        isUpcoming: true,
    },
    {
        name: "Templates",
        description: "Ready-to-use app templates",
        href: "/products/templates",
        icon: LayoutTemplate,
    },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-neutral-800/50",
                scrolled
                    ? "bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-black/60"
                    : "bg-transparent border-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <LogoIcon size={32} className="transition-transform group-hover:scale-110" />
                        <span className="text-xl font-bold text-white">
                            PowerUI
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <NavigationMenu>
                            <NavigationMenuList className="gap-1">
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent hover:bg-white/5 text-neutral-400 hover:text-white transition-colors data-[state=open]:bg-white/5 data-[state=open]:text-white">
                                        Features
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="w-[600px] p-6">
                                            <div className="flex gap-8">
                                                {/* Core Features Column */}
                                                <div className="flex-1">
                                                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                                                        Core Features
                                                    </h3>
                                                    <div className="space-y-1">
                                                        {coreFeatures.map((item) => (
                                                            <NavigationMenuLink key={item.name} asChild>
                                                                {item.isUpcoming ? (
                                                                    <div
                                                                        className="group flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 cursor-not-allowed opacity-70 select-none space-y-1 leading-none outline-none"
                                                                    >
                                                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center">
                                                                            <item.icon className="w-5 h-5 text-neutral-500" />
                                                                        </div>
                                                                        <div>
                                                                            <div className="font-medium text-neutral-400 flex items-center gap-2">
                                                                                {item.name}
                                                                                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                                                    Upcoming
                                                                                </span>
                                                                            </div>
                                                                            <div className="text-sm text-neutral-500 line-clamp-2 mt-1">
                                                                                {item.description}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <Link
                                                                        href={item.href}
                                                                        className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors block select-none space-y-1 leading-none no-underline outline-none"
                                                                    >
                                                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                                                                            <item.icon className="w-5 h-5 text-white" />
                                                                        </div>
                                                                        <div>
                                                                            <div className="font-medium text-white group-hover:text-neutral-300 transition-colors">
                                                                                {item.name}
                                                                            </div>
                                                                            <div className="text-sm text-neutral-400 line-clamp-2 mt-1">
                                                                                {item.description}
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                )}
                                                            </NavigationMenuLink>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Divider */}
                                                <div className="w-px bg-white/10 my-2" />

                                                {/* More Column */}
                                                <div className="flex-[1.5]">
                                                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                                                        More
                                                    </h3>
                                                    <div className="grid grid-cols-2 gap-1">
                                                        {moreProducts.map((item) => (
                                                            <NavigationMenuLink key={item.name} asChild>
                                                                {item.isUpcoming ? (
                                                                    <div
                                                                        className="group flex items-center gap-3 p-3 rounded-lg cursor-not-allowed opacity-60 select-none space-y-1 leading-none outline-none"
                                                                    >
                                                                        <item.icon className="w-4 h-4 text-neutral-500" />
                                                                        <div className="font-medium text-neutral-500 text-sm flex items-center gap-1.5">
                                                                            {item.name}
                                                                            <span className="text-[9px] font-medium px-1 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                                                Soon
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <Link
                                                                        href={item.href}
                                                                        className="group flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors block select-none space-y-1 leading-none no-underline outline-none"
                                                                    >
                                                                        <item.icon className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                                                                        <div className="font-medium text-white text-sm">
                                                                            {item.name}
                                                                        </div>
                                                                    </Link>
                                                                )}
                                                            </NavigationMenuLink>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-sm text-neutral-400">
                                                    <Sparkles className="w-4 h-4 text-white" />
                                                    <span>New: Animated backgrounds available</span>
                                                </div>
                                            </div>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/pricing" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-white/5 text-muted-foreground hover:text-foreground")}>
                                            Pricing
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/docs" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-white/5 text-muted-foreground hover:text-foreground")}>
                                            Docs
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                            Log in
                        </Link>
                        <Link href="/signup">
                            <Button size="sm" className="bg-white text-black hover:bg-neutral-200 rounded-full px-6 font-medium transition-colors">
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/5">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-white/10 bg-[#0B0C0E]/95 backdrop-blur-xl p-0">
                                <div className="flex flex-col h-full bg-[#0B0C0E]">
                                    <SheetHeader className="p-6 border-b border-white/10">
                                        <SheetTitle className="text-left flex items-center gap-2">
                                            <LogoIcon size={32} />
                                            <span className="font-bold">PowerUI</span>
                                        </SheetTitle>
                                    </SheetHeader>

                                    <div className="flex-1 overflow-y-auto py-6 px-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="px-2 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                Features
                                            </div>
                                            {coreFeatures.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => setIsSheetOpen(false)}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                                                >
                                                    <item.icon className="w-5 h-5 text-indigo-400" />
                                                    <div className="font-medium">{item.name}</div>
                                                </Link>
                                            ))}

                                            <div className="h-px bg-white/10 my-4 mx-2" />

                                            <div className="px-2 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                Products
                                            </div>
                                            {moreProducts.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => setIsSheetOpen(false)}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                                                >
                                                    <item.icon className="w-5 h-5 text-muted-foreground" />
                                                    <div className="font-medium text-foreground">{item.name}</div>
                                                </Link>
                                            ))}

                                            <div className="h-px bg-white/10 my-4 mx-2" />

                                            <Link
                                                href="/pricing"
                                                onClick={() => setIsSheetOpen(false)}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors font-medium"
                                            >
                                                Pricing
                                            </Link>
                                            <Link
                                                href="/docs"
                                                onClick={() => setIsSheetOpen(false)}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors font-medium"
                                            >
                                                Documentation
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="p-6 border-t border-white/10 bg-white/[0.02]">
                                        <div className="flex flex-col gap-3">
                                            <Link href="/login" onClick={() => setIsSheetOpen(false)}>
                                                <Button variant="outline" className="w-full justify-center border-white/10 hover:bg-white/5">
                                                    Log in
                                                </Button>
                                            </Link>
                                            <Link href="/signup" onClick={() => setIsSheetOpen(false)}>
                                                <Button className="w-full justify-center bg-[#5E6AD2] hover:bg-[#4e5ac0] text-white">
                                                    Get Started
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
