"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Compass, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import LanguageToggle from "@/components/language-toggle"

interface Question {
  id: number
  question_text_en: string
  question_text_es: string
  riasec_type: string
}

interface Answer {
  questionId: number
  score: number
  riasecType: string
}

interface RiasecTestProps {
  user?: any
}

export default function RiasecTest({ user }: RiasecTestProps) {
  const { language, t } = useLanguage()
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Load questions from database
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

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswerChange = (value: string) => {
    setCurrentAnswer(value)
  }

  const handleNext = () => {
    if (!currentAnswer) return

    // Save current answer
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      score: Number.parseInt(currentAnswer),
      riasecType: currentQuestion.riasec_type,
    }

    // Update answers array
    const updatedAnswers = [...answers]
    const existingIndex = updatedAnswers.findIndex((a) => a.questionId === currentQuestion.id)

    if (existingIndex >= 0) {
      updatedAnswers[existingIndex] = newAnswer
    } else {
      updatedAnswers.push(newAnswer)
    }

    setAnswers(updatedAnswers)

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      // Load existing answer for next question if available
      const nextQuestion = questions[currentQuestionIndex + 1]
      const existingAnswer = updatedAnswers.find((a) => a.questionId === nextQuestion.id)
      setCurrentAnswer(existingAnswer ? existingAnswer.score.toString() : "")
    } else {
      // Test completed, calculate and save results
      handleSubmitResults(updatedAnswers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      // Load existing answer for previous question
      const prevQuestion = questions[currentQuestionIndex - 1]
      const existingAnswer = answers.find((a) => a.questionId === prevQuestion.id)
      setCurrentAnswer(existingAnswer ? existingAnswer.score.toString() : "")
    }
  }

  const calculateRiasecScores = (answers: Answer[]) => {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }

    answers.forEach((answer) => {
      scores[answer.riasecType as keyof typeof scores] += answer.score
    })

    // Get top 3 personality types
    const sortedTypes = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([type]) => type)

    return { scores, topTypes: sortedTypes }
  }

  const handleSubmitResults = async (finalAnswers: Answer[]) => {
    setSubmitting(true)

    try {
      const { scores, topTypes } = calculateRiasecScores(finalAnswers)

      if (user) {
        const { error } = await supabase.from("user_test_results").insert({
          user_id: user.id,
          riasec_scores: scores,
          top_personality_types: topTypes,
          is_premium: false,
        })

        if (error) {
          console.error("Error saving results:", error)
          return
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
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Compass className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">{t("common.loading")}</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No questions available. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Compass className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-serif font-bold text-foreground">Career Compass</h1>
          </div>

          {/* Language Toggle */}
          <div className="flex justify-center mb-6">
            <LanguageToggle />
          </div>

          <h2 className="text-xl font-serif font-semibold text-foreground mb-2">
            {language === "en" ? "RIASEC Career Assessment" : "Evaluación de Carrera RIASEC"}
          </h2>
          <p className="text-muted-foreground">
            {language === "en"
              ? `Question ${currentQuestionIndex + 1} of ${questions.length}`
              : `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`}
          </p>

          {!user && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                {language === "en"
                  ? "Taking the test anonymously. Sign up after completion to save your results permanently."
                  : "Realizando la prueba de forma anónima. Regístrate después de completarla para guardar tus resultados permanentemente."}
              </p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-serif text-lg">
              {language === "en" ? currentQuestion.question_text_en : currentQuestion.question_text_es}
            </CardTitle>
            <CardDescription>
              {language === "en"
                ? "Rate how much this statement describes you:"
                : "Califica qué tanto te describe esta afirmación:"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange}>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="r1" />
                  <Label htmlFor="r1" className="flex-1 cursor-pointer">
                    {language === "en" ? "Strongly Disagree" : "Totalmente en desacuerdo"}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="r2" />
                  <Label htmlFor="r2" className="flex-1 cursor-pointer">
                    {language === "en" ? "Disagree" : "En desacuerdo"}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="r3" />
                  <Label htmlFor="r3" className="flex-1 cursor-pointer">
                    {language === "en" ? "Neutral" : "Neutral"}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4" id="r4" />
                  <Label htmlFor="r4" className="flex-1 cursor-pointer">
                    {language === "en" ? "Agree" : "De acuerdo"}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5" id="r5" />
                  <Label htmlFor="r5" className="flex-1 cursor-pointer">
                    {language === "en" ? "Strongly Agree" : "Totalmente de acuerdo"}
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("common.previous")}
          </Button>

          <Button onClick={handleNext} disabled={!currentAnswer || submitting} className="min-w-[120px]">
            {submitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {language === "en" ? "Saving..." : "Guardando..."}
              </div>
            ) : currentQuestionIndex === questions.length - 1 ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                {t("common.finish")}
              </>
            ) : (
              <>
                {t("common.next")}
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
