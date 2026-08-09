import { supabase } from './supabase';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

const LOCAL_ADMIN_KEY = 'primecare_admin_user_account';
const LOCAL_SESSION_KEY = 'primecare_admin_session';

/**
 * Simple hashing function for password storage
 */
async function hashPassword(password: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(password + '_primecare_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Checks if an admin account has ALREADY been created in Supabase or Local Storage.
 * Single Slot Enforcement.
 */
export async function checkAdminExists(): Promise<{ exists: boolean; adminUsername?: string }> {
  try {
    // 1. Check Supabase 'admin_users' table
    const { data, error } = await supabase.from('admin_users').select('id, username').limit(1);

    if (!error && data && data.length > 0) {
      return { exists: true, adminUsername: data[0].username };
    }

    // 2. Fallback check local storage
    const localUser = localStorage.getItem(LOCAL_ADMIN_KEY);
    if (localUser) {
      const parsed = JSON.parse(localUser);
      return { exists: true, adminUsername: parsed.username };
    }

    return { exists: false };
  } catch (err) {
    console.error('Error checking admin exists:', err);
    // Fallback to local storage check
    const localUser = localStorage.getItem(LOCAL_ADMIN_KEY);
    if (localUser) {
      const parsed = JSON.parse(localUser);
      return { exists: true, adminUsername: parsed.username };
    }
    return { exists: false };
  }
}

/**
 * Registers the ONLY admin account slot.
 * Fails if an admin account already exists.
 */
export async function registerSingleSlotAdmin(
  username: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
  // Check if slot taken
  const { exists } = await checkAdminExists();
  if (exists) {
    return {
      success: false,
      error: 'Admin slot is taken! Only 1 admin account is permitted for this website.'
    };
  }

  const passwordHash = await hashPassword(password);
  const adminId = `admin-${Date.now()}`;
  const now = new Date().toISOString();

  const newAdmin = {
    id: adminId,
    username: username.trim(),
    email: email.trim().toLowerCase(),
    password_hash: passwordHash,
    created_at: now
  };

  try {
    // Save to Supabase 'admin_users' table
    const { error } = await supabase.from('admin_users').insert([newAdmin]);
    if (error) {
      console.warn('Supabase admin_users insert error:', error.message);
      // Even if Supabase table is not yet created, save to local storage as fallback
    }

    // Always cache locally as fallback
    const userObj: AdminUser = {
      id: adminId,
      username: username.trim(),
      email: email.trim().toLowerCase(),
      createdAt: now
    };

    localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify({
      ...userObj,
      passwordHash
    }));

    // Auto-login session
    setAdminSession(userObj);

    return { success: true, user: userObj };
  } catch (err: any) {
    console.error('Failed to register admin:', err);
    return { success: false, error: err?.message || 'Failed to create admin account' };
  }
}

/**
 * Log in the admin.
 */
export async function loginAdmin(
  identifier: string, // username or email
  password: string
): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
  const passwordHash = await hashPassword(password);
  const cleanId = identifier.trim().toLowerCase();

  try {
    // 1. Try Supabase query
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .or(`username.eq.${identifier.trim()},email.eq.${cleanId}`)
      .limit(1);

    if (!error && data && data.length > 0) {
      const dbAdmin = data[0];
      if (dbAdmin.password_hash === passwordHash) {
        const userObj: AdminUser = {
          id: dbAdmin.id,
          username: dbAdmin.username,
          email: dbAdmin.email,
          createdAt: dbAdmin.created_at
        };
        setAdminSession(userObj);
        return { success: true, user: userObj };
      } else {
        return { success: false, error: 'Invalid password. Please try again.' };
      }
    }

    // 2. Fallback check local storage
    const localUserStr = localStorage.getItem(LOCAL_ADMIN_KEY);
    if (localUserStr) {
      const localUser = JSON.parse(localUserStr);
      if (
        (localUser.username.toLowerCase() === cleanId || localUser.email.toLowerCase() === cleanId) &&
        localUser.passwordHash === passwordHash
      ) {
        const userObj: AdminUser = {
          id: localUser.id,
          username: localUser.username,
          email: localUser.email,
          createdAt: localUser.createdAt
        };
        setAdminSession(userObj);
        return { success: true, user: userObj };
      }
    }

    return { success: false, error: 'Invalid admin credentials or account not found.' };
  } catch (err: any) {
    console.error('Login error:', err);
    return { success: false, error: 'Login failed due to network error.' };
  }
}

/**
 * Manage admin active session
 */
export function setAdminSession(user: AdminUser) {
  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(user));
}

export function getAdminSession(): AdminUser | null {
  try {
    const data = localStorage.getItem(LOCAL_SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function logoutAdmin() {
  localStorage.removeItem(LOCAL_SESSION_KEY);
}
