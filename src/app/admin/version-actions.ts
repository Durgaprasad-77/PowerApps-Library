"use server";

import { createClient } from "@/lib/supabase/server";
import { checkAdminAccess } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export interface ComponentVersion {
    id: string;
    version_number: number;
    yaml_code: string;
    name: string;
    description: string | null;
    is_pro: boolean;
    is_new: boolean;
    settings_schema: Record<string, unknown> | null;
    default_settings: Record<string, unknown> | null;
    created_at: string;
    change_summary: string | null;
    created_by: string | null;
}

export async function getComponentVersions(componentId: string): Promise<ComponentVersion[]> {
    await checkAdminAccess();
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("component_versions")
        .select("*")
        .eq("component_id", componentId)
        .order("version_number", { ascending: false });

    if (error) {
        console.error("Error fetching versions:", error);
        return [];
    }

    return data || [];
}

export async function createComponentVersion(
    componentId: string,
    changeSummary: string
): Promise<{ success: boolean; error?: string }> {
    await checkAdminAccess();
    const supabase = await createClient();

    // Get current component data
    const { data: component, error: compError } = await supabase
        .from("components")
        .select("*")
        .eq("id", componentId)
        .single();

    if (compError || !component) {
        return { success: false, error: "Component not found" };
    }

    // Get latest version number
    const { data: latestVersion } = await supabase
        .from("component_versions")
        .select("version_number")
        .eq("component_id", componentId)
        .order("version_number", { ascending: false })
        .limit(1)
        .single();

    const newVersionNumber = (latestVersion?.version_number || 0) + 1;

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    // Create version snapshot
    const { error: insertError } = await supabase
        .from("component_versions")
        .insert({
            component_id: componentId,
            version_number: newVersionNumber,
            yaml_code: component.yaml_code,
            name: component.name,
            description: component.description,
            is_pro: component.is_pro,
            is_new: component.is_new,
            settings_schema: component.settings_schema,
            default_settings: component.default_settings,
            created_by: user?.id,
            change_summary: changeSummary,
        });

    if (insertError) {
        console.error("Error creating version:", insertError);
        return { success: false, error: insertError.message };
    }

    revalidatePath(`/admin/components/${componentId}`);
    return { success: true };
}

export async function restoreComponentVersion(
    componentId: string,
    versionId: string
): Promise<{ success: boolean; error?: string }> {
    await checkAdminAccess();
    const supabase = await createClient();

    // Get the version to restore
    const { data: version, error: versionError } = await supabase
        .from("component_versions")
        .select("*")
        .eq("id", versionId)
        .single();

    if (versionError || !version) {
        return { success: false, error: "Version not found" };
    }

    // Create a snapshot of current state before restoring
    await createComponentVersion(componentId, `Before restoring to v${version.version_number}`);

    // Restore the component to this version
    const { error: updateError } = await supabase
        .from("components")
        .update({
            yaml_code: version.yaml_code,
            name: version.name,
            description: version.description,
            is_pro: version.is_pro,
            is_new: version.is_new,
            settings_schema: version.settings_schema,
            default_settings: version.default_settings,
            updated_at: new Date().toISOString(),
        })
        .eq("id", componentId);

    if (updateError) {
        console.error("Error restoring version:", updateError);
        return { success: false, error: updateError.message };
    }

    revalidatePath(`/admin/components/${componentId}`);
    revalidatePath("/admin/components");
    return { success: true };
}
