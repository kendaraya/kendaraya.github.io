import React, { useState, useEffect } from 'react';
import { NAKSHATRAS } from '../data/astronomy-constants';
import { calculate20Porondam } from '../lib/porondam-calculator';
import type { CompatibilitySummary } from '../data/porondam-rules';
import { TRANSLATIONS } from '../lib/translations';
import {
  Heart,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Sparkles,
  User,
  RotateCcw,
  Printer,
} from 'lucide-react';
import { printChartPdf } from '../lib/export-utils';

interface PorondamMatcherProps {
  lang: 'si' | 'en';
}

const STORAGE_PORONDAM_KEY = 'kendaraya_porondam_selection';

export const PorondamMatcher: React.FC<PorondamMatcherProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  // Groom defaults: Aswida, Pada 1
  const [groomStar, setGroomStar] = useState<number>(0);
  const [groomPada, setGroomPada] = useState<number>(1);

  // Bride defaults: Rohini, Pada 2
  const [brideStar, setBrideStar] = useState<number>(3);
  const [bridePada, setBridePada] = useState<number>(2);

  const [result, setResult] = useState<CompatibilitySummary | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PORONDAM_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.groomStar !== undefined) setGroomStar(parsed.groomStar);
        if (parsed.groomPada !== undefined) setGroomPada(parsed.groomPada);
        if (parsed.brideStar !== undefined) setBrideStar(parsed.brideStar);
        if (parsed.bridePada !== undefined) setBridePada(parsed.bridePada);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleMatch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const summary = calculate20Porondam(groomStar, groomPada, brideStar, bridePada);
    setResult(summary);

    try {
      localStorage.setItem(
        STORAGE_PORONDAM_KEY,
        JSON.stringify({ groomStar, groomPada, brideStar, bridePada })
      );
    } catch {
      // ignore
    }
  };

  // Run on initial mount
  useEffect(() => {
    handleMatch();
  }, []);

  const handleReset = () => {
    setGroomStar(0);
    setGroomPada(1);
    setBrideStar(3);
    setBridePada(2);
    try {
      localStorage.removeItem(STORAGE_PORONDAM_KEY);
    } catch {
      // ignore
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      {/* Input Selection Card */}
      <div className="bg-[#FAF8F1] dark:bg-[#280202] rounded-2xl border border-[#757D6F]/25 dark:border-[#757D6F]/30 shadow-md p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#757D6F]/20 dark:border-[#757D6F]/30">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D0000] dark:text-[#EEEAD7] flex items-center gap-2">
              <Heart className="w-7 h-7 text-[#6D0808] fill-[#6D0808]/20" />
              {t.porondamTitle}
            </h2>
            <p className="text-sm text-[#4D453C] dark:text-[#D5D0BC] mt-1">
              {t.porondamDesc}
            </p>
          </div>
          <div className="text-xs px-3 py-1.5 rounded-full bg-[#6D0808]/10 dark:bg-[#6D0808]/30 text-[#6D0808] dark:text-[#EEEAD7] font-semibold border border-[#6D0808]/30">
            {lang === 'si' ? 'විසි (20) පොරොන්දම් ක්‍රමය' : '20 Traditional Porondam System'}
          </div>
        </div>

        <form onSubmit={handleMatch} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Groom Card */}
          <div className="bg-[#EEEAD7]/30 dark:bg-[#1E0000]/60 border border-[#757D6F]/30 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#757D6F]/20">
              <span className="w-6 h-6 rounded-full bg-[#6D0808] text-[#EEEAD7] flex items-center justify-center text-xs">
                <User className="w-3.5 h-3.5" />
              </span>
              <h3 className="font-bold text-[#2D0000] dark:text-[#EEEAD7] text-base">
                {t.groomSectionTitle}
              </h3>
            </div>

            {/* Groom Nakshatra */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2D0000] dark:text-[#EEEAD7]">
                {t.groomStarLabel}
              </label>
              <select
                value={groomStar}
                onChange={(e) => setGroomStar(parseInt(e.target.value, 10))}
                className="w-full px-3.5 py-2 rounded-lg border border-[#757D6F]/35 dark:border-[#757D6F]/45 bg-white dark:bg-[#1E0000] text-[#2D0000] dark:text-[#EEEAD7] text-sm font-medium focus:ring-2 focus:ring-[#6D0808]"
              >
                {NAKSHATRAS.map((nak) => (
                  <option key={nak.index} value={nak.index}>
                    {nak.index + 1}. {lang === 'si' ? nak.nameSi : nak.nameEn} ({nak.ganaSi} ගණය • {nak.yoniAnimalSi} යෝනි)
                  </option>
                ))}
              </select>
            </div>

            {/* Groom Pada */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2D0000] dark:text-[#EEEAD7]">
                {t.groomPadaLabel}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setGroomPada(p)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      groomPada === p
                        ? 'bg-[#6D0808] text-[#EEEAD7] shadow-xs'
                        : 'bg-white dark:bg-[#1E0000] border border-[#757D6F]/30 text-[#2D0000] dark:text-[#EEEAD7] hover:bg-[#EEEAD7]/50'
                    }`}
                  >
                    {p} {lang === 'si' ? 'පාදය' : 'Pada'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bride Card */}
          <div className="bg-[#EEEAD7]/30 dark:bg-[#1E0000]/60 border border-[#757D6F]/30 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#757D6F]/20">
              <span className="w-6 h-6 rounded-full bg-[#6D0808] text-[#EEEAD7] flex items-center justify-center text-xs">
                <Heart className="w-3.5 h-3.5 fill-current" />
              </span>
              <h3 className="font-bold text-[#2D0000] dark:text-[#EEEAD7] text-base">
                {t.brideSectionTitle}
              </h3>
            </div>

            {/* Bride Nakshatra */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2D0000] dark:text-[#EEEAD7]">
                {t.brideStarLabel}
              </label>
              <select
                value={brideStar}
                onChange={(e) => setBrideStar(parseInt(e.target.value, 10))}
                className="w-full px-3.5 py-2 rounded-lg border border-[#757D6F]/35 dark:border-[#757D6F]/45 bg-white dark:bg-[#1E0000] text-[#2D0000] dark:text-[#EEEAD7] text-sm font-medium focus:ring-2 focus:ring-[#6D0808]"
              >
                {NAKSHATRAS.map((nak) => (
                  <option key={nak.index} value={nak.index}>
                    {nak.index + 1}. {lang === 'si' ? nak.nameSi : nak.nameEn} ({nak.ganaSi} ගණය • {nak.yoniAnimalSi} යෝනි)
                  </option>
                ))}
              </select>
            </div>

            {/* Bride Pada */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2D0000] dark:text-[#EEEAD7]">
                {t.bridePadaLabel}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setBridePada(p)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      bridePada === p
                        ? 'bg-[#6D0808] text-[#EEEAD7] shadow-xs'
                        : 'bg-white dark:bg-[#1E0000] border border-[#757D6F]/30 text-[#2D0000] dark:text-[#EEEAD7] hover:bg-[#EEEAD7]/50'
                    }`}
                  >
                    {p} {lang === 'si' ? 'පාදය' : 'Pada'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl border border-[#757D6F]/40 hover:bg-[#757D6F]/15 text-[#2D0000] dark:text-[#EEEAD7] text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              {t.resetBtn}
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#6D0808] hover:bg-[#520606] text-[#EEEAD7] font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              {t.matchBtn}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <div id="porondam-result-card" className="space-y-8 print-area">
          {/* Summary Score Banner */}
          <div className="bg-[#FAF8F1] dark:bg-[#280202] border border-[#757D6F]/30 rounded-2xl p-6 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#757D6F]/20">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6D0808] dark:text-[#EEEAD7]">
                  {t.porondamResultTitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2D0000] dark:text-[#EEEAD7] mt-0.5">
                  {lang === 'si' ? result.verdictSi : result.verdictEn}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => printChartPdf()}
                className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-[#1E0000] border border-[#757D6F]/35 text-[#2D0000] dark:text-[#EEEAD7] hover:bg-[#FAF8F1] text-xs font-semibold shadow-2xs flex items-center gap-1.5 no-print cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#6D0808] dark:text-[#EEEAD7]" />
                {t.printPdfBtn}
              </button>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {/* Percentage */}
              <div className="bg-white dark:bg-[#1E0000] rounded-xl p-4 border border-[#757D6F]/25 dark:border-[#757D6F]/35 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#757D6F] dark:text-[#C5BFAC] font-medium">
                    {t.compatibilityScore}
                  </div>
                  <div className="text-3xl font-black text-[#6D0808] dark:text-[#EEEAD7] font-mono mt-0.5">
                    {result.percentage}%
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-[#6D0808]/30 flex items-center justify-center font-bold text-xs text-[#6D0808] dark:text-[#EEEAD7]">
                  {result.obtainedPoints}
                </div>
              </div>

              {/* Passed Count */}
              <div className="bg-white dark:bg-[#1E0000] rounded-xl p-4 border border-[#757D6F]/25 dark:border-[#757D6F]/35 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#757D6F] dark:text-[#C5BFAC] font-medium">
                    {t.passedPorondams}
                  </div>
                  <div className="text-3xl font-black text-[#2D0000] dark:text-[#EEEAD7] font-mono mt-0.5">
                    {result.passedCount} / {result.totalCount}
                  </div>
                </div>
                <CheckCircle className="w-8 h-8 text-[#757D6F]/40" />
              </div>

              {/* Verdict Classification */}
              <div className="bg-white dark:bg-[#1E0000] rounded-xl p-4 border border-[#757D6F]/25 dark:border-[#757D6F]/35 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#757D6F] dark:text-[#C5BFAC] font-medium">
                    {t.verdictLabel}
                  </div>
                  <div
                    className={`text-base font-bold mt-1 ${
                      result.verdictType === 'excellent' || result.verdictType === 'good'
                        ? 'text-[#2D0000] dark:text-[#EEEAD7]'
                        : result.verdictType === 'moderate'
                        ? 'text-[#757D6F] dark:text-[#D5D0BC]'
                        : 'text-[#6D0808] dark:text-[#FFA8A8]'
                    }`}
                  >
                    {result.verdictType === 'excellent'
                      ? 'ඉතා සුබයි (Excellent)'
                      : result.verdictType === 'good'
                      ? 'සුබයි (Compatible)'
                      : result.verdictType === 'moderate'
                      ? 'මධ්‍යමයි (Moderate)'
                      : 'නොගැළපේ (Incompatible)'}
                  </div>
                </div>
                <Sparkles className="w-8 h-8 text-[#6D0808]/40" />
              </div>
            </div>

            {/* Dosha Notice Banner */}
            {result.criticalNotesSi.length > 0 ? (
              <div className="mt-5 p-4 rounded-xl bg-[#6D0808]/10 dark:bg-[#6D0808]/30 border border-[#6D0808]/30 text-[#2D0000] dark:text-[#EEEAD7]">
                <div className="flex items-center gap-2 font-bold text-[#6D0808] dark:text-[#FFA8A8] text-sm">
                  <AlertTriangle className="w-5 h-5 text-[#6D0808] dark:text-[#FFA8A8] flex-shrink-0" />
                  {t.criticalNoticeTitle}
                </div>
                <ul className="mt-2 space-y-1 text-xs list-disc list-inside text-[#4D453C] dark:text-[#D5D0BC]">
                  {(lang === 'si' ? result.criticalNotesSi : result.criticalNotesEn).map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-5 p-4 rounded-xl bg-[#757D6F]/15 dark:bg-[#757D6F]/30 border border-[#757D6F]/30 text-[#2D0000] dark:text-[#EEEAD7] flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#6D0808] dark:text-[#EEEAD7] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold">{t.allGoodNoticeTitle}</div>
                  <div className="text-xs text-[#4D453C] dark:text-[#D5D0BC] mt-0.5">
                    {t.allGoodNoticeDesc}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Detailed 20 Porondam Breakdown Table */}
          <div className="bg-[#FAF8F1] dark:bg-[#280202] rounded-2xl border border-[#757D6F]/25 dark:border-[#757D6F]/35 p-6 shadow-md">
            <h3 className="text-lg font-bold text-[#2D0000] dark:text-[#EEEAD7] pb-4 border-b border-[#757D6F]/20 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#6D0808] dark:text-[#EEEAD7]" />
              {lang === 'si' ? 'විසි පොරොන්දම් සම්පූර්ණ විග්‍රහය' : 'All 20 Porondam Detailed Analysis'}
            </h3>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#757D6F]/20 text-[#757D6F] dark:text-[#C5BFAC] uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">{t.thNumber}</th>
                    <th className="py-2.5 px-3">{t.thPorondamName}</th>
                    <th className="py-2.5 px-3">{t.thGroomFactor}</th>
                    <th className="py-2.5 px-3">{t.thBrideFactor}</th>
                    <th className="py-2.5 px-3">{t.thResult}</th>
                    <th className="py-2.5 px-3 text-center">{t.thPoints}</th>
                    <th className="py-2.5 px-3">{t.thAnalysis}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#757D6F]/15 font-medium">
                  {result.porondams.map((p, idx) => (
                    <React.Fragment key={p.id}>
                      <tr
                        className={`hover:bg-[#EEEAD7]/40 dark:hover:bg-[#380404]/40 transition-colors cursor-pointer ${
                          p.isDosha ? 'bg-[#6D0808]/10 dark:bg-[#6D0808]/25' : ''
                        }`}
                        onClick={() => toggleExpand(p.id)}
                      >
                        <td className="py-3 px-3 font-mono text-[#757D6F]">{idx + 1}</td>
                        <td className="py-3 px-3 font-semibold text-[#2D0000] dark:text-[#EEEAD7] flex items-center gap-1.5">
                          {lang === 'si' ? p.nameSi : p.nameEn}
                          {p.isDosha && (
                            <AlertTriangle className="w-3.5 h-3.5 text-[#6D0808] dark:text-[#FFA8A8] inline flex-shrink-0" />
                          )}
                        </td>
                        <td className="py-3 px-3 text-[#4D453C] dark:text-[#D5D0BC]">
                          {lang === 'si' ? p.groomValueSi : p.groomValueEn}
                        </td>
                        <td className="py-3 px-3 text-[#4D453C] dark:text-[#D5D0BC]">
                          {lang === 'si' ? p.brideValueSi : p.brideValueEn}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                              p.status === 'subha'
                                ? 'bg-[#757D6F]/20 text-[#2D0000] dark:text-[#EEEAD7] border-[#757D6F]/30'
                                : p.status === 'madhyama'
                                ? 'bg-[#EEEAD7] text-[#2D0000] dark:bg-[#2D0000] dark:text-[#EEEAD7] border-[#757D6F]/30'
                                : 'bg-[#6D0808]/15 text-[#6D0808] dark:text-[#FFA8A8] border-[#6D0808]/30'
                            }`}
                          >
                            {lang === 'si' ? p.statusSi : p.statusEn}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold text-[#2D0000] dark:text-[#EEEAD7]">
                          {p.obtainedScore} / {p.maxScore}
                        </td>
                        <td className="py-3 px-3 text-[#757D6F] dark:text-[#C5BFAC] max-w-xs truncate">
                          {lang === 'si' ? p.explanationSi : p.explanationEn}
                        </td>
                      </tr>

                      {/* Expandable row for full explanation on click */}
                      {expandedId === p.id && (
                        <tr className="bg-[#EEEAD7]/50 dark:bg-[#200000]/80 text-xs">
                          <td colSpan={7} className="py-3 px-6 text-[#2D0000] dark:text-[#EEEAD7]">
                            <div className="flex items-start gap-2">
                              <HelpCircle className="w-4 h-4 text-[#6D0808] dark:text-[#EEEAD7] flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold">
                                  {lang === 'si' ? p.nameSi : p.nameEn}:
                                </span>{' '}
                                {lang === 'si' ? p.explanationSi : p.explanationEn}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
