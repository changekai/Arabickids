import React, { useState } from 'react';
import { ARABIC_LETTERS } from './constants';
import { ArabicLetter } from './types';
import LetterDetail from './components/LetterDetail';
import { Star, Info } from 'lucide-react';

export default function App() {
  const [selectedLetterId, setSelectedLetterId] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(false);

  const selectedLetter = ARABIC_LETTERS.find(l => l.id === selectedLetterId);

  const handleNext = () => {
    if (selectedLetterId && selectedLetterId < 28) {
      setSelectedLetterId(selectedLetterId + 1);
    }
  };

  const handlePrev = () => {
    if (selectedLetterId && selectedLetterId > 1) {
      setSelectedLetterId(selectedLetterId - 1);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      
      {/* Hero Header */}
      <header className="bg-deep-blue text-white pt-8 pb-16 md:pt-12 md:pb-24 px-6 rounded-b-[2rem] md:rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-10 left-10 text-9xl font-arabic">ا</div>
           <div className="absolute bottom-10 right-10 text-9xl font-arabic">ب</div>
           <div className="absolute top-1/2 left-1/2 text-9xl font-arabic transform -translate-x-1/2 -translate-y-1/2">ج</div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-wide flex items-center justify-center md:justify-start gap-3">
              <span className="text-warm-yellow">Arabic</span> Steps
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 font-light">
              阿語起步走 · 快樂學字母
            </p>
          </div>
          <button 
            onClick={() => setShowIntro(!showIntro)}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm"
          >
            <Info size={16} />
            <span>給爸媽的話</span>
          </button>
        </div>

        {showIntro && (
          <div className="max-w-3xl mx-auto mt-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-top-4">
             <p className="leading-relaxed">
               歡迎來到「阿語起步走」！這是一個專為初學者設計的互動學習應用。
               每一個字母卡片都包含了<strong className="text-warm-yellow">標準發音</strong>、<strong className="text-warm-yellow">筆順練習</strong>以及<strong className="text-warm-yellow">單字變化</strong>。
               點擊下方的字母卡片，開始您的探索之旅吧！
             </p>
          </div>
        )}
      </header>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-4 -mt-10 md:-mt-16 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-xl p-4 md:p-10 border-b-8 border-desert-sand">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {ARABIC_LETTERS.map((letter) => (
              <button
                key={letter.id}
                onClick={() => setSelectedLetterId(letter.id)}
                className="group relative bg-white border-2 border-gray-100 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center gap-2 hover:border-terracotta hover:shadow-lg transition-all hover:-translate-y-1 aspect-[4/5]"
              >
                <div className="absolute top-2 right-2 text-xs font-bold text-gray-300 group-hover:text-terracotta transition-colors">
                  {letter.id}
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                   <span className="font-arabic text-6xl md:text-7xl text-deep-blue group-hover:scale-110 transition-transform duration-300">
                     {letter.isolated}
                   </span>
                </div>
                
                <div className="w-full pt-3 border-t border-gray-100 flex justify-between items-end">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{letter.transliteration}</span>
                  <span className="text-sm font-bold text-terracotta">{letter.zhuyin}</span>
                </div>
                
                {/* Decorative blob on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity pointer-events-none" />
              </button>
            ))}
          </div>

        </div>
      </main>

      <footer className="text-center py-12 text-deep-blue/60">
        <p className="flex items-center justify-center gap-2 text-sm">
          Made with <Star size={16} className="text-warm-yellow fill-current" /> for learning
        </p>
      </footer>

      {/* Detail Modal */}
      {selectedLetter && (
        <LetterDetail 
          letter={selectedLetter} 
          onClose={() => setSelectedLetterId(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          hasPrev={selectedLetterId! > 1}
          hasNext={selectedLetterId! < 28}
        />
      )}
    </div>
  );
}