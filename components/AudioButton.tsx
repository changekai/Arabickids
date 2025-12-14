import React, { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { generateSpeech, playAudioBuffer } from '../services/gemini';

interface AudioButtonProps {
  textToSpeak: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({ textToSpeak, label, size = 'md', className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const buffer = await generateSpeech(textToSpeak);
      if (buffer) {
        playAudioBuffer(buffer);
      }
    } catch (err) {
      console.error("Failed to play audio", err);
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };

  return (
    <button
      onClick={handlePlay}
      disabled={isLoading}
      className={`
        flex items-center justify-center gap-2 
        bg-sage-green text-white rounded-full 
        hover:bg-opacity-90 active:scale-95 transition-all shadow-md
        disabled:opacity-70 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${className}
      `}
      title="Play Pronunciation"
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={iconSizes[size]} />
      ) : (
        <Volume2 size={iconSizes[size]} />
      )}
      {label && <span className="font-bold">{label}</span>}
    </button>
  );
};

export default AudioButton;