import { createClient } from '@supabase/supabase-js';

const DEFAULT_URL = 'https://xsasuoxlnmbsfrgzidjp.supabase.co';
const DEFAULT_KEY = 'sb_publishable_M3cyoQmQen8t--XZi65wGQ_Ze5ZIM4Z';

function sanitizeUrl(rawUrl?: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return DEFAULT_URL;
  let cleaned = rawUrl.trim().replace(/^["']|["']$/g, '');
  if (!cleaned) return DEFAULT_URL;
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = 'https://' + cleaned;
  }
  try {
    new URL(cleaned);
    return cleaned;
  } catch {
    return DEFAULT_URL;
  }
}

function sanitizeKey(rawKey?: string): string {
  if (!rawKey || typeof rawKey !== 'string') return DEFAULT_KEY;
  const cleaned = rawKey.trim().replace(/^["']|["']$/g, '');
  return cleaned || DEFAULT_KEY;
}

const SUPABASE_URL = sanitizeUrl(import.meta.env.VITE_SUPABASE_URL);
const SUPABASE_ANON_KEY = sanitizeKey(import.meta.env.VITE_SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
