import { createClient } from '@supabase/supabase-js';

interface RIASECScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

interface UserProfile {
  name: string;
  email?: string;
  riasecScores: RIASECScores;
  topTypes: string[];
  testDate?: Date;
}

interface Job {
  id: number;
  job_title_ro: string;
  description_ro: string;
  riasec_code: string;
  salary_range?: string;
  education_level?: string;
  growth_outlook?: string;
  ai_impact_level?: string;
  automation_risk?: string;
  future_demand?: string;
  required_skills?: string[];
}

interface CareerMatch {
  job: Job;
  matchScore: number;
  matchingCodes: string[];
}

const RIASEC_DESCRIPTIONS_RO = {
  R: {
    name: 'Realist',
    description: 'Persoanele realiste prefera activitati practice care implica lucrul cu obiecte, unelte, masini sau animale. Acestea sunt orientate spre actiune si prefera sa lucreze cu mainile. Persoanele realiste sunt practice, independente si prefera sa rezolve probleme concrete. Au abilitati tehnice si mecanice bine dezvoltate.',
    characteristics: ['Practic', 'Independent', 'Tehnic', 'Orientat spre actiune', 'Mecanic', 'Fizic']
  },
  I: {
    name: 'Investigativ',
    description: 'Persoanele investigative prefera activitati care implica observarea, investigarea si intelegerea fenomenelor fizice, biologice sau culturale. Persoanele investigative sunt analitice, intelectuale si prefera sa rezolve probleme complexe prin gandire si cercetare.',
    characteristics: ['Analitic', 'Intelectual', 'Curios', 'Orientat spre cercetare', 'Metodic', 'Precis']
  },
  A: {
    name: 'Artistic',
    description: 'Persoanele artistice prefera activitati creative si de exprimare personala prin arta, muzica, scriere sau design. Persoanele artistice sunt imaginative, intuitive si prefera medii de lucru nestructurate unde pot fi creative.',
    characteristics: ['Creativ', 'Imaginativ', 'Intuitiv', 'Expresiv', 'Original', 'Independent']
  },
  S: {
    name: 'Social',
    description: 'Persoanele sociale prefera sa desfasoare activitati in care trebuie sa colaboreze si sa lucreze cu oamenii in mod direct si indirect. Acestea sunt receptive la dorintele si nevoile altor persoane preferand sa interactioneze cu acestea pentru a strange date si informatii inainte sa creeze un plan de actiune. Persoanele sociale sunt prietenoase, sociabile si coopereaza cu usurinta, cea ce ii face sa fie foarte buni membri ai unei echipe.',
    characteristics: ['Prietenos', 'Sociabil', 'Cooperant', 'Empatic', 'Comunicativ', 'Orientat spre oameni']
  },
  E: {
    name: 'Antreprenorial',
    description: 'Persoanele antreprenoriale prefera activitati care implica persuadarea, conducerea si vanzarea pentru a atinge obiective organizationale sau castiguri economice. Persoanele antreprenoriale sunt energice, ambitioase si prefera sa preia initiativa in situatii de afaceri.',
    characteristics: ['Energic', 'Ambitios', 'Persuasiv', 'Orientat spre rezultate', 'Competitiv', 'Increzator']
  },
  C: {
    name: 'Conventional',
    description: 'Persoanele conventionale prefera activitatile care necesita folosirea sistematica a cifrelor, datelor sau documentelor. Acestea au o capacitate extraordinara de a face o activitate repetitiva zi de zi, fiind consecventi, organizati si orientati in general pe munca in detaliu.',
    characteristics: ['Organizat', 'Consecvent', 'Orientat pe detalii', 'Loial', 'Demn de incredere', 'Metodic']
  }
};

export class CareerMatcher {
  static calculateMatchScore(userTopTypes: string[], jobCode: string): number {
    let score = 0;
    const jobCodes = jobCode.split('');

    for (let i = 0; i < userTopTypes.length && i < 3; i++) {
      const userType = userTopTypes[i];
      const jobIndex = jobCodes.indexOf(userType);

      if (jobIndex !== -1) {
        const positionWeight = 1 / (i + 1);
        const jobPositionWeight = 1 / (jobIndex + 1);
        score += (positionWeight + jobPositionWeight) * 50;
      }
    }

    return Math.round(score);
  }

  static getMatchingCodes(userTopTypes: string[], jobCode: string): string[] {
    const jobCodes = jobCode.split('');
    return userTopTypes.filter(type => jobCodes.includes(type));
  }

  static async matchJobs(profile: UserProfile, supabaseUrl: string, supabaseKey: string): Promise<CareerMatch[]> {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const matches: CareerMatch[] = [];

    const traditionalQuery = supabase
      .from('jobs_traditional')
      .select('*')
      .or(`riasec_code.ilike.%${profile.topTypes[0]}%,riasec_code.ilike.%${profile.topTypes[1]}%`)
      .limit(30);

    const futureQuery = supabase
      .from('jobs_future')
      .select('*')
      .or(`riasec_code.ilike.%${profile.topTypes[0]}%,riasec_code.ilike.%${profile.topTypes[1]}%`)
      .limit(30);

    const [traditionalResult, futureResult] = await Promise.all([
      traditionalQuery,
      futureQuery
    ]);

    const allJobs = [
      ...(traditionalResult.data || []),
      ...(futureResult.data || [])
    ];

    for (const job of allJobs) {
      const matchScore = this.calculateMatchScore(profile.topTypes, job.riasec_code);
      const matchingCodes = this.getMatchingCodes(profile.topTypes, job.riasec_code);

      if (matchScore > 0) {
        matches.push({
          job,
          matchScore,
          matchingCodes
        });
      }
    }

    return matches.sort((a, b) => b.matchScore - a.matchScore).slice(0, 20);
  }
}

export class PDFGenerator {
  static generateHTML(profile: UserProfile, matches: CareerMatch[]): string {
    const personalityTypesHTML = profile.topTypes
      .map(typeCode => {
        const typeInfo = RIASEC_DESCRIPTIONS_RO[typeCode as keyof typeof RIASEC_DESCRIPTIONS_RO];
        
        return `
          <div class="personality-type">
            <h2>${typeCode} - ${typeInfo.name}</h2>
            <p class="description">${typeInfo.description}</p>
            <div class="characteristics">
              <strong>Caracteristici:</strong> ${typeInfo.characteristics.join(', ')}
            </div>
          </div>
        `;
      })
      .join('');

    const scoresHTML = Object.entries(profile.riasecScores)
      .sort(([, a], [, b]) => b - a)
      .map(([code, score]) => {
        const typeInfo = RIASEC_DESCRIPTIONS_RO[code as keyof typeof RIASEC_DESCRIPTIONS_RO];
        return `
          <div class="score-item">
            <div class="score-label">${code} - ${typeInfo.name}</div>
            <div class="score-bar-container">
              <div class="score-bar" style="width: ${(score / 50) * 100}%"></div>
            </div>
            <div class="score-value">${score}/50</div>
          </div>
        `;
      })
      .join('');

    const careersHTML = matches
      .map((match, index) => {
        const job = match.job;
        return `
<div class="career-item">
          <h3>${index + 1}. ${job.job_title_ro}</h3>
          <p class="match-score">Scor potrivire: ${match.matchScore}%</p>
          <p class="riasec-code">Cod RIASEC: ${job.riasec_code}</p>
          <p class="career-description">${job.description_ro}</p>
          ${job.salary_range ? `<p class="job-detail"><strong>Salariu:</strong> ${job.salary_range}</p>` : ''}
          ${job.education_level ? `<p class="job-detail"><strong>Educație:</strong> ${job.education_level}</p>` : ''}
          ${job.growth_outlook ? `<p class="job-detail"><strong>Perspectivă:</strong> ${job.growth_outlook}</p>` : ''}
          ${job.ai_impact_level ? `<p class="job-detail"><strong>Impact AI:</strong> ${job.ai_impact_level}</p>` : ''}
          ${job.automation_risk ? `<p class="job-detail"><strong>Risc automatizare:</strong> ${job.automation_risk}</p>` : ''}
          ${job.future_demand ? `<p class="job-detail"><strong>Cerere viitoare:</strong> ${job.future_demand}</p>` : ''}
          <p class="matching-types">Coduri potrivite: ${match.matchingCodes.join(', ')}</p>
        </div>
      `;
      })
      .join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          @page { size: A4; margin: 2cm; }
          body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.6; color: #333; }
          .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #2563eb; }
          .header h1 { font-size: 28pt; margin: 0 0 10px 0; color: #1e40af; }
          .header .subtitle { font-size: 14pt; color: #64748b; }
          .user-info { background: #f1f5f9; padding: 20px; margin-bottom: 30px; border-radius: 8px; border-left: 4px solid #2563eb; }
          .user-info p { margin: 8px 0; font-size: 11pt; }
          .section { margin-bottom: 40px; page-break-inside: avoid; }
          .section h2 { font-size: 20pt; color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 20px; }
          .personality-type { margin-bottom: 25px; padding: 15px; background: #f8fafc; border-radius: 8px; page-break-inside: avoid; }
          .personality-type h2 { font-size: 16pt; color: #2563eb; margin: 0 0 15px 0; border: none; padding: 0; }
          .description { text-align: justify; margin-bottom: 15px; line-height: 1.7; }
          .characteristics { font-size: 10pt; color: #475569; padding: 10px; background: white; border-radius: 4px; }
          .scores-grid { margin: 20px 0; }
          .score-item { display: flex; align-items: center; margin-bottom: 15px; page-break-inside: avoid; }
          .score-label { width: 150px; font-weight: bold; font-size: 10pt; }
          .score-bar-container { flex: 1; height: 24px; background: #e2e8f0; border-radius: 12px; overflow: hidden; margin: 0 15px; }
          .score-bar { height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb); border-radius: 12px; }
          .score-value { width: 60px; text-align: right; font-weight: bold; color: #1e40af; }
          .career-item { margin-bottom: 25px; padding: 20px; background: #f8fafc; border-left: 5px solid #3b82f6; border-radius: 4px; page-break-inside: avoid; }
          .career-item h3 { font-size: 14pt; color: #1e293b; margin: 0 0 12px 0; }
          .match-score { font-weight: bold; color: #16a34a; margin: 8px 0; font-size: 12pt; }
          .riasec-code { font-size: 10pt; color: #2563eb; font-weight: bold; margin: 5px 0; }
          .career-description { text-align: justify; margin: 12px 0; font-size: 10pt; line-height: 1.6; }
          .job-detail { font-size: 9pt; color: #475569; margin: 4px 0; }
          .matching-types { font-size: 9pt; color: #64748b; font-style: italic; margin: 8px 0 0 0; padding-top: 8px; border-top: 1px solid #e2e8f0; }
          .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; font-size: 9pt; color: #64748b; }
          .page-break { page-break-after: always; }
        </style>


      </head>
      <body>
        <div class="header">
          <h1>Raport Testare Cariera RIASEC</h1>
          <div class="subtitle">Analiza personalitatii si recomandari de cariera</div>
        </div>
        <div class="user-info">
          <p><strong>Nume:</strong> ${profile.name}</p>
          ${profile.email ? `<p><strong>Email:</strong> ${profile.email}</p>` : ''}
          <p><strong>Data testarii:</strong> ${profile.testDate ? new Date(profile.testDate).toLocaleDateString('ro-RO') : new Date().toLocaleDateString('ro-RO')}</p>
          <p><strong>Cod RIASEC:</strong> ${profile.topTypes.join('')}</p>
        </div>
        <div class="section">
          <h2>Scorurile tale RIASEC</h2>
          <div class="scores-grid">${scoresHTML}</div>
        </div>
        <div class="section">
          <h2>Profilul tau de personalitate</h2>
          ${personalityTypesHTML}
        </div>
        <div class="page-break"></div>
        <div class="section">
          <h2>Carierele recomandate pentru tine</h2>
          <p style="margin-bottom: 20px; font-style: italic; color: #64748b;">
            Pe baza codului tau RIASEC (${profile.topTypes.join('')}), am identificat ${matches.length} cariere potrivite pentru profilul tau.
          </p>
          ${careersHTML}
        </div>
        <div class="footer">
          <p>Raport generat automat - ${new Date().toLocaleDateString('ro-RO')}</p>
          <p>© ${new Date().getFullYear()} NextWaveCareers</p>
        </div>
      </body>
      </html>
    `;
  }

  static downloadPDF(blob: Blob, filename: string = 'raport-cariera.pdf'): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}