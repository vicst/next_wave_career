"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, History, Settings, LogOut, Calendar, TrendingUp } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface AssessmentResult {
  id: number
  test_completed_at: string
  riasec_scores: any
  top_personality_types: string[]
  is_premium: boolean
}

interface ProfileDropdownProps {
  user: any
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentResult[]>([])
  const [loading, setLoading] = useState(true)
  const [showHistory, setShowHistory] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function fetchAssessmentHistory() {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from("user_test_results")
          .select("*")
          .eq("user_id", user.id)
          .order("test_completed_at", { ascending: false })

        if (error) {
          console.error("Error fetching assessment history:", error)
        } else {
          setAssessmentHistory(data || [])
        }
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAssessmentHistory()
  }, [user, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getTopPersonalityType = (types: string[]) => {
    return types && types.length > 0 ? types[0] : "N/A"
  }

  if (showHistory) {
    return (
      <Card className="w-96 max-h-96 overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              {t("profile.history.title")}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowHistory(false)}>
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : assessmentHistory.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-4">{t("profile.history.noTests")}</p>
              <Button asChild>
                <Link href="/test">{t("profile.history.retake")}</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {assessmentHistory.map((result) => (
                <div key={result.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {t("profile.history.completedOn")} {formatDate(result.test_completed_at)}
                      </span>
                    </div>
                    {result.is_premium && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Premium</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      {t("profile.history.topType")} {getTopPersonalityType(result.top_personality_types)}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/results?id=${result.id}`}>{t("profile.history.viewResults")}</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          {t("profile.dropdown.title")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t("profile.dropdown.account")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setShowHistory(true)} className="flex items-center gap-2">
          <History className="h-4 w-4" />
          {t("profile.dropdown.history")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-red-600">
          <LogOut className="h-4 w-4" />
          {t("profile.dropdown.signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
