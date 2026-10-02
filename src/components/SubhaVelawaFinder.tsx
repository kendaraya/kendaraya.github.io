import React, { useState, useEffect } from 'react';
import {
  calculateDayMuhurtha,
  type DayMuhurthaSummary,
  type CalculatedHora,
} from '../lib/muhurtha-calculator';
import { WORK_ACTIVITIES } from '../data/muhurtha-rules';
import { TRANSLATIONS } from '../lib/translations';
import {
  Clock,
  Calendar,
  AlertOctagon,
  CheckCircle2,
  Compass,
  Sparkles,
  ShieldAlert,
  Flame,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';

interface SubhaVelawaFinderProps {
  lang: 'si' | 'en';
}

export const SubhaVelawaFinder: React.FC<SubhaVelawaFinderProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  // Selected date string (YYYY-MM-DD)
  const getTodayStr = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const [dateStr, setDateStr] = useState<string>(getTodayStr());
  const [selectedActivity, setSelectedActivity] = useState<string>('all');
  const [muhurtha, setMuhurtha] = useState<DayMuhurthaSummary | null>(null);
  const [expandedHoraIndex, setExpandedHoraIndex] = useState<number | null>(null);

  // Compute Muhurtha whenever dateStr changes
  useEffect(() => {
    const [y, m, d] = dateStr.split('-').map((v) => parseInt(v, 10));
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
      const targetDate = new Date(y, m - 1, d);
      const res = calculateDayMuhurtha(targetDate);
      setMuhurtha(res);
    }
  }, [dateStr]);

  const handleSetToday = () => {
    setDateStr(getTodayStr());
  };

  const handleSetTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setDateStr(`${y}-${m}-${day}`);
  };

  if (!muhurtha) return null;

  // Filter horas based on selected activity
  const activeActivityObj = WORK_ACTIVITIES.find((a) => a.id === selectedActivity);
  const filteredHoras = activeActivityObj
    ? muhurtha.dayHoras.filter((h) => activeActivityObj.favoredHoras.includes(h.planetKey))
    : muhurtha.dayHoras;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      {/* Header & Filter Card */}
      <div className="bg-[#FAF8F1] dark:bg-[#280202] rounded-2xl border border-[#757D6F]/25 dark:border-[#757D6F]/30 shadow-md p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#757D6F]/20 dark:border-[#757D6F]/30">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#757D6F]/15 dark:bg-[#757D6F]/30 text-[#2D0000] dark:text-[#EEEAD7] text-xs font-semibold mb-2 border border-[#757D6F]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#6D0808] dark:text-[#EEEAD7]" />
              Sri Lankan Subha Hora & Muhurtha
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D0000] dark:text-[#EEEAD7] flex items-center gap-2">
              <Clock className="w-7 h-7 text-[#6D0808] dark:text-[#EEEAD7]" />
              {t.subhaVelawaTitle}
            </h2>
            <p className="text-sm text-[#4D453C] dark:text-[#D5D0BC] mt-1">
              {t.subhaVelawaSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSetToday}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                dateStr === getTodayStr()
                  ? 'bg-[#6D0808] text-[#EEEAD7] shadow-sm'
                  : 'bg-[#EEEAD7]/60 dark:bg-[#1E0000] text-[#757D6F] dark:text-[#C5BFAC] hover:bg-[#EEEAD7]'
              }`}
            >
              {lang === 'si' ? 'අද (Today)' : 'Today'}
            </button>
            <button
              type="button"
              onClick={handleSetTomorrow}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-[#EEEAD7]/60 dark:bg-[#1E0000] text-[#757D6F] dark:text-[#C5BFAC] hover:bg-[#EEEAD7] transition-all cursor-pointer"
            >
              {lang === 'si' ? 'හෙට (Tomorrow)' : 'Tomorrow'}
            </button>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Date Picker */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#2D0000] dark:text-[#EEEAD7] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#6D0808] dark:text-[#EEEAD7]" />
              {t.selectDateLabel}
            </label>
            <input
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#757D6F]/35 dark:border-[#757D6F]/45 bg-[#EEEAD7]/40 dark:bg-[#1E0000] text-[#2D0000] dark:text-[#EEEAD7] text-sm font-mono focus:ring-2 focus:ring-[#6D0808]"
            />
          </div>

          {/* Activity Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#2D0000] dark:text-[#EEEAD7] flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#6D0808] dark:text-[#EEEAD7]" />
              {t.filterActivityLabel}
            </label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#757D6F]/35 dark:border-[#757D6F]/45 bg-[#EEEAD7]/40 dark:bg-[#1E0000] text-[#2D0000] dark:text-[#EEEAD7] text-sm font-medium focus:ring-2 focus:ring-[#6D0808]"
            >
              <option value="all">{t.allActivities}</option>
              {WORK_ACTIVITIES.map((act) => (
                <option key={act.id} value={act.id}>
                  {lang === 'si' ? act.nameSi : act.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Real-time Status Card (Only shown if viewing Today) */}
        {dateStr === getTodayStr() && (
          <div
            className={`mt-6 p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 transition-all ${
              muhurtha.currentStatusType === 'avoid'
                ? 'bg-[#6D0808]/15 dark:bg-[#6D0808]/30 border-[#6D0808]/40 text-[#6D0808] dark:text-[#FFA8A8]'
                : 'bg-[#757D6F]/15 dark:bg-[#757D6F]/25 border-[#757D6F]/40 text-[#2D0000] dark:text-[#EEEAD7]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="flex h-3 w-3">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      muhurtha.currentStatusType === 'avoid' ? 'bg-[#6D0808]' : 'bg-[#757D6F]'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      muhurtha.currentStatusType === 'avoid' ? 'bg-[#6D0808]' : 'bg-[#757D6F]'
                    }`}
                  />
                </span>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider opacity-80">
                  {t.liveStatusTitle}
                </div>
                <div className="text-sm sm:text-base font-bold mt-0.5">
                  {lang === 'si' ? muhurtha.currentStatusVerdictSi : muhurtha.currentStatusVerdictEn}
                </div>
              </div>
            </div>

            {muhurtha.currentActiveHora && (
              <div className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-white dark:bg-[#1E0000] border border-[#757D6F]/30 shadow-2xs">
                {muhurtha.currentActiveHora.startTimeFormatted} – {muhurtha.currentActiveHora.endTimeFormatted}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3 Vital Pillars: Rahu Kalaya, Maru Direction, Subha Direction */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Rahu Kalaya */}
        <div className="bg-[#FAF8F1] dark:bg-[#280202] rounded-2xl border border-[#6D0808]/30 dark:border-[#6D0808]/45 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#6D0808] dark:text-[#FFA8A8] flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4" />
              {t.rahuKalayaLabel}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6D0808]/15 dark:bg-[#6D0808]/30 text-[#6D0808] dark:text-[#FFA8A8] border border-[#6D0808]/20">
              {lang === 'si' ? 'අසුබ කාලය' : 'Avoid Work'}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#6D0808] dark:text-[#FFA8A8] font-mono">
            {lang === 'si' ? muhurtha.rahuKalaya.timeFormattedSi : muhurtha.rahuKalaya.timeFormattedEn}
          </div>
          <p className="text-xs text-[#4D453C] dark:text-[#D5D0BC] leading-relaxed">
            {lang === 'si'
              ? 'රාහු කාලය තුළ නව රැකියා, මුදල් ගනුදෙනු, ගිවිසුම් හා සුබ ගමන් ආරම්භ කිරීමෙන් වළකින්න.'
              : 'Strictly avoid initiating new business, agreements, contracts, or long journeys during Rahu Kalaya.'}
          </p>
        </div>

        {/* Maru Sitina Dishawa (To Avoid) */}
        <div className="bg-[#FAF8F1] dark:bg-[#280202] rounded-2xl border border-[#757D6F]/30 dark:border-[#757D6F]/40 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#757D6F] dark:text-[#EEEAD7] flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#6D0808]" />
              {t.maruDirectionLabel}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#757D6F]/20 text-[#2D0000] dark:text-[#EEEAD7] border border-[#757D6F]/30">
              {lang === 'si' ? 'නුසුදුසු දිශාව' : 'Do Not Face'}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#2D0000] dark:text-[#EEEAD7]">
            {lang === 'si' ? muhurtha.maruDirectionSi : muhurtha.maruDirectionEn}
          </div>
          <p className="text-xs text-[#4D453C] dark:text-[#D5D0BC] leading-relaxed">
            {lang === 'si'
              ? 'නිවසින් හෝ කාර්යාලයෙන් වැඩට පිටත්වීමේදී මෙම දිශාවට කෙලින්ම මුහුණලා පිටත්වීම අසුබයි.'
              : 'Avoid facing directly into this direction when stepping out to begin work or travels.'}
          </p>
        </div>

        {/* Subha Direction (To Face) */}
        <div className="bg-[#FAF8F1] dark:bg-[#280202] rounded-2xl border border-[#757D6F]/30 dark:border-[#757D6F]/40 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#2D0000] dark:text-[#EEEAD7] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#6D0808] dark:text-[#EEEAD7]" />
              {t.subhaDirectionLabel}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#757D6F]/20 text-[#2D0000] dark:text-[#EEEAD7] border border-[#757D6F]/30">
              {lang === 'si' ? 'ප්‍රශස්තයි' : 'Optimal Direction'}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#6D0808] dark:text-[#EEEAD7]">
            {lang === 'si' ? muhurtha.subhaDirectionSi : muhurtha.subhaDirectionEn}
          </div>
          <p className="text-xs text-[#4D453C] dark:text-[#D5D0BC] leading-relaxed">
            {lang === 'si'
              ? 'වැඩ ආරම්භයේදී හා පිටත්වීමේදී මෙම සුබ දිශාවට මුහුණලා කටයුතු කිරීම ජයග්‍රහණය ගෙනදේ.'
              : 'Face towards this auspicious direction when sitting to work or starting journey for success.'}
          </p>
        </div>
      </div>

      {/* Best Auspicious Windows for the Day */}
      <div className="bg-[#FAF8F1] dark:bg-[#280202] border border-[#757D6F]/30 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 pb-4 border-b border-[#757D6F]/20">
          <Sparkles className="w-5 h-5 text-[#6D0808] dark:text-[#EEEAD7]" />
          <h3 className="font-bold text-[#2D0000] dark:text-[#EEEAD7] text-lg">
            {t.bestWindowsHeading} ({lang === 'si' ? muhurtha.dayNameSi : muhurtha.dayNameEn})
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {muhurtha.bestAuspiciousWindows.map((w) => (
            <div
              key={w.index}
              className="bg-white dark:bg-[#1E0000] rounded-xl p-4 border border-[#757D6F]/25 dark:border-[#757D6F]/35 shadow-2xs hover:shadow-xs transition-shadow space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#6D0808] dark:text-[#EEEAD7]">
                  {w.startTimeFormatted} – {w.endTimeFormatted}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#757D6F]/20 text-[#2D0000] dark:text-[#EEEAD7] border border-[#757D6F]/30">
                  {lang === 'si' ? w.info.ratingSi : w.info.ratingEn}
                </span>
              </div>
              <div className="font-bold text-[#2D0000] dark:text-[#EEEAD7] text-base">
                {lang === 'si' ? w.info.nameSi : w.info.nameEn}
              </div>
              <div className="text-xs text-[#4D453C] dark:text-[#D5D0BC]">
                <span className="font-semibold text-[#6D0808] dark:text-[#EEEAD7]">
                  {lang === 'si' ? 'විශේෂයෙන් සුදුසුයි: ' : 'Best for: '}
                </span>
                {(lang === 'si' ? w.info.suitableForSi : w.info.suitableForEn).slice(0, 2).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full 12 Daytime Horas Timeline Breakdown */}
      <div className="bg-[#FAF8F1] dark:bg-[#280202] rounded-2xl border border-[#757D6F]/25 dark:border-[#757D6F]/35 p-6 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#757D6F]/20">
          <div>
            <h3 className="font-bold text-[#2D0000] dark:text-[#EEEAD7] text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#6D0808] dark:text-[#EEEAD7]" />
              {t.allDayHorasHeading}
            </h3>
            <p className="text-xs text-[#757D6F] dark:text-[#C5BFAC] mt-0.5">
              {lang === 'si'
                ? 'උදෑසන 06:00 සිට සවස 06:00 දක්වා පැය 12 ක සම්ප්‍රදායික හෝරා චක්‍රය'
                : '12-hour traditional Chaldean hora cycle from 06:00 AM to 06:00 PM'}
            </p>
          </div>
          <div className="text-xs text-[#757D6F] dark:text-[#C5BFAC] font-mono">
            {lang === 'si' ? `දවසාධිපති: ${muhurtha.dayRulerPlanet}` : `Day Ruler: ${muhurtha.dayRulerPlanet}`}
          </div>
        </div>

        <div className="space-y-2">
          {filteredHoras.map((hora) => {
            const isExpanded = expandedHoraIndex === hora.index;
            const isGood = hora.info.rating === 'excellent' || hora.info.rating === 'good';
            const isRahu = hora.isRahuKalayaOverlap;

            return (
              <div
                key={hora.index}
                className={`rounded-xl border transition-all ${
                  hora.isCurrentlyActive
                    ? 'ring-2 ring-[#6D0808] border-[#6D0808] bg-[#6D0808]/10 dark:bg-[#6D0808]/30'
                    : isRahu
                    ? 'bg-[#6D0808]/10 dark:bg-[#6D0808]/25 border-[#6D0808]/30'
                    : 'bg-white dark:bg-[#1E0000] border-[#757D6F]/25 dark:border-[#757D6F]/35'
                }`}
              >
                <div
                  onClick={() => setExpandedHoraIndex(isExpanded ? null : hora.index)}
                  className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#EEEAD7] dark:bg-[#2D0000] text-[#2D0000] dark:text-[#EEEAD7] font-mono text-xs flex items-center justify-center font-bold border border-[#757D6F]/30">
                      {hora.index}
                    </span>
                    <div>
                      <div className="font-mono text-xs font-bold text-[#757D6F] dark:text-[#C5BFAC]">
                        {hora.startTimeFormatted} – {hora.endTimeFormatted}
                      </div>
                      <div className="font-bold text-[#2D0000] dark:text-[#EEEAD7] text-sm">
                        {lang === 'si' ? hora.info.nameSi : hora.info.nameEn}
                        {hora.isCurrentlyActive && (
                          <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6D0808] text-[#EEEAD7] animate-pulse">
                            {lang === 'si' ? 'දැන් ක්‍රියාත්මකයි' : 'Active Now'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {isRahu && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#6D0808]/15 text-[#6D0808] dark:text-[#FFA8A8] border border-[#6D0808]/30">
                        <AlertOctagon className="w-3 h-3" />
                        {lang === 'si' ? 'රාහු කාලය' : 'Rahu Time'}
                      </span>
                    )}

                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                        isGood && !isRahu
                          ? 'bg-[#757D6F]/20 text-[#2D0000] dark:text-[#EEEAD7] border-[#757D6F]/30'
                          : hora.info.rating === 'neutral'
                          ? 'bg-[#EEEAD7] text-[#2D0000] dark:bg-[#2D0000] dark:text-[#EEEAD7] border-[#757D6F]/30'
                          : 'bg-[#6D0808]/15 text-[#6D0808] dark:text-[#FFA8A8] border-[#6D0808]/30'
                      }`}
                    >
                      {lang === 'si' ? hora.info.ratingSi : hora.info.ratingEn}
                    </span>

                    <button
                      type="button"
                      className="p-1 text-[#757D6F] hover:text-[#2D0000] dark:hover:text-[#EEEAD7]"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-4 pt-1 border-t border-[#757D6F]/20 text-xs space-y-3">
                    {isRahu && (
                      <div className="p-2.5 rounded-lg bg-[#6D0808]/15 dark:bg-[#6D0808]/30 border border-[#6D0808]/30 text-[#6D0808] dark:text-[#FFA8A8] flex items-start gap-2">
                        <ShieldAlert className="w-4 h-4 text-[#6D0808] flex-shrink-0 mt-0.5" />
                        <span>
                          {lang === 'si'
                            ? 'අවධානයට: මෙම හෝරාව රාහු කාලය සමඟ සමපාත වන බැවින් සියලු සුබ කටයුතු හා නව වැඩ ආරම්භයන්ගෙන් වළකින්න.'
                            : 'Caution: This hora overlaps with Rahu Kalaya. Auspicious tasks should be postponed until Rahu concludes.'}
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="font-bold text-[#2D0000] dark:text-[#EEEAD7] mb-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#6D0808] dark:text-[#EEEAD7]" />
                          {t.suitableTasksHeading}:
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 text-[#4D453C] dark:text-[#D5D0BC]">
                          {(lang === 'si' ? hora.info.suitableForSi : hora.info.suitableForEn).map(
                            (item, i) => (
                              <li key={i}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>

                      <div>
                        <div className="font-bold text-[#6D0808] dark:text-[#FFA8A8] mb-1 flex items-center gap-1">
                          <AlertOctagon className="w-3.5 h-3.5" />
                          {t.avoidTasksHeading}:
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 text-[#4D453C] dark:text-[#D5D0BC]">
                          {(lang === 'si' ? hora.info.avoidForSi : hora.info.avoidForEn).map(
                            (item, i) => (
                              <li key={i}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
