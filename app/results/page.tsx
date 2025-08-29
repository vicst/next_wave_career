"use client"

import { supabase } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ResultsDisplay from "@/components/results-display"

export default function ResultsPage() {
  const [testResults, setTestResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function loadResults() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        console.log("[v0] Loading results for user:", user?.id || "anonymous")
        setUser(user)

        if (user) {
          // Load from database for authenticated users
          console.log("[v0] Attempting to load from database")
          const { data, error } = await supabase
            .from("user_test_results")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single()

          if (error || !data) {
            console.log("[v0] Database error or no data:", error)
            // Check localStorage as fallback
            const localResults = localStorage.getItem("career_compass_results")
            if (localResults) {
              console.log("[v0] Found results in localStorage")
              setTestResults(JSON.parse(localResults))
            } else {
              console.log("[v0] No results found, redirecting to test")
              router.push("/test")
              return
            }
          } else {
            console.log("[v0] Loaded results from database:", data)
            setTestResults(data)
          }
        } else {
          // Load from localStorage for anonymous users
          console.log("[v0] Loading from localStorage for anonymous user")
          const localResults = localStorage.getItem("career_compass_results")
          if (localResults) {
            console.log("[v0] Found anonymous results in localStorage")
            setTestResults(JSON.parse(localResults))
          } else {
            console.log("[v0] No anonymous results found, redirecting to test")
            router.push("/test")
            return
          }
        }
      } catch (error) {
        console.error("[v0] Error loading results:", error)
        router.push("/test")
      } finally {
        setLoading(false)
      }
    }

    loadResults()
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!testResults) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <h1 className="text-2xl font-serif font-bold text-foreground">No test results found</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <ResultsDisplay testResults={testResults} user={user} />
    </div>
  )
}
