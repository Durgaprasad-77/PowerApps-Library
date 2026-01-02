import { AdminSidebar } from "./components/admin-sidebar";
import { AdminHeader } from "./components/admin-header";
import { checkAdminAccess } from "@/lib/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await checkAdminAccess();

    return (
        <div className="flex h-screen bg-[#111111]">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader />
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
