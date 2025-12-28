// Admin Supabase client using service role key
// ONLY use this for privileged operations that bypass RLS

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Creates an admin Supabase client with service role privileges
 * This client bypasses RLS - use with caution!
 * 
 * @throws Error if SUPABASE_SERVICE_ROLE_KEY is not defined
 */
export function createAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
        throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined');
    }

    if (!supabaseServiceKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined');
    }

    return createSupabaseClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}

/**
 * Safely creates an admin client, returning null if service key is missing
 * Use this when admin operations are optional
 */
export function createAdminClientSafe() {
    try {
        return createAdminClient();
    } catch {
        return null;
    }
}
