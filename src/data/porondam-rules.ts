import { NAKSHATRAS, RASHIS, type NakshatraInfo, type RashiInfo } from './astronomy-constants';

export interface PorondamResult {
  id: string;
  nameSi: string;
  nameEn: string;
  maxScore: number;
  obtainedScore: number;
  status: 'subha' | 'madhyama' | 'asubha';
  statusSi: string;
  statusEn: string;
  groomValueSi: string;
  groomValueEn: string;
  brideValueSi: string;
  brideValueEn: string;
  explanationSi: string;
  explanationEn: string;
  isDosha?: boolean;
}

export interface CompatibilitySummary {
  passedCount: number; // e.g. 16 out of 20
  totalCount: number; // 20
  obtainedPoints: number;
  maxPoints: number;
  percentage: number;
  verdictSi: string;
  verdictEn: string;
  verdictType: 'excellent' | 'good' | 'moderate' | 'incompatible';
  criticalNotesSi: string[];
  criticalNotesEn: string[];
  porondams: PorondamResult[];
}

// 7 Planetary friendship matrix
// Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn
// 1 = friend, 0 = neutral, -1 = enemy
export const PLANETARY_FRIENDSHIP: Record<string, Record<string, number>> = {
  Sun: { Sun: 1, Moon: 1, Mars: 1, Mercury: 0, Jupiter: 1, Venus: -1, Saturn: -1 },
  Moon: { Sun: 1, Moon: 1, Mars: 0, Mercury: 1, Jupiter: 0, Venus: 0, Saturn: 0 },
  Mars: { Sun: 1, Moon: 1, Mars: 1, Mercury: -1, Jupiter: 1, Venus: 0, Saturn: 0 },
  Mercury: { Sun: 1, Moon: -1, Mars: 0, Mercury: 1, Jupiter: 0, Venus: 1, Saturn: 0 },
  Jupiter: { Sun: 1, Moon: 1, Mars: 1, Mercury: -1, Jupiter: 1, Venus: -1, Saturn: 0 },
  Venus: { Sun: -1, Moon: -1, Mars: 0, Mercury: 1, Jupiter: 0, Venus: 1, Saturn: 1 },
  Saturn: { Sun: -1, Moon: -1, Mars: -1, Mercury: 1, Jupiter: 0, Venus: 1, Saturn: 1 },
};

// Yoni Enemy Pairs (Natural Enemies)
export const YONI_ENEMIES: [string, string][] = [
  ['Horse', 'Buffalo'],
  ['Elephant', 'Lion'],
  ['Goat', 'Monkey'],
  ['Serpent', 'Mongoose'],
  ['Dog', 'Deer'],
  ['Cat', 'Rat'],
  ['Tiger', 'Cow'],
];

// Vashya compatibility
export const VASHYA_MATRIX: Record<number, number[]> = {
  0: [4, 7],     // Aries -> Leo, Scorpio
  1: [3, 6],     // Taurus -> Cancer, Libra
  2: [5],        // Gemini -> Virgo
  3: [7, 8],     // Cancer -> Scorpio, Sagittarius
  4: [6],        // Leo -> Libra
  5: [11, 2],    // Virgo -> Pisces, Gemini
  6: [9, 5],     // Libra -> Capricorn, Virgo
  7: [3],        // Scorpio -> Cancer
  8: [11],       // Sagittarius -> Pisces
  9: [0, 10],    // Capricorn -> Aries, Aquarius
  10: [0],       // Aquarius -> Aries
  11: [9],       // Pisces -> Capricorn
};
