'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CareerMatcher, PDFGenerator } from '@/lib/pdf-generator';

interface PDFDownloadButtonProps {
  testResults: {
    riasec_scores: { R: number; I: number; A: number; S: number; E: number; C: number };
    top_personality_types: string[];
  };
  userName: string;
  userEmail?: string;
  language: 'en' | 'es';
  disabled?: boolean;
}

export function PDFDownloadButton({ 
  testResults, 
  userName, 
  userEmail, 
  language,
  disabled = false 
}: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);

    try {
      const profile = {
        name: userName,
        email: userEmail,
        riasecScores: testResults.riasec_scores,
        topTypes: testResults.top_personality_types,
        testDate: new Date()
      };

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

      const matches = await CareerMatcher.matchJobs(profile, supabaseUrl, supabaseKey);

      const html = PDFGenerator.generateHTML(profile, matches);

      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html, profile }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      PDFGenerator.downloadPDF(
        blob, 
        `raport-cariera-${userName.replace(/\s+/g, '-')}-${testResults.top_personality_types.join('')}.pdf`
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
            alert(
        language === 'en' 
          ? 'Error generating PDF. Please try again.' 
          : 'Error al generar PDF. Por favor, inténtalo de nuevo.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleGeneratePDF}
      disabled={disabled || isGenerating}
      variant="outline"
      size="sm"
    >
      <Download className="h-4 w-4 mr-2" />
      {isGenerating 
        ? (language === 'en' ? 'Generating...' : 'Generando...') 
        : (language === 'en' ? 'Download PDF' : 'Descargar PDF')
      }
    </Button>
  );
}