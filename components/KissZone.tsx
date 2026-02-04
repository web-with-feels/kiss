import React, { useState, useRef } from 'react';
import { KissMark } from '../types';
import { POETIC_MESSAGES } from '../constants';

const KissZone: React.FC = () => {
  const [kissCount, setKissCount] = useState(0);
  const [marks, setMarks] = useState<KissMark[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("Tap to send a kiss");

  const handleKiss = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent scrolling on touch
    // e.preventDefault(); // removed to allow scroll if user drags, but handled nicely via design
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newMark: KissMark = {
      id: Date.now(),
      x,
      y,
      rotation: Math.random() * 60 - 30,
      scale: 0.8 + Math.random() * 0.4,
    };

    setMarks((prev) => [...prev, newMark]);
    setKissCount((prev) => prev + 1);
    
    const randomMsg = POETIC_MESSAGES[Math.floor(Math.random() * POETIC_MESSAGES.length)];
    setMessage(randomMsg);

    // Haptic feedback if available
    if (navigator.vibrate) navigator.vibrate(50);

    // Cleanup mark
    setTimeout(() => {
      setMarks((prev) => prev.filter((m) => m.id !== newMark.id));
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-rose-100 to-pink-200 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-4">Send a Kiss</h2>
        <p className="font-sans text-rose-700 mb-8">Tap the box below to fill the world with love.</p>
        
        <div 
          ref={containerRef}
          onClick={handleKiss}
          className="relative w-full h-80 md:h-96 glass-card rounded-3xl cursor-pointer overflow-hidden shadow-inner hover:shadow-rose-400/50 transition-all active:scale-[0.99]"
        >
          {/* Central Prompt */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            <span className="text-8xl md:text-9xl opacity-20 filter blur-sm">💋</span>
            <p className="mt-4 text-2xl font-serif text-rose-800 animate-pulse">{message}</p>
          </div>

          {/* Floating Kisses */}
          {marks.map((mark) => (
            <div
              key={mark.id}
              className="absolute text-5xl md:text-6xl animate-fade-in-up pointer-events-none select-none"
              style={{
                left: mark.x,
                top: mark.y,
                transform: `translate(-50%, -50%) rotate(${mark.rotation}deg) scale(${mark.scale})`,
              }}
            >
              💋
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center items-center gap-4">
          <div className="bg-white/50 px-6 py-3 rounded-full shadow-sm backdrop-blur-sm">
            <span className="font-bold text-rose-900 text-2xl">{kissCount.toLocaleString()}</span>
            <span className="ml-2 text-rose-600 uppercase tracking-widest text-xs font-bold">Kisses Sent</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KissZone;