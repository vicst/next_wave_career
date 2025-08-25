import { createBrowserClient } from "@supabase/ssr"

console.log("[v0] Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Found" : "✗ Missing")
console.log("[v0] Supabase Anon Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Found" : "✗ Missing")

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Missing Supabase environment variables:")
    console.error("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl)
    console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "[REDACTED]" : "undefined")
    throw new Error("Supabase environment variables are not configured. Please check your Project Settings.")
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

export const supabase = isSupabaseConfigured ? createClient() : null
