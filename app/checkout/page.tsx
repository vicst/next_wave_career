import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import CheckoutForm from "@/components/checkout-form"

export default async function CheckoutPage() {
  // If Supabase is not configured, show setup message
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <h1 className="text-2xl font-serif font-bold text-foreground">Connect Supabase to get started</h1>
      </div>
    )
  }

  // Check if user is logged in
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no user, redirect to sign up
  if (!user) {
    redirect("/auth/sign-up?redirect=checkout")
  }

  // Check if user is already premium
  const { data: testResults } = await supabase
    .from("user_test_results")
    .select("is_premium")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  const isPremium = testResults?.is_premium || false

  if (isPremium) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <CheckoutForm userEmail={user.email || ""} />
    </div>
  )
}
