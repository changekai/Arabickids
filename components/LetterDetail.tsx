import React, { useState } from 'react';
import { ArabicLetter } from '../types';
import { X, ArrowRight, PenTool, BookOpen, Layers } from 'lucide-react';
import AudioButton from './AudioButton';
import TracingCanvas from './TracingCanvas';

interface LetterDetailProps {
  letter: ArabicLetter;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const LetterDetail: React.FC<LetterDetailProps> = ({ 
  letter, onClose, onNext, onPrev, hasPrev, hasNext 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'forms' | 'practice'>('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl h-[95vh] md:h-[90vh] rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <div className="bg-desert-sand p-4 md:p-6 flex justify-between items-center relative shrink-0">
          <h2 className="text-2xl md:text-3xl font-bold text-deep-blue flex items-center gap-3">
            <span className="font-arabic text-3xl md:text-4xl">{letter.isolated}</span>
            <span>{letter.name}</span>
          </h2>
          <button 
            onClick={onClose}
            className="p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
          >
            <X size={24} className="text-deep-blue" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#FAFAFA]">
          
          {/* Tabs */}
          <div className="flex justify-center mb-6 gap-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 transition-all font-bold text-sm md:text-base ${activeTab === 'overview' ? 'bg-terracotta text-white shadow-lg scale-105' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
            >
              <BookOpen size={18} /> <span className="md:inline">認識</span>
            </button>
            <button 
              onClick={() => setActiveTab('forms')}
              className={`px-3 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 transition-all font-bold text-sm md:text-base ${activeTab === 'forms' ? 'bg-terracotta text-white shadow-lg scale-105' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
            >
              <Layers size={18} /> <span className="md:inline">形狀</span>
            </button>
            <button 
              onClick={() => setActiveTab('practice')}
              className={`px-3 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 transition-all font-bold text-sm md:text-base ${activeTab === 'practice' ? 'bg-terracotta text-white shadow-lg scale-105' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
            >
              <PenTool size={18} /> <span className="md:inline">寫字</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px] pb-8">
            {activeTab === 'overview' && (
              <div className="flex flex-col items-center text-center animate-in slide-in-from-bottom-4 duration-300">
                {/* Letter Circle */}
                <div className="w-40 h-40 md:w-64 md:h-64 bg-white border-8 border-warm-yellow rounded-full flex items-center justify-center shadow-lg mb-6">
                  <span className="font-arabic text-[7rem] md:text-[10rem] text-deep-blue leading-none mt-4">{letter.isolated}</span>
                </div>
                
                {/* Play Button - Now below the circle */}
                <div className="mb-6">
                   <AudioButton textToSpeak={letter.isolated} size="lg" label="聽聽發音" />
                </div>
                
                <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-lg px-4">{letter.description}</p>
                
                <div className="flex items-center gap-4 bg-sage-green/10 px-6 py-3 rounded-xl mt-2 mb-6">
                   <div className="flex flex-col items-center border-r border-gray-300 pr-4">
                     <span className="text-sm text-gray-500 uppercase tracking-wider">注音</span>
                     <span className="text-2xl font-bold text-deep-blue">{letter.zhuyin}</span>
                   </div>
                   <div className="flex flex-col items-center">
                     <span className="text-sm text-gray-500 uppercase tracking-wider">拼音</span>
                     <span className="text-2xl font-bold text-deep-blue">{letter.transliteration}</span>
                   </div>
                </div>

                {/* Example Word */}
                <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-md border-2 border-dashed border-gray-200">
                  <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-4">單字範例</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-2xl md:text-3xl font-bold text-deep-blue mb-1">{letter.exampleWord.meaning}</div>
                      <div className="text-base md:text-lg text-terracotta font-medium">{letter.exampleWord.transliteration}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <span className="font-arabic text-4xl md:text-5xl text-deep-blue">{letter.exampleWord.arabic}</span>
                       <AudioButton textToSpeak={letter.exampleWord.arabic} size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'forms' && (
              <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-300">
                <div className="bg-blue-50 p-4 rounded-xl text-deep-blue/80 text-center mb-4 text-sm md:text-base">
                  <p>阿拉伯字母很特別，它在單字的不同位置會「變身」喔！</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-3">
                    <span className="text-xs md:text-sm font-bold text-gray-400 uppercase">字頭 (Initial)</span>
                    <span className="font-arabic text-5xl md:text-6xl text-terracotta">{letter.initial}</span>
                    <p className="text-xs text-center text-gray-500">站在最前面時的樣子</p>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-3">
                    <span className="text-xs md:text-sm font-bold text-gray-400 uppercase">字中 (Medial)</span>
                    <span className="font-arabic text-5xl md:text-6xl text-sage-green">{letter.medial}</span>
                    <p className="text-xs text-center text-gray-500">夾在中間時的樣子</p>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-3">
                    <span className="text-xs md:text-sm font-bold text-gray-400 uppercase">字尾 (Final)</span>
                    <span className="font-arabic text-5xl md:text-6xl text-deep-blue">{letter.final}</span>
                    <p className="text-xs text-center text-gray-500">排在最後面時的樣子</p>
                  </div>
                </div>

                <div className="mt-8 bg-desert-sand/30 p-6 rounded-2xl flex flex-col items-center">
                  <h3 className="font-bold text-lg mb-4 text-deep-blue">把它們連起來！</h3>
                  <div className="flex items-end gap-1 dir-rtl font-arabic text-5xl md:text-8xl text-deep-blue tracking-tighter">
                     <span className="text-terracotta">{letter.initial}</span>
                     <span className="text-sage-green">{letter.medial}</span>
                     <span className="text-deep-blue">{letter.final}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'practice' && (
              <div className="flex flex-col items-center h-full animate-in slide-in-from-bottom-4 duration-300">
                 <p className="mb-4 text-base md:text-lg text-gray-600">跟著虛線，畫畫看這個字母！</p>
                 <div className="w-full max-w-2xl h-[350px] md:h-[400px]">
                    <TracingCanvas letter={letter.isolated} />
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center shrink-0 pb-6 md:pb-4">
          <button 
            onClick={onPrev}
            disabled={!hasPrev}
            className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-bold transition-all text-sm md:text-base ${!hasPrev ? 'opacity-30 cursor-not-allowed text-gray-400' : 'hover:bg-gray-200 text-deep-blue'}`}
          >
            <ArrowRight className="rotate-180" size={20} />
            <span className="hidden md:inline">上一個</span>
          </button>
          
          <div className="text-gray-400 font-medium text-sm">
             {letter.id} / 28
          </div>

          <button 
            onClick={onNext}
            disabled={!hasNext}
            className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-bold transition-all text-sm md:text-base ${!hasNext ? 'opacity-30 cursor-not-allowed text-gray-400' : 'bg-deep-blue text-white hover:bg-opacity-90 shadow-md'}`}
          >
            <span className="hidden md:inline">下一個</span>
            <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default LetterDetail;