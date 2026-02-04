import React from 'react';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import KissZone from './components/KissZone';
import Gallery from './components/Gallery';
import LetterGenerator from './components/LetterGenerator';
import SecretNote from './components/SecretNote';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <main className="w-full min-h-screen relative text-rose-900 selection:bg-rose-200 selection:text-rose-900">
      <CustomCursor />
      
      {/* Sections */}
      <Hero />
      <Timeline />
      <KissZone />
      <Gallery />
      <LetterGenerator />
      <SecretNote />
      <Footer />
      
      {/* Ambient background noise/texture could go here if desired */}
    </main>
  );
};

export default App;