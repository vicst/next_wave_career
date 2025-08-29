"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, User, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import LanguageToggle from "@/components/language-toggle"

export default function DashboardPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [testResults, setTestResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)

      // Get user's test results
      const { data: results } = await supabase
        .from("user_test_results")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      setTestResults(results || [])
      setLoading(false)
    }

    loadData()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const hasResults = testResults && testResults.length > 0
  const latestResult = hasResults ? testResults[0] : null

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Compass className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-serif font-bold text-foreground">Career Compass</h1>
          </div>
          <div className="flex justify-center mb-4">
            <LanguageToggle />
          </div>
          <h2 className="text-xl text-muted-foreground">
            {t("dashboard.welcome")}, {user?.email}
          </h2>
        </div>

        {/* Dashboard Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Assessment Status */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <User className="h-5 w-5" />
                {t("dashboard.assessment.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hasResults ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t("dashboard.assessment.lastCompleted")}</span>
                    <span className="font-medium">{new Date(latestResult.test_completed_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t("dashboard.assessment.topType")}</span>
                    <span className="font-medium">{latestResult.top_personality_types[0]}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild>
                      <Link href="/results">{t("dashboard.assessment.viewResults")}</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/test">{t("dashboard.assessment.retakeTest")}</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">{t("dashboard.assessment.notTaken")}</p>
                  <Button asChild>
                    <Link href="/test">{t("dashboard.assessment.takeAssessment")}</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {t("dashboard.account.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("dashboard.account.plan")}</span>
                  <span className="font-medium">
                    {latestResult?.is_premium ? t("common.premium") : t("common.free")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("dashboard.account.recommendations")}</span>
                  <span className="font-medium">
                    {latestResult?.is_premium ? t("dashboard.account.unlimited") : t("dashboard.account.limited")}
                  </span>
                </div>
                {!latestResult?.is_premium && (
                  <Button className="w-full bg-accent hover:bg-accent/90">{t("dashboard.account.upgrade")}</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="font-serif">{t("dashboard.quickActions.title")}</CardTitle>
            <CardDescription>{t("dashboard.quickActions.desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" asChild className="h-auto p-4 flex-col bg-transparent">
                <Link href="/test">
                  <Calendar className="h-6 w-6 mb-2" />
                  {t("dashboard.quickActions.takeTest")}
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-auto p-4 flex-col bg-transparent" disabled={!hasResults}>
                <Link href="/results">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  {t("dashboard.quickActions.viewResults")}
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col bg-transparent" disabled>
                <User className="h-6 w-6 mb-2" />
                {t("dashboard.quickActions.careerPath")}
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col bg-transparent" disabled>
                <Compass className="h-6 w-6 mb-2" />
                {t("dashboard.quickActions.exploreJobs")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
