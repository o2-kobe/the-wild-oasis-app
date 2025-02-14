import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://epylhntzjagbudgfhqzq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVweWxobnR6amFnYnVkZ2ZocXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwMjE3NjEsImV4cCI6MjA1NDU5Nzc2MX0.xBbFPis1gzj-54k9r58Xy8w_aSDG0H6xZuZy4XMqiF4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
