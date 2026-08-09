import { Appointment } from '../types';
import {
  saveAppointmentToSupabase,
  fetchAppointmentsFromSupabase,
  updateAppointmentStatusInSupabase
} from '../lib/supabaseAppointments';

const STORAGE_KEY = 'primecare_hospital_appointments';

export function getStoredAppointments(): Appointment[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Appointment[];
  } catch (err) {
    console.error('Error reading appointments from localStorage', err);
    return [];
  }
}

export function saveAppointment(appointmentData: Omit<Appointment, 'id' | 'referenceNumber' | 'status' | 'createdAt'>): Appointment {
  const existing = getStoredAppointments();
  
  // Generate a realistic reference number
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const ref = `PC-2026-${randomNum}`;
  
  const newAppointment: Appointment = {
    ...appointmentData,
    id: `apt-${Date.now()}`,
    referenceNumber: ref,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  const updated = [newAppointment, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving appointment to localStorage', err);
  }

  // Asynchronously push to Supabase backend table 'appointments'
  saveAppointmentToSupabase(newAppointment).then((res) => {
    if (res.success) {
      console.log('⚡ Appointment synced to Supabase backend successfully!');
    } else {
      console.warn('⚠️ Saved locally. Supabase sync notice:', res.error);
    }
  });

  return newAppointment;
}

export function cancelAppointment(id: string): boolean {
  try {
    const existing = getStoredAppointments();
    const updated = existing.map(apt => apt.id === id ? { ...apt, status: 'Cancelled' as const } : apt);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Update in Supabase
    updateAppointmentStatusInSupabase(id, 'Cancelled');
    return true;
  } catch (err) {
    console.error('Error cancelling appointment', err);
    return false;
  }
}

export function getAppointmentByReference(refNum: string): Appointment | undefined {
  const existing = getStoredAppointments();
  return existing.find(apt => apt.referenceNumber.toLowerCase() === refNum.trim().toLowerCase());
}

export async function syncAppointmentsFromSupabase(): Promise<Appointment[]> {
  const remoteApts = await fetchAppointmentsFromSupabase();
  if (remoteApts && remoteApts.length > 0) {
    const local = getStoredAppointments();
    // Merge remote and local by id
    const map = new Map<string, Appointment>();
    local.forEach(a => map.set(a.id, a));
    remoteApts.forEach(a => map.set(a.id, a));
    const merged = Array.from(map.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch (e) {
      console.error('Error caching merged appointments', e);
    }
    return merged;
  }
  return getStoredAppointments();
}
