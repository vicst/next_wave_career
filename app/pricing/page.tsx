import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Compass, Check, Star, TrendingUp, Users, Globe, Zap } from "lucide-react"
import Link from "next/link"

export default async function PricingPage() {
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

  // Get user's premium status if logged in
  let isPremium = false
  if (user) {
    const { data: testResults } = await supabase
      .from("user_test_results")
      .select("is_premium")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    isPremium = testResults?.is_premium || false
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-serif font-bold text-foreground">Career Compass</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            {user ? (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/sign-up">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-6">Choose Your Career Discovery Plan</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Start with our free assessment, then unlock advanced insights and personalized career guidance with Premium.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-serif text-2xl">Free</CardTitle>
                  <Badge variant="secondary">Current Plan</Badge>
                </div>
                <CardDescription>Perfect for getting started with career exploration</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-serif font-bold">$0</span>
                  <span className="text-muted-foreground">/forever</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Complete RIASEC personality assessment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Basic personality profile with top 3 types</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>6 traditional career recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>6 future-ready career recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Bilingual support (English/Spanish)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Basic job market insights</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full bg-transparent" disabled>
                  Current Plan
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative border-primary shadow-lg">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground px-4 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-serif text-2xl">Premium</CardTitle>
                  {isPremium && <Badge className="bg-green-100 text-green-800">Active</Badge>}
                </div>
                <CardDescription>Comprehensive career guidance with advanced insights</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-serif font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Everything in Free, plus:</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-accent" />
                    <span>20+ career recommendations per category</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    <span>Detailed AI impact analysis for each career</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-accent" />
                    <span>Skill development roadmaps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-accent" />
                    <span>Industry trend analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" />
                    <span>Personalized career path recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" />
                    <span>Priority customer support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" />
                    <span>Monthly career market updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" />
                    <span>PDF report downloads</span>
                  </li>
                </ul>
                {isPremium ? (
                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                    <Link href={user ? "/checkout" : "/auth/sign-up?redirect=checkout"}>Upgrade to Premium</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-2xl font-serif font-bold text-center text-foreground mb-8">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-serif font-semibold text-foreground mb-2">
                Can I cancel my Premium subscription anytime?
              </h4>
              <p className="text-muted-foreground">
                Yes, you can cancel your Premium subscription at any time. You'll continue to have access to Premium
                features until the end of your current billing period.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-semibold text-foreground mb-2">
                What happens to my data if I cancel Premium?
              </h4>
              <p className="text-muted-foreground">
                Your assessment results and basic career recommendations will always be available. Premium-specific
                insights and reports will no longer be accessible, but your core data remains safe.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-semibold text-foreground mb-2">
                Is the RIASEC test scientifically validated?
              </h4>
              <p className="text-muted-foreground">
                Yes, our assessment is based on the Holland RIASEC model, which has been extensively researched and
                validated by career counselors and psychologists worldwide for over 50 years.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-semibold text-foreground mb-2">
                How often are the career recommendations updated?
              </h4>
              <p className="text-muted-foreground">
                We continuously update our career database with the latest job market trends, salary information, and
                future outlook data. Premium users receive monthly updates on emerging careers and industry changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-3xl font-serif font-bold mb-6">Ready to Discover Your Career Path?</h3>
          <p className="text-xl mb-8 opacity-90">
            Start with our free assessment and upgrade anytime to unlock advanced career insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link href={user ? "/test" : "/auth/sign-up"}>Start Free Assessment</Link>
            </Button>
            {!isPremium && (
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href={user ? "/checkout" : "/auth/sign-up?redirect=checkout"}>Upgrade to Premium</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border bg-card">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Compass className="h-6 w-6 text-primary" />
            <span className="font-serif font-bold text-foreground">Career Compass</span>
          </div>
          <p className="text-muted-foreground">Helping you navigate your career journey with confidence.</p>
        </div>
      </footer>
    </div>
  )
}
