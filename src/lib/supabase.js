import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase URL and Anon Key
const supabaseUrl = 'https://pyfpvtdlovnsusrcevyr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZnB2dGRsb3Zuc3VzcmNldnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTY0NTMsImV4cCI6MjA5MjY3MjQ1M30._4B64hmCJP-jC6XO0s603UGD1PbQCvjni0OlXpAib-4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
