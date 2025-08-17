"use client"

import { createClient } from "@/lib/supabase/server"
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
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)

        if (user) {
          // Load from database for authenticated users
          const { data, error } = await supabase
            .from("user_test_results")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single()

          if (error || !data) {
            // Check localStorage as fallback
            const localResults = localStorage.getItem("career_compass_results")
            if (localResults) {
              setTestResults(JSON.parse(localResults))
            } else {
              router.push("/test")
              return
            }
          } else {
            setTestResults(data)
          }
        } else {
          // Load from localStorage for anonymous users
          const localResults = localStorage.getItem("career_compass_results")
          if (localResults) {
            setTestResults(JSON.parse(localResults))
          } else {
            router.push("/test")
            return
          }
        }
      } catch (error) {
        console.error("Error loading results:", error)
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
