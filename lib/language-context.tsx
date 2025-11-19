"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "es" | "ro"

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
    "nav.account": "Account",
    "nav.signIn": "Sign In",
    "nav.signUp": "Get Started",
    "nav.getStarted": "Get Started",

    // Homepage
    "home.title": "Discover Your Perfect Career Path",
    "home.subtitle":
      "Take our comprehensive RIASEC personality test to uncover careers that align with your interests, skills, and personality. Get personalized recommendations for both traditional and future-ready jobs.",
    "home.cta.primary": "Start Your Career Assessment",
    "home.cta.secondary": "Learn More",
    "home.features.title": "Why Choose NextWave Careers?",
    "home.features.validated.title": "Scientifically Validated",
    "home.features.validated.desc":
      "Based on the proven RIASEC model used by career counselors worldwide to match personalities with suitable career paths.",
    "home.features.future.title": "Future-Ready Insights",
    "home.features.future.desc":
      "Get recommendations for both traditional careers and emerging roles, including AI impact analysis and automation risk assessment.",
    "home.features.bilingual.title": "Trilingual Support",
    "home.features.bilingual.desc":
      "Available in English, Spanish, and Romanian to serve a diverse community of career seekers and professionals.",
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
      "Join thousands of professionals who have discovered their ideal careers with NextWave Careers.",
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
    "pricing.features.bilingual": "Trilingual support (English/Spanish/Romanian)",
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

    // Account Page
    "account.title": "My Account",
    "account.connectionStatus.title": "Connection Status",
    "account.connectionStatus.desc": "Your account is successfully connected and authenticated",
    "account.connectionStatus.connected": "Connected",
    "account.connectionStatus.since": "Since",
    "account.profile.title": "Profile Information",
    "account.profile.email": "Email",
    "account.profile.provider": "Sign-in method",
    "account.profile.memberSince": "Member since",
    "account.profile.emailVerified": "Email verified",
    "account.actions.title": "Account Actions",
    "account.actions.desc": "Manage your account and access your career tools",
    "account.actions.viewDashboard": "View Dashboard",
    "account.actions.takeAssessment": "Take Assessment",
    "account.actions.signOut": "Sign Out",

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
    "common.yes": "Yes",
    "common.no": "No",

    // Profile Dropdown
    "profile.dropdown.title": "Profile",
    "profile.dropdown.account": "Account Settings",
    "profile.dropdown.history": "Assessment History",
    "profile.dropdown.signOut": "Sign Out",
    "profile.history.title": "Assessment History",
    "profile.history.noTests": "No assessments completed yet",
    "profile.history.completedOn": "Completed on",
    "profile.history.topType": "Top type:",
    "profile.history.viewResults": "View Results",
    "profile.history.retake": "Retake Assessment",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.about": "Acerca de",
    "nav.pricing": "Precios",
    "nav.dashboard": "Panel",
    "nav.account": "Cuenta",
    "nav.signIn": "Iniciar Sesión",
    "nav.signUp": "Comenzar",
    "nav.getStarted": "Comenzar",

    // Homepage
    "home.title": "Descubre tu Camino Profesional Perfecto",
    "home.subtitle":
      "Realiza nuestra prueba integral de personalidad RIASEC para descubrir carreras que se alineen con tus intereses, habilidades y personalidad. Obtén recomendaciones personalizadas para trabajos tradicionales y del futuro.",
    "home.cta.primary": "Comienza tu Evaluación de Carrera",
    "home.cta.secondary": "Saber Más",
    "home.features.title": "¿Por qué Elegir NextWave Careers?",
    "home.features.validated.title": "Científicamente Validado",
    "home.features.validated.desc":
      "Basado en el modelo RIASEC comprobado utilizado por consejeros profesionales en todo el mundo para emparejar personalidades con trayectorias profesionales adecuadas.",
    "home.features.future.title": "Perspectivas del Futuro",
    "home.features.future.desc":
      "Obtén recomendaciones para carreras tradicionales y roles emergentes, incluyendo análisis de impacto de IA y evaluación de riesgo de automatización.",
    "home.features.bilingual.title": "Soporte Trilingüe",
    "home.features.bilingual.desc":
      "Disponible en inglés, español y rumano para servir a una comunidad diversa de buscadores de carrera y profesionales.",
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
      "Únete a miles de profesionales que han descubierto sus carreras ideales con NextWave Careers.",
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
    "pricing.features.bilingual": "Soporte Trilingüe (Inglés/Español/Rumano)",
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

    // Account Page
    "account.title": "Mi Cuenta",
    "account.connectionStatus.title": "Estado de Conexión",
    "account.connectionStatus.desc": "Tu cuenta está conectada y autenticada exitosamente",
    "account.connectionStatus.connected": "Conectado",
    "account.connectionStatus.since": "Desde",
    "account.profile.title": "Información del Perfil",
    "account.profile.email": "Correo electrónico",
    "account.profile.provider": "Método de inicio de sesión",
    "account.profile.memberSince": "Miembro desde",
    "account.profile.emailVerified": "Correo verificado",
    "account.actions.title": "Acciones de Cuenta",
    "account.actions.desc": "Administra tu cuenta y accede a tus herramientas de carrera",
    "account.actions.viewDashboard": "Ver Panel",
    "account.actions.takeAssessment": "Realizar Evaluación",
    "account.actions.signOut": "Cerrar Sesión",

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
    "common.yes": "Sí",
    "common.no": "No",

    // Profile Dropdown
    "profile.dropdown.title": "Perfil",
    "profile.dropdown.account": "Configuración de Cuenta",
    "profile.dropdown.history": "Historial de Evaluaciones",
    "profile.dropdown.signOut": "Cerrar Sesión",
    "profile.history.title": "Historial de Evaluaciones",
    "profile.history.noTests": "Aún no se han completado evaluaciones",
    "profile.history.completedOn": "Completado el",
    "profile.history.topType": "Tipo principal:",
    "profile.history.viewResults": "Ver Resultados",
    "profile.history.retake": "Repetir Evaluación",
  },
  ro: {
    // Navigation
    "nav.home": "Acasă",
    "nav.about": "Despre",
    "nav.pricing": "Prețuri",
    "nav.dashboard": "Panou",
    "nav.account": "Cont",
    "nav.signIn": "Conectare",
    "nav.signUp": "Începe",
    "nav.getStarted": "Începe",

    // Homepage
    "home.title": "Descoperă-ți calea profesională perfectă",
    "home.subtitle":
      "Fă testul nostru comprehensiv de personalitate RIASEC pentru a descoperi cariere care se aliniază cu interesele, abilitățile și personalitatea ta. Primește recomandări personalizate pentru joburi tradiționale și viitoare.",
    "home.cta.primary": "Începe Evaluarea de Carieră",
    "home.cta.secondary": "Află Mai Mult",
    "home.features.title": "De Ce să Alegi NextWave Careers?",
    "home.features.validated.title": "Validat Științific",
    "home.features.validated.desc":
      "Bazat pe modelul RIASEC dovedit, folosit de consilierii de carieră din întreaga lume pentru a potrivi personalitățile cu căile de carieră potrivite.",
    "home.features.future.title": "Perspective de Viitor",
    "home.features.future.desc":
      "Primește recomandări pentru cariere tradiționale și roluri emergente, incluzând analiza impactului AI și evaluarea riscului de automatizare.",
    "home.features.bilingual.title": "Suport Trilingv",
    "home.features.bilingual.desc":
      "Disponibil în engleză, spaniolă și română pentru a servi o comunitate diversă de căutători de carieră și profesioniști.",
    "home.howItWorks.title": "Cum Funcționează",
    "home.howItWorks.step1.title": "Fă Evaluarea",
    "home.howItWorks.step1.desc":
      "Răspunde la 60 de întrebări atent elaborate despre interesele și preferințele tale. Testul durează aproximativ 10-15 minute.",
    "home.howItWorks.step2.title": "Primește Profilul RIASEC",
    "home.howItWorks.step2.desc":
      "Primește profilul tău personalizat de personalitate arătând scorurile tale pentru tipurile Realist, Investigativ, Artistic, Social, Întreprinzător și Convențional.",
    "home.howItWorks.step3.title": "Explorează Potrivirile de Carieră",
    "home.howItWorks.step3.desc":
      "Descoperă cariere care se aliniază cu personalitatea ta, incluzând intervalele salariale, cerințele educaționale și perspectivele viitoare ale jobului.",
    "home.cta.final.title": "Gata să-ți Găsești Calea Profesională?",
    "home.cta.final.subtitle":
      "Alătură-te miilor de profesioniști care și-au descoperit carierele ideale cu NextWave Careers.",
    "home.cta.final.button": "Începe Evaluarea Gratuită",
    "home.footer.tagline": "Te ajutăm să navighezi călătoria ta profesională cu încredere.",

    // Dashboard
    "dashboard.welcome": "Bun venit înapoi",
    "dashboard.assessment.title": "Starea Evaluării",
    "dashboard.assessment.lastCompleted": "Ultima completată:",
    "dashboard.assessment.topType": "Tipul principal de personalitate:",
    "dashboard.assessment.viewResults": "Vezi Rezultatele",
    "dashboard.assessment.retakeTest": "Refă Testul",
    "dashboard.assessment.notTaken": "Nu ai făcut încă evaluarea.",
    "dashboard.assessment.takeAssessment": "Fă Evaluarea",
    "dashboard.account.title": "Starea Contului",
    "dashboard.account.plan": "Plan:",
    "dashboard.account.recommendations": "Recomandări de carieră:",
    "dashboard.account.unlimited": "Nelimitate",
    "dashboard.account.limited": "6 per categorie",
    "dashboard.account.upgrade": "Actualizează la Premium",
    "dashboard.quickActions.title": "Acțiuni Rapide",
    "dashboard.quickActions.desc": "Explorează opțiunile și perspectivele tale de carieră",
    "dashboard.quickActions.takeTest": "Fă Testul",
    "dashboard.quickActions.viewResults": "Vezi Rezultatele",
    "dashboard.quickActions.careerPath": "Calea Profesională",
    "dashboard.quickActions.exploreJobs": "Explorează Joburile",

    // Pricing
    "pricing.title": "Alege Planul de Descoperire a Carierei",
    "pricing.subtitle":
      "Începe cu evaluarea noastră gratuită, apoi deblochează perspective avansate și îndrumări personalizate de carieră cu Premium.",
    "pricing.free.title": "Gratuit",
    "pricing.free.desc": "Perfect pentru a începe explorarea carierei",
    "pricing.free.price": "$0",
    "pricing.free.period": "/pentru totdeauna",
    "pricing.free.current": "Planul Actual",
    "pricing.premium.title": "Premium",
    "pricing.premium.desc": "Îndrumări complete de carieră cu perspective avansate",
    "pricing.premium.price": "$29",
    "pricing.premium.period": "/lună",
    "pricing.premium.popular": "Cel Mai Popular",
    "pricing.premium.active": "Activ",
    "pricing.premium.upgrade": "Actualizează la Premium",
    "pricing.features.assessment": "Evaluare completă de personalitate RIASEC",
    "pricing.features.profile": "Profil de bază de personalitate cu top 3 tipuri",
    "pricing.features.traditional": "6 recomandări de cariere tradiționale",
    "pricing.features.future": "6 recomandări de cariere viitoare",
    "pricing.features.bilingual": "Suport Trilingüe (Engleză/Spaniolă/Rumână)",
    "pricing.features.insights": "Perspective de bază ale pieței muncii",
    "pricing.features.everything": "Tot din Gratuit, plus:",
    "pricing.features.moreRecs": "Peste 20 de recomandări de carieră per categorie",
    "pricing.features.aiAnalysis": "Analiză detaliată a impactului AI pentru fiecare carieră",
    "pricing.features.skillRoadmaps": "Hărți de dezvoltare a abilităților",
    "pricing.features.trendAnalysis": "Analiza tendințelor industriei",
    "pricing.features.careerPaths": "Recomandări personalizate de căi profesionale",
    "pricing.features.support": "Suport prioritar pentru clienți",
    "pricing.features.updates": "Actualizări lunare ale pieței profesionale",
    "pricing.features.pdfReports": "Descărcări de rapoarte PDF",

    // Account Page
    "account.title": "Contul Meu",
    "account.connectionStatus.title": "Starea Conexiunii",
    "account.connectionStatus.desc": "Contul tău este conectat și autentificat cu succes",
    "account.connectionStatus.connected": "Conectat",
    "account.connectionStatus.since": "Din",
    "account.profile.title": "Informații Profil",
    "account.profile.email": "Email",
    "account.profile.provider": "Metoda de conectare",
    "account.profile.memberSince": "Membru din",
    "account.profile.emailVerified": "Email verificat",
    "account.actions.title": "Acțiuni Cont",
    "account.actions.desc": "Gestionează-ți contul și accesează instrumentele de carieră",
    "account.actions.viewDashboard": "Vezi Panoul",
    "account.actions.takeAssessment": "Fă Evaluarea",
    "account.actions.signOut": "Deconectare",

    // Common
    "common.loading": "Se încarcă...",
    "common.error": "A apărut o eroare",
    "common.retry": "Încearcă din nou",
    "common.cancel": "Anulează",
    "common.save": "Salvează",
    "common.continue": "Continuă",
    "common.back": "Înapoi",
    "common.next": "Următorul",
    "common.previous": "Anterior",
    "common.finish": "Finalizează",
    "common.free": "Gratuit",
    "common.premium": "Premium",
    "common.yes": "Da",
    "common.no": "Nu",

    // Profile Dropdown
    "profile.dropdown.title": "Profil",
    "profile.dropdown.account": "Setări Cont",
    "profile.dropdown.history": "Istoricul Evaluărilor",
    "profile.dropdown.signOut": "Deconectare",
    "profile.history.title": "Istoricul Evaluărilor",
    "profile.history.noTests": "Nu au fost completate încă evaluări",
    "profile.history.completedOn": "Completat pe",
    "profile.history.topType": "Tipul principal:",
    "profile.history.viewResults": "Vezi Rezultatele",
    "profile.history.retake": "Refă Evaluarea",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("nextwave-careers-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es" || savedLanguage === "ro")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when changed
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("nextwave-careers-language", lang)
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
