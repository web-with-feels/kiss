import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (Math.random() > 0.8) { // Only add trail occasionally for performance
          setTrail((prev) => [
            ...prev.slice(-15), // Keep last 15
            { x: e.clientX, y: e.clientY, id: Date.now() },
          ]);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Main Cursor */}
      <div
        className="fixed w-4 h-4 bg-rose-500 rounded-full blur-[2px] transition-transform duration-75 ease-out mix-blend-multiply"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Trail */}
      {trail.map((t) => (
        <div
          key={t.id}
          className="fixed text-rose-300 text-[10px] animate-sparkle"
          style={{
            left: t.x,
            top: t.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};

export default CustomCursor;