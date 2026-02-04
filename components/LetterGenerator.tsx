import React, { useState } from 'react';
import { LOVE_LETTERS } from '../constants';
import { Sparkles, PenTool } from 'lucide-react';

const LetterGenerator: React.FC = () => {
  const [currentLetter, setCurrentLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateLetter = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setCurrentLetter('');
    
    // Select random letter
    const template = LOVE_LETTERS[Math.floor(Math.random() * LOVE_LETTERS.length)];
    
    let index = 0;
    const interval = setInterval(() => {
      setCurrentLetter(template.slice(0, index + 1));
      index++;
      
      if (index === template.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 40); // Typing speed
  };

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 opacity-50"></div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-block p-3 rounded-full bg-rose-100 mb-6">
            <PenTool className="text-rose-600 w-6 h-6" />
        </div>
        <h2 className="text-4xl font-serif text-rose-900 mb-6">Love Note Generator</h2>
        <p className="text-gray-600 mb-10 max-w-lg mx-auto">Can't find the right words? Let the magic of the moment write them for you.</p>

        <button 
          onClick={generateLetter}
          disabled={isGenerating}
          className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full shadow-lg shadow-rose-300 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 mx-auto font-serif italic"
        >
          {isGenerating ? 'Writing...' : 'Write a Note for Me'}
          <Sparkles size={18} />
        </button>

        {/* Paper Container */}
        <div className="mt-12 bg-[#fffcf5] border border-[#f0e6d2] p-8 md:p-12 shadow-2xl max-w-2xl mx-auto rounded-lg min-h-[300px] flex items-center justify-center relative transform rotate-1 transition-transform duration-300 hover:rotate-0">
           {/* Paper Texture/Lines */}
           <div className="absolute inset-4 border border-dashed border-rose-200 pointer-events-none"></div>
           
           {currentLetter ? (
               <p className="font-script text-3xl md:text-4xl text-rose-900 leading-relaxed text-center">
                   "{currentLetter}"
               </p>
           ) : (
               <span className="text-rose-300 font-script text-2xl opacity-50">Your letter will appear here...</span>
           )}
        </div>
      </div>
    </section>
  );
};

export default LetterGenerator;