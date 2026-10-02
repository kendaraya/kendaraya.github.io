export interface District {
  id: string;
  nameSi: string;
  nameEn: string;
  provinceSi: string;
  provinceEn: string;
  lat: number;
  lng: number;
}

export const SRI_LANKA_DISTRICTS: District[] = [
  { id: 'colombo', nameSi: 'කොළඹ', nameEn: 'Colombo', provinceSi: 'බස්නාහිර', provinceEn: 'Western', lat: 6.9271, lng: 79.8612 },
  { id: 'gampaha', nameSi: 'ගම්පහ', nameEn: 'Gampaha', provinceSi: 'බස්නාහිර', provinceEn: 'Western', lat: 7.0840, lng: 80.0098 },
  { id: 'kalutara', nameSi: 'කළුතර', nameEn: 'Kalutara', provinceSi: 'බස්නාහිර', provinceEn: 'Western', lat: 6.5854, lng: 79.9607 },
  { id: 'kandy', nameSi: 'මහනුවර', nameEn: 'Kandy', provinceSi: 'මධ්‍යම', provinceEn: 'Central', lat: 7.2906, lng: 80.6337 },
  { id: 'matale', nameSi: 'මාතලේ', nameEn: 'Matale', provinceSi: 'මධ්‍යම', provinceEn: 'Central', lat: 7.4675, lng: 80.6234 },
  { id: 'nuwara-eliya', nameSi: 'නුවරඑළිය', nameEn: 'Nuwara Eliya', provinceSi: 'මධ්‍යම', provinceEn: 'Central', lat: 6.9497, lng: 80.7891 },
  { id: 'galle', nameSi: 'ගාල්ල', nameEn: 'Galle', provinceSi: 'දකුණ', provinceEn: 'Southern', lat: 6.0535, lng: 80.2210 },
  { id: 'matara', nameSi: 'මාතර', nameEn: 'Matara', provinceSi: 'දකුණ', provinceEn: 'Southern', lat: 5.9549, lng: 80.5550 },
  { id: 'hambantota', nameSi: 'හම්බන්තොට', nameEn: 'Hambantota', provinceSi: 'දකුණ', provinceEn: 'Southern', lat: 6.1429, lng: 81.1212 },
  { id: 'jaffna', nameSi: 'යාපනය', nameEn: 'Jaffna', provinceSi: 'උතුර', provinceEn: 'Northern', lat: 9.6615, lng: 80.0255 },
  { id: 'kilinochchi', nameSi: 'කිලිනොච්චිය', nameEn: 'Kilinochchi', provinceSi: 'උතුර', provinceEn: 'Northern', lat: 9.3803, lng: 80.3770 },
  { id: 'mannar', nameSi: 'මන්නාරම', nameEn: 'Mannar', provinceSi: 'උතුර', provinceEn: 'Northern', lat: 8.9810, lng: 79.9044 },
  { id: 'vavuniya', nameSi: 'වවුනියාව', nameEn: 'Vavuniya', provinceSi: 'උතුර', provinceEn: 'Northern', lat: 8.7542, lng: 80.4982 },
  { id: 'mullaitivu', nameSi: 'මුලතිව්', nameEn: 'Mullaitivu', provinceSi: 'උතුර', provinceEn: 'Northern', lat: 9.2671, lng: 80.8142 },
  { id: 'batticaloa', nameSi: 'මඩකලපුව', nameEn: 'Batticaloa', provinceSi: 'නැගෙනහිර', provinceEn: 'Eastern', lat: 7.7310, lng: 81.6747 },
  { id: 'ampara', nameSi: 'අම්පාර', nameEn: 'Ampara', provinceSi: 'නැගෙනහිර', provinceEn: 'Eastern', lat: 7.2975, lng: 81.6747 },
  { id: 'trincomalee', nameSi: 'ත්‍රිකුණාමලය', nameEn: 'Trincomalee', provinceSi: 'නැගෙනහිර', provinceEn: 'Eastern', lat: 8.5874, lng: 81.2152 },
  { id: 'kurunegala', nameSi: 'කුරුණෑගල', nameEn: 'Kurunegala', provinceSi: 'වයඹ', provinceEn: 'North Western', lat: 7.4863, lng: 80.3623 },
  { id: 'puttalam', nameSi: 'පුත්තලම', nameEn: 'Puttalam', provinceSi: 'වයඹ', provinceEn: 'North Western', lat: 8.0408, lng: 79.8394 },
  { id: 'anuradhapura', nameSi: 'අනුරාධපුරය', nameEn: 'Anuradhapura', provinceSi: 'උතුරු මැද', provinceEn: 'North Central', lat: 8.3114, lng: 80.4037 },
  { id: 'polonnaruwa', nameSi: 'පොළොන්නරුව', nameEn: 'Polonnaruwa', provinceSi: 'උතුරු මැද', provinceEn: 'North Central', lat: 7.9403, lng: 81.0188 },
  { id: 'badulla', nameSi: 'බදුල්ල', nameEn: 'Badulla', provinceSi: 'ඌව', provinceEn: 'Uva', lat: 6.9934, lng: 81.0550 },
  { id: 'monaragala', nameSi: 'මොනරාගල', nameEn: 'Monaragala', provinceSi: 'ඌව', provinceEn: 'Uva', lat: 6.8728, lng: 81.3507 },
  { id: 'ratnapura', nameSi: 'රත්නපුරය', nameEn: 'Ratnapura', provinceSi: 'සබරගමුව', provinceEn: 'Sabaragamuwa', lat: 6.6828, lng: 80.3992 },
  { id: 'kegalle', nameSi: 'කෑගල්ල', nameEn: 'Kegalle', provinceSi: 'සබරගමුව', provinceEn: 'Sabaragamuwa', lat: 7.2513, lng: 80.3464 },
];
