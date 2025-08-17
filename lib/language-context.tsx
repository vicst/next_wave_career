"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionary
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.pricing": "Pricing",
    "nav.dashboard": "Dashboard",
    "nav.signIn": "Sign In",
    "nav.signUp": "Get Started",
    "nav.getStarted": "Get Started",

    // Homepage
    "home.title": "Discover Your Perfect Career Path",
    "home.subtitle":
      "Take our comprehensive RIASEC personality test to uncover careers that align with your interests, skills, and personality. Get personalized recommendations for both traditional and future-ready jobs.",
    "home.cta.primary": "Start Your Career Assessment",
    "home.cta.secondary": "Learn More",
    "home.features.title": "Why Choose Career Compass?",
    "home.features.validated.title": "Scientifically Validated",
    "home.features.validated.desc":
      "Based on the proven RIASEC model used by career counselors worldwide to match personalities with suitable career paths.",
    "home.features.future.title": "Future-Ready Insights",
    "home.features.future.desc":
      "Get recommendations for both traditional careers and emerging roles, including AI impact analysis and automation risk assessment.",
    "home.features.bilingual.title": "Bilingual Support",
    "home.features.bilingual.desc":
      "Available in both English and Spanish to serve a diverse community of career seekers and professionals.",
    "home.howItWorks.title": "How It Works",
    "home.howItWorks.step1.title": "Take the Assessment",
    "home.howItWorks.step1.desc":
      "Answer 60 carefully crafted questions about your interests and preferences. The test takes about 10-15 minutes to complete.",
    "home.howItWorks.step2.title": "Get Your RIASEC Profile",
    "home.howItWorks.step2.desc":
      "Receive your personalized personality profile showing your scores across Realistic, Investigative, Artistic, Social, Enterprising, and Conventional types.",
    "home.howItWorks.step3.title": "Explore Career Matches",
    "home.howItWorks.step3.desc":
      "Discover careers that align with your personality, including salary ranges, education requirements, and future job outlook.",
    "home.cta.final.title": "Ready to Find Your Career Path?",
    "home.cta.final.subtitle":
      "Join thousands of professionals who have discovered their ideal careers with Career Compass.",
    "home.cta.final.button": "Start Your Free Assessment",
    "home.footer.tagline": "Helping you navigate your career journey with confidence.",

    // Dashboard
    "dashboard.welcome": "Welcome back",
    "dashboard.assessment.title": "Assessment Status",
    "dashboard.assessment.lastCompleted": "Last completed:",
    "dashboard.assessment.topType": "Top personality type:",
    "dashboard.assessment.viewResults": "View Results",
    "dashboard.assessment.retakeTest": "Retake Test",
    "dashboard.assessment.notTaken": "You haven't taken the assessment yet.",
    "dashboard.assessment.takeAssessment": "Take Assessment",
    "dashboard.account.title": "Account Status",
    "dashboard.account.plan": "Plan:",
    "dashboard.account.recommendations": "Career recommendations:",
    "dashboard.account.unlimited": "Unlimited",
    "dashboard.account.limited": "6 per category",
    "dashboard.account.upgrade": "Upgrade to Premium",
    "dashboard.quickActions.title": "Quick Actions",
    "dashboard.quickActions.desc": "Explore your career options and insights",
    "dashboard.quickActions.takeTest": "Take Test",
    "dashboard.quickActions.viewResults": "View Results",
    "dashboard.quickActions.careerPath": "Career Path",
    "dashboard.quickActions.exploreJobs": "Explore Jobs",

    // Pricing
    "pricing.title": "Choose Your Career Discovery Plan",
    "pricing.subtitle":
      "Start with our free assessment, then unlock advanced insights and personalized career guidance with Premium.",
    "pricing.free.title": "Free",
    "pricing.free.desc": "Perfect for getting started with career exploration",
    "pricing.free.price": "$0",
    "pricing.free.period": "/forever",
    "pricing.free.current": "Current Plan",
    "pricing.premium.title": "Premium",
    "pricing.premium.desc": "Comprehensive career guidance with advanced insights",
    "pricing.premium.price": "$29",
    "pricing.premium.period": "/month",
    "pricing.premium.popular": "Most Popular",
    "pricing.premium.active": "Active",
    "pricing.premium.upgrade": "Upgrade to Premium",
    "pricing.features.assessment": "Complete RIASEC personality assessment",
    "pricing.features.profile": "Basic personality profile with top 3 types",
    "pricing.features.traditional": "6 traditional career recommendations",
    "pricing.features.future": "6 future-ready career recommendations",
    "pricing.features.bilingual": "Bilingual support (English/Spanish)",
    "pricing.features.insights": "Basic job market insights",
    "pricing.features.everything": "Everything in Free, plus:",
    "pricing.features.moreRecs": "20+ career recommendations per category",
    "pricing.features.aiAnalysis": "Detailed AI impact analysis for each career",
    "pricing.features.skillRoadmaps": "Skill development roadmaps",
    "pricing.features.trendAnalysis": "Industry trend analysis",
    "pricing.features.careerPaths": "Personalized career path recommendations",
    "pricing.features.support": "Priority customer support",
    "pricing.features.updates": "Monthly career market updates",
    "pricing.features.pdfReports": "PDF report downloads",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.retry": "Try again",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.continue": "Continue",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.finish": "Finish",
    "common.free": "Free",
    "common.premium": "Premium",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.about": "Acerca de",
    "nav.pricing": "Precios",
    "nav.dashboard": "Panel",
    "nav.signIn": "Iniciar Sesión",
    "nav.signUp": "Comenzar",
    "nav.getStarted": "Comenzar",

    // Homepage
    "home.title": "Descubre tu Camino Profesional Perfecto",
    "home.subtitle":
      "Realiza nuestra prueba integral de personalidad RIASEC para descubrir carreras que se alineen con tus intereses, habilidades y personalidad. Obtén recomendaciones personalizadas para trabajos tradicionales y del futuro.",
    "home.cta.primary": "Comienza tu Evaluación de Carrera",
    "home.cta.secondary": "Saber Más",
    "home.features.title": "¿Por qué Elegir Career Compass?",
    "home.features.validated.title": "Científicamente Validado",
    "home.features.validated.desc":
      "Basado en el modelo RIASEC comprobado utilizado por consejeros profesionales en todo el mundo para emparejar personalidades con trayectorias profesionales adecuadas.",
    "home.features.future.title": "Perspectivas del Futuro",
    "home.features.future.desc":
      "Obtén recomendaciones para carreras tradicionales y roles emergentes, incluyendo análisis de impacto de IA y evaluación de riesgo de automatización.",
    "home.features.bilingual.title": "Soporte Bilingüe",
    "home.features.bilingual.desc":
      "Disponible en inglés y español para servir a una comunidad diversa de buscadores de carrera y profesionales.",
    "home.howItWorks.title": "Cómo Funciona",
    "home.howItWorks.step1.title": "Realiza la Evaluación",
    "home.howItWorks.step1.desc":
      "Responde 60 preguntas cuidadosamente elaboradas sobre tus intereses y preferencias. La prueba toma entre 10-15 minutos completar.",
    "home.howItWorks.step2.title": "Obtén tu Perfil RIASEC",
    "home.howItWorks.step2.desc":
      "Recibe tu perfil de personalidad personalizado mostrando tus puntuaciones en los tipos Realista, Investigativo, Artístico, Social, Emprendedor y Convencional.",
    "home.howItWorks.step3.title": "Explora Coincidencias de Carrera",
    "home.howItWorks.step3.desc":
      "Descubre carreras que se alineen con tu personalidad, incluyendo rangos salariales, requisitos educativos y perspectivas laborales futuras.",
    "home.cta.final.title": "¿Listo para Encontrar tu Camino Profesional?",
    "home.cta.final.subtitle":
      "Únete a miles de profesionales que han descubierto sus carreras ideales con Career Compass.",
    "home.cta.final.button": "Comienza tu Evaluación Gratuita",
    "home.footer.tagline": "Ayudándote a navegar tu viaje profesional con confianza.",

    // Dashboard
    "dashboard.welcome": "Bienvenido de vuelta",
    "dashboard.assessment.title": "Estado de la Evaluación",
    "dashboard.assessment.lastCompleted": "Última completada:",
    "dashboard.assessment.topType": "Tipo de personalidad principal:",
    "dashboard.assessment.viewResults": "Ver Resultados",
    "dashboard.assessment.retakeTest": "Repetir Prueba",
    "dashboard.assessment.notTaken": "Aún no has realizado la evaluación.",
    "dashboard.assessment.takeAssessment": "Realizar Evaluación",
    "dashboard.account.title": "Estado de la Cuenta",
    "dashboard.account.plan": "Plan:",
    "dashboard.account.recommendations": "Recomendaciones de carrera:",
    "dashboard.account.unlimited": "Ilimitadas",
    "dashboard.account.limited": "6 por categoría",
    "dashboard.account.upgrade": "Actualizar a Premium",
    "dashboard.quickActions.title": "Acciones Rápidas",
    "dashboard.quickActions.desc": "Explora tus opciones de carrera e información",
    "dashboard.quickActions.takeTest": "Realizar Prueba",
    "dashboard.quickActions.viewResults": "Ver Resultados",
    "dashboard.quickActions.careerPath": "Ruta Profesional",
    "dashboard.quickActions.exploreJobs": "Explorar Trabajos",

    // Pricing
    "pricing.title": "Elige tu Plan de Descubrimiento de Carrera",
    "pricing.subtitle":
      "Comienza con nuestra evaluación gratuita, luego desbloquea perspectivas avanzadas y orientación profesional personalizada con Premium.",
    "pricing.free.title": "Gratuito",
    "pricing.free.desc": "Perfecto para comenzar con la exploración de carrera",
    "pricing.free.price": "$0",
    "pricing.free.period": "/para siempre",
    "pricing.free.current": "Plan Actual",
    "pricing.premium.title": "Premium",
    "pricing.premium.desc": "Orientación profesional integral con perspectivas avanzadas",
    "pricing.premium.price": "$29",
    "pricing.premium.period": "/mes",
    "pricing.premium.popular": "Más Popular",
    "pricing.premium.active": "Activo",
    "pricing.premium.upgrade": "Actualizar a Premium",
    "pricing.features.assessment": "Evaluación completa de personalidad RIASEC",
    "pricing.features.profile": "Perfil básico de personalidad con los 3 tipos principales",
    "pricing.features.traditional": "6 recomendaciones de carreras tradicionales",
    "pricing.features.future": "6 recomendaciones de carreras del futuro",
    "pricing.features.bilingual": "Soporte bilingüe (Inglés/Español)",
    "pricing.features.insights": "Perspectivas básicas del mercado laboral",
    "pricing.features.everything": "Todo en Gratuito, más:",
    "pricing.features.moreRecs": "Más de 20 recomendaciones de carrera por categoría",
    "pricing.features.aiAnalysis": "Análisis detallado del impacto de IA para cada carrera",
    "pricing.features.skillRoadmaps": "Hojas de ruta de desarrollo de habilidades",
    "pricing.features.trendAnalysis": "Análisis de tendencias de la industria",
    "pricing.features.careerPaths": "Recomendaciones de rutas profesionales personalizadas",
    "pricing.features.support": "Soporte al cliente prioritario",
    "pricing.features.updates": "Actualizaciones mensuales del mercado profesional",
    "pricing.features.pdfReports": "Descargas de informes PDF",

    // Common
    "common.loading": "Cargando...",
    "common.error": "Ocurrió un error",
    "common.retry": "Intentar de nuevo",
    "common.cancel": "Cancelar",
    "common.save": "Guardar",
    "common.continue": "Continuar",
    "common.back": "Atrás",
    "common.next": "Siguiente",
    "common.previous": "Anterior",
    "common.finish": "Finalizar",
    "common.free": "Gratuito",
    "common.premium": "Premium",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("career-compass-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when changed
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("career-compass-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
