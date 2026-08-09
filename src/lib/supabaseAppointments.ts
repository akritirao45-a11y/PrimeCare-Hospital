import { supabase } from './supabase';
import { Appointment } from '../types';

/**
 * Saves a new appointment to the Supabase 'appointments' table.
 * Handles both snake_case and camelCase database schema column naming seamlessly.
 */
export async function saveAppointmentToSupabase(
  appointment: Appointment
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Try standard snake_case schema insert
    const payloadSnake = {
      id: appointment.id,
      reference_number: appointment.referenceNumber,
      patient_name: appointment.patientName,
      age: appointment.age,
      gender: appointment.gender,
      phone: appointment.phone,
      email: appointment.email,
      department_id: appointment.departmentId,
      department_name: appointment.departmentName,
      doctor_id: appointment.doctorId,
      doctor_name: appointment.doctorName,
      doctor_specialty: appointment.doctorSpecialty,
      preferred_date: appointment.preferredDate,
      preferred_time: appointment.preferredTime,
      reason_for_visit: appointment.reasonForVisit,
      additional_message: appointment.additionalMessage || '',
      status: appointment.status,
      created_at: appointment.createdAt
    };

    let { error } = await supabase.from('appointments').insert([payloadSnake]);

    if (error) {
      console.warn('Snake_case insert failed, attempting camelCase schema insert...', error.message);
      
      // 2. Fallback to camelCase schema insert if table uses exact camelCase column names
      const payloadCamel = {
        id: appointment.id,
        referenceNumber: appointment.referenceNumber,
        patientName: appointment.patientName,
        age: appointment.age,
        gender: appointment.gender,
        phone: appointment.phone,
        email: appointment.email,
        departmentId: appointment.departmentId,
        departmentName: appointment.departmentName,
        doctorId: appointment.doctorId,
        doctorName: appointment.doctorName,
        doctorSpecialty: appointment.doctorSpecialty,
        preferredDate: appointment.preferredDate,
        preferredTime: appointment.preferredTime,
        reasonForVisit: appointment.reasonForVisit,
        additionalMessage: appointment.additionalMessage || '',
        status: appointment.status,
        createdAt: appointment.createdAt
      };

      const retryRes = await supabase.from('appointments').insert([payloadCamel]);
      if (retryRes.error) {
        console.error('Supabase appointment insert error:', retryRes.error.message);
        return { success: false, error: retryRes.error.message };
      }
    }

    console.log('Successfully saved appointment to Supabase table "appointments":', appointment.referenceNumber);
    return { success: true };
  } catch (err: any) {
    console.error('Unexpected error inserting to Supabase:', err);
    return { success: false, error: err?.message || 'Connection error' };
  }
}

/**
 * Fetches appointments from the Supabase 'appointments' table.
 */
export async function fetchAppointmentsFromSupabase(): Promise<Appointment[]> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      // Retry selecting without created_at ordering if column differs
      const retry = await supabase.from('appointments').select('*');
      if (retry.error || !retry.data) {
        console.warn('Could not fetch from Supabase appointments table:', error?.message || retry.error?.message);
        return [];
      }
      return mapRowsToAppointments(retry.data);
    }

    return mapRowsToAppointments(data);
  } catch (err) {
    console.error('Error fetching appointments from Supabase:', err);
    return [];
  }
}

/**
 * Updates status of an appointment in Supabase.
 */
export async function updateAppointmentStatusInSupabase(
  id: string,
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled'
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.warn('Error updating status in Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to update status in Supabase:', err);
    return false;
  }
}

function mapRowsToAppointments(rows: any[]): Appointment[] {
  return rows.map((row) => ({
    id: row.id || `apt-${Date.now()}`,
    referenceNumber: row.reference_number || row.referenceNumber || 'REF-N/A',
    patientName: row.patient_name || row.patientName || 'Patient',
    age: Number(row.age || 30),
    gender: row.gender || 'Other',
    phone: row.phone || '',
    email: row.email || '',
    departmentId: row.department_id || row.departmentId || 'general',
    departmentName: row.department_name || row.departmentName || 'General',
    doctorId: row.doctor_id || row.doctorId || 'doc',
    doctorName: row.doctor_name || row.doctorName || 'Doctor',
    doctorSpecialty: row.doctor_specialty || row.doctorSpecialty || 'Specialist',
    preferredDate: row.preferred_date || row.preferredDate || new Date().toISOString().split('T')[0],
    preferredTime: row.preferred_time || row.preferredTime || '10:00 AM',
    reasonForVisit: row.reason_for_visit || row.reasonForVisit || 'Consultation',
    additionalMessage: row.additional_message || row.additionalMessage || '',
    status: row.status || 'Confirmed',
    createdAt: row.created_at || row.createdAt || new Date().toISOString()
  }));
}
