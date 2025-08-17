"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Compass, Download, Share2, Star, TrendingUp, AlertTriangle, UserPlus } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import RiasecChart from "@/components/riasec-chart"

interface TestResults {
  id?: number
  riasec_scores: { R: number; I: number; A: number; S: number; E: number; C: number }
  top_personality_types: string[]
  is_premium: boolean
  test_completed_at: string
  is_anonymous?: boolean
}

interface Job {
  id: number
  job_title_en: string
  job_title_es: string
  description_en: string
  description_es: string
  riasec_code: string
  salary_range?: string
  education_level?: string
  growth_outlook?: string
  ai_impact_level?: string
  automation_risk?: string
  future_demand?: string
  required_skills?: string[]
}

interface ResultsDisplayProps {
  testResults: TestResults
  user?: any
}

const RIASEC_DESCRIPTIONS = {
  en: {
    R: {
      name: "Realistic",
      description: "Practical, hands-on, and prefer working with tools, machines, or in outdoor settings.",
      traits: ["Practical", "Hands-on", "Independent", "Athletic", "Mechanical"],
    },
    I: {
      name: "Investigative",
      description: "Analytical, intellectual, and enjoy solving complex problems through research and analysis.",
      traits: ["Analytical", "Curious", "Logical", "Independent", "Intellectual"],
    },
    A: {
      name: "Artistic",
      description: "Creative, expressive, and prefer unstructured environments where they can use imagination.",
      traits: ["Creative", "Expressive", "Original", "Intuitive", "Independent"],
    },
    S: {
      name: "Social",
      description: "People-oriented, helpful, and enjoy working with others in supportive roles.",
      traits: ["Helpful", "Cooperative", "Understanding", "Responsible", "Tactful"],
    },
    E: {
      name: "Enterprising",
      description: "Ambitious, energetic, and enjoy leading others and taking risks for rewards.",
      traits: ["Ambitious", "Energetic", "Adventurous", "Sociable", "Self-confident"],
    },
    C: {
      name: "Conventional",
      description: "Organized, detail-oriented, and prefer structured environments with clear procedures.",
      traits: ["Organized", "Efficient", "Practical", "Careful", "Systematic"],
    },
  },
  es: {
    R: {
      name: "Realista",
      description: "Práctico, manual, y prefiere trabajar con herramientas, máquinas o en entornos al aire libre.",
      traits: ["Práctico", "Manual", "Independiente", "Atlético", "Mecánico"],
    },
    I: {
      name: "Investigativo",
      description: "Analítico, intelectual, y disfruta resolver problemas complejos a través de investigación.",
      traits: ["Analítico", "Curioso", "Lógico", "Independiente", "Intelectual"],
    },
    A: {
      name: "Artístico",
      description: "Creativo, expresivo, y prefiere entornos no estructurados donde usar la imaginación.",
      traits: ["Creativo", "Expresivo", "Original", "Intuitivo", "Independiente"],
    },
    S: {
      name: "Social",
      description: "Orientado a las personas, servicial, y disfruta trabajar con otros en roles de apoyo.",
      traits: ["Servicial", "Cooperativo", "Comprensivo", "Responsable", "Diplomático"],
    },
    E: {
      name: "Emprendedor",
      description: "Ambicioso, enérgico, y disfruta liderar a otros y tomar riesgos por recompensas.",
      traits: ["Ambicioso", "Enérgico", "Aventurero", "Sociable", "Seguro de sí mismo"],
    },
    C: {
      name: "Convencional",
      description: "Organizado, detallista, y prefiere entornos estructurados con procedimientos claros.",
      traits: ["Organizado", "Eficiente", "Práctico", "Cuidadoso", "Sistemático"],
    },
  },
}

export default function ResultsDisplay({ testResults, user }: ResultsDisplayProps) {
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [traditionalJobs, setTraditionalJobs] = useState<Job[]>([])
  const [futureJobs, setFutureJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  const { riasec_scores, top_personality_types, is_premium, is_anonymous } = testResults

  // Load job recommendations
  useEffect(() => {
    async function loadJobs() {
      try {
        // Get jobs that match user's top personality types
        const riasecPattern = top_personality_types.join("|")

        const jobLimit = user && is_premium ? 20 : user ? 10 : 6

        // Load traditional jobs
        const { data: traditionalData, error: traditionalError } = await supabase
          .from("jobs_traditional")
          .select("*")
          .or(`riasec_code.ilike.%${top_personality_types[0]}%,riasec_code.ilike.%${top_personality_types[1]}%`)
          .limit(jobLimit)

        if (traditionalError) {
          console.error("Error loading traditional jobs:", traditionalError)
        } else {
          setTraditionalJobs(traditionalData || [])
        }

        // Load future jobs
        const { data: futureData, error: futureError } = await supabase
          .from("jobs_future")
          .select("*")
          .or(`riasec_code.ilike.%${top_personality_types[0]}%,riasec_code.ilike.%${top_personality_types[1]}%`)
          .limit(jobLimit)

        if (futureError) {
          console.error("Error loading future jobs:", futureError)
        } else {
          setFutureJobs(futureData || [])
        }
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [top_personality_types, is_premium, user])

  const getPersonalityDescription = (type: string) => {
    return RIASEC_DESCRIPTIONS[language][type as keyof typeof RIASEC_DESCRIPTIONS.en]
  }

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDemandBadgeColor = (demand: string) => {
    switch (demand) {
      case "High Growth":
        return "bg-green-100 text-green-800"
      case "Growing":
        return "bg-blue-100 text-blue-800"
      case "Stable":
        return "bg-gray-100 text-gray-800"
      case "Declining":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Compass className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-serif font-bold text-foreground">Career Compass</h1>
          </div>

          {/* Language Toggle */}
          <div className="flex justify-center gap-2 mb-6">
            <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
              English
            </Button>
            <Button variant={language === "es" ? "default" : "outline"} size="sm" onClick={() => setLanguage("es")}>
              Español
            </Button>
          </div>

          <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
            {language === "en" ? "Your Career Profile" : "Tu Perfil de Carrera"}
          </h2>
          <p className="text-muted-foreground">
            {language === "en"
              ? "Discover careers that match your personality and interests"
              : "Descubre carreras que coincidan con tu personalidad e intereses"}
          </p>

          {is_anonymous && (
            <Card className="mt-6 border-accent bg-accent/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <UserPlus className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h3 className="text-lg font-serif font-semibold mb-2">
                    {language === "en" ? "Save Your Results" : "Guarda Tus Resultados"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {language === "en"
                      ? "Create an account to save your results permanently and access them anytime."
                      : "Crea una cuenta para guardar tus resultados permanentemente y acceder a ellos en cualquier momento."}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button asChild>
                      <Link href="/auth/sign-up">{language === "en" ? "Sign Up" : "Registrarse"}</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/auth/login">{language === "en" ? "Sign In" : "Iniciar Sesión"}</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button variant="outline" size="sm" disabled={is_anonymous}>
              <Download className="h-4 w-4 mr-2" />
              {language === "en" ? "Download PDF" : "Descargar PDF"}
            </Button>
            <Button variant="outline" size="sm" disabled={is_anonymous}>
              <Share2 className="h-4 w-4 mr-2" />
              {language === "en" ? "Share Results" : "Compartir Resultados"}
            </Button>
            <Button asChild>
              <Link href="/test">{language === "en" ? "Retake Test" : "Repetir Prueba"}</Link>
            </Button>
          </div>
        </div>

        {/* RIASEC Scores Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-serif">
              {language === "en" ? "Your RIASEC Personality Profile" : "Tu Perfil de Personalidad RIASEC"}
            </CardTitle>
            <CardDescription>
              {language === "en"
                ? "Your scores across the six personality types that influence career preferences"
                : "Tus puntuaciones en los seis tipos de personalidad que influyen en las preferencias profesionales"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Chart */}
              <div className="flex justify-center">
                <RiasecChart scores={riasec_scores} language={language} />
              </div>

              {/* Top Personality Types */}
              <div>
                <h3 className="text-lg font-serif font-semibold mb-4">
                  {language === "en" ? "Your Top Personality Types" : "Tus Tipos de Personalidad Principales"}
                </h3>
                <div className="space-y-4">
                  {top_personality_types.slice(0, 3).map((type, index) => {
                    const description = getPersonalityDescription(type)
                    const score = riasec_scores[type as keyof typeof riasec_scores]
                    const percentage = Math.round((score / 50) * 100) // Assuming max score is 50

                    return (
                      <div key={type} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant={index === 0 ? "default" : "secondary"}>#{index + 1}</Badge>
                            <h4 className="font-serif font-semibold">
                              {type} - {description.name}
                            </h4>
                          </div>
                          <span className="text-sm font-medium">{score}/50</span>
                        </div>
                        <Progress value={percentage} className="mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">{description.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {description.traits.map((trait) => (
                            <Badge key={trait} variant="outline" className="text-xs">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">
              {language === "en" ? "Career Recommendations" : "Recomendaciones de Carrera"}
            </CardTitle>
            <CardDescription>
              {language === "en"
                ? "Careers that align with your personality profile"
                : "Carreras que se alinean con tu perfil de personalidad"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="traditional" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="traditional">
                  {language === "en" ? "Traditional Careers" : "Carreras Tradicionales"}
                </TabsTrigger>
                <TabsTrigger value="future">
                  {language === "en" ? "Future-Ready Careers" : "Carreras del Futuro"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="traditional" className="mt-6">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                      {language === "en" ? "Loading career recommendations..." : "Cargando recomendaciones..."}
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {traditionalJobs.map((job) => (
                      <Card key={job.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="font-serif text-lg">
                                {language === "en" ? job.job_title_en : job.job_title_es}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline">{job.riasec_code}</Badge>
                                {job.growth_outlook && (
                                  <Badge className={getDemandBadgeColor(job.growth_outlook)}>
                                    {job.growth_outlook}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {language === "en" ? job.description_en : job.description_es}
                          </p>
                          <div className="space-y-2 text-sm">
                            {job.salary_range && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  {language === "en" ? "Salary Range:" : "Rango Salarial:"}
                                </span>
                                <span className="font-medium">{job.salary_range}</span>
                              </div>
                            )}
                            {job.education_level && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  {language === "en" ? "Education:" : "Educación:"}
                                </span>
                                <span className="font-medium">{job.education_level}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {(!user || !is_premium) && !loading && (
                  <Card className="mt-6 border-accent">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                        <h3 className="text-lg font-serif font-semibold mb-2">
                          {language === "en" ? "Unlock More Career Options" : "Desbloquea Más Opciones de Carrera"}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {language === "en"
                            ? `Get access to ${user ? "20+" : "unlimited"} career recommendations, detailed job market analysis, and personalized career paths.`
                            : `Obtén acceso a ${user ? "más de 20" : "ilimitadas"} recomendaciones de carrera, análisis detallado del mercado laboral y rutas profesionales personalizadas.`}
                        </p>
                        {user ? (
                          <Button className="bg-accent hover:bg-accent/90" asChild>
                            <Link href="/pricing">
                              {language === "en" ? "Upgrade to Premium" : "Actualizar a Premium"}
                            </Link>
                          </Button>
                        ) : (
                          <div className="flex gap-2 justify-center">
                            <Button className="bg-accent hover:bg-accent/90" asChild>
                              <Link href="/auth/sign-up">
                                {language === "en" ? "Sign Up for More" : "Regístrate para Más"}
                              </Link>
                            </Button>
                            <Button variant="outline" asChild>
                              <Link href="/pricing">{language === "en" ? "View Premium" : "Ver Premium"}</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="future" className="mt-6">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                      {language === "en" ? "Loading future career insights..." : "Cargando perspectivas futuras..."}
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {futureJobs.map((job) => (
                      <Card key={job.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="font-serif text-lg">
                                {language === "en" ? job.job_title_en : job.job_title_es}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline">{job.riasec_code}</Badge>
                                {job.future_demand && (
                                  <Badge className={getDemandBadgeColor(job.future_demand)}>
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    {job.future_demand}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {language === "en" ? job.description_en : job.description_es}
                          </p>

                          {/* AI Impact & Automation Risk */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            {job.ai_impact_level && (
                              <div>
                                <span className="text-xs text-muted-foreground">
                                  {language === "en" ? "AI Impact:" : "Impacto IA:"}
                                </span>
                                <Badge className={getRiskBadgeColor(job.ai_impact_level)} size="sm">
                                  {job.ai_impact_level}
                                </Badge>
                              </div>
                            )}
                            {job.automation_risk && (
                              <div>
                                <span className="text-xs text-muted-foreground">
                                  {language === "en" ? "Automation Risk:" : "Riesgo Automatización:"}
                                </span>
                                <Badge className={getRiskBadgeColor(job.automation_risk)} size="sm">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  {job.automation_risk}
                                </Badge>
                              </div>
                            )}
                          </div>

                          {/* Required Skills */}
                          {job.required_skills && job.required_skills.length > 0 && (
                            <div>
                              <span className="text-xs text-muted-foreground mb-2 block">
                                {language === "en" ? "Key Skills:" : "Habilidades Clave:"}
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {job.required_skills.slice(0, 4).map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {job.required_skills.length > 4 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{job.required_skills.length - 4} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {(!user || !is_premium) && !loading && (
                  <Card className="mt-6 border-accent">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4" />
                        <h3 className="text-lg font-serif font-semibold mb-2">
                          {language === "en" ? "Future-Proof Your Career" : "Asegura tu Futuro Profesional"}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {language === "en"
                            ? "Access detailed AI impact analysis, skill development roadmaps, and emerging job market trends."
                            : "Accede a análisis detallado del impacto de la IA, hojas de ruta de desarrollo de habilidades y tendencias del mercado laboral emergente."}
                        </p>
                        {user ? (
                          <Button className="bg-accent hover:bg-accent/90" asChild>
                            <Link href="/pricing">
                              {language === "en" ? "Get Premium Insights" : "Obtener Información Premium"}
                            </Link>
                          </Button>
                        ) : (
                          <div className="flex gap-2 justify-center">
                            <Button className="bg-accent hover:bg-accent/90" asChild>
                              <Link href="/auth/sign-up">
                                {language === "en" ? "Sign Up for More" : "Regístrate para Más"}
                              </Link>
                            </Button>
                            <Button variant="outline" asChild>
                              <Link href="/pricing">{language === "en" ? "View Premium" : "Ver Premium"}</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
