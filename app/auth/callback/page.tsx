import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AuthCallback({
  searchParams,
}: {
  searchParams: { code?: string; error?: string; error_description?: string }
}) {
  const { code, error, error_description } = searchParams

  if (error) {
    console.error("OAuth error:", error, error_description)
    redirect(`/auth/login?error=${encodeURIComponent(error_description || error)}`)
  }

  if (code) {
    const supabase = createClient()

    try {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        console.error("Session exchange error:", exchangeError)
        redirect(`/auth/login?error=${encodeURIComponent("Authentication failed")}`)
      }
    } catch (err) {
      console.error("Unexpected auth error:", err)
      redirect(`/auth/login?error=${encodeURIComponent("Authentication failed")}`)
    }
  }

  redirect("/dashboard")
}
