"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Compass, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"

interface Question {
  id: number
  question_text_en: string
  question_text_es: string
  question_text_ro?: string
  riasec_type: string
}

interface RiasecTestProps {
  user?: any
}

const QUESTIONS_PER_PAGE = 4

export default function RiasecTest({ user }: RiasecTestProps) {
  const { language, t } = useLanguage()
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [answers, setAnswers] = useState<Map<number, string>>(new Map())
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function loadQuestions() {
      try {
        const { data, error } = await supabase.from("questions").select("*").order("id")

        if (error) {
          console.error("Error loading questions:", error)
          return
        }

        setQuestions(data || [])
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [])

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE)
  const startIndex = currentPage * QUESTIONS_PER_PAGE
  const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length)
  const currentQuestions = questions.slice(startIndex, endIndex)

  const getQuestionText = (question: Question) => {
    if (language === "es") return question.question_text_es
    if (language === "ro" && question.question_text_ro) return question.question_text_ro
    return question.question_text_en
  }

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(new Map(answers.set(questionId, value)))
  }

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      handleSubmitResults()
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const isPageComplete = () => {
    for (let i = startIndex; i < endIndex; i++) {
      if (!answers.has(questions[i].id)) {
        return false
      }
    }
    return true
  }

  const progress = () => {
    if (questions.length === 0) return 0
    const answeredCount = answers.size
    return (answeredCount / questions.length) * 100
  }

  const calculateRiasecScores = () => {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }

    answers.forEach((scoreStr, questionId) => {
      const question = questions.find(q => q.id === questionId)
      if (question) {
        scores[question.riasec_type as keyof typeof scores] += Math.floor(Number.parseFloat(scoreStr))
      }
    })

    const sortedTypes = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([type]) => type)

    return { scores, topTypes: sortedTypes }
  }

  const handleSubmitResults = async () => {
    setSubmitting(true)

    try {
      const { scores, topTypes } = calculateRiasecScores()

      if (user) {
        const { error } = await supabase.from("user_test_results").insert({
          user_id: user.id,
          riasec_scores: scores,
          top_personality_types: topTypes,
          is_premium: false,
        })

        if (error) {
          console.error("Error saving results to database:", error)
          const testResults = {
            riasec_scores: scores,
            top_personality_types: topTypes,
            is_premium: false,
            test_completed_at: new Date().toISOString(),
            is_anonymous: false,
          }
          localStorage.setItem("career_compass_results", JSON.stringify(testResults))
        }

        router.push("/results")
      } else {
        const testResults = {
          riasec_scores: scores,
          top_personality_types: topTypes,
          is_premium: false,
          test_completed_at: new Date().toISOString(),
          is_anonymous: true,
        }

        localStorage.setItem("career_compass_results", JSON.stringify(testResults))
        router.push("/results")
      }
    } catch (error) {
      console.error("Error submitting results:", error)
      alert(t("test.error"))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Compass className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">{t("test.loading")}</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">{t("test.noQuestions")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-4 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-4">
          <p className="text-center text-sm text-muted-foreground mb-2">
            {t("test.progress").replace("{start}", String(startIndex + 1)).replace("{end}", String(endIndex)).replace("{total}", String(questions.length))}
          </p>
          <Progress value={progress()} className="h-2" />
        </div>

        <div className="space-y-2 mb-4">
          {currentQuestions.map((question, index) => (
            <Card key={question.id} className="border-2">
              <CardContent className="pt-3 pb-3">
                <div className="mb-2">
                  <h3 className="text-base font-medium mb-2">
                    <span className="text-primary font-semibold mr-2">{startIndex + index + 1}.</span>
                    {getQuestionText(question)}
                  </h3>
                </div>
                <RadioGroup 
                  value={answers.get(question.id) || ""} 
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                >
                  <div className="flex justify-start gap-4">
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="0" id={`q${question.id}-r1`} className="peer sr-only" />
                      <Label htmlFor={`q${question.id}-r1`} className="text-2xl cursor-pointer hover:scale-110 transition-transform peer-data-[state=checked]:scale-125">
                        😡
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="0.1" id={`q${question.id}-r2`} className="peer sr-only" />
                      <Label htmlFor={`q${question.id}-r2`} className="text-2xl cursor-pointer hover:scale-110 transition-transform peer-data-[state=checked]:scale-125">
                        😕
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="0.2" id={`q${question.id}-r3`} className="peer sr-only" />
                      <Label htmlFor={`q${question.id}-r3`} className="text-2xl cursor-pointer hover:scale-110 transition-transform peer-data-[state=checked]:scale-125">
                        😐
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="1" id={`q${question.id}-r4`} className="peer sr-only" />
                      <Label htmlFor={`q${question.id}-r4`} className="text-2xl cursor-pointer hover:scale-110 transition-transform peer-data-[state=checked]:scale-125">
                        🙂
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="1.1" id={`q${question.id}-r5`} className="peer sr-only" />
                      <Label htmlFor={`q${question.id}-r5`} className="text-2xl cursor-pointer hover:scale-110 transition-transform peer-data-[state=checked]:scale-125">
                        😍
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePrevious} 
            disabled={currentPage === 0}
            size="lg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("test.previous")}
          </Button>

          <Button 
            onClick={handleNext} 
            disabled={!isPageComplete() || submitting} 
            size="lg"
            className="min-w-[140px]"
          >
            {submitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t("test.saving")}
              </div>
            ) : currentPage === totalPages - 1 ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                {t("test.finish")}
              </>
            ) : (
              <>
                {t("test.next")}
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
