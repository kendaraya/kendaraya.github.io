import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../lib/translations';
import {
  Sun,
  Moon,
  Coffee,
  Menu,
  X,
  Compass,
} from 'lucide-react';

interface NavbarProps {
  lang: 'si' | 'en';
}

export const Navbar: React.FC<NavbarProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check if html element already has 'dark' class applied by BaseLayout inline script
    const hasDarkClass = document.documentElement.classList.contains('dark');
    setIsDark(hasDarkClass);
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    if (isCurrentlyDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#EEEAD7]/95 dark:bg-[#200000]/95 border-b border-[#757D6F]/25 dark:border-[#757D6F]/30 transition-colors duration-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href={lang === 'si' ? '/' : '/en/'} className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-[#6D0808] to-[#991B1B] text-[#EEEAD7] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="font-bold text-lg sm:text-xl text-[#2D0000] dark:text-[#EEEAD7] tracking-tight flex items-center gap-1.5">
              {t.brandName}
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#6D0808]/15 dark:bg-[#6D0808]/40 text-[#6D0808] dark:text-[#EEEAD7] border border-[#6D0808]/30 font-mono font-medium">
                Free
              </span>
            </span>
            <span className="hidden sm:block text-[10px] text-[#757D6F] dark:text-[#C5BFAC] -mt-0.5 font-medium">
              Client-Side Ephemeris Engine
            </span>
          </div>
        </a>

        {/* Desktop Nav Items (Visible only on Large Screens >= 1024px) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#2D0000]/80 dark:text-[#EEEAD7]/80">
          <a
            href="#kendra-calculator"
            className="hover:text-[#6D0808] dark:hover:text-[#EEEAD7] transition-colors"
          >
            {t.navKendra}
          </a>
          <a
            href="#subha-velawa-section"
            className="hover:text-[#6D0808] dark:hover:text-[#EEEAD7] transition-colors"
          >
            {t.navSubhaVelawa}
          </a>
          <a
            href="#porondam-section"
            className="hover:text-[#6D0808] dark:hover:text-[#EEEAD7] transition-colors"
          >
            {t.navPorondam}
          </a>
          <a
            href="#faq-section"
            className="hover:text-[#6D0808] dark:hover:text-[#EEEAD7] transition-colors"
          >
            {t.navFaq}
          </a>
        </nav>

        {/* Desktop Action Controls (Visible only on Large Screens >= 1024px) */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex items-center rounded-lg border border-[#757D6F]/30 p-0.5 bg-[#FAF8F1] dark:bg-[#1A0000] text-xs font-semibold">
            <a
              href="/"
              className={`px-2.5 py-1 rounded-md transition-all ${
                lang === 'si'
                  ? 'bg-[#6D0808] text-[#EEEAD7] shadow-2xs'
                  : 'text-[#757D6F] dark:text-[#C4C0AE] hover:text-[#2D0000] dark:hover:text-[#EEEAD7]'
              }`}
            >
              සිංහල
            </a>
            <a
              href="/en/"
              className={`px-2.5 py-1 rounded-md transition-all ${
                lang === 'en'
                  ? 'bg-[#6D0808] text-[#EEEAD7] shadow-2xs'
                  : 'text-[#757D6F] dark:text-[#C4C0AE] hover:text-[#2D0000] dark:hover:text-[#EEEAD7]'
              }`}
            >
              English
            </a>
          </div>

          {/* Dark Mode Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-[#757D6F]/30 text-[#2D0000] dark:text-[#EEEAD7] hover:bg-[#757D6F]/15 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#EEEAD7]" /> : <Moon className="w-4 h-4 text-[#6D0808]" />}
          </button>

          {/* Buy Me a Coffee Support Button */}
          <a
            href="https://buymeacoffee.com/kisharadilz"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-linear-to-r from-[#6D0808] to-[#8C1414] hover:from-[#540606] hover:to-[#6D0808] text-[#EEEAD7] font-semibold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>{lang === 'si' ? 'සහාය දක්වන්න' : 'Buy Me a Coffee'}</span>
          </a>
        </div>

        {/* Mobile & Tablet Toggle Bar (Visible on all screens < 1024px including tablets) */}
        <div className="flex lg:hidden items-center gap-2.5">
          {/* Quick Language Toggle in Mobile/Tablet Header */}
          <div className="flex items-center rounded-lg border border-[#757D6F]/30 p-0.5 bg-[#FAF8F1] dark:bg-[#1A0000] text-xs font-semibold">
            <a
              href="/"
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                lang === 'si'
                  ? 'bg-[#6D0808] text-[#EEEAD7] shadow-2xs'
                  : 'text-[#757D6F] dark:text-[#C4C0AE]'
              }`}
            >
              සිං
            </a>
            <a
              href="/en/"
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                lang === 'en'
                  ? 'bg-[#6D0808] text-[#EEEAD7] shadow-2xs'
                  : 'text-[#757D6F] dark:text-[#C4C0AE]'
              }`}
            >
              EN
            </a>
          </div>

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-[#757D6F]/30 text-[#2D0000] dark:text-[#EEEAD7] hover:bg-[#757D6F]/15 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#EEEAD7]" /> : <Moon className="w-4 h-4 text-[#6D0808]" />}
          </button>

          {/* Hamburger / Close Toggle Button for Mobile and Tablets */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded-lg border border-[#757D6F]/30 text-[#2D0000] dark:text-[#EEEAD7] hover:bg-[#757D6F]/15 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#6D0808]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Drawer Menu for Mobile & Tablet (< 1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 sm:px-6 pt-3 pb-6 border-t border-[#757D6F]/30 bg-[#EEEAD7]/98 dark:bg-[#200000]/98 backdrop-blur-xl shadow-lg space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5 pt-1 text-sm font-medium">
            <a
              href="#kendra-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl hover:bg-[#6D0808]/10 dark:hover:bg-[#6D0808]/30 text-[#2D0000] dark:text-[#EEEAD7] transition-colors font-medium flex items-center justify-between"
            >
              <span>{t.navKendra}</span>
              <span className="text-xs text-[#757D6F] font-mono">#01</span>
            </a>
            <a
              href="#subha-velawa-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl hover:bg-[#6D0808]/10 dark:hover:bg-[#6D0808]/30 text-[#2D0000] dark:text-[#EEEAD7] transition-colors font-medium flex items-center justify-between"
            >
              <span>{t.navSubhaVelawa}</span>
              <span className="text-xs text-[#757D6F] font-mono">#02</span>
            </a>
            <a
              href="#porondam-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl hover:bg-[#6D0808]/10 dark:hover:bg-[#6D0808]/30 text-[#2D0000] dark:text-[#EEEAD7] transition-colors font-medium flex items-center justify-between"
            >
              <span>{t.navPorondam}</span>
              <span className="text-xs text-[#757D6F] font-mono">#03</span>
            </a>
            <a
              href="#faq-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl hover:bg-[#6D0808]/10 dark:hover:bg-[#6D0808]/30 text-[#2D0000] dark:text-[#EEEAD7] transition-colors font-medium flex items-center justify-between"
            >
              <span>{t.navFaq}</span>
              <span className="text-xs text-[#757D6F] font-mono">#04</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#757D6F]/30">
            {/* Full Language Selector */}
            <div className="flex items-center rounded-xl border border-[#757D6F]/30 p-1 bg-[#FAF8F1] dark:bg-[#1A0000] text-xs font-semibold">
              <a
                href="/"
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  lang === 'si'
                    ? 'bg-[#6D0808] text-[#EEEAD7] shadow-2xs font-bold'
                    : 'text-[#757D6F] dark:text-[#C4C0AE]'
                }`}
              >
                සිංහල
              </a>
              <a
                href="/en/"
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  lang === 'en'
                    ? 'bg-[#6D0808] text-[#EEEAD7] shadow-2xs font-bold'
                    : 'text-[#757D6F] dark:text-[#C4C0AE]'
                }`}
              >
                English
              </a>
            </div>

            {/* Support Developer Button */}
            <a
              href="https://buymeacoffee.com/kisharadilz"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-linear-to-r from-[#6D0808] to-[#8C1414] hover:from-[#540606] hover:to-[#6D0808] text-[#EEEAD7] font-semibold text-xs flex items-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <Coffee className="w-4 h-4" />
              <span>{lang === 'si' ? 'සහාය දක්වන්න (Coffee)' : 'Buy Me a Coffee'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
