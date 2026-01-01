"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Layers, Palette, Wand2, PaintBucket, Sparkles, LayoutTemplate, FileCode, SquarePen, ChevronDown } from "lucide-react";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// Core Features - Main products
const coreFeatures = [
    {
        name: "Components",
        description: "Copy-paste ready UI components",
        href: "/library",
        icon: Layers,
    },
    {
        name: "Form Builder",
        description: "Visually build Power Apps forms",
        href: "/products/form-builder",
        icon: SquarePen,
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

// Nav items for pills
const navItems = [
    { name: "Pricing", link: "/pricing" },
    { name: "Docs", link: "/docs" },
];

export function NavbarComponent() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Navbar>
            {/* Desktop Navigation */}
            <NavBody visible={scrolled}>
                <NavbarLogo />

                {/* Center Navigation with Features dropdown */}
                <div className="flex items-center gap-1">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent hover:bg-white/5 text-neutral-400 hover:text-white transition-colors data-[state=open]:bg-white/5 data-[state=open]:text-white px-4 py-2 rounded-full text-sm">
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
                        </NavigationMenuList>
                    </NavigationMenu>

                    <NavItems items={navItems} />
                </div>

                {/* Right side - Auth buttons */}
                <div className="flex items-center gap-2">
                    <NavbarButton variant="secondary" href="/login">
                        Log in
                    </NavbarButton>
                    <NavbarButton variant="primary" href="/signup">
                        Get Started
                    </NavbarButton>
                </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo />
                    <MobileNavToggle
                        isOpen={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                >
                    {/* Features Section */}
                    <div className="pb-4 border-b border-white/10">
                        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Features</p>
                        {coreFeatures.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 py-2 text-neutral-300 hover:text-white transition-colors"
                            >
                                <item.icon className="w-5 h-5 text-indigo-400" />
                                <span>{item.name}</span>
                                {item.isUpcoming && (
                                    <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                        Soon
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Products Section */}
                    <div className="py-4 border-b border-white/10">
                        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Products</p>
                        {moreProducts.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 py-2 text-neutral-300 hover:text-white transition-colors"
                            >
                                <item.icon className="w-5 h-5 text-neutral-500" />
                                <span>{item.name}</span>
                                {item.isUpcoming && (
                                    <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                        Soon
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Nav Links */}
                    <div className="py-4 border-b border-white/10">
                        {navItems.map((item, idx) => (
                            <Link
                                key={`mobile-nav-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2 text-neutral-300 hover:text-white transition-colors font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex flex-col gap-3 pt-4">
                        <NavbarButton
                            onClick={() => setIsMobileMenuOpen(false)}
                            variant="secondary"
                            className="w-full justify-center border border-white/10 py-3"
                            href="/login"
                        >
                            Log in
                        </NavbarButton>
                        <NavbarButton
                            onClick={() => setIsMobileMenuOpen(false)}
                            variant="primary"
                            className="w-full justify-center py-3"
                            href="/signup"
                        >
                            Get Started
                        </NavbarButton>
                    </div>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
}

// Export as default Navbar for backwards compatibility
export { NavbarComponent as Navbar };
