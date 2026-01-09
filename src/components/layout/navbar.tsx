"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Layers, Palette, PaintBucket, Sparkles, LayoutTemplate, SquarePen } from "lucide-react";
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

// All features in a single list
const features = [
    {
        name: "Components",
        href: "/library",
        icon: Layers,
    },
    {
        name: "Form Builder",
        href: "/products/form-builder",
        icon: SquarePen,
    },
    {
        name: "Backgrounds",
        href: "/products/backgrounds",
        icon: PaintBucket,
    },
    {
        name: "Icons",
        href: "/products/icons",
        icon: Sparkles,
    },
    {
        name: "Theme Builder",
        href: "/products/theme-builder",
        icon: Palette,
    },
    {
        name: "Templates",
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
                                    <div className="w-48 py-2">
                                        {features.map((item) => (
                                            <NavigationMenuLink key={item.name} asChild>
                                                <Link
                                                    href={item.href}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                                                >
                                                    <item.icon className="w-4 h-4 text-neutral-500" />
                                                    {item.name}
                                                </Link>
                                            </NavigationMenuLink>
                                        ))}
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
                        {features.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 py-2 text-neutral-300 hover:text-white transition-colors"
                            >
                                <item.icon className="w-5 h-5 text-neutral-500" />
                                <span>{item.name}</span>
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
