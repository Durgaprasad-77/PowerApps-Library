import Link from "next/link";
import { LogoIcon } from "@/components/ui/logo-icon";

export function Footer() {
    return (
        <footer className="border-t border-neutral-800 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <LogoIcon size={32} />
                            <span className="font-semibold text-lg text-white tracking-tight">
                                PowerUI
                            </span>
                        </Link>
                        <p className="text-neutral-400 max-w-md text-sm leading-relaxed">
                            The largest library of Power Apps components with copy-paste ready YAML code.
                            Build beautiful canvas apps faster.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-medium text-white mb-4 text-sm">Product</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/library" className="text-neutral-400 hover:text-white transition-colors text-sm">
                                    Components
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-neutral-400 hover:text-white transition-colors text-sm">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs" className="text-neutral-400 hover:text-white transition-colors text-sm">
                                    Documentation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium text-white mb-4 text-sm">Connect</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                                >
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <Link href="/support" className="text-neutral-400 hover:text-white transition-colors text-sm">
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-neutral-800">
                    <p className="text-neutral-500 text-sm text-center">
                        © {new Date().getFullYear()} PowerUI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
