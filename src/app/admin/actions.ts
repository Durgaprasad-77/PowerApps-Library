"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkAdminAccess } from "@/lib/auth";

export async function upsertComponent(formData: FormData) {
    // 1. Verify Admin
    await checkAdminAccess();

    const supabase = await createClient();

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const categorySlug = formData.get("category_slug") as string;
    const description = formData.get("description") as string;
    const yamlCode = formData.get("yaml_code") as string;
    const isPro = formData.get("is_pro") === "on";
    const isNew = formData.get("is_new") === "on";
    const settingsSchemaRaw = formData.get("settings_schema") as string;
    const defaultSettingsRaw = formData.get("default_settings") as string;

    // Validation
    if (!name || !slug || !categorySlug || !yamlCode) {
        throw new Error("Missing required fields");
    }

    // Parse JSONs
    let settingsSchema = null;
    let defaultSettings = null;

    try {
        if (settingsSchemaRaw) settingsSchema = JSON.parse(settingsSchemaRaw);
        if (defaultSettingsRaw) defaultSettings = JSON.parse(defaultSettingsRaw);
    } catch (e) {
        throw new Error("Invalid JSON in settings schema or defaults");
    }

    const payload = {
        name,
        slug,
        category_slug: categorySlug,
        description,
        yaml_code: yamlCode,
        is_pro: isPro,
        is_new: isNew,
        settings_schema: settingsSchema,
        default_settings: defaultSettings,
        updated_at: new Date().toISOString(),
    };

    let error;

    if (id) {
        // Update
        const { error: updateError } = await supabase
            .from("components")
            .update(payload)
            .eq("id", id);
        error = updateError;
    } else {
        // Insert
        const { error: insertError } = await supabase
            .from("components")
            .insert(payload);
        error = insertError;
    }

    if (error) {
        console.error("Error saving component:", error);
        throw new Error("Failed to save component: " + error.message);
    }

    revalidatePath("/admin/components");
    revalidatePath("/library");
    redirect("/admin/components");
}

export async function upsertCategory(formData: FormData) {
    await checkAdminAccess();
    const supabase = await createClient();

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const orderIndex = parseInt(formData.get("order_index") as string) || 0;
    const icon = formData.get("icon") as string;

    if (!name || !slug) throw new Error("Missing required fields");

    const payload = {
        name,
        slug,
        description,
        order_index: orderIndex,
        icon,
    };

    let error;
    if (id) {
        const { error: updateError } = await supabase
            .from("categories")
            .update(payload)
            .eq("id", id);
        error = updateError;
    } else {
        const { error: insertError } = await supabase
            .from("categories")
            .insert(payload);
        error = insertError;
    }

    if (error) {
        console.error("Error saving category:", error);
        throw new Error("Failed to save category: " + error.message);
    }

    revalidatePath("/admin/categories");
    revalidatePath("/library");
    redirect("/admin/categories");
}

// ============================================
// DELETE ACTIONS
// ============================================

export async function deleteComponent(id: string) {
    await checkAdminAccess();
    const supabase = await createClient();

    const { error } = await supabase
        .from("components")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting component:", error);
        throw new Error("Failed to delete component: " + error.message);
    }

    revalidatePath("/admin/components");
    revalidatePath("/library");
}

export async function deleteCategory(id: string) {
    await checkAdminAccess();
    const supabase = await createClient();

    // Check if category has components
    const { count } = await supabase
        .from("components")
        .select("*", { count: "exact", head: true })
        .eq("category_slug", id);

    if (count && count > 0) {
        throw new Error("Cannot delete category with existing components. Move or delete components first.");
    }

    const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting category:", error);
        throw new Error("Failed to delete category: " + error.message);
    }

    revalidatePath("/admin/categories");
    revalidatePath("/library");
}

// ============================================
// USER ROLE MANAGEMENT
// ============================================

export async function updateUserRole(userId: string, newRole: "admin" | "user") {
    await checkAdminAccess();
    const supabase = await createClient();

    // First, get the role ID
    const { data: roles, error: rolesError } = await supabase
        .from("roles")
        .select("id, name")
        .in("name", ["admin", "user"]);

    if (rolesError || !roles) {
        throw new Error("Failed to fetch roles");
    }

    const adminRoleId = roles.find(r => r.name === "admin")?.id;
    const userRoleId = roles.find(r => r.name === "user")?.id;

    if (!adminRoleId || !userRoleId) {
        throw new Error("Admin or User role not found in database");
    }

    // Remove existing roles for this user
    await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId);

    // Add new role
    const { error } = await supabase
        .from("user_roles")
        .insert({
            user_id: userId,
            role_id: newRole === "admin" ? adminRoleId : userRoleId,
        });

    if (error) {
        console.error("Error updating user role:", error);
        throw new Error("Failed to update user role: " + error.message);
    }

    revalidatePath("/admin/users");
}

export async function deleteUser(userId: string) {
    await checkAdminAccess();

    try {
        const adminClient = createAdminClient();

        // Delete from auth.users (this cascades to user_roles via FK)
        const { error } = await adminClient.auth.admin.deleteUser(userId);

        if (error) {
            console.error("Error deleting user:", error);
            throw new Error("Failed to delete user: " + error.message);
        }

        revalidatePath("/admin/users");
    } catch (e) {
        console.error("Admin client error:", e);
        throw new Error("Failed to delete user. Admin client error.");
    }
}

export async function toggleUserStatus(userId: string, disable: boolean) {
    await checkAdminAccess();

    try {
        const adminClient = createAdminClient();

        // Use updateUserById to toggle banned status
        // Setting ban_duration to "876000h" effectively bans forever (100 years)
        // Setting ban_duration to "none" unbans the user
        const { error } = await adminClient.auth.admin.updateUserById(userId, {
            ban_duration: disable ? "876000h" : "none",
        });

        if (error) {
            console.error("Error toggling user status:", error);
            throw new Error("Failed to toggle user status: " + error.message);
        }

        revalidatePath("/admin/users");
    } catch (e) {
        console.error("Admin client error:", e);
        throw new Error("Failed to toggle user status. Admin client error.");
    }
}

