/**
 * Rate Limiting Utility
 * 
 * Simple in-memory rate limiting for server actions.
 * For production, consider using Redis for distributed rate limiting.
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

// In-memory store (Note: resets on server restart)
const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
    /** Maximum number of requests allowed within the window */
    maxRequests: number;
    /** Time window in milliseconds */
    windowMs: number;
}

// Default configurations for different action types
export const RATE_LIMIT_CONFIGS = {
    // Auth actions - stricter limits
    auth: { maxRequests: 5, windowMs: 60 * 1000 }, // 5 per minute
    passwordReset: { maxRequests: 3, windowMs: 15 * 60 * 1000 }, // 3 per 15 mins

    // Admin actions - moderate limits
    admin: { maxRequests: 30, windowMs: 60 * 1000 }, // 30 per minute
    adminWrite: { maxRequests: 10, windowMs: 60 * 1000 }, // 10 per minute

    // General actions - relaxed limits
    general: { maxRequests: 100, windowMs: 60 * 1000 }, // 100 per minute
} as const;

/**
 * Check if a request should be rate limited
 * @param key - Unique identifier (e.g., IP + action name)
 * @param config - Rate limit configuration
 * @returns Object with allowed status and remaining requests
 */
export function checkRateLimit(
    key: string,
    config: RateLimitConfig
): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const entry = rateLimitStore.get(key);

    // No existing entry or expired
    if (!entry || now >= entry.resetTime) {
        rateLimitStore.set(key, {
            count: 1,
            resetTime: now + config.windowMs,
        });
        return {
            allowed: true,
            remaining: config.maxRequests - 1,
            resetIn: config.windowMs,
        };
    }

    // Check if limit exceeded
    if (entry.count >= config.maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetIn: entry.resetTime - now,
        };
    }

    // Increment counter
    entry.count++;
    rateLimitStore.set(key, entry);

    return {
        allowed: true,
        remaining: config.maxRequests - entry.count,
        resetIn: entry.resetTime - now,
    };
}

/**
 * Get rate limit key from request headers
 * Extracts IP or fallback identifier
 */
export function getRateLimitKey(
    actionName: string,
    identifier?: string
): string {
    // Use identifier (could be user ID, IP, etc.)
    const id = identifier || 'anonymous';
    return `${actionName}:${id}`;
}

/**
 * Rate limit check for server actions
 * Throws error if rate limited
 */
export async function enforceRateLimit(
    actionName: string,
    config: RateLimitConfig = RATE_LIMIT_CONFIGS.admin,
    identifier?: string
): Promise<void> {
    const key = getRateLimitKey(actionName, identifier);
    const result = checkRateLimit(key, config);

    if (!result.allowed) {
        const retryAfter = Math.ceil(result.resetIn / 1000);
        throw new Error(
            `Rate limit exceeded. Please try again in ${retryAfter} seconds.`
        );
    }
}

/**
 * Clean up expired entries periodically
 * Call this in a cron job or background task
 */
export function cleanupRateLimitStore(): void {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now >= entry.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
    setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}
