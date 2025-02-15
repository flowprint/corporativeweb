import { useEffect, useState } from 'react';

const words = ['Profitable', 'Disciplined', 'Successful', 'Professional'];

export function AnimatedText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setCurrentWord(words[(currentIndex + 1) % words.length]);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <span 
      className="relative overflow-hidden inline-flex items-center justify-center h-[1.2em] transition-[width] duration-500 ease-in-out" 
      style={{ 
        width: `${currentWord.length * 0.5}em`,
        minWidth: '0.5em'
      }}
    >
      <span 
        className={`
          absolute 
          inline-flex
          items-center
          justify-center
          whitespace-nowrap
          text-transparent 
          bg-clip-text 
          bg-gradient-to-r 
          from-indigo-400 via-blue-400 to-violet-500
          transition-all 
          duration-500 
          ease-in-out
          ${isAnimating ? 'translate-y-[100%] opacity-0' : 'translate-y-0 opacity-100'}
        `}
      >
        {currentWord}
      </span>
    </span>
  );
}