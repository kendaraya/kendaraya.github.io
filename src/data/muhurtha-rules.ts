export interface HoraInfo {
  planetKey: 'sun' | 'venus' | 'mercury' | 'moon' | 'saturn' | 'jupiter' | 'mars';
  nameSi: string;
  nameEn: string;
  lordSi: string;
  lordEn: string;
  rating: 'excellent' | 'good' | 'neutral' | 'inauspicious';
  ratingSi: string;
  ratingEn: string;
  color: string;
  suitableForSi: string[];
  suitableForEn: string[];
  avoidForSi: string[];
  avoidForEn: string[];
}

export const HORA_DEFINITIONS: Record<string, HoraInfo> = {
  jupiter: {
    planetKey: 'jupiter',
    nameSi: 'ගුරු හෝරාව',
    nameEn: 'Jupiter Hora',
    lordSi: 'ගුරු (බ්‍රහස්පති)',
    lordEn: 'Jupiter',
    rating: 'excellent',
    ratingSi: 'ඉතා සුබයි (ප්‍රශස්තයි)',
    ratingEn: 'Highly Auspicious (Optimal)',
    color: '#d97706',
    suitableForSi: [
      'නව රැකියා හා ව්‍යාපාර ආරම්භය',
      'මුදල් ආයෝජන සහ බැංකු ගනුදෙනු',
      'අධ්‍යාපනය හා නව පාඨමාලා ඇරඹීම',
      'විවාහ හා මංගල සාකච්ඡා',
      'ගිවිසුම් අත්සන් කිරීම',
    ],
    suitableForEn: [
      'Starting new jobs & business ventures',
      'Financial investments & banking',
      'Starting higher education & studies',
      'Marriage & engagement proposals',
      'Signing important contracts',
    ],
    avoidForSi: ['නඩුහබ සහ සටන් ආරම්භ කිරීම'],
    avoidForEn: ['Litigation, disputes, and confrontational acts'],
  },
  mercury: {
    planetKey: 'mercury',
    nameSi: 'බුධ හෝරාව',
    nameEn: 'Mercury Hora',
    lordSi: 'බුධ',
    lordEn: 'Mercury',
    rating: 'excellent',
    ratingSi: 'ඉතා සුබයි (බුද්ධිමත් කාර්යයන්ට)',
    ratingEn: 'Highly Auspicious (Intellect & Trade)',
    color: '#16a34a',
    suitableForSi: [
      'වෙළඳ හා වාණිජ කටයුතු ඇරඹීම',
      'ලේඛන කටයුතු, ගිවිසුම් හා සාකච්ඡා',
      'අකුරු කියවීම සහ විභාග ජයග්‍රහණ',
      'තාක්ෂණික හා සන්නිවේදන වැඩ',
      'නව මිතුරන් හමුවීම',
    ],
    suitableForEn: [
      'Trade, commerce, and sales launch',
      'Documentation, writing, and agreements',
      'Starting school, reading, and exams',
      'Software, tech, and media work',
      'Networking and key negotiations',
    ],
    avoidForSi: ['හදිසි තීරණ සහ මුරණ්ඩු ක්‍රියා'],
    avoidForEn: ['Rash, impulsive emotional decisions'],
  },
  venus: {
    planetKey: 'venus',
    nameSi: 'සිකුරු හෝරාව',
    nameEn: 'Venus Hora',
    lordSi: 'සිකුරු',
    lordEn: 'Venus',
    rating: 'good',
    ratingSi: 'සුබයි (කලා හා සුබ කටයුතුවලට)',
    ratingEn: 'Auspicious (Arts & Harmony)',
    color: '#ec4899',
    suitableForSi: [
      'කලා, සංගීත හා විලාසිතා කටයුතු',
      'නව ඇඳුම් පැළඳුම් හා ස්වර්ණාභරණ මිලදී ගැනීම',
      'සහකාරිය/සහකරු හමුවීම',
      'සංචාර හා විනෝද චාරිකා පිටත්වීම',
      'වාහන මිලදී ගැනීම',
    ],
    suitableForEn: [
      'Arts, music, design, and entertainment',
      'Buying new attire, luxury items, and jewelry',
      'Romantic dates and socializing',
      'Pleasure trips and leisure travel',
      'Purchasing vehicles and beauty items',
    ],
    avoidForSi: ['ණය දීම සහ තදබල ශාරීරික ගැටුම්'],
    avoidForEn: ['Lending money and bitter disputes'],
  },
  moon: {
    planetKey: 'moon',
    nameSi: 'සඳු හෝරාව',
    nameEn: 'Moon Hora',
    lordSi: 'සඳු',
    lordEn: 'Moon',
    rating: 'good',
    ratingSi: 'සුබයි (ගමන් හා පොදු කටයුතුවලට)',
    ratingEn: 'Auspicious (Travel & Public Work)',
    color: '#0284c7',
    suitableForSi: [
      'ගමන් බිමන් පිටත්වීම',
      'පොදු ජනතාව හා සම්බන්ධ සේවා',
      'ජලය, කෘෂිකර්මය හා ආහාර කටයුතු',
      'ගෘහ කටයුතු ආරම්භය',
      'සමාජ සත්කාර',
    ],
    suitableForEn: [
      'Embarking on journeys and travels',
      'Public relations, customer service, and food',
      'Water, gardening, and domestic chores',
      'House moving and family gatherings',
      'Philanthropic activities',
    ],
    avoidForSi: ['දීර්ඝකාලීන අවදානම් සහිත ආයෝජන'],
    avoidForEn: ['High-risk volatile investments'],
  },
  sun: {
    planetKey: 'sun',
    nameSi: 'රවි හෝරාව',
    nameEn: 'Sun Hora',
    lordSi: 'රවි',
    lordEn: 'Sun',
    rating: 'neutral',
    ratingSi: 'මධ්‍යමයි (රාජ්‍ය හා නිල කටයුතුවලට සුබයි)',
    ratingEn: 'Moderate (Favorable for Official/Govt)',
    color: '#ea580c',
    suitableForSi: [
      'රාජ්‍ය නිලධාරීන් හමුවීම',
      'රැකියා අයදුම්පත් යොමු කිරීම',
      'නායකත්ව හා පරිපාලන තීරණ',
      'ආගමික වතාවත්',
    ],
    suitableForEn: [
      'Meeting government officials & dignitaries',
      'Submitting career applications & tenders',
      'Executive decisions & administrative affairs',
      'Spiritual ceremonies and sun rituals',
    ],
    avoidForSi: ['විවාහ ගිවිස ගැනීම් සහ රහස්‍ය සාකච්ඡා'],
    avoidForEn: ['Secret talks and delicate marriage agreements'],
  },
  mars: {
    planetKey: 'mars',
    nameSi: 'කුජ හෝරාව',
    nameEn: 'Mars Hora',
    lordSi: 'කුජ (අඟහරු)',
    lordEn: 'Mars',
    rating: 'inauspicious',
    ratingSi: 'අසුබයි (සාමකාමී වැඩවලට වළකින්න)',
    ratingEn: 'Inauspicious (Avoid for Peaceful Work)',
    color: '#dc2626',
    suitableForSi: [
      'ක්‍රීඩා හා ශාරීරික අභ්‍යාස',
      'ශල්‍යකර්ම හා වෛද්‍ය ප්‍රතිකාර',
      'ඉඩම් හා දේපළ පරීක්ෂා කිරීම්',
      'මැෂින් හා යකඩ වැඩ',
    ],
    suitableForEn: [
      'Athletics, workouts, and physical endurance',
      'Surgeries and urgent medical procedures',
      'Surveying raw land and earthworks',
      'Working with machinery, metal, and fire',
    ],
    avoidForSi: [
      'නව ව්‍යාපාර හෝ සාමකාමී ගිවිසුම්',
      'විවාහ හා මංගල කටයුතු',
      'ණය ගැනීම හෝ මුදල් තැන්පත් කිරීම',
    ],
    avoidForEn: [
      'Starting peaceful businesses or partnerships',
      'Weddings and romantic dates',
      'Taking loans or lending capital',
    ],
  },
  saturn: {
    planetKey: 'saturn',
    nameSi: 'ශනි හෝරාව',
    nameEn: 'Saturn Hora',
    lordSi: 'ශනි (සෙනසුරු)',
    lordEn: 'Saturn',
    rating: 'inauspicious',
    ratingSi: 'අසුබයි (නව ආරම්භයන්ට නුසුදුසුයි)',
    ratingEn: 'Inauspicious (Avoid New Beginnings)',
    color: '#4f46e5',
    suitableForSi: [
      'කෘෂිකාර්මික වගා කටයුතු',
      'පරණ බඩු ඉවත් කිරීම හා පිරිසිදු කිරීම්',
      'යන්ත්‍ර සූත්‍ර අලුත්වැඩියාව',
      'භාවනා හා විරාගී කටයුතු',
    ],
    suitableForEn: [
      'Agriculture, sowing, and tilling soil',
      'Decluttering, cleaning, and waste removal',
      'Machinery maintenance and servicing',
      'Solitary meditation and ascetic practices',
    ],
    avoidForSi: [
      'නව රැකියා හා ව්‍යාපාර ආරම්භය',
      'සුබ ගමන් බිමන් පිටත්වීම',
      'මුදල් ගනුදෙනු හා ගිවිසුම්',
      'විවාහ කටයුතු',
    ],
    avoidForEn: [
      'Starting new jobs, ventures, or contracts',
      'Embarking on auspicious journeys',
      'Financial settlements & lending',
      'Marriages and joyous celebrations',
    ],
  },
};

// Chaldean sequence of planets (from slowest to fastest):
// Saturn -> Jupiter -> Mars -> Sun -> Venus -> Mercury -> Moon
export const CHALDEAN_HORA_ORDER = [
  'sun',
  'venus',
  'mercury',
  'moon',
  'saturn',
  'jupiter',
  'mars',
] as const;

// Day rulers (at local sunrise):
// 0: Sunday (Sun), 1: Monday (Moon), 2: Tuesday (Mars), 3: Wednesday (Mercury),
// 4: Thursday (Jupiter), 5: Friday (Venus), 6: Saturday (Saturn)
export const DAY_RULERS = [
  'sun',
  'moon',
  'mars',
  'mercury',
  'jupiter',
  'venus',
  'saturn',
] as const;

// Rahu Kalaya table for Sri Lanka (Standard Daytime 6:00 AM - 6:00 PM)
// Given in 24h decimal [startHour, endHour]
export interface RahuKalayaInfo {
  dayNameSi: string;
  dayNameEn: string;
  startHour: number; // e.g. 16.5 = 16:30
  endHour: number; // e.g. 18.0 = 18:00
  timeFormattedSi: string;
  timeFormattedEn: string;
  maruDirectionSi: string;
  maruDirectionEn: string;
  subhaDirectionSi: string;
  subhaDirectionEn: string;
}

export const RAHU_KALAYA_DATA: Record<number, RahuKalayaInfo> = {
  0: {
    // Sunday
    dayNameSi: 'ඉරිදා',
    dayNameEn: 'Sunday',
    startHour: 16.5,
    endHour: 18.0,
    timeFormattedSi: 'ප.ව. 04:30 – 06:00',
    timeFormattedEn: '04:30 PM – 06:00 PM',
    maruDirectionSi: 'උතුර',
    maruDirectionEn: 'North',
    subhaDirectionSi: 'දකුණ',
    subhaDirectionEn: 'South',
  },
  1: {
    // Monday
    dayNameSi: 'සඳුදා',
    dayNameEn: 'Monday',
    startHour: 7.5,
    endHour: 9.0,
    timeFormattedSi: 'පෙ.ව. 07:30 – 09:00',
    timeFormattedEn: '07:30 AM – 09:00 AM',
    maruDirectionSi: 'වයඹ',
    maruDirectionEn: 'North-West',
    subhaDirectionSi: 'ගිනිකොන',
    subhaDirectionEn: 'South-East',
  },
  2: {
    // Tuesday
    dayNameSi: 'අඟහරුවාදා',
    dayNameEn: 'Tuesday',
    startHour: 15.0,
    endHour: 16.5,
    timeFormattedSi: 'ප.ව. 03:00 – 04:30',
    timeFormattedEn: '03:00 PM – 04:30 PM',
    maruDirectionSi: 'බස්නාහිර',
    maruDirectionEn: 'West',
    subhaDirectionSi: 'නැගෙනහිර',
    subhaDirectionEn: 'East',
  },
  3: {
    // Wednesday
    dayNameSi: 'බදාදා',
    dayNameEn: 'Wednesday',
    startHour: 12.0,
    endHour: 13.5,
    timeFormattedSi: 'ප.ව. 12:00 – 01:30',
    timeFormattedEn: '12:00 PM – 01:30 PM',
    maruDirectionSi: 'නිරිත',
    maruDirectionEn: 'South-West',
    subhaDirectionSi: 'ඊසාන',
    subhaDirectionEn: 'North-East',
  },
  4: {
    // Thursday
    dayNameSi: 'බ්‍රහස්පතින්දා',
    dayNameEn: 'Thursday',
    startHour: 13.5,
    endHour: 15.0,
    timeFormattedSi: 'ප.ව. 01:30 – 03:00',
    timeFormattedEn: '01:30 PM – 03:00 PM',
    maruDirectionSi: 'දකුණ',
    maruDirectionEn: 'South',
    subhaDirectionSi: 'උතුර',
    subhaDirectionEn: 'North',
  },
  5: {
    // Friday
    dayNameSi: 'සිකුරාදා',
    dayNameEn: 'Friday',
    startHour: 10.5,
    endHour: 12.0,
    timeFormattedSi: 'පෙ.ව. 10:30 – 12:00',
    timeFormattedEn: '10:30 AM – 12:00 PM',
    maruDirectionSi: 'ගිනිකොන',
    maruDirectionEn: 'South-East',
    subhaDirectionSi: 'වයඹ',
    subhaDirectionEn: 'North-West',
  },
  6: {
    // Saturday
    dayNameSi: 'සෙනසුරාදා',
    dayNameEn: 'Saturday',
    startHour: 9.0,
    endHour: 10.5,
    timeFormattedSi: 'පෙ.ව. 09:00 – 10:30',
    timeFormattedEn: '09:00 AM – 10:30 AM',
    maruDirectionSi: 'නැගෙනහිර',
    maruDirectionEn: 'East',
    subhaDirectionSi: 'බස්නාහිර',
    subhaDirectionEn: 'West',
  },
};

export interface ActivityFilter {
  id: string;
  nameSi: string;
  nameEn: string;
  favoredHoras: string[];
}

export const WORK_ACTIVITIES: ActivityFilter[] = [
  {
    id: 'general_work',
    nameSi: 'සාමාන්‍ය වැඩ ආරම්භය හා රැකියා',
    nameEn: 'General Work & Jobs',
    favoredHoras: ['jupiter', 'mercury', 'sun', 'moon'],
  },
  {
    id: 'business_trade',
    nameSi: 'නව ව්‍යාපාර හා වෙළඳාම',
    nameEn: 'New Business & Commerce',
    favoredHoras: ['mercury', 'jupiter'],
  },
  {
    id: 'financial',
    nameSi: 'මුදල් ආයෝජන හා ගනුදෙනු',
    nameEn: 'Finance & Investments',
    favoredHoras: ['jupiter', 'mercury', 'venus'],
  },
  {
    id: 'travel',
    nameSi: 'ගමන් බිමන් පිටත්වීම',
    nameEn: 'Travel & Journeys',
    favoredHoras: ['moon', 'venus', 'jupiter'],
  },
  {
    id: 'study',
    nameSi: 'අධ්‍යාපනය හා නව පාඨමාලා',
    nameEn: 'Education & Study',
    favoredHoras: ['jupiter', 'mercury'],
  },
  {
    id: 'construction',
    nameSi: 'නිවාස හා ඉඩම් වැඩ ඇල්ලීම',
    nameEn: 'House & Land Works',
    favoredHoras: ['jupiter', 'mercury', 'venus'],
  },
];
