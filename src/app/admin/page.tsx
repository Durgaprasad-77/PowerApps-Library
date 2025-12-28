import { Plus, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getAdminStats, getCategories } from "@/lib/data";
import { createAdminClientSafe } from "@/lib/auth/admin";
import { StatCard } from "./components/stat-card";
import { ComponentsChart, CategoryChart, ProFreeChart } from "./components/charts";
import { ActivityFeed, Activity } from "./components/activity-feed";
import { TopComponentsList, TopComponent } from "./components/top-components-list";

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
    const stats = await getAdminStats();
    const categories = await getCategories();

    // Get user count from admin client
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

    // Generate mock growth data for chart (last 6 months)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const growthData = monthNames.map((name, i) => ({
        name,
        components: Math.max(5, stats.totalComponents - (5 - i) * Math.floor(stats.totalComponents / 10)),
    }));

    // Top categories for bar chart
    const categoryData = categories.slice(0, 5).map((cat, i) => ({
        name: cat.name.length > 10 ? cat.name.slice(0, 10) + "..." : cat.name,
        count: cat.componentsCount,
        color: ["#3b82f6", "#8b5cf6", "#22c55e", "#f59e0b", "#06b6d4"][i],
    }));

    // Generate activities from recent components
    const activities: Activity[] = stats.recentComponents.slice(0, 5).map(comp => ({
        id: comp.id,
        type: "component_created" as const,
        title: `${comp.name} added`,
        description: `New ${comp.isPro ? "Pro" : "Free"} component in ${comp.category}`,
        timestamp: comp.createdAt,
    }));

    // Transform recent components for Top Components list
    const topComponents: TopComponent[] = stats.recentComponents.slice(0, 5).map(comp => ({
        id: comp.id,
        name: comp.name,
        slug: comp.slug,
        category: comp.category,
        isPro: comp.isPro,
        createdAt: comp.createdAt,
    }));

    // Generate sparkline data for each stat
    const componentsSparkline = growthData.map(d => d.components);
    const categoriesSparkline = [3, 5, 6, 7, 8, stats.totalCategories];
    const usersSparkline = [1, 2, 2, 3, 3, usersCount];
    const proSparkline = monthNames.map((_, i) => Math.max(1, stats.proComponents - (5 - i) * 2));

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
                    <p className="text-[#6b6b6b] mt-1">Welcome back! Here&apos;s your overview.</p>
                </div>
                <Link
                    href="/admin/components/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Component
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Components"
                    value={stats.totalComponents}
                    iconName="Box"
                    color="blue"
                    href="/admin/components"
                    delay={0}
                    sparklineData={componentsSparkline}
                />
                <StatCard
                    title="Categories"
                    value={stats.totalCategories}
                    iconName="Layers"
                    color="purple"
                    href="/admin/categories"
                    delay={100}
                    sparklineData={categoriesSparkline}
                />
                <StatCard
                    title="Total Users"
                    value={usersCount}
                    iconName="Users"
                    color="green"
                    href="/admin/users"
                    delay={200}
                    sparklineData={usersSparkline}
                />
                <StatCard
                    title="Pro Components"
                    value={stats.proComponents}
                    iconName="Star"
                    color="orange"
                    href="/admin/components"
                    delay={300}
                    sparklineData={proSparkline}
                />
            </div>


            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Component Growth Chart */}
                <div className="lg:col-span-2 p-6 rounded-xl bg-[#0a0a0a] border border-[#262626]">
                    <h2 className="text-lg font-semibold text-white mb-4">Component Growth</h2>
                    <ComponentsChart data={growthData} />
                </div>

                {/* Pro/Free Distribution */}
                <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#262626]">
                    <h2 className="text-lg font-semibold text-white mb-4">Pro vs Free</h2>
                    <ProFreeChart pro={stats.proComponents} free={stats.freeComponents} />
                    <div className="mt-4 flex justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <span className="text-[#a1a1a1]">Pro ({stats.proComponents})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-[#a1a1a1]">Free ({stats.freeComponents})</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Categories */}
                <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#262626]">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white">Top Categories</h2>
                        <Link href="/admin/categories" className="text-sm text-blue-500 hover:text-blue-400">
                            View all
                        </Link>
                    </div>
                    <CategoryChart data={categoryData} />
                </div>

                {/* Recent Activity */}
                <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#262626]">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                    </div>
                    <ActivityFeed activities={activities} />
                </div>
            </div>

            {/* Top Components Row */}
            <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#262626]">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <h2 className="text-lg font-semibold text-white">Top Components</h2>
                    </div>
                    <Link href="/admin/components" className="text-sm text-blue-500 hover:text-blue-400">
                        View all
                    </Link>
                </div>
                <TopComponentsList components={topComponents} />
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#262626]">
                    <p className="text-xs text-[#6b6b6b]">Free Components</p>
                    <p className="text-xl font-bold text-white mt-1">{stats.freeComponents}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#262626]">
                    <p className="text-xs text-[#6b6b6b]">New Components</p>
                    <p className="text-xl font-bold text-white mt-1">{stats.newComponents}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#262626]">
                    <p className="text-xs text-[#6b6b6b]">Pro Ratio</p>
                    <p className="text-xl font-bold text-white mt-1">
                        {stats.totalComponents > 0
                            ? Math.round((stats.proComponents / stats.totalComponents) * 100)
                            : 0}%
                    </p>
                </div>
                <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#262626]">
                    <p className="text-xs text-[#6b6b6b]">Avg per Category</p>
                    <p className="text-xl font-bold text-white mt-1">
                        {stats.totalCategories > 0
                            ? Math.round(stats.totalComponents / stats.totalCategories)
                            : 0}
                    </p>
                </div>
            </div>
        </div>
    );
}
