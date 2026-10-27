/**
 * Core domain types for Bandhan Luxe Indian Matrimonial Platform
 */

export type RoleType = 'CANDIDATE' | 'PARENT' | 'SIBLING';
export type Gender = 'BRIDE' | 'GROOM';
export type DietType = 'Vegetarian' | 'Eggetarian' | 'Jain' | 'Non-Vegetarian' | 'Vegan';
export type ManglikStatus = 'Non-Manglik' | 'Manglik' | 'Anshik Manglik' | 'Don\'t Know';
export type FamilyType = 'Nuclear' | 'Joint' | 'Extended';
export type MaritalStatus = 'Never Married' | 'Divorced' | 'Widowed' | 'Awaiting Divorce';
export type PhotoPrivacyMode = 'PUBLIC' | 'BLURRED' | 'ON_REQUEST';

export interface FamilyInfo {
  familyType: FamilyType;
  fatherOccupation: string;
  motherOccupation: string;
  siblings: string;
  nativePlace: string;
  gotra: string;
  maternalGotra?: string;
  familyValues: 'Traditional' | 'Moderate' | 'Liberal';
  affluenceLevel: 'Upper Middle Class' | 'High Net Worth' | 'Ultra High Net Worth' | 'Middle Class';
}

export interface AstroDetails {
  dob: string;
  timeOfBirth: string;
  placeOfBirth: string;
  manglik: ManglikStatus;
  rashi: string;
  nakshatra: string;
  gunaScoreDefault: number;
}

export interface LifestyleDetails {
  diet: DietType;
  drinking: 'Never' | 'Occasionally' | 'Socially' | 'Regularly';
  smoking: 'Never' | 'Occasionally' | 'Regularly';
  passions: string[];
  weekendVibe: string;
  favoriteBooksOrMusic: string;
  languagesSpoken: string[];
}

export interface PartnerPreferences {
  ageRange: [number, number];
  heightRange: string;
  education: string[];
  locations: string[];
  dietaryFlexibility: string;
  communityPreference: string;
}

export interface MatrimonyProfile {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  height: string;
  heightCm: number;
  religion: string;
  community: string;
  subCaste?: string;
  location: string;
  workLocationCountry: string;
  profession: string;
  education: string;
  college: string;
  income: string;
  incomeNumericLakhs: number;
  diet: DietType;
  manglik: ManglikStatus;
  gunaScore: number;
  image: string;
  additionalPhotos: string[];
  verified: boolean;
  verificationLevel: 1 | 2 | 3 | 4;
  voiceBio: string;
  voiceBioDurationSeconds: number;
  familySummary: string;
  personalBio: string;
  family: FamilyInfo;
  astro: AstroDetails;
  lifestyle: LifestyleDetails;
  preferences: PartnerPreferences;
  photoPrivacy: PhotoPrivacyMode;
  onlineStatus: 'Active Today' | 'Online 2h ago' | 'Active this week';
}

export interface SearchFilters {
  lookingFor: Gender | 'ALL';
  ageRange: [number, number];
  community: string;
  location: string;
  religion: string;
  casteNoBar: boolean;
  manglik: string;
  diet: string;
  minIncomeLakhs: number;
  verifiedOnly: boolean;
  nriOnly: boolean;
  searchQuery: string;
}

export interface KundliBreakdownItem {
  name: string;
  sanskritName: string;
  maxPoints: number;
  obtainedPoints: number;
  significance: string;
  status: 'Excellent' | 'Good' | 'Average' | 'Dosha Check Needed';
  notes: string;
}

export interface KundliResult {
  totalScore: number;
  maxScore: number;
  verdict: string;
  compatibilityLevel: 'Highly Auspicious' | 'Auspicious' | 'Moderate' | 'Inauspicious';
  doshaNotes: string;
  items: KundliBreakdownItem[];
}
