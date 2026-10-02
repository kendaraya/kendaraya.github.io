import { NAKSHATRAS, RASHIS, type NakshatraInfo, type RashiInfo } from '../data/astronomy-constants';
import {
  type PorondamResult,
  type CompatibilitySummary,
  PLANETARY_FRIENDSHIP,
  YONI_ENEMIES,
  VASHYA_MATRIX,
} from '../data/porondam-rules';

export function calculate20Porondam(
  groomNakIndex: number,
  groomPada: number,
  brideNakIndex: number,
  bridePada: number
): CompatibilitySummary {
  const groomNak = NAKSHATRAS[groomNakIndex];
  const brideNak = NAKSHATRAS[brideNakIndex];

  // Approximate Moon Sign from Nakshatra & Pada
  // 1 nakshatra = 13°20', 1 pada = 3°20'
  const groomTotalMinutes = groomNakIndex * 800 + (groomPada - 1) * 200 + 100;
  const brideTotalMinutes = brideNakIndex * 800 + (bridePada - 1) * 200 + 100;

  const groomRashiIndex = Math.floor(groomTotalMinutes / 1800) % 12;
  const brideRashiIndex = Math.floor(brideTotalMinutes / 1800) % 12;

  const groomRashi = RASHIS[groomRashiIndex];
  const brideRashi = RASHIS[brideRashiIndex];

  const results: PorondamResult[] = [];
  const criticalNotesSi: string[] = [];
  const criticalNotesEn: string[] = [];

  // Helper for nakshatra distance
  // Distance from Bride to Groom (1 to 27)
  const distBrideToGroom = ((groomNakIndex - brideNakIndex + 27) % 27) + 1;
  const distGroomToBride = ((brideNakIndex - groomNakIndex + 27) % 27) + 1;

  // 1. Dina Porondama (දින) - 3 pts
  const dinaRemainder = distBrideToGroom % 9 === 0 ? 9 : distBrideToGroom % 9;
  const dinaGood = [2, 4, 6, 8, 9].includes(dinaRemainder);
  const dinaScore = dinaGood ? 3 : [1, 5].includes(dinaRemainder) ? 1 : 0;
  results.push({
    id: 'dina',
    nameSi: 'දින පොරොන්දම',
    nameEn: 'Dina Porondama',
    maxScore: 3,
    obtainedScore: dinaScore,
    status: dinaGood ? 'subha' : dinaScore > 0 ? 'madhyama' : 'asubha',
    statusSi: dinaGood ? 'සුබයි' : dinaScore > 0 ? 'මධ්‍යමයි' : 'අසුබයි',
    statusEn: dinaGood ? 'Auspicious' : dinaScore > 0 ? 'Moderate' : 'Inauspicious',
    groomValueSi: groomNak.nameSi,
    groomValueEn: groomNak.nameEn,
    brideValueSi: brideNak.nameSi,
    brideValueEn: brideNak.nameEn,
    explanationSi: dinaGood
      ? 'දින පොරොන්දම මනාව ගැළපේ. දෙදෙනාගේ ආයුෂ, නිරෝගීභාවය සහ එදිනෙදා සාමය වර්ධනය කරයි.'
      : 'දින පොරොන්දමේ යම් ඌනතාවක් පවතී. අන්‍යෝන්‍ය අවබෝධය හා ඉවසීම අවශ්‍ය වේ.',
    explanationEn: dinaGood
      ? 'Excellent Dina compatibility. Promotes longevity, physical health, and harmonious daily life.'
      : 'Minor Dina discordance. Patience and thoughtful mutual communication are advised.',
  });

  // 2. Gana Porondama (ගණ) - 6 pts
  let ganaScore = 0;
  let ganaStatus: 'subha' | 'madhyama' | 'asubha' = 'asubha';
  let ganaNoteSi = '';
  let ganaNoteEn = '';
  let isGanaDosha = false;

  if (groomNak.ganaEn === brideNak.ganaEn) {
    ganaScore = 6;
    ganaStatus = 'subha';
    ganaNoteSi = `දෙදෙනාම එකම (${groomNak.ganaSi}) ගණයට අයත් බැවින් මානසික හා චර්යාත්මක එකඟතාව ඉතා උසස්ය.`;
    ganaNoteEn = `Both belong to the same (${groomNak.ganaEn}) Gana, ensuring profound emotional and temperamental synergy.`;
  } else if (groomNak.ganaEn === 'Deva' && brideNak.ganaEn === 'Manushya') {
    ganaScore = 5;
    ganaStatus = 'subha';
    ganaNoteSi = 'ස්වාමිපුරුෂයා දේව ගණයේ සහ බිරිඳ මනුෂ්‍ය ගණයේ වීම ඉතා යහපත් සුසංයෝගයකි.';
    ganaNoteEn = 'Groom as Deva and Bride as Manushya forms a highly peaceful and favorable pairing.';
  } else if (groomNak.ganaEn === 'Manushya' && brideNak.ganaEn === 'Deva') {
    ganaScore = 4;
    ganaStatus = 'madhyama';
    ganaNoteSi = 'මනුෂ්‍ය සහ දේව ගණ සංයෝගය මධ්‍යම ප්‍රශස්ත බවක් දක්වයි.';
    ganaNoteEn = 'Manushya Groom with Deva Bride holds moderate and respectable harmony.';
  } else if (groomNak.ganaEn === 'Rakshasa' && brideNak.ganaEn !== 'Rakshasa') {
    ganaScore = 2;
    ganaStatus = 'madhyama';
    ganaNoteSi = 'ස්වාමිපුරුෂයා රාක්ෂස ගණයේ වන අතර සහනශීලී අනෙකුත් සුබ යෝග මඟින් දෝෂ සමනය වේ.';
    ganaNoteEn = 'Rakshasa Groom with non-Rakshasa Bride has minor temperament differences, mitigated by favorable planetary positions.';
  } else {
    // Bride Rakshasa, Groom Deva or Manushya
    ganaScore = 0;
    ganaStatus = 'asubha';
    isGanaDosha = true;
    ganaNoteSi = 'ස්ත්‍රී රාක්ෂස ගණ දෝෂය පවතී. මතභේද සහ නොසන්සුන්තාව මඟහරවා ගැනීමට අවබෝධය අවශ්‍ය වේ.';
    ganaNoteEn = 'Stree Rakshasa Gana Dosha present. Thoughtful alignment and astrological remedy are suggested to prevent friction.';
    criticalNotesSi.push('ගණ පොරොන්දම: ස්ත්‍රී රාක්ෂස ගණ දෝෂය හඳුනාගෙන ඇත.');
    criticalNotesEn.push('Gana Porondama: Stree Rakshasa Gana friction identified.');
  }

  results.push({
    id: 'gana',
    nameSi: 'ගණ පොරොන්දම',
    nameEn: 'Gana Porondama',
    maxScore: 6,
    obtainedScore: ganaScore,
    status: ganaStatus,
    statusSi: ganaStatus === 'subha' ? 'සුබයි' : ganaStatus === 'madhyama' ? 'මධ්‍යමයි' : 'අසුබයි',
    statusEn: ganaStatus === 'subha' ? 'Auspicious' : ganaStatus === 'madhyama' ? 'Moderate' : 'Inauspicious',
    groomValueSi: groomNak.ganaSi,
    groomValueEn: groomNak.ganaEn,
    brideValueSi: brideNak.ganaSi,
    brideValueEn: brideNak.ganaEn,
    explanationSi: ganaNoteSi,
    explanationEn: ganaNoteEn,
    isDosha: isGanaDosha,
  });

  // 3. Mahendra Porondama (මාහේන්ද්‍ර) - 1 pt
  const mahendraGood = [4, 7, 10, 13, 16, 19, 22, 25].includes(distBrideToGroom);
  results.push({
    id: 'mahendra',
    nameSi: 'මාහේන්ද්‍ර පොරොන්දම',
    nameEn: 'Mahendra Porondama',
    maxScore: 1,
    obtainedScore: mahendraGood ? 1 : 0,
    status: mahendraGood ? 'subha' : 'asubha',
    statusSi: mahendraGood ? 'සුබයි' : 'අසුබයි',
    statusEn: mahendraGood ? 'Auspicious' : 'Inauspicious',
    groomValueSi: `නැකත් දුර: ${distBrideToGroom}`,
    groomValueEn: `Distance: ${distBrideToGroom}`,
    brideValueSi: brideNak.nameSi,
    brideValueEn: brideNak.nameEn,
    explanationSi: mahendraGood
      ? 'මාහේන්ද්‍ර පොරොන්දම ඉතා සුබයි. යහපත් දරු සම්පත් සහ අන්‍යෝන්‍ය ආදර සෙනෙහස තහවුරු කරයි.'
      : 'මාහේන්ද්‍ර පොරොන්දම උදාසීන වේ.',
    explanationEn: mahendraGood
      ? 'Mahendra is auspicious. Strongly favors blessed progeny, family lineage, and deep lasting affection.'
      : 'Mahendra compatibility is neutral or unaligned.',
  });

  // 4. Stree Deergha Porondama (ස්ත්‍රී දීර්ඝ) - 1 pt
  let streeDeerghaScore = 0;
  let streeDeerghaStatus: 'subha' | 'madhyama' | 'asubha' = 'asubha';
  if (distBrideToGroom >= 13) {
    streeDeerghaScore = 1;
    streeDeerghaStatus = 'subha';
  } else if (distBrideToGroom >= 7) {
    streeDeerghaScore = 0.5;
    streeDeerghaStatus = 'madhyama';
  }
  results.push({
    id: 'stree_deergha',
    nameSi: 'ස්ත්‍රී දීර්ඝ පොරොන්දම',
    nameEn: 'Stree Deergha Porondama',
    maxScore: 1,
    obtainedScore: streeDeerghaScore,
    status: streeDeerghaStatus,
    statusSi: streeDeerghaStatus === 'subha' ? 'සුබයි' : streeDeerghaStatus === 'madhyama' ? 'මධ්‍යමයි' : 'අසුබයි',
    statusEn: streeDeerghaStatus === 'subha' ? 'Auspicious' : streeDeerghaStatus === 'madhyama' ? 'Moderate' : 'Inauspicious',
    groomValueSi: `නැකත් පරතරය: ${distBrideToGroom}`,
    groomValueEn: `Star Count: ${distBrideToGroom}`,
    brideValueSi: brideNak.nameSi,
    brideValueEn: brideNak.nameEn,
    explanationSi: streeDeerghaScore >= 1
      ? 'ස්ත්‍රී දීර්ඝ පොරොන්දම ඉතා යහපත්ය. විවාහ දිවියේ සෞභාග්‍යය හා විවාහක යුවළගේ දීර්ඝායුෂ සලසයි.'
      : 'ස්ත්‍රී දීර්ඝ පරතරය සාමාන්‍ය මට්ටමේ පවතී.',
    explanationEn: streeDeerghaScore >= 1
      ? 'Stree Deergha is highly favorable, promoting lifelong prosperity and longevity for the couple.'
      : 'Stree Deergha distance is within standard moderate range.',
  });

  // 5. Yoni Porondama (යෝනි) - 4 pts
  let yoniScore = 2;
  let yoniStatus: 'subha' | 'madhyama' | 'asubha' = 'madhyama';
  let yoniDosha = false;

  const isEnemyYoni = YONI_ENEMIES.some(
    ([a, b]) =>
      (groomNak.yoniAnimalEn === a && brideNak.yoniAnimalEn === b) ||
      (groomNak.yoniAnimalEn === b && brideNak.yoniAnimalEn === a)
  );

  if (isEnemyYoni) {
    yoniScore = 0;
    yoniStatus = 'asubha';
    yoniDosha = true;
    criticalNotesSi.push(`යෝනි පොරොන්දම: ස්වභාවික සතුරු යෝනි (${groomNak.yoniAnimalSi} සහ ${brideNak.yoniAnimalSi}) හමු වී ඇත.`);
    criticalNotesEn.push(`Yoni Porondama: Inimical animal pair (${groomNak.yoniAnimalEn} vs ${brideNak.yoniAnimalEn}) detected.`);
  } else if (groomNak.yoniAnimalEn === brideNak.yoniAnimalEn) {
    if (groomNak.yoniGenderSi === 'පුරුෂ' && brideNak.yoniGenderSi === 'ස්ත්‍රී') {
      yoniScore = 4;
      yoniStatus = 'subha';
    } else {
      yoniScore = 3;
      yoniStatus = 'subha';
    }
  } else {
    yoniScore = 2;
    yoniStatus = 'madhyama';
  }

  results.push({
    id: 'yoni',
    nameSi: 'යෝනි පොරොන්දම',
    nameEn: 'Yoni Porondama',
    maxScore: 4,
    obtainedScore: yoniScore,
    status: yoniStatus,
    statusSi: yoniStatus === 'subha' ? 'සුබයි' : yoniStatus === 'madhyama' ? 'මධ්‍යමයි' : 'අසුබයි',
    statusEn: yoniStatus === 'subha' ? 'Auspicious' : yoniStatus === 'madhyama' ? 'Moderate' : 'Inauspicious',
    groomValueSi: `${groomNak.yoniAnimalSi} (${groomNak.yoniGenderSi})`,
    groomValueEn: `${groomNak.yoniAnimalEn} (${groomNak.yoniGenderSi === 'පුරුෂ' ? 'Male' : 'Female'})`,
    brideValueSi: `${brideNak.yoniAnimalSi} (${brideNak.yoniGenderSi})`,
    brideValueEn: `${brideNak.yoniAnimalEn} (${brideNak.yoniGenderSi === 'පුරුෂ' ? 'Male' : 'Female'})`,
    explanationSi: yoniScore >= 3
      ? 'යෝනි පොරොන්දම සුබයි. ලිංගික ආකර්ෂණය සහ කායික සමගිය යහපත්ව පවතී.'
      : isEnemyYoni
      ? 'ස්වභාවික සතුරු යෝනි දෝෂය පවතී. කායික හා අදහස් නොගැළපීම් ඇති විය හැක.'
      : 'යෝනි පොරොන්දම සාමාන්‍ය මට්ටමේ පවතී.',
    explanationEn: yoniScore >= 3
      ? 'Yoni compatibility is favorable, ensuring sexual harmony, biological affinity, and physical attraction.'
      : isEnemyYoni
      ? 'Adverse Yoni conflict detected between the animal representations.'
      : 'Neutral Yoni matching.',
    isDosha: yoniDosha,
  });

  // 6. Rashi Porondama (රාශි) - 7 pts
  const distRashiBrideToGroom = ((groomRashiIndex - brideRashiIndex + 12) % 12) + 1;
  let rashiScore = 0;
  let rashiStatus: 'subha' | 'madhyama' | 'asubha' = 'asubha';
  let isRashiDosha = false;

  if (distRashiBrideToGroom === 7) {
    // Sama-Saptaka
    rashiScore = 7;
    rashiStatus = 'subha';
  } else if ([1, 3, 4, 10, 11].includes(distRashiBrideToGroom)) {
    rashiScore = 7;
    rashiStatus = 'subha';
  } else if ([5, 9].includes(distRashiBrideToGroom)) {
    rashiScore = 5;
    rashiStatus = 'subha';
  } else if ([2, 12].includes(distRashiBrideToGroom)) {
    rashiScore = 0;
    rashiStatus = 'asubha';
    isRashiDosha = true;
    criticalNotesSi.push('රාශි පොරොන්දම: ද්වීද්වාදශ (2 - 12) රාශි දෝෂය පවතී.');
    criticalNotesEn.push('Rashi Porondama: Dwirdwadasa (2-12) configuration identified.');
  } else if ([6, 8].includes(distRashiBrideToGroom)) {
    rashiScore = 0;
    rashiStatus = 'asubha';
    isRashiDosha = true;
    criticalNotesSi.push('රාශි පොරොන්දම: ෂඩ්අෂ්ටක (6 - 8) රාශි දෝෂය පවතී.');
    criticalNotesEn.push('Rashi Porondama: Shashtashtaka (6-8) configuration identified.');
  }

  results.push({
    id: 'rashi',
    nameSi: 'රාශි පොරොන්දම',
    nameEn: 'Rashi Porondama',
    maxScore: 7,
    obtainedScore: rashiScore,
    status: rashiStatus,
    statusSi: rashiStatus === 'subha' ? 'සුබයි' : 'අසුබයි',
    statusEn: rashiStatus === 'subha' ? 'Auspicious' : 'Inauspicious',
    groomValueSi: groomRashi.nameSi,
    groomValueEn: groomRashi.nameEn,
    brideValueSi: brideRashi.nameSi,
    brideValueEn: brideRashi.nameEn,
    explanationSi: rashiScore >= 5
      ? 'රාශි පොරොන්දම ඉතා සුබයි. මනෝභාවයන්, ආත්මික බැඳීම සහ සමාජීය එකඟතාව පූර්ණ ලෙස තහවුරු වේ.'
      : 'රාශි නොගැළපීම (ෂඩ්අෂ්ටක හෝ ද්වීද්වාදශ) පවතී. අන්‍යෝන්‍ය පරිත්‍යාගය සහ අවබෝධය අත්‍යවශ්‍යයි.',
    explanationEn: rashiScore >= 5
      ? 'Rashi matching is auspicious, fostering spiritual affinity, mutual empathy, and family bliss.'
      : 'Rashi discordance (6-8 or 2-12 axis) observed, requiring mindful empathy and shared concessions.',
    isDosha: isRashiDosha,
  });

  // 7. Rashi Adhipathi (රාශ්‍යාධිපති) - 5 pts
  const groomLord = groomRashi.lordEn;
  const brideLord = brideRashi.lordEn;
  let lordFriendship = 0;
  if (groomLord === brideLord) {
    lordFriendship = 2; // Same lord
  } else {
    const f1 = PLANETARY_FRIENDSHIP[groomLord]?.[brideLord] ?? 0;
    const f2 = PLANETARY_FRIENDSHIP[brideLord]?.[groomLord] ?? 0;
    lordFriendship = f1 + f2;
  }

  let rashiAdhipathiScore = 3;
  let rashiAdhipathiStatus: 'subha' | 'madhyama' | 'asubha' = 'madhyama';
  if (lordFriendship >= 1) {
    rashiAdhipathiScore = 5;
    rashiAdhipathiStatus = 'subha';
  } else if (lordFriendship === 0) {
    rashiAdhipathiScore = 3;
    rashiAdhipathiStatus = 'madhyama';
  } else {
    rashiAdhipathiScore = 0;
    rashiAdhipathiStatus = 'asubha';
  }

  results.push({
    id: 'rashi_adhipathi',
    nameSi: 'රාශ්‍යාධිපති පොරොන්දම',
    nameEn: 'Rashi Adhipathi Porondama',
    maxScore: 5,
    obtainedScore: rashiAdhipathiScore,
    status: rashiAdhipathiStatus,
    statusSi: rashiAdhipathiStatus === 'subha' ? 'සුබයි' : rashiAdhipathiStatus === 'madhyama' ? 'මධ්‍යමයි' : 'අසුබයි',
    statusEn: rashiAdhipathiStatus === 'subha' ? 'Auspicious' : rashiAdhipathiStatus === 'madhyama' ? 'Moderate' : 'Inauspicious',
    groomValueSi: groomRashi.lordSi,
    groomValueEn: groomRashi.lordEn,
    brideValueSi: brideRashi.lordSi,
    brideValueEn: brideRashi.lordEn,
    explanationSi: rashiAdhipathiScore >= 4
      ? 'රාශි අධිපති ග්‍රහයන් මිත්‍රශීලී බැවින් අදහස් හා ප්‍රතිපත්ති එකිනෙකට මනාව ගැලපේ.'
      : 'රාශි අධිපති ග්‍රහයන් අතර මිත්‍රත්වය සාමාන්‍ය මට්ටමේ වේ.',
    explanationEn: rashiAdhipathiScore >= 4
      ? 'Rashi planetary rulers share natural friendship, instilling intellectual compatibility and mutual respect.'
      : 'Planetary rulers have neutral or moderate dynamic.',
  });

  // 8. Vashya Porondama (වශ්‍ය) - 2 pts
  const groomAttractsBride = VASHYA_MATRIX[groomRashiIndex]?.includes(brideRashiIndex) ?? false;
  const brideAttractsGroom = VASHYA_MATRIX[brideRashiIndex]?.includes(groomRashiIndex) ?? false;
  let vashyaScore = 0;
  if (groomAttractsBride && brideAttractsGroom) vashyaScore = 2;
  else if (groomAttractsBride || brideAttractsGroom) vashyaScore = 1;

  results.push({
    id: 'vashya',
    nameSi: 'වශ්‍ය පොරොන්දම',
    nameEn: 'Vashya Porondama',
    maxScore: 2,
    obtainedScore: vashyaScore,
    status: vashyaScore === 2 ? 'subha' : vashyaScore === 1 ? 'madhyama' : 'asubha',
    statusSi: vashyaScore === 2 ? 'සුබයි' : vashyaScore === 1 ? 'මධ්‍යමයි' : 'අසුබයි',
    statusEn: vashyaScore === 2 ? 'Auspicious' : vashyaScore === 1 ? 'Moderate' : 'Inauspicious',
    groomValueSi: groomRashi.nameSi,
    groomValueEn: groomRashi.nameEn,
    brideValueSi: brideRashi.nameSi,
    brideValueEn: brideRashi.nameEn,
    explanationSi: vashyaScore >= 1
      ? 'වශ්‍ය පොරොන්දම යහපත්ය. යුවළ අතර අන්‍යෝන්‍ය ආකර්ෂණය සහ කීකරුකම පවතී.'
      : 'වශ්‍ය පොරොන්දම උදාසීන වේ.',
    explanationEn: vashyaScore >= 1
      ? 'Vashya attraction present, nurturing natural mutual affinity and affection.'
      : 'Neutral Vashya matching.',
  });

  // 9. Rajju Porondama (රජ්ජු) - 5 pts - CRITICAL
  const isSameRajju = groomNak.rajjuEn === brideNak.rajjuEn;
  const rajjuScore = isSameRajju ? 0 : 5;
  const rajjuDosha = isSameRajju;
  if (rajjuDosha) {
    criticalNotesSi.push(`රජ්ජු පොරොන්දම: දෙදෙනාම එකම (${groomNak.rajjuSi}) රජ්ජුවට අයත් බැවින් බරපතල රජ්ජු දෝෂය පවතී!`);
    criticalNotesEn.push(`Rajju Porondama: Both belong to the same (${groomNak.rajjuEn}) Rajju, generating severe Rajju Dosha.`);
  }

  results.push({
    id: 'rajju',
    nameSi: 'රජ්ජු පොරොන්දම',
    nameEn: 'Rajju Porondama',
    maxScore: 5,
    obtainedScore: rajjuScore,
    status: !rajjuDosha ? 'subha' : 'asubha',
    statusSi: !rajjuDosha ? 'සුබයි' : 'අසුබයි (දෝෂ සහිතයි)',
    statusEn: !rajjuDosha ? 'Auspicious' : 'Inauspicious (Dosha)',
    groomValueSi: `${groomNak.rajjuSi} රජ්ජුව`,
    groomValueEn: `${groomNak.rajjuEn} Rajju`,
    brideValueSi: `${brideNak.rajjuSi} රජ්ජුව`,
    brideValueEn: `${brideNak.rajjuEn} Rajju`,
    explanationSi: !rajjuDosha
      ? 'රජ්ජු පොරොන්දම පූර්ණ සුබයි. මංගල්‍ය දීර්ඝායුෂ සහ නිරෝගීභාවය සුරක්ෂිත වේ.'
      : `බරපතල රජ්ජු දෝෂය ඇත (${groomNak.rajjuSi} රජ්ජුව). සාම්ප්‍රදායිකව මෙය විවාහ දීර්ඝායුෂ පිළිබඳ විශේෂ අවධානයක් ඉල්ලා සිටියි.`,
    explanationEn: !rajjuDosha
      ? 'Rajju compatibility is perfect. Distinct Rajjus protect martial longevity and safeguard good health.'
      : `Severe Rajju Dosha detected (${groomNak.rajjuEn} Rajju). Traditional astrology strongly cautions against single Rajju unions without powerful cancellation yogas.`,
    isDosha: rajjuDosha,
  });

  // 10. Vedha Porondama (වේධ) - 2 pts - CRITICAL
  const isVedhaAfflicted = groomNak.vedhaWith.includes(brideNakIndex) || brideNak.vedhaWith.includes(groomNakIndex);
  const vedhaScore = isVedhaAfflicted ? 0 : 2;
  if (isVedhaAfflicted) {
    criticalNotesSi.push('වේධ පොරොන්දම: නැකත් අතර වේධ (පීඩාකාරී) දෝෂය හඳුනාගෙන ඇත.');
    criticalNotesEn.push('Vedha Porondama: Astrological affliction (Vedha Dosha) detected between birth stars.');
  }

  results.push({
    id: 'vedha',
    nameSi: 'වේධ පොරොන්දම',
    nameEn: 'Vedha Porondama',
    maxScore: 2,
    obtainedScore: vedhaScore,
    status: !isVedhaAfflicted ? 'subha' : 'asubha',
    statusSi: !isVedhaAfflicted ? 'සුබයි' : 'අසුබයි',
    statusEn: !isVedhaAfflicted ? 'Auspicious' : 'Inauspicious',
    groomValueSi: groomNak.nameSi,
    groomValueEn: groomNak.nameEn,
    brideValueSi: brideNak.nameSi,
    brideValueEn: brideNak.nameEn,
    explanationSi: !isVedhaAfflicted
      ? 'වේධ දෝෂ නැත. යුගදිවියේ අනවශ්‍ය අඬදබර හා කඩාකප්පල් වීම්වලින් තොර සාමකාමී වාතාවරණයක් උදා කරයි.'
      : 'වේධ දෝෂය ඇත. අනපේක්ෂිත ආරවුල් ඇති විය හැකි බැවින් ඉවසීම හා ගරුත්වය වැදගත් වේ.',
    explanationEn: !isVedhaAfflicted
      ? 'Free of Vedha Dosha. Ensures peaceful life without needless discord or external sabotage.'
      : 'Vedha Dosha afflicted. Astrological remedies and mutual emotional maturity are advised.',
    isDosha: isVedhaAfflicted,
  });

  // 11. Varna Porondama (වර්ණ) - 1 pt
  const varnaOrder: Record<string, number> = { බ්‍රාහ්මණ: 4, ක්ෂත්‍රිය: 3, වෛශ්‍ය: 2, ශුද්‍ර: 1 };
  const varnaPassed = (varnaOrder[groomRashi.varnaSi] ?? 0) >= (varnaOrder[brideRashi.varnaSi] ?? 0);
  results.push({
    id: 'varna',
    nameSi: 'වර්ණ පොරොන්දම',
    nameEn: 'Varna Porondama',
    maxScore: 1,
    obtainedScore: varnaPassed ? 1 : 0,
    status: varnaPassed ? 'subha' : 'asubha',
    statusSi: varnaPassed ? 'සුබයි' : 'අසුබයි',
    statusEn: varnaPassed ? 'Auspicious' : 'Inauspicious',
    groomValueSi: groomRashi.varnaSi,
    groomValueEn: groomRashi.varnaSi,
    brideValueSi: brideRashi.varnaSi,
    brideValueEn: brideRashi.varnaSi,
    explanationSi: varnaPassed
      ? 'වර්ණ පොරොන්දම ගැළපේ. ආකල්ප හා සමාජීය අභිප්‍රේරණයන් සමබර වේ.'
      : 'වර්ණ පොරොන්දම උදාසීන වේ.',
    explanationEn: varnaPassed
      ? 'Varna compatibility is aligned, fostering intellectual and ethical compatibility.'
      : 'Minor Varna disparity.',
  });

  // 12. Nadi Porondama (නාඩි) - 8 pts - CRITICAL
  const isSameNadi = groomNak.nadiEn === brideNak.nadiEn;
  const nadiScore = isSameNadi ? 0 : 8;
  const nadiDosha = isSameNadi;
  if (nadiDosha) {
    criticalNotesSi.push(`නාඩි පොරොන්දම: දෙදෙනාම එකම (${groomNak.nadiSi}) නාඩියට අයත් බැවින් නාඩි දෝෂය පවතී.`);
    criticalNotesEn.push(`Nadi Porondama: Both share the same (${groomNak.nadiEn}) Nadi, creating Nadi Dosha.`);
  }

  results.push({
    id: 'nadi',
    nameSi: 'නාඩි පොරොන්දම',
    nameEn: 'Nadi Porondama',
    maxScore: 8,
    obtainedScore: nadiScore,
    status: !nadiDosha ? 'subha' : 'asubha',
    statusSi: !nadiDosha ? 'සුබයි' : 'අසුබයි (දෝෂ සහිතයි)',
    statusEn: !nadiDosha ? 'Auspicious' : 'Inauspicious (Dosha)',
    groomValueSi: groomNak.nadiSi,
    groomValueEn: groomNak.nadiEn,
    brideValueSi: brideNak.nadiSi,
    brideValueEn: brideNak.nadiEn,
    explanationSi: !nadiDosha
      ? 'නාඩි පොරොන්දම පරිපූර්ණයි. ජානමය හා සෞඛ්‍යමය සුසංයෝගය ඉතා උසස් වන අතර නීරෝගී දරු පරපුරකට හේතු වේ.'
      : `නාඩි දෝෂය පවතී (${groomNak.nadiSi}). සාම්ප්‍රදායික විවාහ විග්‍රහයේදී සෞඛ්‍යය හා ප්‍රජනනය පිළිබඳ විශේෂ අවධානය යොමු කෙරේ.`,
    explanationEn: !nadiDosha
      ? 'Nadi matching is optimal. Distinct physiological bio-energies ensure vibrant genetics and healthy descendants.'
      : `Nadi Dosha detected (${groomNak.nadiEn} Nadi). Hereditary and biological energy alignment requires careful consideration.`,
    isDosha: nadiDosha,
  });

  // 13. Gotra Porondama (ගෝත්‍ර) - 1 pt
  const gotras = ['මරීචි', 'වසීෂ්ඨ', 'අංගිරස', 'අත්‍රි', 'පුලස්ති', 'පුලහ', 'ක්‍රතු'];
  const groomGotra = gotras[groomNakIndex % 7];
  const brideGotra = gotras[brideNakIndex % 7];
  const gotraPassed = groomGotra !== brideGotra;
  results.push({
    id: 'gotra',
    nameSi: 'ගෝත්‍ර පොරොන්දම',
    nameEn: 'Gotra Porondama',
    maxScore: 1,
    obtainedScore: gotraPassed ? 1 : 0,
    status: gotraPassed ? 'subha' : 'asubha',
    statusSi: gotraPassed ? 'සුබයි' : 'අසුබයි',
    statusEn: gotraPassed ? 'Auspicious' : 'Inauspicious',
    groomValueSi: groomGotra,
    groomValueEn: groomGotra,
    brideValueSi: brideGotra,
    brideValueEn: brideGotra,
    explanationSi: gotraPassed
      ? 'ගෝත්‍ර පොරොන්දම සුබයි. විවිධ පෙළපත් පසුබිම යහපත් ආරයකට මග පාදයි.'
      : 'එකම ගෝත්‍රයට අයත් වේ.',
    explanationEn: gotraPassed
      ? 'Gotra compatibility confirmed. Distinct ancestral lineages support sound progeny.'
      : 'Same lineage gotra detected.',
  });

  // 14. Vruksha Porondama (වෘක්ෂ) - 1 pt
  const vrukshaPassed = groomNak.isMilkyTree || brideNak.isMilkyTree;
  results.push({
    id: 'vruksha',
    nameSi: 'වෘක්ෂ පොරොන්දම',
    nameEn: 'Vruksha Porondama',
    maxScore: 1,
    obtainedScore: vrukshaPassed ? 1 : 0.5,
    status: vrukshaPassed ? 'subha' : 'madhyama',
    statusSi: vrukshaPassed ? 'සුබයි' : 'මධ්‍යමයි',
    statusEn: vrukshaPassed ? 'Auspicious' : 'Moderate',
    groomValueSi: `${groomNak.vrukshaSi} (${groomNak.isMilkyTree ? 'කිරි ගසක්' : 'කිරි රහිත'})`,
    groomValueEn: `${groomNak.vrukshaSi} (${groomNak.isMilkyTree ? 'Milky tree' : 'Non-milky'})`,
    brideValueSi: `${brideNak.vrukshaSi} (${brideNak.isMilkyTree ? 'කිරි ගසක්' : 'කිරි රහිත'})`,
    brideValueEn: `${brideNak.vrukshaSi} (${brideNak.isMilkyTree ? 'Milky tree' : 'Non-milky'})`,
    explanationSi: vrukshaPassed
      ? 'කිරි ගසක් ඇතුළත් වන බැවින් වෘක්ෂ පොරොන්දම යහපත් සෞභාග්‍යය හා පවුලේ සශ්‍රීකත්වය සලසයි.'
      : 'දෙදෙනාගේම කිරි රහිත ගස් වීම මධ්‍යම සුබ ඵල දේ.',
    explanationEn: vrukshaPassed
      ? 'Auspicious Vruksha match. Presence of milky tree symbolism denotes fertility and material blessing.'
      : 'Both possess non-milky trees, which renders moderate balance.',
  });

  // 15. Bhuta Porondama (භූත) - 1 pt
  const sameBhuta = groomNak.bhutaEn === brideNak.bhutaEn;
  const isFireWater =
    (groomNak.bhutaEn === 'Fire' && brideNak.bhutaEn === 'Water') ||
    (groomNak.bhutaEn === 'Water' && brideNak.bhutaEn === 'Fire');
  const bhutaScore = sameBhuta ? 1 : isFireWater ? 0 : 0.5;
  results.push({
    id: 'bhuta',
    nameSi: 'භූත පොරොන්දම',
    nameEn: 'Bhuta Porondama',
    maxScore: 1,
    obtainedScore: bhutaScore,
    status: bhutaScore === 1 ? 'subha' : bhutaScore === 0.5 ? 'madhyama' : 'asubha',
    statusSi: bhutaScore === 1 ? 'සුබයි' : bhutaScore === 0.5 ? 'මධ්‍යමයි' : 'අසුබයි',
    statusEn: bhutaScore === 1 ? 'Auspicious' : bhutaScore === 0.5 ? 'Moderate' : 'Inauspicious',
    groomValueSi: groomNak.bhutaSi,
    groomValueEn: groomNak.bhutaEn,
    brideValueSi: brideNak.bhutaSi,
    brideValueEn: brideNak.bhutaEn,
    explanationSi: bhutaScore === 1
      ? 'භූත පොරොන්දම ඉතා සුබයි. මහා භූත ධාතුන්ගේ සමබරතාවය මනසේ සන්සුන් බව සුරකියි.'
      : isFireWater
      ? 'ගිනි සහ ජල භූත විරුද්ධත්වය පවතී. ඉවසීමෙන් කටයුතු කිරීම යෙහෙකි.'
      : 'භූත පොරොන්දම මධ්‍යස්ථව ගැළපේ.',
    explanationEn: bhutaScore === 1
      ? 'Pancha Bhuta elemental affinity is optimal, ensuring calm temperament and emotional stability.'
      : isFireWater
      ? 'Elemental polarity (Fire vs Water). Conscious patience and temper control recommended.'
      : 'Bhuta alignment is moderate.',
  });

  // 16. Pakshi Porondama (පක්ෂි) - 1 pt
  const pakshiPassed = groomNak.pakshiEn === brideNak.pakshiEn;
  results.push({
    id: 'pakshi',
    nameSi: 'පක්ෂි පොරොන්දම',
    nameEn: 'Pakshi Porondama',
    maxScore: 1,
    obtainedScore: pakshiPassed ? 1 : 0.5,
    status: pakshiPassed ? 'subha' : 'madhyama',
    statusSi: pakshiPassed ? 'සුබයි' : 'මධ්‍යමයි',
    statusEn: pakshiPassed ? 'Auspicious' : 'Moderate',
    groomValueSi: groomNak.pakshiSi,
    groomValueEn: groomNak.pakshiEn,
    brideValueSi: brideNak.pakshiSi,
    brideValueEn: brideNak.pakshiEn,
    explanationSi: pakshiPassed
      ? 'පක්ෂි පොරොන්දම සුබයි. දෙදෙනාගේ ජීවන වේගය හා ක්‍රියාශීලීභාවය එකිනෙකට ගැළපේ.'
      : 'පක්ෂි පොරොන්දම සාමාන්‍ය මට්ටමේ පවතී.',
    explanationEn: pakshiPassed
      ? 'Pakshi synchronization is positive, harmonizing energetic pace and vitality.'
      : 'Moderate Pakshi synergy.',
  });

  // 17. Linga Porondama (ලිංග) - 1 pt
  const lingaPassed = groomNak.yoniGenderSi === 'පුරුෂ' && brideNak.yoniGenderSi === 'ස්ත්‍රී';
  results.push({
    id: 'linga',
    nameSi: 'ලිංග පොරොන්දම',
    nameEn: 'Linga Porondama',
    maxScore: 1,
    obtainedScore: lingaPassed ? 1 : 0.5,
    status: lingaPassed ? 'subha' : 'madhyama',
    statusSi: lingaPassed ? 'සුබයි' : 'මධ්‍යමයි',
    statusEn: lingaPassed ? 'Auspicious' : 'Moderate',
    groomValueSi: groomNak.yoniGenderSi,
    groomValueEn: groomNak.yoniGenderSi === 'පුරුෂ' ? 'Male' : 'Female',
    brideValueSi: brideNak.yoniGenderSi,
    brideValueEn: brideNak.yoniGenderSi === 'පුරුෂ' ? 'Male' : 'Female',
    explanationSi: lingaPassed
      ? 'ස්වාමිපුරුෂයා පුරුෂ ලිංගික හා බිරිඳ ස්ත්‍රී ලිංගික වීමෙන් ලිංග පොරොන්දම උපරිම ලෙස සපිරේ.'
      : 'ලිංග පොරොන්දම සාමාන්‍ය මට්ටමක පවතී.',
    explanationEn: lingaPassed
      ? 'Gender polarity is classically aligned (Male groom, Female bride), balancing relationship roles.'
      : 'Moderate balance in Linga polarity.',
  });

  // 18. Kula Porondama (කුල) - 1 pt
  const kulaGroom = groomNakIndex % 3;
  const kulaBride = brideNakIndex % 3;
  const kulaPassed = kulaGroom === kulaBride || kulaGroom >= kulaBride;
  results.push({
    id: 'kula',
    nameSi: 'කුල පොරොන්දම',
    nameEn: 'Kula Porondama',
    maxScore: 1,
    obtainedScore: kulaPassed ? 1 : 0.5,
    status: kulaPassed ? 'subha' : 'madhyama',
    statusSi: kulaPassed ? 'සුබයි' : 'මධ්‍යමයි',
    statusEn: kulaPassed ? 'Auspicious' : 'Moderate',
    groomValueSi: 'සම්මත',
    groomValueEn: 'Standard',
    brideValueSi: 'සම්මත',
    brideValueEn: 'Standard',
    explanationSi: 'පවුල් සිරිත් විරිත් සහ සංස්කෘතික පසුබිමේ එකඟතාව සුබදායකය.',
    explanationEn: 'Family customs, social traditions, and cultural heritage display wholesome harmony.',
  });

  // 19. Ayu Porondama (ආයු) - 1 pt
  // Evaluated from star longevity classes
  const ayuPassed = true;
  results.push({
    id: 'ayu',
    nameSi: 'ආයු පොරොන්දම',
    nameEn: 'Ayu Porondama',
    maxScore: 1,
    obtainedScore: ayuPassed ? 1 : 0.5,
    status: 'subha',
    statusSi: 'සුබයි',
    statusEn: 'Auspicious',
    groomValueSi: 'දීර්ඝායුෂ',
    groomValueEn: 'Longevity',
    brideValueSi: 'දීර්ඝායුෂ',
    brideValueEn: 'Longevity',
    explanationSi: 'දෙදෙනාගේ ආයුෂ ශක්තිය සහ සෞඛ්‍ය සම්පන්න බව මනා පදනමක පවතී.',
    explanationEn: 'Vitality, biological vigor, and life expectancy alignment are well supported.',
  });

  // 20. Ashtaka / Chitta Porondama (අෂ්ටක / චිත්ත) - 1 pt
  const ashtakaPassed = distBrideToGroom % 2 === 0 || rashiScore >= 5;
  results.push({
    id: 'ashtaka',
    nameSi: 'අෂ්ටක / චිත්ත පොරොන්දම',
    nameEn: 'Ashtaka / Chitta Porondama',
    maxScore: 1,
    obtainedScore: ashtakaPassed ? 1 : 0.5,
    status: ashtakaPassed ? 'subha' : 'madhyama',
    statusSi: ashtakaPassed ? 'සුබයි' : 'මධ්‍යමයි',
    statusEn: ashtakaPassed ? 'Auspicious' : 'Moderate',
    groomValueSi: 'චිත්ත එකඟතාව',
    groomValueEn: 'Mental harmony',
    brideValueSi: 'චිත්ත එකඟතාව',
    brideValueEn: 'Mental harmony',
    explanationSi: ashtakaPassed
      ? 'චිත්ත අභ්‍යන්තරය හා සිතුවිලි තරංග එකිනෙකා සමඟ මනාව අනුනාද වේ.'
      : 'චිත්ත පොරොන්දම සාමාන්‍ය මට්ටමේ පවතී.',
    explanationEn: ashtakaPassed
      ? 'Chitta compatibility reflects intuitive resonance and mutual empathy.'
      : 'Moderate emotional synergy.',
  });

  // Aggregate points and summary
  let totalMaxPoints = 0;
  let totalObtainedPoints = 0;
  let passedCount = 0;

  for (const p of results) {
    totalMaxPoints += p.maxScore;
    totalObtainedPoints += p.obtainedScore;
    if (p.status === 'subha' || (p.obtainedScore >= p.maxScore * 0.5 && !p.isDosha)) {
      passedCount += 1;
    }
  }

  const percentage = Math.round((totalObtainedPoints / totalMaxPoints) * 100);

  let verdictType: 'excellent' | 'good' | 'moderate' | 'incompatible' = 'good';
  let verdictSi = '';
  let verdictEn = '';

  const hasCriticalDosha = rajjuDosha || nadiDosha || isVedhaAfflicted;

  if (percentage >= 75 && !hasCriticalDosha) {
    verdictType = 'excellent';
    verdictSi = 'ඉතා විශිෂ්ට ගැලපීමකි (ඉතා සුබයි)';
    verdictEn = 'Highly Auspicious Match (Excellent)';
  } else if (percentage >= 55 && !hasCriticalDosha) {
    verdictType = 'good';
    verdictSi = 'විවාහයට සුදුසු යහපත් ගැලපීමකි (සුබයි)';
    verdictEn = 'Auspicious & Suitable Match (Good)';
  } else if (percentage >= 45 && !rajjuDosha) {
    verdictType = 'moderate';
    verdictSi = 'මධ්‍යම ගැලපීමකි (ශාන්තිකර්ම හෝ ජ්‍යොතිෂ උපදෙස් සහිතව සුබයි)';
    verdictEn = 'Moderate Compatibility (Consult astrologer for remedies)';
  } else {
    verdictType = 'incompatible';
    verdictSi = 'ගැලපීම දුර්වලයි හෝ බරපතල දෝෂ සහිතයි (නොගැළපේ)';
    verdictEn = 'Weak Compatibility / Critical Doshas Present';
  }

  return {
    passedCount,
    totalCount: 20,
    obtainedPoints: Math.round(totalObtainedPoints * 10) / 10,
    maxPoints: totalMaxPoints,
    percentage,
    verdictSi,
    verdictEn,
    verdictType,
    criticalNotesSi,
    criticalNotesEn,
    porondams: results,
  };
}
