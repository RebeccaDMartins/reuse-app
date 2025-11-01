import { load, save } from "./storage";

type CacheEntry<T> = { data: T; timestamp: number; ttl: number };

export async function cacheGet<T>(key: string): Promise<T | null> {
    const entry = await load<CacheEntry<T>>(key);
    if (!entry) return null;
    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) return null;
    return entry.data;
}

export async function cacheSet<T>(key: string, data: T, ttlMs: number) {
    const entry: CacheEntry<T> = { data, timestamp: Date.now(), ttl: ttlMs };
    await save(key, entry);
}
