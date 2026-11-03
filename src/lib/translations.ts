export interface TranslationDictionary {
  brandName: string;
  brandTagline: string;
  navKendra: string;
  navPorondam: string;
  navSubhaVelawa: string;
  navFaq: string;
  navSupport: string;
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
  privacyGuarantee: string;
  privacyBadge: string;
  
  // Kendra Form
  formTitle: string;
  formDesc: string;
  birthDateLabel: string;
  birthTimeLabel: string;
  hourLabel: string;
  minuteLabel: string;
  periodLabel: string;
  districtLabel: string;
  calculateBtn: string;
  calculatingBtn: string;
  resetBtn: string;
  nowBtn: string;

  // Kendra Results
  resultsTitle: string;
  resultsSub: string;
  lagnaLabel: string;
  moonSignLabel: string;
  birthStarLabel: string;
  padaLabel: string;
  ayanamsaLabel: string;
  chartHeading: string;
  chartHelpText: string;
  saveImageBtn: string;
  printPdfBtn: string;
  savedSuccess: string;
  
  // Table
  tableHeading: string;
  thPlanet: string;
  thRashi: string;
  thDegree: string;
  thNakshatra: string;
  thPada: string;
  thHouse: string;
  thStatus: string;
  directMotion: string;
  retrogradeMotion: string;

  // Interpretations
  insightsHeading: string;
  lagnaInsightTitle: string;
  moonInsightTitle: string;

  // Subha Velawa (Good Time Finder)
  subhaVelawaTitle: string;
  subhaVelawaSubtitle: string;
  selectDateLabel: string;
  todayBtn: string;
  tomorrowBtn: string;
  filterActivityLabel: string;
  allActivities: string;
  liveStatusTitle: string;
  rahuKalayaLabel: string;
  maruDirectionLabel: string;
  subhaDirectionLabel: string;
  bestWindowsHeading: string;
  allDayHorasHeading: string;
  suitableTasksHeading: string;
  avoidTasksHeading: string;

  // Porondam Section
  porondamTitle: string;
  porondamDesc: string;
  groomSectionTitle: string;
  brideSectionTitle: string;
  groomStarLabel: string;
  groomPadaLabel: string;
  brideStarLabel: string;
  bridePadaLabel: string;
  matchBtn: string;
  matchingBtn: string;
  porondamResultTitle: string;
  compatibilityScore: string;
  passedPorondams: string;
  verdictLabel: string;
  criticalNoticeTitle: string;
  allGoodNoticeTitle: string;
  allGoodNoticeDesc: string;
  
  // Porondam Table
  thNumber: string;
  thPorondamName: string;
  thGroomFactor: string;
  thBrideFactor: string;
  thResult: string;
  thPoints: string;
  thAnalysis: string;

  // FAQ
  faqTitle: string;
  faqDesc: string;

  // Footer
  footerDesc: string;
  footerPrivacy: string;
  footerRights: string;
  footerSupportNotice: string;
}

export const TRANSLATIONS: Record<'si' | 'en', TranslationDictionary> = {
  si: {
    brandName: 'කේන්දරය',
    brandTagline: '100% Client-Side සිංහල කේන්දර සහ විසි පොරොන්දම් ගැලපීමේ එන්ජිම',
    navKendra: 'කේන්දර සටහන',
    navSubhaVelawa: 'සුබ වේලාවන්',
    navPorondam: 'විසි පොරොන්දම්',
    navFaq: 'නිතර අසන පැන',
    navSupport: 'සහාය දක්වන්න (Buy Me a Coffee)',
    heroBadge: 'නොමිලේ • 100% බ්‍රවුසරය තුළ ගණනය කිරීම • පුද්ගලිකත්වය සුරක්ෂිතයි',
    heroTitle: 'නිවැරදි වේද හා සිංහල ජ්‍යොතිෂ',
    heroHighlight: 'කේන්දර සටහන හා විසි පොරොන්දම්',
    heroDesc: 'ඔබගේ උපන් දිනය, වේලාව සහ දිස්ත්‍රික්කය ඇතුළත් කර සම්ප්‍රදායික කේන්දර සටහන, ලග්නය, රාශිය, නැකත, වැඩ ඇල්ලීමට සුබ වේලාවන් සහ විවාහ විසි පොරොන්දම් ක්ෂණිකව නොමිලේ සාදාගන්න. කිසිදු දත්තයක් සේවාදායකයන් වෙත යැවීමකින් තොරව 100% ක් පරිගණකයේ හෝ දුරකථනයේ පමණක් ගණනය වේ.',
    privacyGuarantee: 'ඔබගේ උපන් දත්ත කිසිදු සේවාදායකයකට (Cloud/Server) යැවීමක් හෝ සුරැකීමක් සිදු නොවේ.',
    privacyBadge: '100% දත්ත පෞද්ගලිකත්වය සහතිකයි',

    formTitle: 'ජන්ම තොරතුරු ඇතුළත් කරන්න',
    formDesc: 'ශ්‍රී ලංකා සම්මත වේලාව (UTC+05:30) අනුව සියලු ගණනය කිරීම් නිවැරදි ලහිරි අයනාංශය සහිතව සිදු කෙරේ.',
    birthDateLabel: 'උපන් දිනය',
    birthTimeLabel: 'උපන් වේලාව',
    hourLabel: 'පැය',
    minuteLabel: 'මිනිත්තු',
    periodLabel: 'පෙ.ව. / ප.ව.',
    districtLabel: 'උපන් දිස්ත්‍රික්කය',
    calculateBtn: 'කේන්දරය සාදන්න',
    calculatingBtn: 'ගණනය වෙමින් පවතී...',
    resetBtn: 'නැවත මුල සිට',
    nowBtn: 'දැන් වේලාව',

    resultsTitle: 'ඔබගේ ජන්ම කේන්දර සටහන',
    resultsSub: 'සාම්ප්‍රදායික දියමන්ති/කොටු කේන්දරය සහ ග්‍රහ පිහිටීම් විග්‍රහය',
    lagnaLabel: 'ජන්ම ලග්නය',
    moonSignLabel: 'චන්ද්‍ර රාශිය',
    birthStarLabel: 'ජන්ම නැකත',
    padaLabel: 'පාදය',
    ayanamsaLabel: 'ලහිරි අයනාංශය',
    chartHeading: 'සාම්ප්‍රදායික ශ්‍රී ලාංකේය කේන්දර කොටුව',
    chartHelpText: 'භාවයක් මත ක්ලික් කිරීමෙන් හෝ කර්සරය ගෙන යාමෙන් අදාළ භාවයේ කාරකත්වය සහ ග්‍රහ විස්තර බලන්න.',
    saveImageBtn: 'රූපයක් ලෙස බාගන්න (PNG)',
    printPdfBtn: 'මුද්‍රණය / PDF ලෙස සුරකින්න',
    savedSuccess: 'කේන්දර සටහන සාර්ථකව සුරකින ලදී!',

    tableHeading: 'නවසග්‍රහ පිහිටීම් සහ භාව විග්‍රහය',
    thPlanet: 'ග්‍රහයා',
    thRashi: 'රාශිය',
    thDegree: 'අංශක / කලා',
    thNakshatra: 'නැකත',
    thPada: 'පාදය',
    thHouse: 'භාවය',
    thStatus: 'ගමන',
    directMotion: 'නිවෘත (සෘජු)',
    retrogradeMotion: 'වක්‍ර (R)',

    insightsHeading: 'ජන්ම කේන්දර විග්‍රහය සහ විශේෂ ලක්ෂණ',
    lagnaInsightTitle: 'ලග්න පෞරුෂය සහ ශරීර ස්වභාවය',
    moonInsightTitle: 'චන්ද්‍ර රාශිය සහ මානසික ලක්ෂණ',

    subhaVelawaTitle: 'වැඩ ඇල්ලීමට සුබ වේලාවන් සහ හෝරාවන්',
    subhaVelawaSubtitle: 'අද දවසේ සුබ හෝරාවන්, රාහු කාලය, මරු සිටින දිශාව සහ වැඩ ආරම්භයට සුබ මුහුර්ථ ක්ෂණිකව බලාගන්න.',
    selectDateLabel: 'දිනය තෝරන්න',
    todayBtn: 'අද දිනය',
    tomorrowBtn: 'හෙට දිනය',
    filterActivityLabel: 'කාර්යයේ ස්වභාවය අනුව තෝරන්න',
    allActivities: 'සියලුම හෝරාවන්',
    liveStatusTitle: 'මේ මොහොතේ තත්ත්වය (Live Right Now)',
    rahuKalayaLabel: 'රාහු කාලය',
    maruDirectionLabel: 'මරු සිටින දිශාව',
    subhaDirectionLabel: 'සුබ දිශාව (මුහුණ දිය යුතු)',
    bestWindowsHeading: 'වැඩ ඇල්ලීමට දවසේ ප්‍රශස්තම සුබ වේලාවන්',
    allDayHorasHeading: 'දවසේ හෝරා 12 සම්පූර්ණ කාලසටහන',
    suitableTasksHeading: 'සුදුසු කාර්යයන්',
    avoidTasksHeading: 'නොසුදුසු කාර්යයන්',

    porondamTitle: 'විවාහ විසි (20) පොරොන්දම් ගැලපීම',
    porondamDesc: 'මනාලයාගේ සහ මනාලියගේ ජන්ම නැකත හා පාදය තෝරා සාම්ප්‍රදායික විසි පොරොන්දම් පරික්ෂාව ක්ෂණිකව නොමිලේ සිදුකරන්න.',
    groomSectionTitle: 'මනාලයාගේ තොරතුරු',
    brideSectionTitle: 'මනාලියගේ තොරතුරු',
    groomStarLabel: 'මනාලයාගේ ජන්ම නැකත',
    groomPadaLabel: 'නැකත් පාදය',
    brideStarLabel: 'මනාලියගේ ජන්ම නැකත',
    bridePadaLabel: 'නැකත් පාදය',
    matchBtn: 'පොරොන්දම් පරීක්ෂා කරන්න',
    matchingBtn: 'පොරොන්දම් ගලපමින්...',
    porondamResultTitle: 'විවාහ ගැළපීමේ සමස්ත වාර්තාව',
    compatibilityScore: 'ගැලපීමේ ප්‍රතිශතය',
    passedPorondams: 'සමත්වූ පොරොන්දම් සංඛ්‍යාව',
    verdictLabel: 'සාම්ප්‍රදායික ජ්‍යොතිෂ නිගමනය',
    criticalNoticeTitle: 'විශේෂ අවධානය යොමු කළ යුතු දෝෂ',
    allGoodNoticeTitle: 'බරපතල දෝෂ කිසිවක් හමු නොවීය',
    allGoodNoticeDesc: 'රජ්ජු, නාඩි හෝ වේධ වැනි තීරණාත්මක විවාහ දෝෂ නොමැති අතර යුගදිවිය ඉතා සාමකාමීව හා වාසනාවන්තව ගෙවීමට සුදුසු සුබ සංයෝගයකි.',

    thNumber: 'අංකය',
    thPorondamName: 'පොරොන්දම',
    thGroomFactor: 'මනාලයා',
    thBrideFactor: 'මනාලිය',
    thResult: 'ප්‍රතිඵලය',
    thPoints: 'ලකුණු',
    thAnalysis: 'ජ්‍යොතිෂ විග්‍රහය',

    faqTitle: 'ජ්‍යොතිෂය හා කේන්දර පිළිබඳ නිතර අසන පැන',
    faqDesc: 'ඔන්ලයින් කේන්දර හැදීම, විසි පොරොන්දම්, ලග්න සටහන සහ දත්ත ආරක්ෂාව පිළිබඳ පැහැදිලි කිරීම්.',

    footerDesc: 'කේන්දරය (Kendaraya) යනු 100% බ්‍රවුසරය තුළ ක්‍රියාත්මක වන, සම්පූර්ණයෙන්ම නොමිලේ පිරිනමන ශ්‍රී ලාංකේය ජ්‍යොතිෂ ගණනය කිරීමේ මෘදුකාංගයකි.',
    footerPrivacy: 'කිසිදු දත්තයක් සේවාදායකයන් වෙත රැස් නොකෙරේ. ඔබගේ ජන්ම දත්ත ඔබගේම උපකරණයේ පමණක් ආරක්ෂිතව පවතී.',
    footerRights: 'සියලු හිමිකම් ඇවිරිණි.',
    footerSupportNotice: 'මෙම නොමිලේ පවතින විවෘත මෘදුකාංගය තවදුරටත් පවත්වා ගැනීමට නිර්මාණකරුට කෝපි කෝප්පයකින් සහාය වන්න.',
  },
  en: {
    brandName: 'Kendaraya',
    brandTagline: 'Free 100% Client-Side Sinhala Astrology & 20 Porondam Matching Engine',
    navKendra: 'Kendra Chart',
    navSubhaVelawa: 'Auspicious Times',
    navPorondam: '20 Porondam',
    navFaq: 'FAQ',
    navSupport: 'Buy Me a Coffee',
    heroBadge: 'Free • 100% Client-Side Browser Calculation • Zero Data Stored',
    heroTitle: 'Authentic Vedic & Sinhala Astrology',
    heroHighlight: 'Kendra Birth Chart & 20 Porondam',
    heroDesc: 'Generate your traditional Sri Lankan diamond birth chart, Lagna, Moon sign, Nakshatra, auspicious work timings (Subha Hora), and full 20 Porondam marriage compatibility score completely offline inside your browser. Absolute privacy guaranteed with zero server uploads.',
    privacyGuarantee: 'Your birth dates and chart details are strictly processed in-memory and never uploaded to any server.',
    privacyBadge: '100% Client-Side Privacy Guaranteed',

    formTitle: 'Enter Birth Information',
    formDesc: 'All calculations are computed using exact Sri Lanka Standard Time (UTC+05:30) and true Lahiri Ayanamsa.',
    birthDateLabel: 'Date of Birth',
    birthTimeLabel: 'Exact Time of Birth',
    hourLabel: 'Hour',
    minuteLabel: 'Minute',
    periodLabel: 'AM / PM',
    districtLabel: 'Birth District (Sri Lanka)',
    calculateBtn: 'Generate Kendra Chart',
    calculatingBtn: 'Calculating Ephemeris...',
    resetBtn: 'Reset',
    nowBtn: 'Current Time',

    resultsTitle: 'Your Kendra Birth Chart',
    resultsSub: 'Traditional Sri Lankan Diamond Chart and Planetary Coordinates',
    lagnaLabel: 'Ascendant (Lagna)',
    moonSignLabel: 'Moon Sign (Rashi)',
    birthStarLabel: 'Birth Star (Nakshatra)',
    padaLabel: 'Quarter (Pada)',
    ayanamsaLabel: 'Lahiri Ayanamsa',
    chartHeading: 'Traditional Sri Lankan 12-House Diamond Kendra Chart',
    chartHelpText: 'Click or hover on any house to inspect its significations, governing lord, and situated planets.',
    saveImageBtn: 'Export as Image (PNG)',
    printPdfBtn: 'Print / Save as PDF',
    savedSuccess: 'Chart saved successfully!',

    tableHeading: 'Planetary Positions & House Breakdown',
    thPlanet: 'Planet',
    thRashi: 'Zodiac Sign (Rashi)',
    thDegree: 'Degrees / Minutes',
    thNakshatra: 'Nakshatra',
    thPada: 'Pada',
    thHouse: 'House (Bhava)',
    thStatus: 'Motion',
    directMotion: 'Direct',
    retrogradeMotion: 'Retrograde (R)',

    insightsHeading: 'Astrological Overview & Key Significations',
    lagnaInsightTitle: 'Lagna Personality & Physical Constitution',
    moonInsightTitle: 'Moon Sign & Emotional Blueprint',

    subhaVelawaTitle: 'Auspicious Work Timing Finder (Subha Hora)',
    subhaVelawaSubtitle: 'Calculate today\'s auspicious planetary hours, Rahu Kalaya, and optimal facing directions to start new work and ventures in Sri Lanka.',
    selectDateLabel: 'Select Date',
    todayBtn: 'Today',
    tomorrowBtn: 'Tomorrow',
    filterActivityLabel: 'Activity / Task Category',
    allActivities: 'All Planetary Horas',
    liveStatusTitle: 'Current Status (Live Right Now)',
    rahuKalayaLabel: 'Rahu Kalaya',
    maruDirectionLabel: 'Inauspicious Direction (Maru)',
    subhaDirectionLabel: 'Auspicious Facing Direction',
    bestWindowsHeading: 'Top Recommended Windows to Begin Work',
    allDayHorasHeading: 'Full 12 Daytime Horas Breakdown',
    suitableTasksHeading: 'Favorable For',
    avoidTasksHeading: 'Avoid For',

    porondamTitle: '20 Porondam Marriage Compatibility Engine',
    porondamDesc: 'Select Groom and Bride birth nakshatras and padas to calculate all 20 traditional Sri Lankan marriage compatibility tests instantly.',
    groomSectionTitle: 'Groom (මනාලයා) Details',
    brideSectionTitle: 'Bride (මනාලිය) Details',
    groomStarLabel: 'Groom Birth Star (Nakshatra)',
    groomPadaLabel: 'Quarter (Pada)',
    brideStarLabel: 'Bride Birth Star (Nakshatra)',
    bridePadaLabel: 'Quarter (Pada)',
    matchBtn: 'Calculate 20 Porondam Match',
    matchingBtn: 'Analyzing Compatibility...',
    porondamResultTitle: 'Comprehensive Compatibility Assessment',
    compatibilityScore: 'Compatibility Score',
    passedPorondams: 'Porondams Passed',
    verdictLabel: 'Astrological Verdict',
    criticalNoticeTitle: 'Critical Astrological Doshas Identified',
    allGoodNoticeTitle: 'No Critical Doshas Found',
    allGoodNoticeDesc: 'Free of critical marriage afflictions such as Rajju Dosha, Nadi Dosha, and Vedha Dosha. Auspicious for peaceful lifelong partnership.',

    thNumber: '#',
    thPorondamName: 'Porondama',
    thGroomFactor: 'Groom',
    thBrideFactor: 'Bride',
    thResult: 'Status',
    thPoints: 'Points',
    thAnalysis: 'Traditional Analysis',

    faqTitle: 'Frequently Asked Questions (FAQ)',
    faqDesc: 'Everything you need to know about online Kendra generation, 20 Porondam matching, and data security.',

    footerDesc: 'Kendaraya is a 100% client-side, zero-server Sri Lankan Sinhala astrology calculation engine offered completely free.',
    footerPrivacy: 'No personal birth information is ever uploaded, stored, or tracked on cloud servers.',
    footerRights: 'All rights reserved.',
    footerSupportNotice: 'Support the ongoing open-source development of Kendaraya with a coffee.',
  },
};
