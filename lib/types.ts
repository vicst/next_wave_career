/**
 * NextWave Careers - Tipuri TypeScript pentru Algoritm O*NET
 * 
 * Acest fișier conține definițiile de tipuri pentru sistemul de matching
 * bazat pe metodologia O*NET cu corelație Pearson.
 * 
 * @author NextWave Team
 * @version 2.0.0
 */

// ============================================================================
// CONSTANTE RIASEC
// ============================================================================

/**
 * Dimensiunile RIASEC în ordinea standard O*NET
 */
export const RIASEC_DIMENSIONS = ['R', 'I', 'A', 'S', 'E', 'C'] as const;
export type RIASECDimension = typeof RIASEC_DIMENSIONS[number];

/**
 * Numărul total de dimensiuni RIASEC
 */
export const RIASEC_COUNT = 6;

/**
 * Denumirile complete ale dimensiunilor RIASEC în română
 */
export const RIASEC_NAMES: Record<RIASECDimension, string> = {
  R: 'Realist',
  I: 'Investigativ',
  A: 'Artistic',
  S: 'Social',
  E: 'Întreprinzător',
  C: 'Convențional'
};

/**
 * Descrieri ale dimensiunilor RIASEC
 */
export const RIASEC_DESCRIPTIONS: Record<RIASECDimension, string> = {
  R: 'Preferă activități practice, concrete, cu obiecte, mașini, unelte',
  I: 'Preferă activități de investigare, analiză, gândire abstractă',
  A: 'Preferă activități creative, artistice, expresive',
  S: 'Preferă activități care implică ajutorarea și educarea altora',
  E: 'Preferă activități de conducere, persuasiune, afaceri',
  C: 'Preferă activități ordonate, structurate, cu reguli clare'
};

// ============================================================================
// INTERFEȚE PENTRU SCORURI RIASEC
// ============================================================================

/**
 * Scoruri RIASEC brute (0-40 pentru chestionar cu 10 întrebări, scală 1-5)
 * Reprezintă răspunsurile directe ale utilizatorului
 */
export interface RIASECScores {
  R: number;  // Realist
  I: number;  // Investigativ
  A: number;  // Artistic
  S: number;  // Social
  E: number;  // Întreprinzător
  C: number;  // Convențional
}

/**
 * Profil RIASEC normalizat (z-scores)
 * Valorile sunt centrate pe medie 0 și deviație standard 1
 */
export interface RIASECProfile {
  /** Valorile normalizate ca array de 6 elemente [R, I, A, S, E, C] */
  values: number[];
  /** Scorurile originale înainte de normalizare */
  originalScores: RIASECScores;
  /** Media folosită pentru normalizare */
  mean: number;
  /** Deviația standard folosită pentru normalizare */
  stdDev: number;
}

/**
 * Conversie RIASECScores la array de 6 elemente în ordinea standard
 */
export function scoresToArray(scores: RIASECScores): number[] {
  return [scores.R, scores.I, scores.A, scores.S, scores.E, scores.C];
}

/**
 * Conversie array de 6 elemente la RIASECScores
 */
export function arrayToScores(values: number[]): RIASECScores {
  if (values.length !== 6) {
    throw new Error(`Array-ul trebuie să aibă exact 6 elemente, dar are ${values.length}`);
  }
  return {
    R: values[0],
    I: values[1],
    A: values[2],
    S: values[3],
    E: values[4],
    C: values[5]
  };
}

// ============================================================================
// INTERFEȚE PENTRU MESERII (JOBS)
// ============================================================================

/**
 * Categorie de meserie
 */
export type JobCategory = 'traditional' | 'future' | 'onet';

/**
 * Meserie cu profil RIASEC complet (format O*NET)
 */
export interface Job {
  /** Identificator unic */
  id: string;
  /** Numele meseriei în română */
  name: string;
  /** Descrierea meseriei */
  description: string;
  /** Profilul RIASEC ca array de 6 scoruri [R, I, A, S, E, C] */
  riasec_profile: number[];
  /** Categoria meseriei */
  category: JobCategory;
  /** Codul O*NET original (dacă există) */
  onet_code?: string;
  /** Numele original în engleză (pentru meserii O*NET) */
  name_en?: string;
  /** Cerințe educaționale */
  education?: string;
  /** Salariu mediu estimat */
  salary_range?: string;
  /** Trend de creștere pe piața muncii */
  growth_outlook?: 'high' | 'medium' | 'low' | 'declining';
  /** Tag-uri pentru căutare */
  tags?: string[];
}

/**
 * Format vechi pentru meserii (cod RIASEC de 3 litere)
 * Folosit pentru compatibilitate cu datele existente
 */
export interface LegacyJob {
  id: string;
  name: string;
  description: string;
  riasec_code: string;  // Ex: "RIE", "SAE"
  category?: string;
}

// ============================================================================
// INTERFEȚE PENTRU MATCHING
// ============================================================================

/**
 * Niveluri de potrivire conform metodologiei O*NET
 */
export type MatchLevel = 'best' | 'good' | 'okay' | 'none';

/**
 * Praguri de corelație pentru clasificarea match-urilor (O*NET standard)
 */
export const MATCH_THRESHOLDS: Record<MatchLevel, { min: number; max: number }> = {
  best: { min: 0.729, max: 1.0 },      // r ≥ 0.729
  good: { min: 0.608, max: 0.729 },    // 0.608 ≤ r < 0.729
  okay: { min: 0.426, max: 0.608 },    // 0.426 ≤ r < 0.608
  none: { min: -1.0, max: 0.426 }      // r < 0.426
};

/**
 * Descrieri ale nivelurilor de potrivire
 */
export const MATCH_LEVEL_DESCRIPTIONS: Record<MatchLevel, string> = {
  best: 'Potrivire excelentă - Interesele tale se aliniază foarte bine cu această meserie',
  good: 'Potrivire bună - Ai multe interese comune cu această meserie',
  okay: 'Potrivire moderată - Unele interese se potrivesc cu această meserie',
  none: 'Potrivire scăzută - Această meserie nu se aliniază cu interesele tale principale'
};

/**
 * Rezultat de matching pentru o meserie
 */
export interface MatchedJob {
  /** Meseria potrivită */
  job: Job;
  /** Corelația Pearson (-1 la 1) */
  correlation: number;
  /** Scor procentual (0-100%) pentru afișare user-friendly */
  percentScore: number;
  /** Nivelul de potrivire */
  matchLevel: MatchLevel;
  /** Descrierea nivelului de potrivire */
  matchDescription: string;
}

/**
 * Rezultatele complete ale procesului de matching
 */
export interface MatchResults {
  /** Lista de meserii sortate după potrivire (descrescător) */
  matches: MatchedJob[];
  /** Profilul RIASEC al utilizatorului (normalizat) */
  userProfile: RIASECProfile;
  /** Numărul total de meserii analizate */
  totalJobsAnalyzed: number;
  /** Timestamp-ul analizei */
  timestamp: Date;
  /** Statistici pe nivele de potrivire */
  statistics: {
    best: number;
    good: number;
    okay: number;
    none: number;
  };
}

// ============================================================================
// TIPURI PENTRU SUPABASE
// ============================================================================

/**
 * Schema pentru tabelul jobs în Supabase (nou format O*NET)
 */
export interface SupabaseJob {
  id: string;
  name: string;
  description: string;
  riasec_r: number;
  riasec_i: number;
  riasec_a: number;
  riasec_s: number;
  riasec_e: number;
  riasec_c: number;
  category: JobCategory;
  onet_code: string | null;
  name_en: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Conversie din format Supabase la Job
 */
export function supabaseToJob(row: SupabaseJob): Job {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    riasec_profile: [
      row.riasec_r,
      row.riasec_i,
      row.riasec_a,
      row.riasec_s,
      row.riasec_e,
      row.riasec_c
    ],
    category: row.category,
    onet_code: row.onet_code ?? undefined,
    name_en: row.name_en ?? undefined
  };
}

/**
 * Conversie din Job la format Supabase (pentru insert/update)
 */
export function jobToSupabase(job: Job): Omit<SupabaseJob, 'created_at' | 'updated_at'> {
  return {
    id: job.id,
    name: job.name,
    description: job.description,
    riasec_r: job.riasec_profile[0],
    riasec_i: job.riasec_profile[1],
    riasec_a: job.riasec_profile[2],
    riasec_s: job.riasec_profile[3],
    riasec_e: job.riasec_profile[4],
    riasec_c: job.riasec_profile[5],
    category: job.category,
    onet_code: job.onet_code ?? null,
    name_en: job.name_en ?? null
  };
}

// ============================================================================
// VALIDARE
// ============================================================================

/**
 * Validează că un profil RIASEC are formatul corect
 */
export function validateRIASECProfile(profile: number[]): boolean {
  if (!Array.isArray(profile) || profile.length !== 6) {
    return false;
  }
  return profile.every(v => typeof v === 'number' && !isNaN(v));
}

/**
 * Validează scorurile RIASEC (0-40 pentru chestionar standard)
 */
export function validateRIASECScores(scores: RIASECScores, maxScore: number = 40): boolean {
  const values = scoresToArray(scores);
  return values.every(v => typeof v === 'number' && v >= 0 && v <= maxScore);
}
