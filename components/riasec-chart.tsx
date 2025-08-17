"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"

interface RiasecChartProps {
  scores: { R: number; I: number; A: number; S: number; E: number; C: number }
  language: "en" | "es"
}

const RIASEC_LABELS = {
  en: {
    R: "Realistic",
    I: "Investigative",
    A: "Artistic",
    S: "Social",
    E: "Enterprising",
    C: "Conventional",
  },
  es: {
    R: "Realista",
    I: "Investigativo",
    A: "Artístico",
    S: "Social",
    E: "Emprendedor",
    C: "Convencional",
  },
}

export default function RiasecChart({ scores, language }: RiasecChartProps) {
  const data = Object.entries(scores).map(([key, value]) => ({
    type: key,
    label: RIASEC_LABELS[language][key as keyof typeof RIASEC_LABELS.en],
    score: value,
    fullMark: 50, // Assuming max score is 50
  }))

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="label" className="text-sm" />
          <PolarRadiusAxis angle={90} domain={[0, 50]} tick={false} axisLine={false} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
