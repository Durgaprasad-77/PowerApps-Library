import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-semibold text-lg text-gray-900 dark:text-white tracking-tight">
                                PowerAppLibs
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-[#6b6b6b] max-w-md text-sm leading-relaxed">
                            The largest library of Power Apps components with copy-paste ready YAML code.
                            Build beautiful canvas apps faster.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-4 text-sm">Product</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/library" className="text-gray-500 dark:text-[#6b6b6b] hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                                    Components
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-gray-500 dark:text-[#6b6b6b] hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs" className="text-gray-500 dark:text-[#6b6b6b] hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                                    Documentation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-4 text-sm">Connect</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 dark:text-[#6b6b6b] hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                                >
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 dark:text-[#6b6b6b] hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <Link href="/support" className="text-gray-500 dark:text-[#6b6b6b] hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-[#262626]">
                    <p className="text-gray-500 dark:text-[#6b6b6b] text-sm text-center">
                        © {new Date().getFullYear()} PowerAppLibs. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
