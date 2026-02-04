import React, { useEffect, useRef, useState } from 'react';
import { Eye, Heart, Sparkles, Infinity as InfinityIcon, LucideIcon } from 'lucide-react';
import { TIMELINE_EVENTS } from '../constants';

const iconMap: Record<string, LucideIcon> = {
  Eye,
  Sparkles,
  Heart,
  Infinity: InfinityIcon,
};

const Timeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));
            setVisibleItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.timeline-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="py-24 px-4 bg-rose-50 relative overflow-hidden">
      {/* Connecting Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-rose-300 to-transparent transform -translate-x-1/2 hidden md:block" />

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-rose-900 mb-20 text-glow">The Journey of Us</h2>

        <div className="space-y-12 md:space-y-24 relative">
          {TIMELINE_EVENTS.map((event, index) => {
            const Icon = iconMap[event.icon];
            const isLeft = index % 2 === 0;
            const isVisible = visibleItems.includes(event.id);

            return (
              <div
                key={event.id}
                data-id={event.id}
                className={`timeline-item flex flex-col md:flex-row items-center gap-8 md:gap-0 transition-all duration-1000 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              >
                {/* Content Left */}
                <div className={`md:w-1/2 flex ${isLeft ? 'md:justify-end md:text-right' : 'md:order-2 md:justify-start md:text-left'} justify-center text-center order-2 md:order-1`}>
                  <div className={`glass-card p-8 rounded-2xl max-w-sm hover:shadow-rose-300/40 hover:shadow-2xl transition-shadow duration-300`}>
                    <span className="block text-rose-500 font-cinzel text-sm mb-2 font-bold tracking-widest">{event.year}</span>
                    <h3 className="text-2xl font-serif text-rose-900 mb-3">{event.title}</h3>
                    <p className="text-gray-700 font-sans leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="relative md:absolute md:left-1/2 md:transform md:-translate-x-1/2 order-1 md:order-2">
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-rose-200 shadow-xl flex items-center justify-center z-10 relative">
                     <Icon className="text-rose-500 w-8 h-8" />
                  </div>
                  {/* Pulse Effect */}
                  <div className="absolute inset-0 bg-rose-400 rounded-full animate-ping opacity-20"></div>
                </div>

                {/* Empty Space for alignment on desktop */}
                <div className={`md:w-1/2 hidden md:block ${isLeft ? 'order-2' : 'order-1'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;