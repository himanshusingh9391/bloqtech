import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface InwardGateEntry {
  id: string;
  entry_number: string | null;
  vehicle_number: string | null;
  supplier_name: string | null;
  supplier_address: string | null;
  po_no: string | null;
  po_date: string | null;
  invoice_no: string | null;
  driver_email: string | null;
  vehicle_type: string | null;
  driving_license_no: string | null;
  remark: string | null;
  created_by: string | null;
  created_at: string;
}
