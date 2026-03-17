# MODIFICATIONS.md — Corectarea codurilor RIASEC pentru joburile viitorului

## Rezumat

Această documentație descrie modificările aduse proiectului **Next Wave Career** pentru a corecta codurile Holland/RIASEC ale joburilor viitorului (`jobs_future`), aliniindu-le la metodologia O*NET folosită deja pentru joburile tradiționale (`jobs_traditional`).

---

## Structura bazei de date

Aplicația folosește trei tabele de joburi:

| Tabel | Nr. joburi | Sursa codurilor RIASEC | Rol |
|---|---|---|---|
| `jobs_traditional` | ~930 | O*NET — coduri corecte | Matching principal |
| `jobs_future` | 14 | Atribuite manual — **au necesitat corecție** | Matching pentru cariere emergente |
| `jobs_onet` | ~923 | O*NET (profil complet 6D) | Folosit doar în `pdf-generator.ts` |

---

## Problema identificată

Joburile tradiționale au coduri RIASEC corecte, preluate din baza de date O*NET. Joburile viitorului aveau coduri atribuite manual, care **nu respectau distribuția reală a intereselor** conform O*NET. De exemplu:

- **Cybersecurity Specialist** avea codul `IEC`, dar conform O*NET (Information Security Analysts 15-1212.00), profilul corect este **CIR** (Conventional dominant, nu Investigative)
- **Data Entry Clerk** avea `CSI`, dar conform O*NET (43-9021.00) profilul corect este **CRE** (Conventional 100%, Realistic 34%)

---

## Modificări efectuate

### 1. Fișier: `scripts/04-seed-future-jobs.sql`

Corectarea codurilor RIASEC pentru 11 din 14 joburi viitorului (3 erau deja corecte):

| Job | Cod vechi | Cod nou | Referință O*NET |
|---|---|---|---|
| AI/ML Engineer | IRC | **ICR** | Software Developers 15-1252.00 (I=84%, C=77%, R=44%) |
| Cybersecurity Specialist | IEC | **CIR** | Info Security Analysts 15-1212.00 (C, I primar) |
| UX/UI Designer | AIS | **IAC** | Web/Digital Interface Designers 15-1255.00 (I=65%, A=58%, C=57%) |
| Data Analyst | ICE | **ICR** | Data Scientists 15-2051.00 (I, C primar) |
| Digital Marketing Specialist | EAS | **ECS** | Marketing Specialists (E, C primar) |
| Project Manager | ESC | **ECI** | Project Management Specialists 13-1082.00 (E, C primar) |
| Content Creator | AES | AES | ✅ Corect — fără modificare |
| Healthcare Data Analyst | ISC | **ICS** | Pattern IC (analiză date) + S (sănătate) |
| Customer Service Rep | SEC | SEC | ✅ Corect — fără modificare |
| Data Entry Clerk | CSI | **CRE** | Data Entry Keyers 43-9021.00 (C=100%, R=34%) |
| Bookkeeper | CIS | **CES** | Bookkeeping Clerks 43-3031.00 (C, E primar) |
| Sustainability Consultant | IES | **IEC** | Environmental Scientists/Consultants (I, E + C) |
| Robotics Engineer | RIE | RIE | ✅ Corect — fără modificare |
| Virtual Reality Developer | ARI | **IAR** | Blend Web Designers + Software Devs (I dominant) |

### 2. Fișier: `components/results-display.tsx`

**Problema:** Componenta definea o funcție locală `riasecCodeToProfile()` cu scoruri `[3, 2, 1]` și valoare implicită `0`, în loc să folosească funcția din bibliotecă (`lib/riasec-utils.ts`) care folosește scoruri `[7, 5, 3]` cu valoare implicită `1`.

**Notă tehnică:** Cele două variante produc rezultate **identice** după normalizarea z-score (folosită de `ONetCareerMatcher`), deoarece raporturile relative între scoruri se păstrează. Totuși, duplicarea codului este o practică slabă.

**Modificare:**
- S-a adăugat importul: `import { riasecCodeToProfile } from "@/lib/riasec-utils"`
- S-a eliminat definiția locală a funcției `riasecCodeToProfile()` (liniile 120-137)
- Acum toată aplicația folosește aceeași funcție din `lib/riasec-utils.ts`

---

## Cum funcționează matching-ul

1. **Scorurile utilizatorului** (din test RIASEC) sunt un obiect `{ R, I, A, S, E, C }` cu valori numerice
2. **Profilul jobului** se generează din codul de 3 litere via `riasecCodeToProfile()` → array de 6 valori
3. **`ONetCareerMatcher`** calculează similaritatea folosind corelația Pearson cu normalizare z-score
4. Joburile sunt sortate după scorul de compatibilitate și afișate utilizatorului

---

## Fișiere modificate

```
scripts/04-seed-future-jobs.sql    — Coduri RIASEC corectate (11 joburi)
components/results-display.tsx     — Import centralizat riasecCodeToProfile
MODIFICATIONS.md                   — Această documentație
```

---

## Metodologie de validare

Codurile au fost verificate prin:
1. Consultarea profilurilor O*NET Interest pentru ocupațiile cele mai apropiate
2. Verificarea procentajelor pe fiecare dimensiune RIASEC
3. Selectarea top 3 dimensiuni ordonate descrescător după scor
4. Cross-referențierea cu ocupații similare pentru consistență

Surse: [O*NET OnLine](https://www.onetonline.org/) — secțiunea Interests pentru fiecare ocupație.
