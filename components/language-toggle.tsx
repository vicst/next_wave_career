"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex gap-2">
      <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
        English
      </Button>
      <Button variant={language === "es" ? "default" : "outline"} size="sm" onClick={() => setLanguage("es")}>
        Español
      </Button>
    </div>
  )
}
