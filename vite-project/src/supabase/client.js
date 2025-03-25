import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rpsnvbiinzrevtxeiozz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwc252YmlpbnpyZXZ0eGVpb3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MTExODQsImV4cCI6MjA1NTk4NzE4NH0.7_D-bB2XLvb8zCC9o6Mgo-tjnUL8XR2596FOVg4vm3g';

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;