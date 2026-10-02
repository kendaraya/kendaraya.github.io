import React, { useState } from 'react';
import { TRANSLATIONS } from '../lib/translations';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface FaqSectionProps {
  lang: 'si' | 'en';
}

interface FaqItem {
  questionSi: string;
  questionEn: string;
  answerSi: string;
  answerEn: string;
}

export const FAQS: FaqItem[] = [
  {
    questionSi: 'මාර්ගගතව (Online) නොමිලේ කේන්දරයක් සාදාගන්නේ කෙසේද? (online kendaraya hadanna)',
    questionEn: 'How can I generate a free horoscope online using Kendaraya?',
    answerSi: 'කේන්දරය (kendaraya.github.io) වෙත පිවිස ඔබගේ නිවැරදි උපන් දිනය, උපන් වේලාව සහ ශ්‍රී ලංකාවේ උපන් දිස්ත්‍රික්කය තෝරා "කේන්දරය සාදන්න" බොත්තම ඔබන්න. තත්පරයකින් ඔබගේ ලග්නය, චන්ද්‍ර රාශිය, ජන්ම නැකත, පාදය, සාම්ප්‍රදායික කොටු කේන්දර සටහන සහ නවග්‍රහ පිහිටීම් සම්පූර්ණයෙන්ම නොමිලේ පරිගණක තිරයේ දිස්වේ.',
    answerEn: 'Simply visit kendaraya.github.io, select your date of birth, exact time, and birth district in Sri Lanka, then click "Generate Kendra Chart". Your Lagna (Ascendant), Moon sign, birth star (Nakshatra), quarter (Pada), and traditional 12-house diamond chart will be calculated and rendered instantly for free.',
  },
  {
    questionSi: 'මගේ උපන් දත්ත සහ කේන්දර තොරතුරු මෙහිදී ආරක්ෂිතද? (Zero-Server Privacy Guarantee)',
    questionEn: 'Is my personal birth information private and safe?',
    answerSi: 'ඔව්, 100% ක්ම ආරක්ෂිතයි. කේන්දරය නිර්මාණය කර ඇත්තේ කිසිදු සේවාදායකයකට (Cloud Servers / Databases) සම්බන්ධ නොවී 100% ක් ඔබගේම වෙබ් බ්‍රවුසරයේ (Client-Side) ක්‍රියාත්මක වන පරිදිය. ඔබ ඇතුළත් කරන කිසිදු දත්තයක් අප වෙත නොලැබෙන අතර බ්‍රවුසරය වැසූ පසු දත්ත ඔබේ උපාංගයෙන්ම පමණක් පාලනය වේ.',
    answerEn: 'Yes, 100% private. Kendaraya runs entirely client-side inside your browser. No databases, third-party trackers, or cloud servers receive your birth date, time, or coordinates. All mathematical and astronomical ephemeris algorithms execute strictly in your local device memory.',
  },
  {
    questionSi: 'විවාහ විසි (20) පොරොන්දම් ගැලපීම පරීක්ෂා කරන්නේ කෙසේද? (porondam galapima online)',
    questionEn: 'How does the online 20 Porondam marriage compatibility check work?',
    answerSi: 'මනාලයාගේ සහ මනාලියගේ ජන්ම නැකත් හා පාදයන් තෝරා "පොරොන්දම් පරීක්ෂා කරන්න" ක්ලික් කරන්න. සාම්ප්‍රදායික විසි පොරොන්දම් ක්‍රමවේදය (දින, ගණ, මාහේන්ද්‍ර, ස්ත්‍රී දීර්ඝ, යෝනි, රාශි, රාශ්‍යාධිපති, වශ්‍ය, රජ්ජු, වේධ, වර්ණ, නාඩි, ගෝත්‍ර, වෘක්ෂ, භූත, පක්ෂි, ලිංග, කුල, ආයු, අෂ්ටක) ඔස්සේ ලකුණු 53 ක පදනමකින් සම්පූර්ණ ගැලපීමේ ප්‍රතිශතය සහ රජ්ජු/නාඩි වැනි තීරණාත්මක දෝෂ පිළිබඳ සවිස්තර වාර්තාවක් ක්ෂණිකව ලැබේ.',
    answerEn: 'Select the birth stars and padas for both Groom and Bride, then click "Calculate Match". The engine automatically scores all 20 classical Sri Lankan Porondams (Dina, Gana, Mahendra, Stree Deergha, Yoni, Rashi, Rashi Adhipathi, Vashya, Rajju, Vedha, Varna, Nadi, Gotra, Vruksha, Bhuta, Pakshi, Linga, Kula, Ayu, Ashtaka), providing an overall compatibility percentage and highlighting critical doshas.',
  },
  {
    questionSi: 'ලග්න සටහන (Lagna Satahana) සහ චන්ද්‍ර රාශිය අතර වෙනස කුමක්ද?',
    questionEn: 'What is the difference between Lagna (Ascendant) and Moon Sign (Rashi)?',
    answerSi: 'ලග්නය යනු ඔබ උපදින මොහොතේ නැගෙනහිර ක්ෂිතිජයෙන් උදාවෙමින් පැවති රාශියයි (Ascendant). එය පුද්ගලයාගේ ශරීරය, බාහිර පෙනුම, පෞරුෂය සහ පොදු ජීවන ගමන තීරණය කරයි. චන්ද්‍ර රාශිය යනු උපන් මොහොතේ චන්ද්‍රයා තැන්පත්ව සිටි රාශියයි. එය පුද්ගලයාගේ මනස, චිත්තවේග හා මානසික නැඹුරුව ප්‍රකාශ කරයි.',
    answerEn: 'Lagna (Ascendant) is the zodiac sign rising on the eastern horizon at the exact minute and location of birth, governing the physical constitution, core vitality, and worldly trajectory. Moon Sign (Janma Rashi) is the sign where the Moon was positioned at birth, representing the emotional temperament, inner psyche, and instinctive reactions.',
  },
  {
    questionSi: 'රජ්ජු දෝෂය (Rajju Dosha) සහ නාඩි දෝෂය (Nadi Dosha) යනු මොනවාද?',
    questionEn: 'What are Rajju Dosha and Nadi Dosha in marriage matching?',
    answerSi: 'විසි පොරොන්දම් පරීක්ෂාවේදී රජ්ජු සහ නාඩි යනු අතිශය තීරණාත්මක පොරොන්දම් දෙකකි. දෙදෙනාම එකම රජ්ජුවකට (විශේෂයෙන් ශිරෝ රජ්ජුවට) අයත් වීම රජ්ජු දෝෂය ලෙස හැඳින්වෙන අතර එය විවාහක යුවළගේ ආයුෂ හා සෞඛ්‍යයට බලපෑම් කළ හැක. දෙදෙනාම එකම නාඩියට (වාත, පිත්ත, කඵ) අයත් වීමෙන් නාඩි දෝෂය හටගන්නා අතර එය ප්‍රජනන හා ජානමය අනුකූලතාව කෙරෙහි බලපායි.',
    answerEn: 'Rajju and Nadi are two of the most critical health and longevity parameters in Vedic matchmaking. When both partners belong to the same Rajju (especially Shiro Rajju), it forms Rajju Dosha, traditionally linked to marital longevity risks. Similarly, sharing the same Nadi (Vata, Pitta, or Kapha) constitutes Nadi Dosha, which ancient texts link to physiological discord and reproductive health.',
  },
  {
    questionSi: 'මෙම කේන්දර සටහන පින්තූරයක් (PNG) හෝ PDF ලෙස බාගත කරගත හැකිද?',
    questionEn: 'Can I export or print my Kendra chart as an image or PDF?',
    answerSi: 'ඔව්! ජන්ම කේන්දරය ගණනය කළ පසු දිස්වන "රූපයක් ලෙස බාගන්න (PNG)" බොත්තම එබීමෙන් හෝ "මුද්‍රණය / PDF ලෙස සුරකින්න" තේරීමෙන් ඉතා පැහැදිලි උසස් තත්ත්වයේ කේන්දර සටහනක් ඔබගේ පරිගණකයට හෝ දුරකථනයට නොමිලේ බාගත කරගත හැක.',
    answerEn: 'Yes! Once your chart is generated, use the "Export as Image (PNG)" button or the "Print / Save as PDF" option to download a high-resolution version of your horoscope directly to your phone or desktop.',
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq-section" className="w-full max-w-4xl mx-auto py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#757D6F]/15 dark:bg-[#757D6F]/30 text-[#2D0000] dark:text-[#EEEAD7] text-xs font-semibold mb-2 border border-[#757D6F]/30">
          <HelpCircle className="w-3.5 h-3.5 text-[#6D0808] dark:text-[#EEEAD7]" />
          FAQ
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#2D0000] dark:text-[#EEEAD7]">
          {t.faqTitle}
        </h2>
        <p className="text-sm text-[#4D453C] dark:text-[#D5D0BC] mt-1 max-w-xl mx-auto">
          {t.faqDesc}
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const q = lang === 'si' ? faq.questionSi : faq.questionEn;
          const a = lang === 'si' ? faq.answerSi : faq.answerEn;

          return (
            <div
              key={idx}
              className="bg-[#FAF8F1] dark:bg-[#280202] border border-[#757D6F]/25 dark:border-[#757D6F]/35 rounded-xl overflow-hidden transition-shadow duration-200 shadow-2xs hover:shadow-xs"
            >
              <button
                type="button"
                id={`faq-btn-${idx}`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                onClick={() => toggle(idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <span className="font-semibold text-[#2D0000] dark:text-[#EEEAD7] text-sm sm:text-base leading-snug">
                  {q}
                </span>
                <span className="p-1 rounded-full bg-[#EEEAD7]/80 dark:bg-[#1E0000] text-[#6D0808] dark:text-[#EEEAD7] flex-shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-btn-${idx}`}
                  className="px-5 pb-5 pt-1 text-sm text-[#4D453C] dark:text-[#D5D0BC] leading-relaxed border-t border-[#757D6F]/20"
                >
                  {a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
