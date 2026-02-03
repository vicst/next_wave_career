"use client"

import type React from "react"

import { useState } from "react"
import { X, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const onClose = () => onOpenChange(false)
  const isOpen = open
  const [isLoading, setIsLoading] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [useMagicLink, setUseMagicLink] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showOAuthHelp, setShowOAuthHelp] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const supabase = createClient()
  const router = useRouter()

  if (!isOpen) return null

  const handleSocialLogin = async (provider: "google" | "facebook" | "apple") => {
    setIsLoading(true)
    setError("")

    try {
      if (!isSupabaseConfigured()) {
        throw new Error("Supabase not configured")
      }

      console.log("[v0] Starting OAuth login with provider:", provider)
      console.log("[v0] Using Supabase callback URL: https://bjwtjqgfczfctkgmsrbj.supabase.co/auth/v1/callback")

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
      })

      console.log("[v0] OAuth response:", { data, error })

      if (error) {
        console.error("[v0] OAuth error details:", error)
        throw error
      }

      console.log("[v0] OAuth initiated successfully")
    } catch (error: any) {
      console.error(`[v0] ${provider} login error:`, error)

      let errorMessage = `Eroare la conectarea cu ${provider}.`

      if (error.message?.includes("Supabase not configured")) {
        errorMessage = "Autentificarea nu este configurată. Vă rugăm să contactați administratorul."
        setError(errorMessage)
        setIsLoading(false)
        return
      }

      if (error.message?.includes("blocked") || error.message?.includes("popup")) {
        if (provider === "google") {
          errorMessage =
            "Conținutul este blocat de Google. Adăugați URL-ul de callback Supabase în Google Cloud Console."
        } else if (provider === "facebook") {
          errorMessage =
            "Conținutul este blocat de Facebook. Adăugați URL-ul de callback Supabase în Facebook Developer Console."
        } else {
          errorMessage = `Conținutul este blocat de ${provider}. Configurați URL-ul de callback în setările OAuth.`
        }
        setShowOAuthHelp(true)
      } else if (error.message?.includes("redirect")) {
        errorMessage += " Problemă cu configurarea OAuth. Contactați administratorul."
        setShowOAuthHelp(true)
      } else {
        errorMessage += ` Detalii: ${error.message || "Eroare necunoscută"}`
      }

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      if (!isSupabaseConfigured()) {
        throw new Error("Supabase not configured")
      }

      if (useMagicLink) {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        setSuccess("Link-ul magic a fost trimis pe email!")
      } else if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) throw error

        // Check if user already exists (Supabase returns user but with identities: [])
        if (data.user && (!data.user.identities || data.user.identities.length === 0)) {
          setError("Un cont cu acest email există deja. Vă rugăm să vă conectați.")
          setIsLoading(false)
          return
        }

        setSuccess("Verificați emailul pentru confirmarea contului!")
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        onClose()
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Email auth error:", error)

      if (error.message?.includes("Supabase not configured")) {
        setError("Autentificarea nu este configurată. Vă rugăm să contactați administratorul.")
      } else if (error.message?.includes("User already registered")) {
        setError("Un cont cu acest email există deja. Vă rugăm să vă conectați.")
      } else {
        setError(error.message || "A apărut o eroare. Încercați din nou.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Închide"
        >
          <X className="w-5 h-5" />
        </button>

        {!showEmailForm ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bun venit!</h2>
              <p className="text-gray-600">Conectează-te pentru a continua</p>
            </div>

            {showOAuthHelp && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="font-semibold text-amber-800 mb-2">Configurare OAuth necesară</h3>
                <p className="text-sm text-amber-700 mb-3">
                  Pentru a funcționa autentificarea, adăugați URL-ul de callback Supabase în configurarea OAuth:
                </p>
                <div className="bg-white p-2 rounded border text-xs font-mono break-all">
                  https://bjwtjqgfczfctkgmsrbj.supabase.co/auth/v1/callback
                </div>

                <div className="mt-3 text-xs text-amber-600 space-y-2">
                  <div>
                    <strong>Google:</strong> Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs
                    → Authorized redirect URIs
                  </div>
                  <div>
                    <strong>Facebook:</strong> Facebook Developer Console → App → Facebook Login → Settings → Valid
                    OAuth Redirect URIs
                  </div>
                  <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-blue-700">
                    <strong>Important:</strong> Folosiți URL-ul Supabase de mai sus, NU domeniul aplicației!
                  </div>
                </div>

                <button
                  onClick={() => setShowOAuthHelp(false)}
                  className="mt-2 text-xs text-amber-600 hover:text-amber-800 underline"
                >
                  Închide
                </button>
              </div>
            )}

            {error && (
              <div className="mb-4 text-red-600 text-sm bg-red-50 p-3 rounded border border-red-200">{error}</div>
            )}

            <div className="space-y-4">
              <Button
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
                className="w-full h-12 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-3 font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 2.43-4.53 4.12-4.53z"
                  />
                </svg>
                Continuă cu Google
              </Button>

              <Button
                onClick={() => handleSocialLogin("apple")}
                disabled={isLoading}
                className="w-full h-12 bg-black text-white hover:bg-gray-800 flex items-center justify-center gap-3 font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Continuă cu Apple
              </Button>

              <Button
                onClick={() => handleSocialLogin("facebook")}
                disabled={isLoading}
                className="w-full h-12 bg-[#1877F2] text-white hover:bg-[#166FE5] flex items-center justify-center gap-3 font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continuă cu Facebook
              </Button>

              <Button
                onClick={() => setShowEmailForm(true)}
                variant="outline"
                className="w-full h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-3 font-medium"
              >
                <Mail className="w-5 h-5" />
                e-mail
              </Button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setShowEmailForm(true)
                  setIsSignUp(false)
                }}
                className="text-cyan-600 hover:text-cyan-700 font-medium"
              >
                 
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <button onClick={() => setShowEmailForm(false)} className="text-gray-500 hover:text-gray-700 mb-4">
                ← Înapoi
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{isSignUp ? "Creează cont" : "Conectare"}</h2>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              {!useMagicLink && (
                <div>
                  <Label htmlFor="password">Parolă</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!useMagicLink}
                    className="mt-1"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  id="magic-link"
                  type="checkbox"
                  checked={useMagicLink}
                  onChange={(e) => setUseMagicLink(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="magic-link" className="text-sm">
                  Folosește link magic (fără parolă)
                </Label>
              </div>

              {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded">{error}</div>}

              {success && <div className="text-green-600 text-sm bg-green-50 p-3 rounded">{success}</div>}

              <Button type="submit" disabled={isLoading} className="w-full h-12 bg-cyan-600 hover:bg-cyan-700">
                {isLoading
                  ? "Se procesează..."
                  : useMagicLink
                    ? "Trimite link magic"
                    : isSignUp
                      ? "Creează cont"
                      : "Conectare"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button onClick={() => setIsSignUp(!isSignUp)} className="text-cyan-600 hover:text-cyan-700 text-sm">
                {isSignUp ? "Ai deja cont? Conectează-te" : "Nu ai cont? Înregistrează-te"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
