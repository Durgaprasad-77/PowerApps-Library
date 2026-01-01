"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LogoIcon } from "@/components/ui/logo-icon";
import { Menu, X } from "lucide-react";

// Navbar Container
interface NavbarProps {
    children: React.ReactNode;
    className?: string;
}

export function Navbar({ children, className }: NavbarProps) {
    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                className
            )}
        >
            {children}
        </nav>
    );
}

// Desktop NavBody
interface NavBodyProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
}

export function NavBody({ children, className, visible = true }: NavBodyProps) {
    return (
        <motion.div
            animate={{
                backdropFilter: visible ? "blur(12px)" : "none",
                backgroundColor: visible ? "rgba(0, 0, 0, 0.8)" : "transparent",
                borderColor: visible ? "rgba(255, 255, 255, 0.1)" : "transparent",
                y: visible ? 0 : -20,
            }}
            transition={{ duration: 0.3 }}
            className={cn(
                "hidden md:flex items-center justify-between max-w-7xl mx-auto px-6 py-4 rounded-full border mt-4",
                className
            )}
        >
            {children}
        </motion.div>
    );
}

// NavItems
interface NavItem {
    name: string;
    link: string;
    icon?: React.ReactNode;
}

interface NavItemsProps {
    items: NavItem[];
    className?: string;
    onItemClick?: () => void;
}

export function NavItems({ items, className, onItemClick }: NavItemsProps) {
    return (
        <div className={cn("flex items-center gap-1", className)}>
            {items.map((item, idx) => (
                <Link
                    key={`nav-item-${idx}`}
                    href={item.link}
                    onClick={onItemClick}
                    className="relative px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                >
                    <span className="flex items-center gap-2">
                        {item.icon}
                        {item.name}
                    </span>
                </Link>
            ))}
        </div>
    );
}

// NavbarLogo
interface NavbarLogoProps {
    className?: string;
}

export function NavbarLogo({ className }: NavbarLogoProps) {
    return (
        <Link href="/" className={cn("flex items-center gap-2 group", className)}>
            <LogoIcon size={28} className="transition-transform group-hover:scale-110" />
            <span className="text-lg font-bold text-white">PowerUI</span>
        </Link>
    );
}

// NavbarButton
interface NavbarButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
    onClick?: () => void;
    href?: string;
}

export function NavbarButton({
    children,
    variant = "primary",
    className,
    onClick,
    href,
}: NavbarButtonProps) {
    const baseStyles = "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200";
    const variantStyles = {
        primary: "bg-white text-black hover:bg-neutral-200",
        secondary: "text-neutral-400 hover:text-white",
    };

    const content = (
        <button
            onClick={onClick}
            className={cn(baseStyles, variantStyles[variant], className)}
        >
            {children}
        </button>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
}

// Mobile Nav Container
interface MobileNavProps {
    children: React.ReactNode;
    className?: string;
}

export function MobileNav({ children, className }: MobileNavProps) {
    return (
        <div className={cn("md:hidden", className)}>
            {children}
        </div>
    );
}

// Mobile Nav Header
interface MobileNavHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function MobileNavHeader({ children, className }: MobileNavHeaderProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-between px-4 py-4 bg-black/80 backdrop-blur-xl border-b border-white/10",
                className
            )}
        >
            {children}
        </div>
    );
}

// Mobile Nav Toggle
interface MobileNavToggleProps {
    isOpen: boolean;
    onClick: () => void;
    className?: string;
}

export function MobileNavToggle({ isOpen, onClick, className }: MobileNavToggleProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "p-2 rounded-lg text-white hover:bg-white/10 transition-colors",
                className
            )}
        >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
    );
}

// Mobile Nav Menu
interface MobileNavMenuProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

export function MobileNavMenu({ children, isOpen, onClose, className }: MobileNavMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />
                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className={cn(
                            "fixed top-0 right-0 bottom-0 w-[300px] bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 overflow-y-auto",
                            className
                        )}
                    >
                        {/* Close button */}
                        <div className="flex justify-end p-4">
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
