import { Metadata } from "next";
import { IconsPageContent } from "./components/icons-page-content";
import { getFluentIcons, getIconCount } from "@/services/icons-service";

export const metadata: Metadata = {
    title: "Fluent 2 Icons | PowerUI",
    description: "3000+ Fluent UI System Icons for Power Apps. Copy-paste ready YAML code with live customization.",
    keywords: ["Power Apps", "icons", "Fluent UI", "SVG", "YAML", "Microsoft"],
};

// Revalidate every hour
export const revalidate = 3600;

export default async function IconsPage() {
    // Fetch initial icons server-side
    const { icons: initialIcons, total, totalPages } = await getFluentIcons(1);
    const totalCount = await getIconCount();

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero Section */}
            <section className="relative py-16 px-4 overflow-hidden">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><rect x='15' y='15' width='10' height='10' fill='rgba(59,130,246,0.3)' rx='2'/></svg>`)}")`,
                        backgroundRepeat: "repeat",
                    }}
                />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                            New: Animated Icons
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Fluent 2 Icons for{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                                Power Apps
                            </span>
                        </h1>

                        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                            Microsoft's official icon library plus animated icons. Customize colors, preview instantly,
                            and paste directly into your Power Apps canvas.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {totalCount.toLocaleString()}+ Static Icons
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                20 Animated Icons
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                One-Click Copy
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <IconsPageContent
                        initialIcons={initialIcons}
                        initialTotal={total}
                        initialTotalPages={totalPages}
                    />
                </div>
            </section>
        </div>
    );
}

