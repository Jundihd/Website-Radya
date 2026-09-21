/**
 * Session helper untuk Studio Blog Editor (/studio).
 * Cookie berisi "<expiry>.<hmac>" dengan HMAC-SHA256 memakai Web Crypto
 * sehingga bisa diverifikasi di Edge Middleware maupun Node runtime.
 */

export const STUDIO_COOKIE_NAME = 'rl_studio_auth';
export const STUDIO_SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 jam

function getSecret(): string {
  return (
    process.env.STUDIO_SESSION_SECRET ||
    process.env.BLOG_ADMIN_PASSWORD ||
    'radya-studio-dev-secret'
  );
}

async function hmacHex(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(message),
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Buat nilai cookie sesi baru. */
export async function createStudioSession(): Promise<{
  value: string;
  expiresAt: number;
}> {
  const expiresAt = Date.now() + STUDIO_SESSION_TTL_MS;
  const payload = `studio:${expiresAt}`;
  const sig = await hmacHex(payload);
  return { value: `${expiresAt}.${sig}`, expiresAt };
}

/** Verifikasi nilai cookie sesi. */
export async function verifyStudioSession(
  value: string | undefined | null,
): Promise<boolean> {
  if (!value) return false;
  const [expiryRaw, sig] = value.split('.');
  const expiresAt = Number(expiryRaw);
  if (!expiryRaw || !sig || Number.isNaN(expiresAt)) return false;
  if (Date.now() > expiresAt) return false;
  const expected = await hmacHex(`studio:${expiresAt}`);
  return (
    sig.length === expected.length &&
    sig
      .split('')
      .every((ch, i) => ch === expected[i])
  );
}

/** Password admin dari env. Sengaja tidak ada default agar wajib diset manual. */
export function getAdminPassword(): string | undefined {
  return process.env.BLOG_ADMIN_PASSWORD || undefined;
}
