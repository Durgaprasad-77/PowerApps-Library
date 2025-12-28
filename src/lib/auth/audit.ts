// Audit logging utilities for security events
// Logs to the audit_logs table for compliance and monitoring

import { createAdminClientSafe } from './admin';
import { headers } from 'next/headers';

export type AuditEvent =
    | 'login'
    | 'logout'
    | 'login_failed'
    | 'mfa_setup'
    | 'mfa_verify'
    | 'password_change'
    | 'password_reset_request'
    | 'role_change'
    | 'session_refresh';

interface AuditLogEntry {
    userId?: string;
    event: AuditEvent;
    metadata?: Record<string, unknown>;
}

/**
 * Extracts client IP address from request headers
 */
async function getClientIp(): Promise<string | null> {
    try {
        const headersList = await headers();
        return (
            headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            headersList.get('x-real-ip') ||
            null
        );
    } catch {
        return null;
    }
}

/**
 * Extracts user agent from request headers
 */
async function getUserAgent(): Promise<string | null> {
    try {
        const headersList = await headers();
        return headersList.get('user-agent') || null;
    } catch {
        return null;
    }
}

/**
 * Logs a security event to the audit_logs table
 * Silently fails if admin client is unavailable (graceful degradation)
 */
export async function logAuditEvent(entry: AuditLogEntry): Promise<boolean> {
    const adminClient = createAdminClientSafe();

    if (!adminClient) {
        console.warn('[Audit] Admin client unavailable, skipping audit log');
        return false;
    }

    try {
        const [ipAddress, userAgent] = await Promise.all([
            getClientIp(),
            getUserAgent(),
        ]);

        const { error } = await adminClient.from('audit_logs').insert({
            user_id: entry.userId || null,
            event: entry.event,
            ip_address: ipAddress,
            user_agent: userAgent,
            metadata: entry.metadata || {},
        });

        if (error) {
            console.error('[Audit] Failed to log event:', error.message);
            return false;
        }

        return true;
    } catch (err) {
        console.error('[Audit] Exception logging event:', err);
        return false;
    }
}

/**
 * Convenience function to log a login event
 */
export async function logLogin(userId: string, success: boolean = true): Promise<boolean> {
    return logAuditEvent({
        userId,
        event: success ? 'login' : 'login_failed',
        metadata: { success },
    });
}

/**
 * Convenience function to log a logout event
 */
export async function logLogout(userId: string): Promise<boolean> {
    return logAuditEvent({
        userId,
        event: 'logout',
    });
}

/**
 * Convenience function to log MFA setup
 */
export async function logMfaSetup(userId: string): Promise<boolean> {
    return logAuditEvent({
        userId,
        event: 'mfa_setup',
    });
}

/**
 * Convenience function to log MFA verification
 */
export async function logMfaVerify(userId: string, success: boolean = true): Promise<boolean> {
    return logAuditEvent({
        userId,
        event: 'mfa_verify',
        metadata: { success },
    });
}
