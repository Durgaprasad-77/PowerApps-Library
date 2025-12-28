"use server";

import { createClient } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export async function forgotPassword(formData: FormData) {
    const email = formData.get("email") as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/reset-password`,
    });

    if (error) {
        console.error('Password reset error:', error.message);
        // Don't reveal if email exists or not for security
    }

    // Always show success to prevent email enumeration
    return redirect('/auth/forgot-password?success=true');
}
