import {
  HORA_DEFINITIONS,
  CHALDEAN_HORA_ORDER,
  DAY_RULERS,
  RAHU_KALAYA_DATA,
  type HoraInfo,
  type RahuKalayaInfo,
} from '../data/muhurtha-rules';

export interface CalculatedHora {
  index: number; // 1 to 12
  startTimeFormatted: string;
  endTimeFormatted: string;
  startHourDecimal: number;
  endHourDecimal: number;
  planetKey: string;
  info: HoraInfo;
  isRahuKalayaOverlap: boolean;
  isCurrentlyActive: boolean;
}

export interface DayMuhurthaSummary {
  dateIso: string;
  dateFormatted: string;
  dayOfWeek: number; // 0=Sun, 6=Sat
  dayNameSi: string;
  dayNameEn: string;
  dayRulerPlanet: string;
  rahuKalaya: RahuKalayaInfo;
  dayHoras: CalculatedHora[];
  currentActiveHora: CalculatedHora | null;
  isCurrentlyRahuKalaya: boolean;
  currentStatusVerdictSi: string;
  currentStatusVerdictEn: string;
  currentStatusType: 'excellent' | 'good' | 'moderate' | 'avoid';
  maruDirectionSi: string;
  maruDirectionEn: string;
  subhaDirectionSi: string;
  subhaDirectionEn: string;
  bestAuspiciousWindows: CalculatedHora[];
}

/**
 * Formats decimal hours (e.g. 7.5 -> "07:30 AM")
 */
function formatHourDecimal(h: number): string {
  const norm = h % 24;
  const hours = Math.floor(norm);
  const minutes = Math.round((norm - hours) * 60);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${String(displayHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
}

/**
 * Generates the complete 12 Daytime Horas and Rahu Kalaya for a selected date
 */
export function calculateDayMuhurtha(dateInput: Date = new Date()): DayMuhurthaSummary {
  const dayOfWeek = dateInput.getDay(); // 0 to 6
  const dayRuler = DAY_RULERS[dayOfWeek];
  const rahuKalaya = RAHU_KALAYA_DATA[dayOfWeek];

  // Chaldean cycle index of the day ruler
  const rulerIndexInChaldean = CHALDEAN_HORA_ORDER.indexOf(dayRuler);

  // Standard Sri Lankan daytime: 6:00 AM to 6:00 PM (12 hours)
  const dayStartHour = 6.0;
  const horaDuration = 1.0; // 1 hour per hora

  // Current real-time clock for matching
  const now = new Date();
  const isSameDay =
    now.getFullYear() === dateInput.getFullYear() &&
    now.getMonth() === dateInput.getMonth() &&
    now.getDate() === dateInput.getDate();

  const currentHourDecimal = now.getHours() + now.getMinutes() / 60.0;

  const dayHoras: CalculatedHora[] = [];
  let currentActiveHora: CalculatedHora | null = null;
  let isCurrentlyRahu = false;

  if (isSameDay) {
    if (currentHourDecimal >= rahuKalaya.startHour && currentHourDecimal < rahuKalaya.endHour) {
      isCurrentlyRahu = true;
    }
  }

  for (let i = 0; i < 12; i++) {
    const startH = dayStartHour + i * horaDuration;
    const endH = startH + horaDuration;

    // Determine ruling planet for this hora in Chaldean sequence
    const chaldeanIndex = (rulerIndexInChaldean + i) % 7;
    const planetKey = CHALDEAN_HORA_ORDER[chaldeanIndex];
    const info = HORA_DEFINITIONS[planetKey];

    // Check if this hora overlaps with Rahu Kalaya
    const overlapsRahu =
      Math.max(startH, rahuKalaya.startHour) < Math.min(endH, rahuKalaya.endHour);

    const isActive =
      isSameDay && currentHourDecimal >= startH && currentHourDecimal < endH;

    const calcHora: CalculatedHora = {
      index: i + 1,
      startTimeFormatted: formatHourDecimal(startH),
      endTimeFormatted: formatHourDecimal(endH),
      startHourDecimal: startH,
      endHourDecimal: endH,
      planetKey,
      info,
      isRahuKalayaOverlap: overlapsRahu,
      isCurrentlyActive: isActive,
    };

    if (isActive) {
      currentActiveHora = calcHora;
    }

    dayHoras.push(calcHora);
  }

  // Determine current live verdict
  let currentStatusType: 'excellent' | 'good' | 'moderate' | 'avoid' = 'moderate';
  let currentStatusVerdictSi = 'රාත්‍රී කාලය පවතී (හෝරාවන් පසුදින උදෑසන 6.00 ට යළි ඇරඹේ)';
  let currentStatusVerdictEn = 'Nighttime period (Daytime Horas resume at 06:00 AM tomorrow)';

  if (isCurrentlyRahu) {
    currentStatusType = 'avoid';
    currentStatusVerdictSi = `අවවාදයයි: දැන් රාහු කාලය පවතී (${rahuKalaya.timeFormattedSi}). සුබ වැඩ ඇරඹීමෙන් වළකින්න!`;
    currentStatusVerdictEn = `Warning: Rahu Kalaya is currently active (${rahuKalaya.timeFormattedEn}). Avoid initiating new auspicious work!`;
  } else if (currentActiveHora) {
    const r = currentActiveHora.info.rating;
    if (r === 'excellent') {
      currentStatusType = 'excellent';
      currentStatusVerdictSi = `දැන් ${currentActiveHora.info.nameSi} පවතී. වැඩ ආරම්භයට ඉතාම ප්‍රශස්ත, අතිශය සුබ වේලාවකි!`;
      currentStatusVerdictEn = `Now active: ${currentActiveHora.info.nameEn}. Highly auspicious and optimal time to begin work!`;
    } else if (r === 'good') {
      currentStatusType = 'good';
      currentStatusVerdictSi = `දැන් ${currentActiveHora.info.nameSi} පවතී. වැඩකටයුතු හා ගමන් බිමන් සඳහා සුබ වේලාවකි.`;
      currentStatusVerdictEn = `Now active: ${currentActiveHora.info.nameEn}. Auspicious for general tasks, travel, and dealings.`;
    } else if (r === 'neutral') {
      currentStatusType = 'moderate';
      currentStatusVerdictSi = `දැන් ${currentActiveHora.info.nameSi} පවතී. සාමාන්‍ය/රාජ්‍ය කටයුතුවලට යහපත්ය.`;
      currentStatusVerdictEn = `Now active: ${currentActiveHora.info.nameEn}. Moderate window, favorable for administrative or official work.`;
    } else {
      currentStatusType = 'avoid';
      currentStatusVerdictSi = `දැන් ${currentActiveHora.info.nameSi} පවතී. සාමකාමී නව ආරම්භයන් සඳහා නුසුදුසු වේලාවකි.`;
      currentStatusVerdictEn = `Now active: ${currentActiveHora.info.nameEn}. Inauspicious hour. Avoid new ventures or peaceful beginnings.`;
    }
  }

  // Best auspicious windows: Excellent or Good horas that DO NOT overlap Rahu Kalaya
  const bestAuspiciousWindows = dayHoras.filter(
    (h) => (h.info.rating === 'excellent' || h.info.rating === 'good') && !h.isRahuKalayaOverlap
  );

  const y = dateInput.getFullYear();
  const m = String(dateInput.getMonth() + 1).padStart(2, '0');
  const d = String(dateInput.getDate()).padStart(2, '0');

  return {
    dateIso: `${y}-${m}-${d}`,
    dateFormatted: `${y}-${m}-${d}`,
    dayOfWeek,
    dayNameSi: rahuKalaya.dayNameSi,
    dayNameEn: rahuKalaya.dayNameEn,
    dayRulerPlanet: dayRuler,
    rahuKalaya,
    dayHoras,
    currentActiveHora,
    isCurrentlyRahuKalaya: isCurrentlyRahu,
    currentStatusVerdictSi,
    currentStatusVerdictEn,
    currentStatusType,
    maruDirectionSi: rahuKalaya.maruDirectionSi,
    maruDirectionEn: rahuKalaya.maruDirectionEn,
    subhaDirectionSi: rahuKalaya.subhaDirectionSi,
    subhaDirectionEn: rahuKalaya.subhaDirectionEn,
    bestAuspiciousWindows,
  };
}
