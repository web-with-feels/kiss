import React, { useState } from 'react';
import { X } from 'lucide-react';

const Footer: React.FC = () => {
  const [showFinale, setShowFinale] = useState(false);

  return (
    <footer className="bg-rose-900 text-rose-100 py-20 px-4 text-center relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif mb-8 text-white">Forever & Always</h2>
        <p className="text-rose-200/80 font-sans mb-10 text-lg">Thank you for being my Valentine, today and every day.</p>
        
        <button 
          onClick={() => setShowFinale(true)}
          className="bg-white text-rose-900 hover:bg-rose-50 px-10 py-4 rounded-full font-serif text-xl font-bold shadow-2xl transition-transform hover:-translate-y-1"
        >
          Seal it with a Kiss 💋
        </button>

        <p className="mt-16 text-xs text-rose-400 opacity-60 font-sans">© Kiss Day Experience. Made with Love.</p>
      </div>

      {/* Finale Modal */}
      {showFinale && (
        <div className="fixed inset-0 z-50 bg-rose-950 flex items-center justify-center animate-fade-in-up">
            <div className="absolute inset-0 overflow-hidden">
                {/* Massive particle shower */}
                {[...Array(50)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute text-4xl animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${3 + Math.random() * 5}s`,
                            animationDelay: `${Math.random() * 2}s`,
                            opacity: 0.3 + Math.random() * 0.7
                        }}
                    >
                        {Math.random() > 0.5 ? '❤️' : '💋'}
                    </div>
                ))}
            </div>

            <div className="relative z-20 text-center p-8">
                <h1 className="text-6xl md:text-8xl font-script text-white mb-6 text-glow">I Love You</h1>
                <p className="text-2xl text-rose-200 font-serif italic">Now and Forever.</p>
                <button 
                    onClick={() => setShowFinale(false)}
                    className="mt-12 absolute top-4 right-4 md:static md:mt-12 md:top-auto md:right-auto p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                    <X className="text-white" />
                </button>
            </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;