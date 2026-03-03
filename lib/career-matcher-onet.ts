/**
 * NextWave Careers - Algoritm de Matching O*NET
 * 
 * Acest modul implementează algoritmul de matching între profilul RIASEC
 * al utilizatorului și meseriile disponibile, folosind metodologia O*NET:
 * 
 * 1. Normalizare z-score pentru ambele profile
 * 2. Corelație Pearson pentru calculul similarității
 * 3. Clasificare pe 4 nivele: best, good, okay, none
 * 4. Utilizarea tuturor celor 6 dimensiuni RIASEC
 * 
 * @author NextWave Team
 * @version 2.0.0
 */

import {
  RIASECScores,
  RIASECProfile,
  Job,
  MatchedJob,
  MatchResults,
  MatchLevel,
  MATCH_THRESHOLDS,
  MATCH_LEVEL_DESCRIPTIONS,
  scoresToArray,
  validateRIASECProfile
} from './types';

import {
  normalizeScores,
  createNormalizedProfile,
  correlationToPercent,
  calculateMean
} from './riasec-utils';

// ============================================================================
// FUNCȚII DE CALCUL STATISTIC
// ============================================================================

/**
 * Calculează corelația Pearson între două vectori de aceeași lungime
 * 
 * Formula:
 * r = Σ[(xi - x̄)(yi - ȳ)] / √[Σ(xi - x̄)² × Σ(yi - ȳ)²]
 * 
 * Pentru vectori deja normalizați (z-scores cu medie 0 și σ=1):
 * r = Σ(xi × yi) / n
 * 
 * Intervalul rezultatului: [-1, 1]
 * - 1.0 = corelație perfectă pozitivă (profile identice)
 * - 0.0 = nicio corelație
 * - -1.0 = corelație perfectă negativă (profile opuse)
 * 
 * @param userProfile - Profilul utilizatorului (6 valori, preferabil normalizate)
 * @param jobProfile - Profilul meseriei (6 valori, preferabil normalizate)
 * @returns Coeficientul de corelație Pearson (-1 la 1)
 */
export function calculatePearsonCorrelation(
  userProfile: number[],
  jobProfile: number[]
): number {
  // Validare
  if (userProfile.length !== jobProfile.length) {
    throw new Error(
      `Profilele trebuie să aibă aceeași lungime. ` +
      `User: ${userProfile.length}, Job: ${jobProfile.length}`
    );
  }
  
  if (userProfile.length === 0) {
    throw new Error('Profilele nu pot fi goale');
  }
  
  const n = userProfile.length;
  
  // Calculăm mediile
  const meanUser = calculateMean(userProfile);
  const meanJob = calculateMean(jobProfile);
  
  // Calculăm componentele formulei
  let numerator = 0;     // Σ[(xi - x̄)(yi - ȳ)]
  let sumSqUser = 0;     // Σ(xi - x̄)²
  let sumSqJob = 0;      // Σ(yi - ȳ)²
  
  for (let i = 0; i < n; i++) {
    const devUser = userProfile[i] - meanUser;
    const devJob = jobProfile[i] - meanJob;
    
    numerator += devUser * devJob;
    sumSqUser += devUser * devUser;
    sumSqJob += devJob * devJob;
  }
  
  // Calculăm numitorul
  const denominator = Math.sqrt(sumSqUser * sumSqJob);
  
  // Cazul special: unul sau ambele profile au varianță 0
  // (toate valorile sunt identice)
  if (denominator === 0) {
    console.warn('Atenție: Unul sau ambele profile au varianță 0. Corelația este nedefinită.');
    // Dacă ambele profile sunt constante și egale, considerăm corelație perfectă
    if (sumSqUser === 0 && sumSqJob === 0 && meanUser === meanJob) {
      return 1;
    }
    // Altfel, returnăm 0 (nicio corelație)
    return 0;
  }
  
  const correlation = numerator / denominator;
  
  // Asigurăm că rezultatul e în intervalul valid (pentru erori de floating-point)
  return Math.max(-1, Math.min(1, correlation));
}

/**
 * Versiune optimizată pentru profile deja normalizate (z-scores)
 * 
 * Când ambele profile sunt normalizate (medie 0, σ 1),
 * corelația Pearson se simplifică la:
 * r = (1/n) × Σ(xi × yi)
 * 
 * @param normalizedUser - Profil user normalizat
 * @param normalizedJob - Profil job normalizat
 * @returns Corelația Pearson
 */
export function calculatePearsonForNormalized(
  normalizedUser: number[],
  normalizedJob: number[]
): number {
  if (normalizedUser.length !== normalizedJob.length) {
    throw new Error('Profilele normalizate trebuie să aibă aceeași lungime');
  }
  
  const n = normalizedUser.length;
  let sum = 0;
  
  for (let i = 0; i < n; i++) {
    sum += normalizedUser[i] * normalizedJob[i];
  }
  
  // Pentru z-scores, formula simplificată
  const correlation = sum / n;
  
  return Math.max(-1, Math.min(1, correlation));
}

// ============================================================================
// CLASIFICARE MATCH
// ============================================================================

/**
 * Clasifică nivelul de potrivire bazat pe corelația Pearson
 * 
 * Folosește pragurile standard O*NET:
 * - Best: r ≥ 0.729
 * - Good: 0.608 ≤ r < 0.729
 * - Okay: 0.426 ≤ r < 0.608
 * - None: r < 0.426
 * 
 * @param correlation - Corelația Pearson (-1 la 1)
 * @returns Nivelul de potrivire
 */
export function classifyMatch(correlation: number): MatchLevel {
  if (correlation >= MATCH_THRESHOLDS.best.min) {
    return 'best';
  } else if (correlation >= MATCH_THRESHOLDS.good.min) {
    return 'good';
  } else if (correlation >= MATCH_THRESHOLDS.okay.min) {
    return 'okay';
  } else {
    return 'none';
  }
}

// ============================================================================
// CLASA PRINCIPALĂ: ONetCareerMatcher
// ============================================================================

/**
 * Clasa principală pentru matching-ul carierelor folosind metodologia O*NET
 * 
 * Înlocuiește vechiul CareerMatcher cu o implementare bazată pe:
 * - Corelația Pearson (în loc de formula pozițională)
 * - Toate cele 6 dimensiuni RIASEC
 * - Normalizare z-score
 * - Praguri de clasificare validate științific
 * 
 * @example
 * const matcher = new ONetCareerMatcher(jobs);
 * const results = matcher.matchCareers({ R: 35, I: 28, A: 40, S: 15, E: 22, C: 10 });
 * console.log(results.matches[0]); // Cea mai bună potrivire
 */
export class ONetCareerMatcher {
  private jobs: Job[];
  private normalizedJobProfiles: Map<string, number[]>;
  
  /**
   * Inițializează matcher-ul cu lista de meserii
   * 
   * @param jobs - Lista de meserii cu profile RIASEC de 6 scoruri
   */
  constructor(jobs: Job[]) {
    this.jobs = jobs;
    this.normalizedJobProfiles = new Map();
    
    // Pre-calculăm profilurile normalizate pentru toate meseriile
    this.precomputeNormalizedProfiles();
  }
  
  /**
   * Pre-calculează profilurile normalizate pentru eficiență
   */
  private precomputeNormalizedProfiles(): void {
    for (const job of this.jobs) {
      if (!validateRIASECProfile(job.riasec_profile)) {
        console.warn(`Profil RIASEC invalid pentru meseria: ${job.name}`);
        continue;
      }
      
      const normalized = normalizeScores(job.riasec_profile);
      this.normalizedJobProfiles.set(job.id, normalized);
    }
  }
  
  /**
   * Actualizează lista de meserii
   * 
   * @param jobs - Noua listă de meserii
   */
  public updateJobs(jobs: Job[]): void {
    this.jobs = jobs;
    this.normalizedJobProfiles.clear();
    this.precomputeNormalizedProfiles();
  }
  
  /**
   * Adaugă o meserie nouă
   * 
   * @param job - Meseria de adăugat
   */
  public addJob(job: Job): void {
    if (!validateRIASECProfile(job.riasec_profile)) {
      throw new Error(`Profil RIASEC invalid pentru meseria: ${job.name}`);
    }
    
    this.jobs.push(job);
    const normalized = normalizeScores(job.riasec_profile);
    this.normalizedJobProfiles.set(job.id, normalized);
  }
  
  /**
   * Funcția principală de matching
   * 
   * Calculează potrivirea între profilul utilizatorului și toate meseriile,
   * returnând rezultatele sortate descrescător după corelație.
   * 
   * @param userScores - Scorurile RIASEC ale utilizatorului (brute sau obiect)
   * @param options - Opțiuni de filtrare și sortare
   * @returns Rezultatele complete ale matching-ului
   */
  public matchCareers(
    userScores: RIASECScores | number[],
    options: MatchOptions = {}
  ): MatchResults {
    const {
      minMatchLevel = 'none',
      limit,
      categories
    } = options;
    
    // Creăm profilul normalizat al utilizatorului
    const userProfile = createNormalizedProfile(userScores);
    const normalizedUser = userProfile.values;
    
    // Calculăm match-urile pentru toate meseriile
    const matches: MatchedJob[] = [];
    
    for (const job of this.jobs) {
      // Filtrare după categorie dacă e specificată
      if (categories && !categories.includes(job.category)) {
        continue;
      }
      
      // Obținem profilul normalizat al meseriei
      const normalizedJob = this.normalizedJobProfiles.get(job.id);
      if (!normalizedJob) {
        console.warn(`Lipsește profilul normalizat pentru: ${job.name}`);
        continue;
      }
      
      // Calculăm corelația
      const correlation = calculatePearsonCorrelation(normalizedUser, normalizedJob);
      const matchLevel = classifyMatch(correlation);
      
      // Filtrare după nivel minim de match
      if (!isMatchLevelSufficient(matchLevel, minMatchLevel)) {
        continue;
      }
      
      matches.push({
        job,
        correlation,
        percentScore: correlationToPercent(correlation),
        matchLevel,
        matchDescription: MATCH_LEVEL_DESCRIPTIONS[matchLevel]
      });
    }
    
    // Sortăm descrescător după corelație
    matches.sort((a, b) => b.correlation - a.correlation);
    
    // Aplicăm limita dacă e specificată
    const limitedMatches = limit ? matches.slice(0, limit) : matches;
    
    // Calculăm statisticile
    const statistics = {
      best: matches.filter(m => m.matchLevel === 'best').length,
      good: matches.filter(m => m.matchLevel === 'good').length,
      okay: matches.filter(m => m.matchLevel === 'okay').length,
      none: matches.filter(m => m.matchLevel === 'none').length
    };
    
    return {
      matches: limitedMatches,
      userProfile,
      totalJobsAnalyzed: this.jobs.length,
      timestamp: new Date(),
      statistics
    };
  }
  
  /**
   * Găsește cele mai bune N potriviri
   * 
   * @param userScores - Scorurile utilizatorului
   * @param topN - Numărul de rezultate dorite (default: 10)
   * @returns Lista de top potriviri
   */
  public getTopMatches(
    userScores: RIASECScores | number[],
    topN: number = 10
  ): MatchedJob[] {
    const results = this.matchCareers(userScores, { limit: topN });
    return results.matches;
  }
  
  /**
   * Găsește meseriile cu un anumit nivel de potrivire
   * 
   * @param userScores - Scorurile utilizatorului
   * @param level - Nivelul de potrivire dorit
   * @returns Lista de meserii cu acel nivel
   */
  public getMatchesByLevel(
    userScores: RIASECScores | number[],
    level: MatchLevel
  ): MatchedJob[] {
    const results = this.matchCareers(userScores);
    return results.matches.filter(m => m.matchLevel === level);
  }
  
  /**
   * Calculează matching-ul pentru o singură meserie
   * 
   * @param userScores - Scorurile utilizatorului
   * @param jobId - ID-ul meseriei
   * @returns Rezultatul matching-ului sau null dacă meseria nu există
   */
  public matchSingleJob(
    userScores: RIASECScores | number[],
    jobId: string
  ): MatchedJob | null {
    const job = this.jobs.find(j => j.id === jobId);
    if (!job) {
      return null;
    }
    
    const normalizedJob = this.normalizedJobProfiles.get(job.id);
    if (!normalizedJob) {
      return null;
    }
    
    const userProfile = createNormalizedProfile(userScores);
    const correlation = calculatePearsonCorrelation(userProfile.values, normalizedJob);
    const matchLevel = classifyMatch(correlation);
    
    return {
      job,
      correlation,
      percentScore: correlationToPercent(correlation),
      matchLevel,
      matchDescription: MATCH_LEVEL_DESCRIPTIONS[matchLevel]
    };
  }
  
  /**
   * Returnează numărul total de meserii
   */
  public getJobCount(): number {
    return this.jobs.length;
  }
  
  /**
   * Returnează toate meseriile
   */
  public getAllJobs(): Job[] {
    return [...this.jobs];
  }
}

// ============================================================================
// TIPURI AUXILIARE
// ============================================================================

/**
 * Opțiuni pentru funcția de matching
 */
export interface MatchOptions {
  /** Nivelul minim de potrivire pentru a include rezultatul */
  minMatchLevel?: MatchLevel;
  /** Limita de rezultate returnate */
  limit?: number;
  /** Filtrează după categorii de meserii */
  categories?: string[];
}

// ============================================================================
// FUNCȚII AUXILIARE
// ============================================================================

/**
 * Verifică dacă un nivel de match este suficient
 * 
 * @param actual - Nivelul actual
 * @param minimum - Nivelul minim acceptat
 * @returns true dacă nivelul actual >= nivelul minim
 */
function isMatchLevelSufficient(actual: MatchLevel, minimum: MatchLevel): boolean {
  const levels: MatchLevel[] = ['none', 'okay', 'good', 'best'];
  return levels.indexOf(actual) >= levels.indexOf(minimum);
}

/**
 * Funcție factory pentru crearea rapidă a unui matcher
 * 
 * @param jobs - Lista de meserii
 * @returns Instanță ONetCareerMatcher
 */
export function createMatcher(jobs: Job[]): ONetCareerMatcher {
  return new ONetCareerMatcher(jobs);
}

// ============================================================================
// EXPORT IMPLICIT
// ============================================================================

export default ONetCareerMatcher;
