# කේන්දරය (Kendaraya) | Free 100% Client-Side Sinhala Astrology & Horoscope Engine

[![Astro](https://img.shields.io/badge/Astro-5%2F7-BC52EE.svg?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?style=flat&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Privacy First](https://img.shields.io/badge/Privacy-100%25%20Client--Side-10B981.svg?style=flat)](https://kendaraya.github.io)
[![BuyMeACoffee](https://img.shields.io/badge/Support-Buy%20Me%20A%20Coffee-FFDD00.svg?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/kisharadilz)

**Live Website:** [https://kendaraya.github.io](https://kendaraya.github.io)

**කේන්දරය (Kendaraya)** is a zero-server, privacy-first Vedic and Sinhala astrology engine built with **Astro**, **React Islands**, and **Tailwind CSS**. It calculates authentic Sri Lankan Kendra birth charts, Lagna (Ascendant), Moon sign (Rashi), Nakshatra, and full 20 Porondam marriage compatibility entirely locally in the user's browser with zero database or cloud uploads.

---

## 🌟 Key Features

### 1. 100% Client-Side Ephemeris Mathematics
- **Pure Client-Side Computation:** Powered by `astronomy-engine` (VSOP87 analytical planetary models and ELP2000 lunar theory).
- **True Lahiri Ayanamsa (Chitra Paksha):** Precession-adjusted sidereal conversion from tropical ecliptic longitudes.
- **Accurate Ascendant (Lagna) Calculation:** Computes true Local Sidereal Time (LST) and true obliquity of the ecliptic for exact minute-level birth rising signs.
- **Sri Lanka District Dataset:** Offline database of all 25 Sri Lankan administrative districts with pre-mapped coordinates and UTC+05:30 (SLST) time offset.

### 2. Traditional 12-House Sri Lankan Diamond Kendra Chart
- **Authentic Interactive SVG:** Renders the classic diamond/square 12-house chart (Tanu, Dhana, Sahodara, Matru, Putra, Shatru, Kalatra, Ayu, Bhagya, Karma, Labha, Vraya).
- **Planetary Breakdown Table:** Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu with degrees, minutes, nakshatras, padas, and retrograde status (R).
- **Interactive House Inspector:** Click or hover on any house to inspect its planetary occupants, house lord, and astrological significations (කාරකත්ව).
- **1-Click Export:** Save chart as high-resolution PNG image or print to PDF.

### 3. Auspicious Work Time (Subha Hora), Rahu Kalaya & Maru Direction Finder (වැඩ ඇල්ලීමට සුබ වේලාවන්)
- **Real-Time Live Status:** Instantly identifies whether the current moment is auspicious to begin work, or if Rahu Kalaya is currently active.
- **12 Daytime Horas (Chaldean Planetary Hours):** Calculates Sun, Venus, Mercury, Moon, Saturn, Jupiter, and Mars horas from 06:00 AM to 06:00 PM for any selected date.
- **Rahu Kalaya (රාහු කාලය):** Displays the exact daily inauspicious time window to strictly avoid for new ventures, contracts, and journeys.
- **Maru Sitina Dishawa (මරු සිටින දිශාව) & Subha Dishawa:** Clear guidance on which compass direction to avoid facing when stepping out, and which auspicious direction to face for success.
- **Activity Filter:** Instant recommendations for General Work & Jobs, New Business & Trade, Financial Transactions, Journeys & Travel, Education & Studies, and House & Land work.

### 4. Full 20 Porondam Marriage Compatibility System (විසි පොරොන්දම්)
Comprehensive matching across all 20 classical Sri Lankan Porondams:
1. **Dina (දින)** - Daily harmony and health (3 pts)
2. **Gana (ගණ)** - Temperament (Deva, Manushya, Rakshasa) (6 pts)
3. **Mahendra (මාහේන්ද්‍ර)** - Progeny and affection (1 pt)
4. **Stree Deergha (ස්ත්‍රී දීර්ඝ)** - Longevity and prosperity (1 pt)
5. **Yoni (යෝනි)** - Biological and sexual affinity (4 pts)
6. **Rashi (රාශි)** - Spiritual harmony (7 pts)
7. **Rashi Adhipathi (රාශ්‍යාධිපති)** - Planetary friendship (5 pts)
8. **Vashya (වශ්‍ය)** - Mutual attraction (2 pts)
9. **Rajju (රජ්ජු)** - Marital longevity & protection (5 pts, Critical)
10. **Vedha (වේධ)** - Affliction / conflict avoidance (2 pts, Critical)
11. **Varna (වර්ණ)** - Intellectual alignment (1 pt)
12. **Nadi (නාඩි)** - Physiological & genetic balance (8 pts, Critical)
13. **Gotra (ගෝත්‍ර)** - Ancestral lineage (1 pt)
14. **Vruksha (වෘක්ෂ)** - Tree fertility symbolism (1 pt)
15. **Bhuta (භූත)** - Pancha Mahabhuta elements (1 pt)
16. **Pakshi (පක්ෂි)** - Vitality birds (1 pt)
17. **Linga (ලිංග)** - Gender polarity (1 pt)
18. **Kula (කුල)** - Cultural demeanor (1 pt)
19. **Ayu (ආයු)** - Star longevity (1 pt)
20. **Ashtaka / Chitta (අෂ්ටක / චිත්ත)** - Intuitive mental resonance (1 pt)

Includes overall score percentage, pass/fail status, and critical alerts for **Rajju Dosha**, **Nadi Dosha**, and **Vedha Dosha**.

### 5. Zero Cloud Storage & Total Privacy
- All birth dates, times, and generated charts stay inside browser memory and `LocalStorage`.
- Zero database connections, zero third-party trackers, zero data collection.

### 6. Technical SEO & Subpath i18n
- Subpath routing: Sinhala default at `/` and English at `/en/`.
- Strict SEO rules: `<meta property="og:site_name" content="කේන්දරය | Kendaraya">`.
- Rich JSON-LD schemas embedded in `<head>`:
  - `WebApplication`
  - `ProductivityApplication`
  - `FAQPage` (targeting high-volume Sinhala search queries: *"online kendaraya hadanna"*, *"lagna satahana"*, *"porondam galapima online"*).

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v20+` or `v22+` (v24 tested)
- npm or pnpm

### Installation
```bash
git clone https://github.com/kendaraya/kendaraya.github.io.git
cd kendaraya.github.io
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:4321` in your browser.

### Production Build
```bash
npm run build
```
Generates a static site inside the `dist/` directory ready for deployment to GitHub Pages or any static host.

### Preview Production Build
```bash
npm run preview
```

---

## 🛠️ Tech Stack
- **Framework:** [Astro](https://astro.build) (Static Site Generation, Subpath i18n)
- **UI Architecture:** [React](https://react.dev) (Islands Architecture)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) (Warm pearl light mode & obsidian dark mode)
- **Ephemeris Engine:** [astronomy-engine](https://github.com/cosinekitty/astronomy) (VSOP87 & ELP2000 algorithms)
- **Typography:** Google Fonts (`Noto Sans Sinhala` & `Noto Serif Sinhala`)
- **Icons:** [lucide-react](https://lucide.dev)
- **Export:** [html-to-image](https://github.com/bubkoo/html-to-image) for high-resolution PNG downloads

---

## ☕ Support the Developer
If you find this free, privacy-first open-source astrology tool valuable, consider supporting ongoing development:

👉 **[Buy Me a Coffee](https://buymeacoffee.com/kisharadilz)**

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
