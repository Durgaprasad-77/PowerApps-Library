"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkAdminAccess } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export interface AdminNotification {
    id: string;
    type: string;
    title: string;
    message: string | null;
    href: string | null;
    is_read: boolean;
    created_at: string;
}

export async function getAdminNotifications(): Promise<AdminNotification[]> {
    await checkAdminAccess();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from("admin_notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

    if (error) {
        console.error("Error fetching notifications:", error);
        return [];
    }

    return data || [];
}

export async function getUnreadNotificationCount(): Promise<number> {
    await checkAdminAccess();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return 0;

    const { count, error } = await supabase
        .from("admin_notifications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_read", false);

    if (error) {
        console.error("Error counting notifications:", error);
        return 0;
    }

    return count || 0;
}

export async function markNotificationAsRead(notificationId: string): Promise<void> {
    await checkAdminAccess();
    const supabase = await createClient();

    await supabase
        .from("admin_notifications")
        .update({ is_read: true })
        .eq("id", notificationId);

    revalidatePath("/admin");
}

export async function markAllNotificationsAsRead(): Promise<void> {
    await checkAdminAccess();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
        .from("admin_notifications")
        .update({ is_read: true })
        .eq("user_id", user.id)
        .eq("is_read", false);

    revalidatePath("/admin");
}

// Helper to create notifications (called from other actions)
export async function createNotification(
    userId: string,
    type: string,
    title: string,
    message?: string,
    href?: string
): Promise<void> {
    try {
        const adminClient = createAdminClient();

        await adminClient
            .from("admin_notifications")
            .insert({
                user_id: userId,
                type,
                title,
                message,
                href,
            });
    } catch (e) {
        console.error("Error creating notification:", e);
    }
}

// Create notifications for all admins
export async function notifyAllAdmins(
    type: string,
    title: string,
    message?: string,
    href?: string
): Promise<void> {
    try {
        const adminClient = createAdminClient();

        // Get all admin user IDs
        const { data: adminRoles } = await adminClient
            .from("user_roles")
            .select("user_id, roles!inner(name)")
            .eq("roles.name", "admin");

        if (adminRoles && adminRoles.length > 0) {
            const notifications = adminRoles.map((ur: { user_id: string }) => ({
                user_id: ur.user_id,
                type,
                title,
                message,
                href,
            }));

            await adminClient
                .from("admin_notifications")
                .insert(notifications);
        }
    } catch (e) {
        console.error("Error notifying admins:", e);
    }
}
