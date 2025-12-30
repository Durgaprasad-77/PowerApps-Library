"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { GradientOrb } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";

export function CTASection() {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <GradientOrb
                    color="purple"
                    size="lg"
                    className="-bottom-48 left-1/2 -translate-x-1/2 opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-transparent to-white dark:to-[#0a0a0a]" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    // Icon
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-8 ring-1 ring-border">
                        <Sparkles className="w-8 h-8 text-primary" />
                    </div>

                    {/* Headline */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                        Ready to Build{" "}
                        <span className="text-gradient-blue">Beautiful Apps</span>?
                    </h2>

                    {/* Subheadline */}
                    <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
                        Start with our free components and experience the difference.
                        No signup required.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="text-lg h-14 px-8">
                            <Link href="/library" className="group">
                                Browse Free Components
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg h-14 px-8 bg-background border-border hover:bg-muted">
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
