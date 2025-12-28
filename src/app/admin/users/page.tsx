import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/auth/server";
import { UsersTable } from "./users-table";
import { checkAdminAccess } from "@/lib/auth";

interface AdminUser {
    id: string;
    email?: string;
    created_at: string;
    last_sign_in_at?: string;
    banned_until?: string | null;
}

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
    await checkAdminAccess();

    // Get current user
    const supabase = await createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    // Use try-catch or handle missing key gracefully
    let usersList: AdminUser[] = [];
    try {
        const supabaseAdmin = createAdminClient();
        const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();

        if (error) {
            console.error("Error fetching users:", error);
        } else {
            usersList = users as unknown as AdminUser[];
        }
    } catch (e) {
        console.error("Admin client error:", e);
        return <div className="text-red-500">Error: Service Role Key missing or invalid.</div>;
    }

    // Fetch roles for these users
    const adminClient = createAdminClient();
    const { data: userRoles } = await adminClient
        .from('user_roles')
        .select('user_id, role:roles(name)');

    const rolesMap = new Map<string, string[]>();
    if (userRoles) {
        for (const ur of userRoles) {
            const userId = ur.user_id as string;
            const roleName = (ur.role as unknown as { name: string } | null)?.name;
            const roles = rolesMap.get(userId) || [];
            if (roleName) roles.push(roleName);
            rolesMap.set(userId, roles);
        }
    }

    const data = usersList.map(u => ({
        id: u.id,
        email: u.email || '',
        created_at: new Date(u.created_at).toLocaleDateString(),
        roles: rolesMap.get(u.id) || ['user'],
        last_sign_in: u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString() : 'Never',
        banned_until: u.banned_until || null
    }));

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Users</h1>
                <p className="text-[#6b6b6b] text-sm mt-1">Manage user accounts and roles</p>
            </div>

            <UsersTable users={data} currentUserId={currentUser?.id} />
        </div>
    );
}
