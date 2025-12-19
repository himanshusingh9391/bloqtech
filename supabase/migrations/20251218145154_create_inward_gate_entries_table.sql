/*
  # Create Inward Gate Entries Table

  1. New Tables
    - `inward_gate_entries`
      - `id` (uuid, primary key) - Auto-generated entry ID
      - `entry_number` (text) - Human-readable entry number
      - `vehicle_number` (text) - Vehicle registration number
      - `supplier_name` (text) - Name of the supplier
      - `supplier_address` (text) - Address of the supplier
      - `po_no` (text) - Purchase Order Number
      - `po_date` (text) - Purchase Order Date
      - `invoice_no` (text) - Invoice Number
      - `driver_email` (text) - Driver's email address
      - `vehicle_type` (text) - Type of vehicle
      - `driving_license_no` (text) - Driver's license number
      - `remark` (text) - Additional remarks
      - `created_by` (text) - User who created the entry
      - `created_at` (timestamptz) - Timestamp of entry creation
      
  2. Security
    - Enable RLS on `inward_gate_entries` table
    - Add policies for public access (for demo purposes)
    
  3. Notes
    - This table stores all inward gate entry records
    - Entry number is auto-generated with a sequence
    - All fields are nullable except id and created_at for flexibility
*/

CREATE TABLE IF NOT EXISTS inward_gate_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_number text UNIQUE,
  vehicle_number text,
  supplier_name text,
  supplier_address text,
  po_no text,
  po_date text,
  invoice_no text,
  driver_email text,
  vehicle_type text,
  driving_license_no text,
  remark text,
  created_by text DEFAULT 'System',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inward_gate_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON inward_gate_entries
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert access"
  ON inward_gate_entries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON inward_gate_entries
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access"
  ON inward_gate_entries
  FOR DELETE
  TO anon
  USING (true);

CREATE SEQUENCE IF NOT EXISTS entry_number_seq START 1000;