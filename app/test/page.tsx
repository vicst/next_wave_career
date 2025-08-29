import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import RiasecTest from "@/components/riasec-test"

export default async function TestPage() {
  // If Supabase is not configured, show setup message
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <h1 className="text-2xl font-serif font-bold text-foreground">Connect Supabase to get started</h1>
      </div>
    )
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-background">
      <RiasecTest user={user} />
    </div>
  )
}
