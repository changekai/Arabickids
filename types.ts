export interface ArabicLetter {
  id: number;
  name: string;
  transliteration: string; // Roman Pinyin
  zhuyin: string; // Bopomofo
  isolated: string;
  initial: string;
  medial: string;
  final: string;
  description: string; // Simple description for kids
  exampleWord: {
    arabic: string;
    transliteration: string;
    meaning: string;
  };
}

export interface SpeechState {
  isLoading: boolean;
  error: string | null;
  isPlaying: boolean;
}