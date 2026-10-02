import React from 'react';
import { TRANSLATIONS } from '../lib/translations';
import { Compass, Coffee, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  lang: 'si' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="w-full border-t border-[#757D6F]/25 dark:border-[#757D6F]/30 bg-[#E2DCBE]/70 dark:bg-[#1A0000] py-12 transition-colors mt-20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#6D0808] text-[#EEEAD7] flex items-center justify-center font-bold shadow-xs">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-[#2D0000] dark:text-[#EEEAD7]">
                {t.brandName}
              </span>
            </div>
            <p className="text-sm text-[#4D453C] dark:text-[#D5D0BC] max-w-md leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#757D6F]/15 dark:bg-[#757D6F]/25 text-[#2D0000] dark:text-[#EEEAD7] text-xs font-medium border border-[#757D6F]/30">
              <ShieldCheck className="w-4 h-4 text-[#6D0808] dark:text-[#EEEAD7]" />
              <span>{t.footerPrivacy}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D0000] dark:text-[#EEEAD7]">
              {lang === 'si' ? 'සේවා' : 'Features'}
            </h4>
            <ul className="space-y-1.5 text-sm text-[#4D453C] dark:text-[#D5D0BC]">
              <li>
                <a href="#kendra-calculator" className="hover:text-[#6D0808] dark:hover:text-[#EEEAD7] transition-colors">
                  {t.navKendra}
                </a>
              </li>
              <li>
                <a href="#subha-velawa-section" className="hover:text-[#6D0808] dark:hover:text-[#EEEAD7] transition-colors">
                  {t.navSubhaVelawa}
                </a>
              </li>
              <li>
                <a href="#porondam-section" className="hover:text-[#6D0808] dark:hover:text-[#EEEAD7] transition-colors">
                  {t.navPorondam}
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-[#6D0808] dark:hover:text-[#EEEAD7] transition-colors">
                  {t.navFaq}
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Support */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D0000] dark:text-[#EEEAD7]">
              {lang === 'si' ? 'සහාය සහ සම්බන්ධතා' : 'Support & Contact'}
            </h4>
            <p className="text-xs text-[#757D6F] dark:text-[#C5BFAC] leading-relaxed">
              {t.footerSupportNotice}
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://buymeacoffee.com/kisharadilz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#6D0808] hover:bg-[#520606] text-[#EEEAD7] text-xs font-bold transition-all shadow-xs"
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>Buy Me a Coffee</span>
              </a>

              <a
                href="https://github.com/kendaraya/kendaraya.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-[#757D6F]/40 text-[#2D0000] dark:text-[#EEEAD7] hover:bg-[#757D6F]/15 text-xs font-medium transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#757D6F]/25 dark:border-[#757D6F]/30 flex flex-wrap items-center justify-between gap-4 text-xs text-[#757D6F] dark:text-[#C5BFAC]">
          <div>
            © {new Date().getFullYear()} {t.brandName} (kendaraya.github.io). {t.footerRights}
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#6D0808] fill-current inline" />
            <span>for Sri Lankan Astrology</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
