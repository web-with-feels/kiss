import React, { useEffect, useState } from 'react';
import { ChevronDown, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "When Words Fade, Love Speaks...";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const scrollToNext = () => {
    const timeline = document.getElementById('timeline');
    timeline?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-rose-50 via-pink-100 to-rose-200">
      {/* Background Particles (Simulated) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
            <div
                key={i}
                className={`absolute text-rose-300/40 animate-float`}
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    fontSize: `${Math.random() * 2 + 1}rem`,
                    filter: 'blur(1px)'
                }}
            >
                {Math.random() > 0.5 ? '♥' : '💋'}
            </div>
        ))}
      </div>

      <div className="z-10 text-center px-4 max-w-4xl">
        <div className="mb-6 flex justify-center">
             <div className="relative">
                 <div className="absolute inset-0 bg-rose-400 blur-xl opacity-30 animate-pulse-slow rounded-full"></div>
                 <Heart className="text-rose-600 w-16 h-16 animate-heartbeat fill-rose-500" />
             </div>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-rose-900 mb-6 tracking-tight leading-tight">
          Happy <span className="text-rose-600 font-script italic pr-2">Kiss Day</span>
        </h1>
        
        <div className="h-12 md:h-16">
            <p className="font-cinzel text-xl md:text-2xl text-rose-700/80 tracking-widest uppercase writing-cursor">
            {text}
            </p>
        </div>

        <button 
            onClick={scrollToNext}
            className="mt-12 group relative px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-serif italic text-xl rounded-full transition-all duration-300 shadow-lg shadow-rose-500/30 hover:shadow-rose-600/50 hover:scale-105"
        >
            <span className="relative z-10 flex items-center gap-2">
                Lean In 💋
            </span>
        </button>
      </div>

      <div className="absolute bottom-10 animate-bounce text-rose-400">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;