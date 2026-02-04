import React from 'react';
import { GALLERY_ITEMS } from '../constants';

const Gallery: React.FC = () => {
  return (
    <section className="py-24 bg-rose-50 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-rose-900 mb-16">Moments of Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="group relative h-96 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
            >
              <img 
                src={item.src} 
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-rose-200 text-xs font-bold tracking-widest uppercase mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{item.date}</span>
                <p className="text-white font-serif text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;