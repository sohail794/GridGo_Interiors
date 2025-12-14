import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase only if environment variables are provided
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  service?: string;
  form_type: 'contact' | 'service_quote';
}

export const submitContactForm = async (data: ContactSubmission) => {
  if (!supabase) {
    // Graceful fallback when Supabase is not configured
    throw new Error('Contact form service is temporarily unavailable. Please try again later.');
  }

  const { data: result, error } = await supabase
    .from('contact_submissions')
    .insert([data])
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return result;
};
