import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AuthCallback({
  searchParams,
}: {
  searchParams: { code?: string; error?: string; error_description?: string }
}) {
  const { code, error, error_description } = searchParams

  console.log("[v0] === AUTH CALLBACK START ===")
  console.log("[v0] Search params:", searchParams)
  console.log("[v0] Code:", code)
  console.log("[v0] Error:", error)
  console.log("[v0] Error description:", error_description)

  if (error) {
    console.error("[v0] OAuth callback error:", error, error_description)
    redirect(`/auth/login?error=${encodeURIComponent(error_description || error)}`)
  }

  if (code) {
    console.log("[v0] Processing OAuth code exchange...")
    const supabase = createClient()

    try {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        console.error("[v0] Session exchange error:", exchangeError)
        redirect(`/auth/login?error=${encodeURIComponent("Authentication failed")}`)
      }

      console.log("[v0] Session exchange successful!")
    } catch (err) {
      console.error("[v0] Unexpected auth error:", err)
      redirect(`/auth/login?error=${encodeURIComponent("Authentication failed")}`)
    }
  }

  console.log("[v0] Redirecting to dashboard...")
  console.log("[v0] === AUTH CALLBACK END ===")
  redirect("/dashboard")
}
