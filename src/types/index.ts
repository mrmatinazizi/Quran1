export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}

export interface HadithBook {
  id: string;
  name: string;
  numberOfHadiths: number;
}

export interface Hadith {
  id: string;
  bookId: string;
  number: number;
  arabic: string;
  persian: string;
  source: string;
}

export interface Dhikr {
  id: string;
  arabic: string;
  persian: string;
  description: string;
  category: string;
}
