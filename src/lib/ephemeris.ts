import * as Astronomy from 'astronomy-engine';
import { RASHIS, NAKSHATRAS, PLANETS, type NakshatraInfo, type RashiInfo } from '../data/astronomy-constants';

export interface PlanetaryPosition {
  key: string;
  nameSi: string;
  nameEn: string;
  shortSi: string;
  shortEn: string;
  siderealLongitude: number;
  rashiIndex: number;
  rashiNameSi: string;
  rashiNameEn: string;
  rashiLordSi: string;
  rashiLordEn: string;
  degInRashi: number;
  degreeFormatted: string;
  nakshatraIndex: number;
  nakshatraNameSi: string;
  nakshatraNameEn: string;
  pada: number;
  houseNumber: number; // 1 to 12
  isRetrograde: boolean;
  color: string;
}

export interface HouseData {
  houseNumber: number; // 1 to 12
  rashiIndex: number; // 0 to 11
  rashiNameSi: string;
  rashiNameEn: string;
  rashiLordSi: string;
  rashiLordEn: string;
  planets: PlanetaryPosition[];
}

export interface KendraChartData {
  birthDateTimeIso: string;
  birthDateFormatted: string;
  birthTimeFormatted: string;
  districtId: string;
  districtNameSi: string;
  districtNameEn: string;
  latitude: number;
  longitude: number;
  ayanamsa: number;
  ayanamsaFormatted: string;
  lagna: PlanetaryPosition;
  moonSign: PlanetaryPosition;
  birthNakshatra: NakshatraInfo;
  birthPada: number;
  planets: PlanetaryPosition[];
  houses: HouseData[];
}

/**
 * Calculates Lahiri Ayanamsa (Chitra Paksha) for a given Julian Date
 */
export function calculateLahiriAyanamsa(utcDate: Date): number {
  const jd = utcDate.getTime() / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525.0; // Julian centuries from J2000.0
  // Standard Lahiri Ayanamsa formula: 23° 51' 25.53" at J2000.0 with precession rate
  const ayanamsa = 23.856944 + 1.396042 * T + 0.000308 * T * T;
  return ayanamsa;
}

/**
 * Formats decimal degrees into Degrees° Minutes' Seconds"
 */
export function formatDegreesMinutes(deg: number): string {
  const normalized = ((deg % 360) + 360) % 360;
  const d = Math.floor(normalized);
  const mDec = (normalized - d) * 60;
  const m = Math.floor(mDec);
  const s = Math.round((mDec - m) * 60);
  return `${d}° ${m.toString().padStart(2, '0')}' ${s.toString().padStart(2, '0')}"`;
}

/**
 * Calculates the tropical Ascendant (Lagna) for a given UTC Date and Lat/Lng
 */
function calculateTropicalAscendant(utcDate: Date, lat: number, lng: number): number {
  const gstHours = Astronomy.SiderealTime(utcDate);
  const gstDegrees = gstHours * 15.0;
  const lstDegrees = ((gstDegrees + lng) % 360.0 + 360.0) % 360.0;

  const astroTime = new Astronomy.AstroTime(utcDate);
  const tilt = Astronomy.e_tilt(astroTime);
  const obliquityRad = (tilt.tobl * Math.PI) / 180.0;

  const lstRad = (lstDegrees * Math.PI) / 180.0;
  const latRad = (lat * Math.PI) / 180.0;

  const y = Math.cos(lstRad);
  const x = -Math.sin(lstRad) * Math.cos(obliquityRad) - Math.tan(latRad) * Math.sin(obliquityRad);

  let ascDeg = (Math.atan2(y, x) * 180.0) / Math.PI;
  ascDeg = ((ascDeg % 360.0) + 360.0) % 360.0;
  return ascDeg;
}

/**
 * Calculates the tropical longitude of the Moon's Mean Ascending Node (Rahu)
 */
function calculateMeanRahu(utcDate: Date): number {
  const jd = utcDate.getTime() / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525.0;
  let omega = (125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000) % 360.0;
  if (omega < 0) omega += 360.0;
  return omega;
}

/**
 * Generates the full client-side Kendra Birth Chart
 */
export function calculateKendraChart(params: {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number; // 0-23
  minute: number; // 0-59
  districtId: string;
  districtNameSi: string;
  districtNameEn: string;
  latitude: number;
  longitude: number;
}): KendraChartData {
  const { year, month, day, hour, minute, districtId, districtNameSi, districtNameEn, latitude, longitude } = params;

  // Sri Lanka is UTC+05:30
  // Convert local SLST time to UTC Date
  const localEpoch = Date.UTC(year, month - 1, day, hour, minute, 0);
  const utcOffsetMs = 5.5 * 3600 * 1000;
  const utcDate = new Date(localEpoch - utcOffsetMs);

  const ayanamsa = calculateLahiriAyanamsa(utcDate);

  // 1. Calculate Lagna (Ascendant)
  const tropicalAsc = calculateTropicalAscendant(utcDate, latitude, longitude);
  const siderealAsc = ((tropicalAsc - ayanamsa) % 360.0 + 360.0) % 360.0;
  const lagnaRashiIndex = Math.floor(siderealAsc / 30.0);
  const lagnaDegInRashi = siderealAsc % 30.0;
  const nakshatraSpan = 360.0 / 27.0;
  const padaSpan = nakshatraSpan / 4.0;
  const lagnaNakIndex = Math.floor(siderealAsc / nakshatraSpan);
  const lagnaPada = Math.floor((siderealAsc % nakshatraSpan) / padaSpan) + 1;

  const lagnaPosition: PlanetaryPosition = {
    key: 'lagna',
    nameSi: 'ලග්නය (ආරෝහණ)',
    nameEn: 'Lagna (Ascendant)',
    shortSi: 'ල',
    shortEn: 'Asc',
    siderealLongitude: siderealAsc,
    rashiIndex: lagnaRashiIndex,
    rashiNameSi: RASHIS[lagnaRashiIndex].nameSi,
    rashiNameEn: RASHIS[lagnaRashiIndex].nameEn,
    rashiLordSi: RASHIS[lagnaRashiIndex].lordSi,
    rashiLordEn: RASHIS[lagnaRashiIndex].lordEn,
    degInRashi: lagnaDegInRashi,
    degreeFormatted: formatDegreesMinutes(lagnaDegInRashi),
    nakshatraIndex: lagnaNakIndex,
    nakshatraNameSi: NAKSHATRAS[lagnaNakIndex].nameSi,
    nakshatraNameEn: NAKSHATRAS[lagnaNakIndex].nameEn,
    pada: lagnaPada,
    houseNumber: 1,
    isRetrograde: false,
    color: '#b45309',
  };

  // Helper for computing body sidereal longitude and retrograde motion
  const nextHourDate = new Date(utcDate.getTime() + 3600000);

  const calculateBodyPosition = (
    key: string,
    nameSi: string,
    nameEn: string,
    shortSi: string,
    shortEn: string,
    color: string,
    computeTropicalLong: (d: Date) => number
  ): PlanetaryPosition => {
    const tropLong = computeTropicalLong(utcDate);
    const siderealLong = ((tropLong - ayanamsa) % 360.0 + 360.0) % 360.0;
    const rashiIdx = Math.floor(siderealLong / 30.0);
    const degInSign = siderealLong % 30.0;
    const nakIdx = Math.floor(siderealLong / nakshatraSpan);
    const p = Math.floor((siderealLong % nakshatraSpan) / padaSpan) + 1;

    // Determine House (Bhava) in Whole Sign:
    // House 1 is the sign containing Lagna
    const houseNum = ((rashiIdx - lagnaRashiIndex + 12) % 12) + 1;

    // Check retrograde (except Sun, Moon, Rahu, Ketu)
    let isRetro = false;
    if (key === 'rahu' || key === 'ketu') {
      isRetro = true; // Mean nodes are inherently retrograde
    } else if (key !== 'sun' && key !== 'moon') {
      const nextTrop = computeTropicalLong(nextHourDate);
      let diff = nextTrop - tropLong;
      if (diff < -180) diff += 360;
      if (diff > 180) diff -= 360;
      isRetro = diff < 0;
    }

    return {
      key,
      nameSi,
      nameEn,
      shortSi,
      shortEn,
      siderealLongitude: siderealLong,
      rashiIndex: rashiIdx,
      rashiNameSi: RASHIS[rashiIdx].nameSi,
      rashiNameEn: RASHIS[rashiIdx].nameEn,
      rashiLordSi: RASHIS[rashiIdx].lordSi,
      rashiLordEn: RASHIS[rashiIdx].lordEn,
      degInRashi: degInSign,
      degreeFormatted: formatDegreesMinutes(degInSign),
      nakshatraIndex: nakIdx,
      nakshatraNameSi: NAKSHATRAS[nakIdx].nameSi,
      nakshatraNameEn: NAKSHATRAS[nakIdx].nameEn,
      pada: p,
      houseNumber: houseNum,
      isRetrograde: isRetro,
      color,
    };
  };

  // Planetary list
  const sunPos = calculateBodyPosition('sun', 'රවි (ඉර)', 'Sun', 'රවි', 'Su', '#ea580c', (d) => Astronomy.SunPosition(d).elon);
  const moonPos = calculateBodyPosition('moon', 'සඳු (හඳ)', 'Moon', 'සඳු', 'Mo', '#0284c7', (d) => Astronomy.Ecliptic(Astronomy.GeoMoon(d)).elon);
  const marsPos = calculateBodyPosition('mars', 'කුජ (අඟහරු)', 'Mars', 'කුජ', 'Ma', '#dc2626', (d) => Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Mars, d, true)).elon);
  const mercuryPos = calculateBodyPosition('mercury', 'බුධ', 'Mercury', 'බුධ', 'Me', '#16a34a', (d) => Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Mercury, d, true)).elon);
  const jupiterPos = calculateBodyPosition('jupiter', 'ගුරු (බ්‍රහස්පති)', 'Jupiter', 'ගුරු', 'Ju', '#d97706', (d) => Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Jupiter, d, true)).elon);
  const venusPos = calculateBodyPosition('venus', 'සිකුරු', 'Venus', 'සිකුරු', 'Ve', '#ec4899', (d) => Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Venus, d, true)).elon);
  const saturnPos = calculateBodyPosition('saturn', 'ශනි (සෙනසුරු)', 'Saturn', 'ශනි', 'Sa', '#4f46e5', (d) => Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Saturn, d, true)).elon);
  const rahuPos = calculateBodyPosition('rahu', 'රාහු', 'Rahu', 'රාහු', 'Ra', '#475569', (d) => calculateMeanRahu(d));
  const ketuPos = calculateBodyPosition('ketu', 'කේතු', 'Ketu', 'කේතු', 'Ke', '#78716c', (d) => (calculateMeanRahu(d) + 180.0) % 360.0);

  const planets: PlanetaryPosition[] = [
    sunPos,
    moonPos,
    marsPos,
    mercuryPos,
    jupiterPos,
    venusPos,
    saturnPos,
    rahuPos,
    ketuPos,
  ];

  // Organize 12 Houses
  const houses: HouseData[] = [];
  for (let h = 1; h <= 12; h++) {
    const houseRashiIndex = (lagnaRashiIndex + (h - 1)) % 12;
    const housePlanets = planets.filter((p) => p.houseNumber === h);
    if (h === 1) {
      // Lagna marker inside House 1
      housePlanets.unshift(lagnaPosition);
    }
    houses.push({
      houseNumber: h,
      rashiIndex: houseRashiIndex,
      rashiNameSi: RASHIS[houseRashiIndex].nameSi,
      rashiNameEn: RASHIS[houseRashiIndex].nameEn,
      rashiLordSi: RASHIS[houseRashiIndex].lordSi,
      rashiLordEn: RASHIS[houseRashiIndex].lordEn,
      planets: housePlanets,
    });
  }

  // Moon Sign and Birth Star
  const moonNakshatra = NAKSHATRAS[moonPos.nakshatraIndex];
  const birthPada = moonPos.pada;

  return {
    birthDateTimeIso: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00+05:30`,
    birthDateFormatted: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    birthTimeFormatted: `${String(hour > 12 ? hour - 12 : hour === 0 ? 12 : hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`,
    districtId,
    districtNameSi,
    districtNameEn,
    latitude,
    longitude,
    ayanamsa,
    ayanamsaFormatted: formatDegreesMinutes(ayanamsa),
    lagna: lagnaPosition,
    moonSign: moonPos,
    birthNakshatra: moonNakshatra,
    birthPada,
    planets,
    houses,
  };
}
