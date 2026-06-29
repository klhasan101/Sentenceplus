export type EnglishFileLevel = 'Starter' | 'Elementary' | 'Pre-Intermediate' | 'Intermediate' | 'Upper-Intermediate' | 'Advanced';

export interface Sentence {
  id: string;
  english: string;
  arabic: string;
  category: string;
  pronunciation?: string; // Phonetic spelling in Arabic letters if useful
  explanation?: string;   // Brief grammar/vocabulary note
  level?: EnglishFileLevel;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  iconName: string;
  description: string;
}

export interface StudyHistoryEntry {
  sentenceId: string;
  date: string; // Date string format YYYY-MM-DD or toDateString()
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface UserStats {
  streak: number;
  lastStudyDate: string;
  masteredIds: string[];
  learningIds: string[];
  totalSessions: number;
  highScore: number;
  studyHistory?: StudyHistoryEntry[];
}

export interface QuizQuestion {
  sentenceId: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  userAnswer?: string;
  isCorrect?: boolean;
  type: 'en-to-ar' | 'ar-to-en' | 'unscramble';
}
