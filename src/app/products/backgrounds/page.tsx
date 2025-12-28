import { Metadata } from "next";
import { BackgroundsGallery } from "./components/backgrounds-gallery";
import { getBackgrounds } from "@/services/background-service";

export const metadata: Metadata = {
    title: "Backgrounds | PowerUI",
    description: "Beautiful SVG backgrounds for Power Apps. Copy-paste ready YAML code with live customization.",
    keywords: ["Power Apps", "backgrounds", "SVG", "patterns", "YAML", "canvas app"],
};

// Revalidate every hour
export const revalidate = 3600;

export default async function BackgroundsPage() {
    const backgrounds = await getBackgrounds();

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero Section */}
            <section className="relative py-16 px-4 overflow-hidden">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><circle cx='10' cy='10' r='1' fill='rgba(59,130,246,0.3)'/></svg>`)}")`,
                        backgroundRepeat: "repeat",
                    }}
                />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            New Product
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Beautiful Backgrounds for{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Power Apps
                            </span>
                        </h1>

                        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                            Copy-paste ready SVG backgrounds. Customize colors, preview instantly,
                            and paste directly into your Power Apps canvas.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {backgrounds.length}+ Backgrounds
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                5 Categories
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
                    <BackgroundsGallery initialBackgrounds={backgrounds} />
                </div>
            </section>
        </div>
    );
}
