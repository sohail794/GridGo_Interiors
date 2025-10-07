/*
  # Create Contact Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text, required) - Contact name
      - `email` (text, required) - Contact email
      - `phone` (text, optional) - Contact phone number
      - `subject` (text, optional) - Subject of inquiry
      - `message` (text, required) - Message content
      - `service` (text, optional) - Service of interest (for service quote form)
      - `form_type` (text, default 'contact') - Type of form (contact or service_quote)
      - `status` (text, default 'new') - Status of submission (new, read, responded)
      - `created_at` (timestamptz) - Timestamp of submission
      - `updated_at` (timestamptz) - Last updated timestamp

  2. Security
    - Enable RLS on `contact_submissions` table
    - Policy for inserting submissions (public can submit)
    - Authenticated users cannot read submissions (admin-only in future)

  3. Indexes
    - Index on email for quick lookup
    - Index on created_at for sorting
    - Index on status for filtering
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  service text,
  form_type text DEFAULT 'contact',
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS contact_submissions_email_idx ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS contact_submissions_status_idx ON contact_submissions(status);
