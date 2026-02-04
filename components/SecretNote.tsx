import React, { useState, useRef } from 'react';
import { Heart, Lock, Unlock } from 'lucide-react';

const SecretNote: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startHold = () => {
    if (unlocked) return;
    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current !== null) clearInterval(intervalRef.current);
          setUnlocked(true);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
  };

  const endHold = () => {
    if (!unlocked) {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
      setProgress(0);
    }
  };

  return (
    <section className="py-20 bg-rose-50 flex justify-center items-center">
      <div className="text-center">
        <h3 className="text-rose-800 font-cinzel text-sm tracking-widest mb-8 uppercase">A Secret for You</h3>
        
        {!unlocked ? (
          <div className="relative inline-block">
            <button
              onMouseDown={startHold}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              onTouchStart={startHold}
              onTouchEnd={endHold}
              className="relative w-24 h-24 rounded-full bg-rose-200 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
            >
              <Heart className={`text-rose-500 w-10 h-10 ${progress > 0 ? 'animate-pulse' : ''}`} fill={progress > 0 ? "currentColor" : "none"} />
              
              {/* Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="46"
                  stroke="#f43f5e"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="289"
                  strokeDashoffset={289 - (289 * progress) / 100}
                  className="transition-all duration-100 ease-linear"
                />
              </svg>
            </button>
            <p className="mt-4 text-xs text-rose-400">Hold to unlock</p>
          </div>
        ) : (
          <div className="glass-card p-8 rounded-2xl max-w-md mx-4 animate-fade-in-up border-2 border-rose-200">
            <div className="flex justify-center mb-4">
                <Unlock className="text-rose-500 w-8 h-8" />
            </div>
            <p className="font-serif text-2xl text-rose-900 italic leading-relaxed">
              "The secret is simple: <br/> I love you more with every passing second."
            </p>
            <button 
                onClick={() => { setUnlocked(false); setProgress(0); }}
                className="mt-6 text-xs text-rose-500 uppercase font-bold tracking-widest hover:text-rose-700"
            >
                Lock Secret
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SecretNote;