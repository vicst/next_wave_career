/**
 * NextWave Careers - Utilități pentru Calcule RIASEC
 * 
 * Acest modul conține funcții pentru:
 * - Normalizare z-score a scorurilor RIASEC
 * - Calcule statistice (medie, deviație standard)
 * - Conversii între formate de profil
 * 
 * Metodologia urmează standardul O*NET pentru normalizarea profilurilor
 * de interese ocupaționale.
 * 
 * @author NextWave Team
 * @version 2.0.0
 */

import {
  RIASECScores,
  RIASECProfile,
  RIASEC_COUNT,
  scoresToArray
} from './types';

// ============================================================================
// FUNCȚII STATISTICE DE BAZĂ
// ============================================================================

/**
 * Calculează media aritmetică a unui array de numere
 * 
 * @param scores - Array de scoruri numerice
 * @returns Media aritmetică
 * @throws Error dacă array-ul este gol
 * 
 * @example
 * calculateMean([10, 20, 30, 40, 50, 60]) // => 35
 */
export function calculateMean(scores: number[]): number {
  if (scores.length === 0) {
    throw new Error('Nu se poate calcula media pentru un array gol');
  }
  
  const sum = scores.reduce((acc, val) => acc + val, 0);
  return sum / scores.length;
}

/**
 * Calculează deviația standard a unui array de numere
 * 
 * Folosește formula pentru deviația standard a populației (N),
 * nu a eșantionului (N-1), conform metodologiei O*NET.
 * 
 * @param scores - Array de scoruri numerice
 * @param mean - Media pre-calculată (opțional, se calculează dacă nu e furnizată)
 * @returns Deviația standard
 * @throws Error dacă array-ul este gol
 * 
 * @example
 * calculateStdDev([10, 20, 30, 40, 50, 60]) // => ~17.08
 */
export function calculateStdDev(scores: number[], mean?: number): number {
  if (scores.length === 0) {
    throw new Error('Nu se poate calcula deviația standard pentru un array gol');
  }
  
  const actualMean = mean ?? calculateMean(scores);
  
  // Calculăm suma pătratelor diferențelor față de medie
  const squaredDiffs = scores.map(val => Math.pow(val - actualMean, 2));
  const avgSquaredDiff = squaredDiffs.reduce((acc, val) => acc + val, 0) / scores.length;
  
  return Math.sqrt(avgSquaredDiff);
}

// ============================================================================
// NORMALIZARE Z-SCORE
// ============================================================================

/**
 * Normalizează un array de scoruri folosind z-score
 * 
 * Formula z-score: z = (x - μ) / σ
 * unde:
 * - x = scorul original
 * - μ = media tuturor scorurilor
 * - σ = deviația standard
 * 
 * Rezultatul sunt valori centrate pe 0, cu deviație standard 1.
 * Scoruri peste medie au z > 0, sub medie au z < 0.
 * 
 * NOTĂ: Dacă toate scorurile sunt identice (σ = 0), returnăm
 * un array de zerouri pentru a evita împărțirea la 0.
 * 
 * @param scores - Array de scoruri brute
 * @returns Array de z-scores
 * 
 * @example
 * normalizeScores([10, 20, 30, 40, 50, 60])
 * // => [-1.46, -0.88, -0.29, 0.29, 0.88, 1.46] (aproximativ)
 */
export function normalizeScores(scores: number[]): number[] {
  if (scores.length === 0) {
    return [];
  }
  
  const mean = calculateMean(scores);
  const stdDev = calculateStdDev(scores, mean);
  
  // Cazul special: toate scorurile sunt identice
  // În acest caz, z-score-urile ar fi 0/0 = NaN
  // Returnăm array de zerouri (nicio diferență între dimensiuni)
  if (stdDev === 0) {
    console.warn('Atenție: Toate scorurile sunt identice. Z-scores vor fi 0.');
    return scores.map(() => 0);
  }
  
  return scores.map(score => (score - mean) / stdDev);
}

/**
 * Normalizează scoruri RIASEC și returnează un profil complet
 * 
 * Această funcție primește scoruri brute (ex: 0-40 din chestionar)
 * și returnează un profil normalizat cu toate informațiile necesare.
 * 
 * @param scores - Scoruri RIASEC brute (obiect sau array)
 * @returns Profil RIASEC complet cu z-scores
 * 
 * @example
 * const profile = createNormalizedProfile({ R: 35, I: 28, A: 40, S: 15, E: 22, C: 10 });
 * console.log(profile.values); // z-scores normalizate
 */
export function createNormalizedProfile(scores: RIASECScores | number[]): RIASECProfile {
  // Convertim la array dacă e necesar
  const scoresArray = Array.isArray(scores) ? scores : scoresToArray(scores);
  
  if (scoresArray.length !== RIASEC_COUNT) {
    throw new Error(`Profilul RIASEC trebuie să aibă ${RIASEC_COUNT} dimensiuni, dar are ${scoresArray.length}`);
  }
  
  const mean = calculateMean(scoresArray);
  const stdDev = calculateStdDev(scoresArray, mean);
  const normalizedValues = normalizeScores(scoresArray);
  
  // Reconstruim scorurile originale ca obiect
  const originalScores: RIASECScores = Array.isArray(scores) 
    ? { R: scores[0], I: scores[1], A: scores[2], S: scores[3], E: scores[4], C: scores[5] }
    : scores;
  
  return {
    values: normalizedValues,
    originalScores,
    mean,
    stdDev
  };
}

// ============================================================================
// CONVERSII ȘI TRANSFORMĂRI
// ============================================================================

/**
 * Convertește un cod RIASEC de 3 litere într-un profil de 6 scoruri
 * 
 * Folosește o mapare simplificată bazată pe poziție:
 * - Litera pe poziția 1: scor 7 (dominant)
 * - Litera pe poziția 2: scor 5 (secundar)
 * - Litera pe poziția 3: scor 3 (terțiar)
 * - Restul literelor: scor 1 (minim)
 * 
 * Această metodă este o aproximare pentru meserii fără date O*NET complete.
 * 
 * @param code - Cod RIASEC de 3 litere (ex: "RIE", "SAC")
 * @returns Array de 6 scoruri în ordinea [R, I, A, S, E, C]
 * 
 * @example
 * riasecCodeToProfile("RIE") // => [7, 5, 1, 1, 3, 1]
 * riasecCodeToProfile("SAC") // => [1, 1, 5, 7, 1, 3]
 */
export function riasecCodeToProfile(code: string): number[] {
  // Validare cod
  const upperCode = code.toUpperCase().trim();
  if (!/^[RIASEC]{3}$/.test(upperCode)) {
    throw new Error(`Cod RIASEC invalid: "${code}". Trebuie să fie exact 3 litere din R, I, A, S, E, C.`);
  }
  
  // Scoruri implicite pentru fiecare poziție
  const POSITION_SCORES = [7, 5, 3]; // Dominant, Secundar, Terțiar
  const DEFAULT_SCORE = 1; // Scor minim pentru dimensiunile ne-menționate
  
  // Index pentru fiecare literă RIASEC
  const LETTER_INDEX: Record<string, number> = {
    'R': 0, 'I': 1, 'A': 2, 'S': 3, 'E': 4, 'C': 5
  };
  
  // Inițializăm profilul cu scoruri minime
  const profile = new Array(6).fill(DEFAULT_SCORE);
  
  // Aplicăm scorurile bazate pe poziție
  for (let i = 0; i < upperCode.length; i++) {
    const letter = upperCode[i];
    const index = LETTER_INDEX[letter];
    profile[index] = POSITION_SCORES[i];
  }
  
  return profile;
}

/**
 * Convertește un profil de 6 scoruri într-un cod RIASEC de 3 litere
 * 
 * Selectează cele 3 dimensiuni cu scorurile cele mai mari.
 * 
 * @param profile - Array de 6 scoruri [R, I, A, S, E, C]
 * @returns Cod RIASEC de 3 litere
 * 
 * @example
 * profileToRiasecCode([7, 5, 1, 1, 3, 1]) // => "RIE"
 */
export function profileToRiasecCode(profile: number[]): string {
  if (profile.length !== 6) {
    throw new Error(`Profilul trebuie să aibă 6 dimensiuni, dar are ${profile.length}`);
  }
  
  const LETTERS = ['R', 'I', 'A', 'S', 'E', 'C'];
  
  // Creăm perechi [litera, scor] și sortăm descrescător după scor
  const pairs = LETTERS.map((letter, index) => ({ letter, score: profile[index] }));
  pairs.sort((a, b) => b.score - a.score);
  
  // Luăm primele 3 litere
  return pairs.slice(0, 3).map(p => p.letter).join('');
}

// ============================================================================
// SCALARE ȘI TRANSFORMĂRI PENTRU AFIȘARE
// ============================================================================

/**
 * Convertește o corelație Pearson (-1 la 1) într-un scor procentual (0-100%)
 * 
 * Formula: percentScore = (correlation + 1) / 2 * 100
 * 
 * Mapare:
 * - Corelație 1.0 → 100%
 * - Corelație 0.5 → 75%
 * - Corelație 0.0 → 50%
 * - Corelație -0.5 → 25%
 * - Corelație -1.0 → 0%
 * 
 * @param correlation - Corelația Pearson (-1 la 1)
 * @returns Scor procentual (0-100)
 */
export function correlationToPercent(correlation: number): number {
  // Validare și limitare la interval valid
  const clampedCorrelation = Math.max(-1, Math.min(1, correlation));
  return ((clampedCorrelation + 1) / 2) * 100;
}

/**
 * Convertește un scor procentual (0-100%) înapoi la corelație (-1 la 1)
 * 
 * @param percent - Scor procentual (0-100)
 * @returns Corelația Pearson (-1 la 1)
 */
export function percentToCorrelation(percent: number): number {
  const clampedPercent = Math.max(0, Math.min(100, percent));
  return (clampedPercent / 100) * 2 - 1;
}

/**
 * Formatează un scor pentru afișare (rotunjit la 1 zecimală)
 * 
 * @param score - Scorul de formatat
 * @param decimals - Numărul de zecimale (default: 1)
 * @returns String formatat
 */
export function formatScore(score: number, decimals: number = 1): string {
  return score.toFixed(decimals);
}

/**
 * Calculează distanța euclidiană între două profile RIASEC
 * 
 * Alternativă la corelația Pearson pentru comparații.
 * Valori mai mici = mai similare.
 * 
 * @param profile1 - Primul profil (6 valori)
 * @param profile2 - Al doilea profil (6 valori)
 * @returns Distanța euclidiană
 */
export function euclideanDistance(profile1: number[], profile2: number[]): number {
  if (profile1.length !== 6 || profile2.length !== 6) {
    throw new Error('Ambele profile trebuie să aibă 6 dimensiuni');
  }
  
  let sumSquaredDiffs = 0;
  for (let i = 0; i < 6; i++) {
    sumSquaredDiffs += Math.pow(profile1[i] - profile2[i], 2);
  }
  
  return Math.sqrt(sumSquaredDiffs);
}

// ============================================================================
// EXPORT IMPLICIT
// ============================================================================

export default {
  calculateMean,
  calculateStdDev,
  normalizeScores,
  createNormalizedProfile,
  riasecCodeToProfile,
  profileToRiasecCode,
  correlationToPercent,
  percentToCorrelation,
  formatScore,
  euclideanDistance
};
