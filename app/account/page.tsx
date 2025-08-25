"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Compass, User, Shield, LogOut, CheckCircle, Mail, Calendar } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import LanguageToggle from "@/components/language-toggle"

export default function AccountPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)
      setLoading(false)
    }

    loadUser()
  }, [supabase, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const getProviderName = (provider: string) => {
    switch (provider) {
      case "google":
        return "Google"
      case "facebook":
        return "Facebook"
      case "email":
        return "Email"
      default:
        return provider
    }
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
          <div className="flex justify-center mb-4">
            <LanguageToggle />
          </div>
          <h2 className="text-xl text-muted-foreground">{t("account.title")}</h2>
        </div>

        {/* Connection Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              {t("account.connectionStatus.title")}
            </CardTitle>
            <CardDescription>{t("account.connectionStatus.desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                {t("account.connectionStatus.connected")}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {t("account.connectionStatus.since")} {new Date(user?.created_at).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <User className="h-5 w-5" />
              {t("account.profile.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t("account.profile.email")}</span>
              </div>
              <span className="font-medium">{user?.email}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t("account.profile.provider")}</span>
              </div>
              <Badge variant="outline">{getProviderName(user?.app_metadata?.provider || "email")}</Badge>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t("account.profile.memberSince")}</span>
              </div>
              <span className="font-medium">{new Date(user?.created_at).toLocaleDateString()}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t("account.profile.emailVerified")}</span>
              </div>
              <Badge variant={user?.email_confirmed_at ? "secondary" : "destructive"}>
                {user?.email_confirmed_at ? t("common.yes") : t("common.no")}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-serif">{t("account.actions.title")}</CardTitle>
            <CardDescription>{t("account.actions.desc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Button variant="outline" asChild className="justify-start bg-transparent">
                <Link href="/dashboard">
                  <Compass className="h-4 w-4 mr-2" />
                  {t("account.actions.viewDashboard")}
                </Link>
              </Button>

              <Button variant="outline" asChild className="justify-start bg-transparent">
                <Link href="/test">
                  <User className="h-4 w-4 mr-2" />
                  {t("account.actions.takeAssessment")}
                </Link>
              </Button>

              <Separator />

              <Button variant="destructive" onClick={handleSignOut} className="justify-start">
                <LogOut className="h-4 w-4 mr-2" />
                {t("account.actions.signOut")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
