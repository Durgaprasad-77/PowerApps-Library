"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
    return (
        <section className="relative py-32 overflow-hidden bg-black">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_50%)]" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Headline */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Ready to Build{" "}
                        <span className="text-neutral-500">Beautiful Apps</span>?
                    </h2>

                    {/* Subheadline */}
                    <p className="text-neutral-400 text-lg mb-10 max-w-xl mx-auto">
                        Start with our free components and experience the difference.
                        No signup required.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="text-lg h-14 px-8 bg-white text-black hover:bg-neutral-200 font-medium rounded-full transition-colors">
                            <Link href="/library" className="group">
                                Browse Free Components
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg h-14 px-8 border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-900 hover:border-neutral-600 rounded-full transition-colors">
                            <Link href="/pricing">
                                View Pricing
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
