import React, { useState, useEffect } from 'react';
import { SRI_LANKA_DISTRICTS, type District } from '../data/districts';
import { calculateKendraChart, type KendraChartData, type HouseData } from '../lib/ephemeris';
import { KendraChartSvg } from './KendraChartSvg';
import { exportChartAsPng, printChartPdf } from '../lib/export-utils';
import { TRANSLATIONS } from '../lib/translations';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Download,
  Printer,
  RotateCcw,
  ShieldCheck,
  Compass,
  Moon,
  Sun,
  Star,
  CheckCircle2,
} from 'lucide-react';

interface KendraGeneratorProps {
  lang: 'si' | 'en';
}

const STORAGE_KEY = 'kendaraya_saved_birth_data';

export const KendraGenerator: React.FC<KendraGeneratorProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  // Default values: today's date or stored birth info
  const [dateStr, setDateStr] = useState<string>('2000-01-01');
  const [hour, setHour] = useState<number>(6);
  const [minute, setMinute] = useState<number>(30);
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
  const [districtId, setDistrictId] = useState<string>('colombo');

  const [chartData, setChartData] = useState<KendraChartData | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<HouseData | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Initialize or load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.dateStr) setDateStr(parsed.dateStr);
        if (parsed.hour !== undefined) setHour(parsed.hour);
        if (parsed.minute !== undefined) setMinute(parsed.minute);
        if (parsed.period) setPeriod(parsed.period);
        if (parsed.districtId) setDistrictId(parsed.districtId);
      }
    } catch {
      // Ignore local storage error
    }
  }, []);

  // Compute chart
  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const [yStr, mStr, dStr] = dateStr.split('-');
    const year = parseInt(yStr, 10);
    const month = parseInt(mStr, 10);
    const day = parseInt(dStr, 10);

    if (isNaN(year) || isNaN(month) || isNaN(day)) return;

    // Convert 12h to 24h
    let h24 = hour % 12;
    if (period === 'PM') h24 += 12;

    const district = SRI_LANKA_DISTRICTS.find((d) => d.id === districtId) || SRI_LANKA_DISTRICTS[0];

    const result = calculateKendraChart({
      year,
      month,
      day,
      hour: h24,
      minute,
      districtId: district.id,
      districtNameSi: district.nameSi,
      districtNameEn: district.nameEn,
      latitude: district.lat,
      longitude: district.lng,
    });

    setChartData(result);
    setSelectedHouse(result.houses[0]); // Default to 1st house

    // Save state to LocalStorage
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ dateStr, hour, minute, period, districtId })
      );
    } catch {
      // ignore
    }
  };

  // Run initial calculation once mounted
  useEffect(() => {
    handleCalculate();
  }, []);

  const handleSetNow = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    setDateStr(`${y}-${m}-${d}`);

    let h = now.getHours();
    const p = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    setHour(h);
    setMinute(now.getMinutes());
    setPeriod(p);
  };

  const handleReset = () => {
    setDateStr('2000-01-01');
    setHour(6);
    setMinute(30);
    setPeriod('AM');
    setDistrictId('colombo');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleExportPng = async () => {
    setIsExporting(true);
    const success = await exportChartAsPng('kendra-printable-card', `kendaraya-${dateStr}.png`);
    setIsExporting(false);
    if (success) {
      setExportNotice(t.savedSuccess);
      setTimeout(() => setExportNotice(null), 4000);
    }
  };

  const handlePrint = () => {
    printChartPdf();
  };

  const currentDistrict = SRI_LANKA_DISTRICTS.find((d) => d.id === districtId) || SRI_LANKA_DISTRICTS[0];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      {/* Input Form Card */}
      <div className="bg-[#FAF8F1] dark:bg-[#280202] rounded-2xl border border-[#757D6F]/25 dark:border-[#757D6F]/30 shadow-md p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#757D6F]/20 dark:border-[#757D6F]/30">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D0000] dark:text-[#EEEAD7] flex items-center gap-2">
              <Compass className="w-7 h-7 text-[#6D0808] dark:text-[#EEEAD7]" />
              {t.formTitle}
            </h2>
            <p className="text-sm text-[#4D453C] dark:text-[#D5D0BC] mt-1">
              {t.formDesc}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-[#757D6F]/15 dark:bg-[#757D6F]/30 text-[#2D0000] dark:text-[#EEEAD7] border border-[#757D6F]/30">
            <ShieldCheck className="w-4 h-4 text-[#6D0808] dark:text-[#EEEAD7]" />
            {t.privacyBadge}
          </div>
        </div>

        <form onSubmit={handleCalculate} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Birth Date */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#2D0000] dark:text-[#EEEAD7] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#6D0808] dark:text-[#EEEAD7]" />
              {t.birthDateLabel}
            </label>
            <input
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#757D6F]/35 dark:border-[#757D6F]/45 bg-[#EEEAD7]/40 dark:bg-[#1E0000] text-[#2D0000] dark:text-[#EEEAD7] focus:outline-none focus:ring-2 focus:ring-[#6D0808] transition-all font-mono"
            />
          </div>

          {/* Birth Time */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-[#2D0000] dark:text-[#EEEAD7] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#6D0808] dark:text-[#EEEAD7]" />
                {t.birthTimeLabel}
              </label>
              <button
                type="button"
                onClick={handleSetNow}
                className="text-xs text-[#6D0808] dark:text-[#EEEAD7] hover:underline font-medium"
              >
                {t.nowBtn}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={hour}
                onChange={(e) => setHour(parseInt(e.target.value, 10))}
                className="px-2 py-2.5 rounded-xl border border-[#757D6F]/35 dark:border-[#757D6F]/45 bg-[#EEEAD7]/40 dark:bg-[#1E0000] text-[#2D0000] dark:text-[#EEEAD7] text-sm font-mono focus:ring-2 focus:ring-[#6D0808]"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                  <option key={h} value={h}>
                    {String(h).padStart(2, '0')} {t.hourLabel}
                  </option>
                ))}
              </select>

              <select
                value={minute}
                onChange={(e) => setMinute(parseInt(e.target.value, 10))}
                className="px-2 py-2.5 rounded-xl border border-[#757D6F]/35 dark:border-[#757D6F]/45 bg-[#EEEAD7]/40 dark:bg-[#1E0000] text-[#2D0000] dark:text-[#EEEAD7] text-sm font-mono focus:ring-2 focus:ring-[#6D0808]"
              >
                {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                  <option key={m} value={m}>
                    {String(m).padStart(2, '0')} {t.minuteLabel}
                  </option>
                ))}
              </select>

              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as 'AM' | 'PM')}
                className="px-2 py-2.5 rounded-xl border border-[#757D6F]/35 dark:border-[#757D6F]/45 bg-[#EEEAD7]/40 dark:bg-[#1E0000] text-[#2D0000] dark:text-[#EEEAD7] text-sm font-semibold focus:ring-2 focus:ring-[#6D0808]"
              >
                <option value="AM">AM (පෙ.ව.)</option>
                <option value="PM">PM (ප.ව.)</option>
              </select>
            </div>
          </div>

          {/* Birth District */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#2D0000] dark:text-[#EEEAD7] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#6D0808] dark:text-[#EEEAD7]" />
              {t.districtLabel}
            </label>
            <select
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#757D6F]/35 dark:border-[#757D6F]/45 bg-[#EEEAD7]/40 dark:bg-[#1E0000] text-[#2D0000] dark:text-[#EEEAD7] focus:outline-none focus:ring-2 focus:ring-[#6D0808] transition-all text-sm font-medium"
            >
              {SRI_LANKA_DISTRICTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {lang === 'si' ? `${d.nameSi} දිස්ත්‍රික්කය (${d.provinceSi} පළාත)` : `${d.nameEn} District (${d.provinceEn} Prov.)`}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-3 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#757D6F]/20 dark:border-[#757D6F]/30">
            <div className="text-xs text-[#757D6F] dark:text-[#C5BFAC] font-mono">
              {currentDistrict.lat.toFixed(4)}° N, {currentDistrict.lng.toFixed(4)}° E • UTC+05:30 (SLST)
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl border border-[#757D6F]/40 hover:bg-[#757D6F]/15 text-[#2D0000] dark:text-[#EEEAD7] text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                {t.resetBtn}
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#6D0808] hover:bg-[#520606] text-[#EEEAD7] font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                {t.calculateBtn}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {chartData && (
        <div id="kendra-printable-card" className="space-y-8 print-area">
          {/* Summary Badges Card */}
          <div className="bg-[#FAF8F1] dark:bg-[#280202] border border-[#757D6F]/30 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#757D6F]/20 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6D0808] dark:text-[#EEEAD7]">
                  {lang === 'si' ? 'ජන්ම කේන්දර විග්‍රහය' : 'Horoscope Profile'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2D0000] dark:text-[#EEEAD7] mt-0.5">
                  {chartData.districtNameSi} • {chartData.birthDateFormatted} ({chartData.birthTimeFormatted})
                </h3>
              </div>

              {/* Export Buttons */}
              <div className="flex items-center gap-2 no-export no-print">
                <button
                  type="button"
                  onClick={handleExportPng}
                  disabled={isExporting}
                  className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-[#1E0000] border border-[#757D6F]/35 text-[#2D0000] dark:text-[#EEEAD7] hover:bg-[#FAF8F1] text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#6D0808] dark:text-[#EEEAD7]" />
                  {isExporting ? 'සුරකිමින්...' : t.saveImageBtn}
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-[#1E0000] border border-[#757D6F]/35 text-[#2D0000] dark:text-[#EEEAD7] hover:bg-[#FAF8F1] text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#6D0808] dark:text-[#EEEAD7]" />
                  {t.printPdfBtn}
                </button>
              </div>
            </div>

            {/* Notification badge */}
            {exportNotice && (
              <div className="mt-3 p-2 bg-[#757D6F]/20 text-[#2D0000] dark:text-[#EEEAD7] text-xs font-medium rounded-lg flex items-center gap-1.5 border border-[#757D6F]/30">
                <CheckCircle2 className="w-4 h-4 text-[#6D0808] dark:text-[#EEEAD7]" />
                {exportNotice}
              </div>
            )}

            {/* 5 Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
              {/* Lagna */}
              <div className="bg-white dark:bg-[#1E0000] rounded-xl p-3.5 border border-[#757D6F]/25 dark:border-[#757D6F]/35 shadow-2xs">
                <div className="flex items-center gap-1.5 text-[#6D0808] dark:text-[#EEEAD7] text-xs font-medium">
                  <Sun className="w-3.5 h-3.5" />
                  {t.lagnaLabel}
                </div>
                <div className="text-lg font-bold text-[#2D0000] dark:text-[#EEEAD7] mt-1">
                  {lang === 'si' ? chartData.lagna.rashiNameSi : chartData.lagna.rashiNameEn}
                </div>
                <div className="text-[11px] text-[#757D6F] dark:text-[#A8A493] font-mono mt-0.5">
                  {chartData.lagna.degreeFormatted}
                </div>
              </div>

              {/* Moon Sign */}
              <div className="bg-white dark:bg-[#1E0000] rounded-xl p-3.5 border border-[#757D6F]/25 dark:border-[#757D6F]/35 shadow-2xs">
                <div className="flex items-center gap-1.5 text-[#757D6F] dark:text-[#EEEAD7] text-xs font-medium">
                  <Moon className="w-3.5 h-3.5 text-[#6D0808] dark:text-[#EEEAD7]" />
                  {t.moonSignLabel}
                </div>
                <div className="text-lg font-bold text-[#2D0000] dark:text-[#EEEAD7] mt-1">
                  {lang === 'si' ? chartData.moonSign.rashiNameSi : chartData.moonSign.rashiNameEn}
                </div>
                <div className="text-[11px] text-[#757D6F] dark:text-[#A8A493] font-mono mt-0.5">
                  {chartData.moonSign.degreeFormatted}
                </div>
              </div>

              {/* Birth Star */}
              <div className="bg-white dark:bg-[#1E0000] rounded-xl p-3.5 border border-[#757D6F]/25 dark:border-[#757D6F]/35 shadow-2xs">
                <div className="flex items-center gap-1.5 text-[#6D0808] dark:text-[#EEEAD7] text-xs font-medium">
                  <Star className="w-3.5 h-3.5" />
                  {t.birthStarLabel}
                </div>
                <div className="text-lg font-bold text-[#2D0000] dark:text-[#EEEAD7] mt-1">
                  {lang === 'si' ? chartData.birthNakshatra.nameSi : chartData.birthNakshatra.nameEn}
                </div>
                <div className="text-[11px] text-[#757D6F] dark:text-[#A8A493] mt-0.5">
                  {lang === 'si' ? `අධිපති: ${chartData.birthNakshatra.lordSi}` : `Lord: ${chartData.birthNakshatra.lordEn}`}
                </div>
              </div>

              {/* Pada */}
              <div className="bg-white dark:bg-[#1E0000] rounded-xl p-3.5 border border-[#757D6F]/25 dark:border-[#757D6F]/35 shadow-2xs">
                <div className="flex items-center gap-1.5 text-[#757D6F] dark:text-[#EEEAD7] text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#6D0808] dark:text-[#EEEAD7]" />
                  {t.padaLabel}
                </div>
                <div className="text-lg font-bold text-[#2D0000] dark:text-[#EEEAD7] mt-1 font-mono">
                  {chartData.birthPada} {lang === 'si' ? 'පාදය' : 'Pada'}
                </div>
                <div className="text-[11px] text-[#757D6F] dark:text-[#A8A493] mt-0.5">
                  {lang === 'si' ? `${chartData.birthNakshatra.ganaSi} ගණය` : `${chartData.birthNakshatra.ganaEn} Gana`}
                </div>
              </div>

              {/* Ayanamsa */}
              <div className="bg-white dark:bg-[#1E0000] rounded-xl p-3.5 border border-[#757D6F]/25 dark:border-[#757D6F]/35 shadow-2xs col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-[#757D6F] dark:text-[#EEEAD7] text-xs font-medium">
                  <Compass className="w-3.5 h-3.5 text-[#6D0808] dark:text-[#EEEAD7]" />
                  {t.ayanamsaLabel}
                </div>
                <div className="text-base font-bold text-[#2D0000] dark:text-[#EEEAD7] mt-1 font-mono">
                  {chartData.ayanamsaFormatted}
                </div>
                <div className="text-[11px] text-[#757D6F] dark:text-[#A8A493] mt-0.5">
                  Lahiri / Chitra Paksha
                </div>
              </div>
            </div>
          </div>

          {/* Chart & House Breakdown Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* SVG Kendra Chart (7 cols on lg) */}
            <div className="lg:col-span-7 bg-[#FAF8F1] dark:bg-[#280202] rounded-2xl border border-[#757D6F]/25 dark:border-[#757D6F]/35 p-4 sm:p-6 shadow-md flex flex-col items-center">
              <div className="w-full text-center pb-3 border-b border-[#757D6F]/20">
                <h3 className="font-bold text-[#2D0000] dark:text-[#EEEAD7] text-lg">
                  {t.chartHeading}
                </h3>
                <p className="text-xs text-[#757D6F] dark:text-[#C5BFAC] mt-0.5">
                  {t.chartHelpText}
                </p>
              </div>

              <KendraChartSvg
                houses={chartData.houses}
                lang={lang}
                selectedHouseNumber={selectedHouse?.houseNumber}
                onHouseSelect={(h) => setSelectedHouse(h)}
              />
            </div>

            {/* Planetary Table (5 cols on lg) */}
            <div className="lg:col-span-5 bg-[#FAF8F1] dark:bg-[#280202] rounded-2xl border border-[#757D6F]/25 dark:border-[#757D6F]/35 p-4 sm:p-6 shadow-md">
              <h3 className="font-bold text-[#2D0000] dark:text-[#EEEAD7] text-lg pb-3 border-b border-[#757D6F]/20">
                {t.tableHeading}
              </h3>

              <div className="overflow-x-auto mt-3">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#757D6F]/20 text-[#757D6F] dark:text-[#C5BFAC] uppercase tracking-wider font-semibold">
                      <th className="py-2.5 px-2">{t.thPlanet}</th>
                      <th className="py-2.5 px-2">{t.thRashi}</th>
                      <th className="py-2.5 px-2">{t.thDegree}</th>
                      <th className="py-2.5 px-2">{t.thHouse}</th>
                      <th className="py-2.5 px-2">{t.thStatus}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#757D6F]/15 font-medium">
                    {/* Include Lagna */}
                    <tr className="bg-[#6D0808]/15 dark:bg-[#6D0808]/30 font-bold text-[#2D0000] dark:text-[#EEEAD7]">
                      <td className="py-2 px-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#6D0808] dark:bg-[#EEEAD7]" />
                        {lang === 'si' ? chartData.lagna.nameSi : chartData.lagna.nameEn}
                      </td>
                      <td className="py-2 px-2">
                        {lang === 'si' ? chartData.lagna.rashiNameSi : chartData.lagna.rashiNameEn}
                      </td>
                      <td className="py-2 px-2 font-mono text-[11px]">
                        {chartData.lagna.degreeFormatted}
                      </td>
                      <td className="py-2 px-2 font-mono">1</td>
                      <td className="py-2 px-2 text-[10px] text-[#757D6F] dark:text-[#D5D0BC]">
                        {t.directMotion}
                      </td>
                    </tr>

                    {/* All Planets */}
                    {chartData.planets.map((planet) => (
                      <tr
                        key={planet.key}
                        className="hover:bg-[#EEEAD7]/30 dark:hover:bg-[#380404]/40 transition-colors"
                      >
                        <td className="py-2 px-2 flex items-center gap-1.5 text-[#2D0000] dark:text-[#EEEAD7]">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: planet.color }}
                          />
                          {lang === 'si' ? planet.nameSi : planet.nameEn}
                        </td>
                        <td className="py-2 px-2 text-[#4D453C] dark:text-[#D5D0BC]">
                          {lang === 'si' ? planet.rashiNameSi : planet.rashiNameEn}
                        </td>
                        <td className="py-2 px-2 font-mono text-[11px] text-[#757D6F] dark:text-[#A8A493]">
                          {planet.degreeFormatted}
                        </td>
                        <td className="py-2 px-2 font-mono text-[#2D0000] dark:text-[#EEEAD7]">
                          {planet.houseNumber}
                        </td>
                        <td className="py-2 px-2 text-[10px]">
                          {planet.isRetrograde ? (
                            <span className="text-[#6D0808] dark:text-[#FFA6A6] font-bold bg-[#6D0808]/10 dark:bg-[#6D0808]/30 px-1.5 py-0.5 rounded border border-[#6D0808]/20">
                              {t.retrogradeMotion}
                            </span>
                          ) : (
                            <span className="text-[#757D6F] dark:text-[#A8A493]">
                              {t.directMotion}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
