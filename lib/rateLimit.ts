// A simple in-memory rate limiter, keyed by IP address.
//
// Honest limitation: on Vercel's serverless platform, each function
// invocation may run on a different instance, so this in-memory store
// isn't shared globally the way a real Redis-backed limiter would be.
// It still helps against a single bot hammering the same warm instance,
// and combined with the honeypot field, covers the realistic threat model
// for a personal site. If this site ever gets serious bot traffic, the
// next step up is Upstash Redis + @upstash/ratelimit.

const hits = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count += 1;
  if (entry.count > limit) return true;
  return false;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}
