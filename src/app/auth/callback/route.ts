import { createClient } from '@/lib/auth/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/';
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    // Handle OAuth errors
    if (error) {
        console.error('OAuth error:', error, errorDescription);
        return NextResponse.redirect(
            `${origin}/login?message=${encodeURIComponent(errorDescription || 'Authentication failed')}`
        );
    }

    // Exchange code for session
    if (code) {
        const supabase = await createClient();
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
            console.error('Code exchange error:', exchangeError);
            return NextResponse.redirect(
                `${origin}/login?message=${encodeURIComponent('Failed to complete authentication')}`
            );
        }

        // Successful authentication
        return NextResponse.redirect(`${origin}${next}`);
    }

    // No code provided
    return NextResponse.redirect(`${origin}/login?message=${encodeURIComponent('No authentication code provided')}`);
}
