'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-blue-950 text-white transition-opacity duration-700 ease-in-out px-4">
      <div className="flex flex-col items-center gap-8 animate-pulse w-full max-w-3xl">
        
        {/* Logo TRÈS GRAND */}
        <Image 
          src="/logo-transparent.png" 
          alt="AWAKO TOURS Logo" 
          width={800} 
          height={350} 
          priority
          className="h-80 sm:h-[420px] md:h-[500px] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        />
        
        {/* Texte et barre d'animation */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-orange-400 font-black tracking-[0.2em] text-base md:text-xl uppercase">
            Bienvenue au Sénégal
          </p>
          <div className="w-48 md:w-64 h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="w-full h-full bg-orange-500 animate-pulse"></div>
          </div>
        </div>

      </div>
    </div>
  );
}