import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, CheckCircle, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function CheckoutSuccessPage() {
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

  // If no user, redirect to login
  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Compass className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-serif font-bold text-foreground">Career Compass</h1>
          </div>
        </div>

        {/* Success Card */}
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <CardTitle className="font-serif text-2xl text-foreground">Payment Successful!</CardTitle>
            <CardDescription className="text-lg">
              Welcome to Career Compass Premium! Your account has been upgraded.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-accent/10 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-5 w-5 text-accent" />
                <h3 className="font-serif font-semibold text-accent">Premium Features Unlocked</h3>
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 20+ career recommendations per category</li>
                <li>• Detailed AI impact analysis</li>
                <li>• Skill development roadmaps</li>
                <li>• Industry trend analysis</li>
                <li>• Personalized career paths</li>
                <li>• PDF report downloads</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif font-semibold">What's Next?</h3>
              <div className="grid gap-4">
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/results">
                    View Your Enhanced Results
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                A confirmation email has been sent to <strong>{user.email}</strong>
              </p>
              <p className="mt-2">
                Need help? Contact our support team at{" "}
                <a href="mailto:support@careercompass.com" className="text-primary hover:underline">
                  support@careercompass.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Your subscription will automatically renew monthly. You can manage your subscription from your dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
