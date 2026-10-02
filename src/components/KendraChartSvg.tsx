import React, { useState } from 'react';
import type { HouseData, PlanetaryPosition } from '../lib/ephemeris';
import { BHAVA_SIGNIFICATIONS } from '../data/astronomy-constants';

interface KendraChartSvgProps {
  houses: HouseData[];
  lang: 'si' | 'en';
  onHouseSelect?: (house: HouseData) => void;
  selectedHouseNumber?: number | null;
}

interface HousePolygon {
  houseNumber: number;
  points: string;
  labelX: number;
  labelY: number;
  contentX: number;
  contentY: number;
}

const HOUSE_POLYGONS: HousePolygon[] = [
  // House 1: Top Center Diamond
  {
    houseNumber: 1,
    points: '250,0 375,125 250,250 125,125',
    labelX: 250,
    labelY: 35,
    contentX: 250,
    contentY: 135,
  },
  // House 2: Top Left Triangle
  {
    houseNumber: 2,
    points: '0,0 250,0 125,125',
    labelX: 125,
    labelY: 28,
    contentX: 125,
    contentY: 75,
  },
  // House 3: Left Top Triangle
  {
    houseNumber: 3,
    points: '0,0 125,125 0,250',
    labelX: 30,
    labelY: 125,
    contentX: 55,
    contentY: 135,
  },
  // House 4: Left Center Diamond
  {
    houseNumber: 4,
    points: '0,250 125,125 250,250 125,375',
    labelX: 35,
    labelY: 255,
    contentX: 125,
    contentY: 250,
  },
  // House 5: Left Bottom Triangle
  {
    houseNumber: 5,
    points: '0,250 125,375 0,500',
    labelX: 30,
    labelY: 380,
    contentX: 55,
    contentY: 375,
  },
  // House 6: Bottom Left Triangle
  {
    houseNumber: 6,
    points: '0,500 125,375 250,500',
    labelX: 125,
    labelY: 480,
    contentX: 125,
    contentY: 435,
  },
  // House 7: Bottom Center Diamond
  {
    houseNumber: 7,
    points: '250,250 375,375 250,500 125,375',
    labelX: 250,
    labelY: 470,
    contentX: 250,
    contentY: 375,
  },
  // House 8: Bottom Right Triangle
  {
    houseNumber: 8,
    points: '250,500 375,375 500,500',
    labelX: 375,
    labelY: 480,
    contentX: 375,
    contentY: 435,
  },
  // House 9: Right Bottom Triangle
  {
    houseNumber: 9,
    points: '500,500 375,375 500,250',
    labelX: 470,
    labelY: 380,
    contentX: 445,
    contentY: 375,
  },
  // House 10: Right Center Diamond
  {
    houseNumber: 10,
    points: '500,250 375,125 250,250 375,375',
    labelX: 465,
    labelY: 255,
    contentX: 375,
    contentY: 250,
  },
  // House 11: Right Top Triangle
  {
    houseNumber: 11,
    points: '500,250 375,125 500,0',
    labelX: 470,
    labelY: 125,
    contentX: 445,
    contentY: 135,
  },
  // House 12: Top Right Triangle
  {
    houseNumber: 12,
    points: '500,0 250,0 375,125',
    labelX: 375,
    labelY: 28,
    contentX: 375,
    contentY: 75,
  },
];

export const KendraChartSvg: React.FC<KendraChartSvgProps> = ({
  houses,
  lang,
  onHouseSelect,
  selectedHouseNumber,
}) => {
  const [hoveredHouse, setHoveredHouse] = useState<number | null>(null);

  const activeHouseNum = selectedHouseNumber ?? hoveredHouse;
  const activeHouseData = houses.find((h) => h.houseNumber === activeHouseNum);
  const activeSignification = BHAVA_SIGNIFICATIONS.find((b) => b.house === activeHouseNum);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-[520px] aspect-square p-2">
        <svg
          id="kendra-svg-chart"
          viewBox="0 0 500 500"
          className="w-full h-full drop-shadow-md select-none transition-colors duration-300"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={lang === 'si' ? 'සාම්ප්‍රදායික ශ්‍රී ලාංකේය කොටු කේන්දර සටහන' : 'Traditional Sri Lankan 12-House Diamond Kendra Chart'}
        >
          <title>{lang === 'si' ? 'ජන්ම කේන්දර සටහන' : 'Vedic Kendra Chart'}</title>
          <desc>{lang === 'si' ? 'භාව 12 ක් සහ ග්‍රහ පිහිටීම් නිරූපණය වන සම්ප්‍රදායික දියමන්ති කේන්දර සටහන' : 'Traditional 12-house diamond astrological chart displaying rising Lagna and planetary positions'}</desc>
          <defs>
            {/* Sacred Maroon Gradient */}
            <linearGradient id="sacredMaroonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6D0808" />
              <stop offset="50%" stopColor="#8C1414" />
              <stop offset="100%" stopColor="#2D0000" />
            </linearGradient>

            {/* Subtle Chart Grid Pattern */}
            <pattern id="sacredGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#757D6F]/15" />
            </pattern>
          </defs>

          {/* Base Background */}
          <rect
            x="0"
            y="0"
            width="500"
            height="500"
            rx="8"
            className="fill-[#FAF8F1] dark:fill-[#1A0000]"
          />

          {/* House Polygons (Clickable & Hoverable) */}
          {HOUSE_POLYGONS.map((poly) => {
            const house = houses.find((h) => h.houseNumber === poly.houseNumber);
            const isHovered = hoveredHouse === poly.houseNumber;
            const isSelected = selectedHouseNumber === poly.houseNumber;
            const isPrimary = poly.houseNumber === 1;

            return (
              <g
                key={poly.houseNumber}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredHouse(poly.houseNumber)}
                onMouseLeave={() => setHoveredHouse(null)}
                onClick={() => house && onHouseSelect && onHouseSelect(house)}
              >
                {/* House Area */}
                <polygon
                  points={poly.points}
                  className={`transition-all duration-200 stroke-[#6D0808] dark:stroke-[#EEEAD7]/80 ${
                    isSelected
                      ? 'fill-[#6D0808]/25 dark:fill-[#6D0808]/50 stroke-[#6D0808] dark:stroke-[#EEEAD7] stroke-[2.5]'
                      : isHovered
                      ? 'fill-[#6D0808]/15 dark:fill-[#6D0808]/30 stroke-[#6D0808] dark:stroke-[#EEEAD7] stroke-[2]'
                      : isPrimary
                      ? 'fill-[#6D0808]/10 dark:fill-[#6D0808]/20 stroke-[1.8]'
                      : 'fill-[#FAF8F1] dark:fill-[#260202] stroke-[1.4]'
                  }`}
                />

                {/* House / Rashi Number Badge */}
                <text
                  x={poly.labelX}
                  y={poly.labelY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-bold text-[11px] fill-[#6D0808] dark:fill-[#EEEAD7] pointer-events-none tracking-wider"
                >
                  {house ? (lang === 'si' ? house.rashiNameSi : house.rashiNameEn) : poly.houseNumber}
                </text>

                {/* House Number in small subscript */}
                <text
                  x={poly.labelX}
                  y={poly.labelY + 12}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-[8.5px] fill-[#757D6F] dark:fill-[#BDB8A4] pointer-events-none font-mono"
                >
                  {lang === 'si' ? `${poly.houseNumber} වැන්න` : `H${poly.houseNumber}`}
                </text>

                {/* Planets inside House */}
                {house && house.planets.length > 0 && (
                  <g className="pointer-events-none">
                    {house.planets.map((p, idx) => {
                      // Stagger planets gracefully around content centroid
                      const count = house.planets.length;
                      let offsetX = 0;
                      let offsetY = 0;
                      if (count === 1) {
                        offsetY = 5;
                      } else if (count === 2) {
                        offsetX = idx === 0 ? -18 : 18;
                        offsetY = 6;
                      } else if (count === 3) {
                        offsetX = (idx - 1) * 22;
                        offsetY = idx === 1 ? -4 : 12;
                      } else {
                        // 4 or more planets
                        const row = Math.floor(idx / 2);
                        const col = idx % 2;
                        offsetX = col === 0 ? -18 : 18;
                        offsetY = (row - 0.5) * 18 + 5;
                      }

                      return (
                        <g
                          key={p.key}
                          transform={`translate(${poly.contentX + offsetX}, ${poly.contentY + offsetY})`}
                        >
                          <rect
                            x="-16"
                            y="-9"
                            width="32"
                            height="18"
                            rx="4"
                            className={
                              p.key === 'lagna'
                                ? 'fill-[#6D0808] text-[#EEEAD7]'
                                : 'fill-[#FFFFFF] dark:fill-[#1E0000] stroke stroke-[#757D6F]/40 dark:stroke-[#757D6F]/60'
                            }
                          />
                          <text
                            x="0"
                            y="1"
                            textAnchor="middle"
                            dominantBaseline="central"
                            className={`font-semibold text-[10px] ${
                              p.key === 'lagna'
                                ? 'fill-[#EEEAD7] font-bold'
                                : 'fill-[#2D0000] dark:fill-[#EEEAD7]'
                            }`}
                          >
                            {lang === 'si' ? p.shortSi : p.shortEn}
                            {p.isRetrograde && p.key !== 'lagna' && (
                              <tspan className="text-[7.5px] fill-[#6D0808] dark:fill-[#FFA6A6] font-bold ml-0.5">R</tspan>
                            )}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                )}
              </g>
            );
          })}

          {/* Central Sacred Lotus / Wheel Watermark */}
          <circle
            cx="250"
            cy="250"
            r="12"
            className="fill-[#6D0808]/20 stroke-[#6D0808] dark:stroke-[#EEEAD7]/80 stroke-[1.2] pointer-events-none"
          />
          <circle
            cx="250"
            cy="250"
            r="4"
            className="fill-[#6D0808] dark:fill-[#EEEAD7] pointer-events-none"
          />
        </svg>
      </div>

      {/* Interactive House Details Panel */}
      {activeHouseData && activeSignification && (
        <div className="w-full mt-3 p-4 bg-[#FAF8F1] dark:bg-[#280202] border border-[#757D6F]/30 rounded-xl transition-all shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#757D6F]/20 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#6D0808] text-[#EEEAD7] flex items-center justify-center text-xs font-bold font-mono shadow-2xs">
                {activeHouseData.houseNumber}
              </span>
              <h4 className="font-semibold text-[#2D0000] dark:text-[#EEEAD7] text-base">
                {lang === 'si' ? activeSignification.nameSi : activeSignification.nameEn}
              </h4>
            </div>
            <div className="text-xs px-2.5 py-1 rounded-full bg-[#6D0808]/10 dark:bg-[#6D0808]/30 text-[#6D0808] dark:text-[#EEEAD7] font-medium border border-[#6D0808]/20">
              {lang === 'si' ? `රාශිය: ${activeHouseData.rashiNameSi} (අධිපති: ${activeHouseData.rashiLordSi})` : `Sign: ${activeHouseData.rashiNameEn} (Lord: ${activeHouseData.rashiLordEn})`}
            </div>
          </div>

          <p className="text-sm text-[#4D453C] dark:text-[#D5D0BC] mt-2">
            {lang === 'si' ? activeSignification.meaningSi : activeSignification.meaningEn}
          </p>

          <div className="mt-3 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-medium text-[#757D6F] dark:text-[#C5BFAC]">
              {lang === 'si' ? 'භාවයේ තැන්පත් ග්‍රහයින්:' : 'Planets in this house:'}
            </span>
            {activeHouseData.planets.length === 0 ? (
              <span className="text-xs text-[#757D6F] italic">
                {lang === 'si' ? 'කිසිදු ග්‍රහයෙකු නොමැත (හිස් භාවයකි)' : 'No planets present'}
              </span>
            ) : (
              activeHouseData.planets.map((p) => (
                <span
                  key={p.key}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-white dark:bg-[#1E0000] border border-[#757D6F]/30 text-[#2D0000] dark:text-[#EEEAD7] shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                  {lang === 'si' ? p.nameSi : p.nameEn}
                  {p.isRetrograde && (
                    <span className="text-[10px] text-[#6D0808] dark:text-[#FFA6A6] font-bold ml-0.5">(R)</span>
                  )}
                  <span className="text-[10px] text-[#757D6F] dark:text-[#A8A493] ml-1 font-mono">
                    {p.degreeFormatted}
                  </span>
                </span>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
