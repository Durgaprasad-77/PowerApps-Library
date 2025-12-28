import { getAdminStats, getCategories, getComponents } from "@/lib/data";
import { createAdminClientSafe } from "@/lib/auth/admin";
import { AnalyticsDashboard } from "./analytics-dashboard";

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
    const [stats, categories, components] = await Promise.all([
        getAdminStats(),
        getCategories(),
        getComponents(),
    ]);

    // Get user count
    let usersCount = 0;
    try {
        const adminClient = createAdminClientSafe();
        if (adminClient) {
            const { data: { users } } = await adminClient.auth.admin.listUsers();
            usersCount = users?.length || 0;
        }
    } catch (e) {
        console.error("Error fetching users count:", e);
    }

    // Prepare data for charts
    const categoryDistribution = categories.map(cat => ({
        name: cat.name,
        components: cat.componentsCount,
        slug: cat.slug,
    }));

    const proFreeDistribution = [
        { name: "Pro", value: stats.proComponents, color: "#3b82f6" },
        { name: "Free", value: stats.freeComponents, color: "#22c55e" },
    ];

    const newVsExisting = [
        { name: "New", value: stats.newComponents, color: "#f59e0b" },
        { name: "Existing", value: stats.totalComponents - stats.newComponents, color: "#6b7280" },
    ];

    // Components by category for bar chart
    const componentsByCategory = categories
        .sort((a, b) => b.componentsCount - a.componentsCount)
        .slice(0, 8)
        .map(cat => ({
            name: cat.name.length > 12 ? cat.name.slice(0, 12) + "..." : cat.name,
            count: cat.componentsCount,
        }));

    // Pro ratio by category
    const proRatioByCategory = categories.map(cat => {
        const catComponents = components.filter(c => c.category === cat.slug);
        const proCount = catComponents.filter(c => c.isPro).length;
        return {
            name: cat.name.length > 10 ? cat.name.slice(0, 10) + "..." : cat.name,
            pro: proCount,
            free: catComponents.length - proCount,
        };
    }).filter(c => c.pro + c.free > 0);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Analytics</h1>
                <p className="text-[#6b6b6b] text-sm mt-1">Comprehensive insights into your component library</p>
            </div>

            <AnalyticsDashboard
                stats={{
                    totalComponents: stats.totalComponents,
                    totalCategories: stats.totalCategories,
                    totalUsers: usersCount,
                    proComponents: stats.proComponents,
                    freeComponents: stats.freeComponents,
                    newComponents: stats.newComponents,
                }}
                categoryDistribution={categoryDistribution}
                proFreeDistribution={proFreeDistribution}
                newVsExisting={newVsExisting}
                componentsByCategory={componentsByCategory}
                proRatioByCategory={proRatioByCategory}
            />
        </div>
    );
}
