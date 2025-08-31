"use client"

import { useEffect, useState } from "react"
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, Users, TrendingUp, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import LanguageToggle from "@/components/language-toggle"
import { AuthModal } from "@/components/auth-modal"
import { ProfileDropdown } from "@/components/profile-dropdown"

export default function HomePage() {
  const { t } = useLanguage()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function handleAuthAndGetUser() {
      console.log("[v0] === AUTH FLOW START ===")
      console.log("[v0] Current URL:", window.location.href)
      console.log("[v0] URL hash:", window.location.hash)
      console.log("[v0] URL search params:", window.location.search)
      console.log("[v0] Supabase configured:", isSupabaseConfigured())

      if (!isSupabaseConfigured()) {
        console.log("[v0] Supabase not configured, skipping auth")
        setLoading(false)
        return
      }

      try {
        console.log("[v0] Getting current session...")
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        console.log("[v0] Session data:", sessionData)
        console.log("[v0] Session error:", sessionError)

        if (sessionError) {
          console.warn("[v0] Session error:", sessionError)
        }

        console.log("[v0] Getting current user...")
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()
        console.log("[v0] User data:", user)
        console.log("[v0] User error:", userError)

        setUser(user)

        if (window.location.hash && window.location.hash.includes("access_token")) {
          console.log("[v0] Found OAuth tokens in URL hash:", window.location.hash)
          console.log("[v0] Cleaning OAuth tokens from URL")
          window.history.replaceState({}, document.title, window.location.pathname + window.location.search)
          console.log("[v0] URL cleaned, new URL:", window.location.href)
        }

        if (window.location.hash && window.location.hash.includes("error")) {
          console.log("[v0] Found OAuth error in URL hash:", window.location.hash)
        }

        console.log("[v0] === AUTH FLOW END ===")
      } catch (error) {
        console.warn("[v0] Failed to handle auth:", error)
      } finally {
        setLoading(false)
      }
    }

    handleAuthAndGetUser()

    if (isSupabaseConfigured()) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        console.log("[v0] === AUTH STATE CHANGE ===")
        console.log("[v0] Event:", event)
        console.log("[v0] Session:", session)
        console.log("[v0] User:", session?.user)
        console.log("[v0] User email:", session?.user?.email)
        console.log("[v0] Current URL:", window.location.href)

        setUser(session?.user ?? null)
        if (event === "SIGNED_IN") {
          console.log("[v0] User signed in successfully, closing auth modal")
          setShowAuthModal(false)
          console.log("[v0] Should redirect to dashboard or stay on current page")
        }
        console.log("[v0] === AUTH STATE CHANGE END ===")
      })

      return () => subscription.unsubscribe()
    }
  }, [supabase])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-serif font-bold text-foreground">NextWave Careers</h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Button variant="ghost" asChild>
              <Link href="#about">{t("nav.about")}</Link>
            </Button>
            {user ? (
              <div className="flex gap-2">
                <ProfileDropdown user={user} />
                <Button asChild>
                  <Link href="/dashboard">{t("nav.dashboard")}</Link>
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowAuthModal(true)}>
                  {t("nav.signIn")}
                </Button>
                <Button onClick={() => setShowAuthModal(true)}>{t("nav.getStarted")}</Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-5xl font-serif font-bold text-foreground mb-6">{t("home.title")}</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{t("home.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/test">{t("home.cta.primary")}</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent" asChild>
              <Link href="#how-it-works">{t("home.cta.secondary")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-serif font-bold text-center text-foreground mb-12">
            {t("home.features.title")}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="font-serif">{t("home.features.validated.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t("home.features.validated.desc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="font-serif">{t("home.features.future.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t("home.features.future.desc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="font-serif">{t("home.features.bilingual.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t("home.features.bilingual.desc")}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-3xl font-serif font-bold text-center text-foreground mb-12">
            {t("home.howItWorks.title")}
          </h3>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xl font-serif font-semibold text-foreground mb-2">
                  {t("home.howItWorks.step1.title")}
                </h4>
                <p className="text-muted-foreground">{t("home.howItWorks.step1.desc")}</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xl font-serif font-semibold text-foreground mb-2">
                  {t("home.howItWorks.step2.title")}
                </h4>
                <p className="text-muted-foreground">{t("home.howItWorks.step2.desc")}</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-xl font-serif font-semibold text-foreground mb-2">
                  {t("home.howItWorks.step3.title")}
                </h4>
                <p className="text-muted-foreground">{t("home.howItWorks.step3.desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-3xl font-serif font-bold mb-6">{t("home.cta.final.title")}</h3>
          <p className="text-xl mb-8 opacity-90">{t("home.cta.final.subtitle")}</p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
            <Link href="/test">{t("home.cta.final.button")}</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border bg-card">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Compass className="h-6 w-6 text-primary" />
            <span className="font-serif font-bold text-foreground">NextWave Careers</span>
          </div>
          <p className="text-muted-foreground">{t("home.footer.tagline")}</p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}
