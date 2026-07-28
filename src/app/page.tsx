'use client';

import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import RealSenegalMap from '@/components/RealSenegalMap';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction de défilement fluide vers la carte interactive (2ème section)
  const scrollToCarte = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false); // Ferme le menu mobile lors du clic
    const element = document.getElementById('carte-interactive');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Animation d'arrivée AWAKO TOURS */}
      <SplashScreen />

      {/* Barre de navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-28 md:h-36 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center h-full py-2 group">
            <Image 
              src="/logo-transparent.png" 
              alt="AWAKO TOURS Logo" 
              width={500} 
              height={180} 
              priority
              className="h-full w-auto object-contain max-h-24 md:max-h-32 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Menu de Navigation Ordinateur */}
          <div className="hidden md:flex items-center gap-8 text-base font-medium text-gray-600">
            <Link href="/" className="text-orange-500 font-bold border-b-2 border-orange-500 pb-1">Accueil</Link>
            <a href="#carte-interactive" onClick={scrollToCarte} className="hover:text-orange-500 transition duration-200">Explorer la carte</a>
            <a href="#carte-interactive" onClick={scrollToCarte} className="hover:text-orange-500 transition duration-200">Pôles touristiques</a>
            <Link href="/categories" className="hover:text-orange-500 transition duration-200">Catégories</Link>
          </div>

          <button
            disabled
            className="hidden sm:block px-5 py-2.5 rounded-full bg-gray-100 text-gray-400 text-sm font-medium cursor-not-allowed"
          >
            Connexion (V1)
          </button>

          {/* Bouton Hamburger pour Téléphone */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 text-3xl focus:outline-none"
            aria-label="Menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Menu Déroulant Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex flex-col space-y-4 text-base font-medium text-gray-700 shadow-lg">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-orange-500 font-bold">
              Accueil
            </Link>
            <a href="#carte-interactive" onClick={scrollToCarte} className="hover:text-orange-500 transition">
              Explorer la carte
            </a>
            <a href="#carte-interactive" onClick={scrollToCarte} className="hover:text-orange-500 transition">
              Pôles touristiques
            </a>
            <Link href="/categories" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500 transition">
              Catégories
            </Link>
          </div>
        )}
      </nav>

      {/* 1ère Section : Hero Section */}
      <section className="relative pt-60 pb-32 md:pt-80 md:pb-48 flex items-center justify-center text-white overflow-hidden min-h-[110vh] md:min-h-[1200px]">
        {/* Calage strict sur le BAS de l'image (object-bottom) pour masquer le trop-plein de ciel orange en haut */}
        <div className="absolute inset-0">
          <Image
            src="/image1accueil.jpg"
            alt="AWAKO TOURS Baobab"
            fill
            priority
            className="object-cover object-bottom"
          />
        </div>
        
        {/* Voile dégradé sombre pour la lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/70 to-black/50" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
            Portail National du Tourisme Digital
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6 drop-shadow-md">
            Découvrez le Sénégal autrement avec <span className="text-orange-400">AWAKO TOURS</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow">
            Explorez les richesses touristiques du Sénégal à travers nos différents pôles touristiques.
          </p>
          
          <a
            href="#carte-interactive"
            onClick={scrollToCarte}
            className="inline-flex items-center px-8 py-4 rounded-full bg-orange-500 text-white font-bold text-base hover:bg-orange-600 transition duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5"
          >
            Explorer la carte
          </a>
        </div>
      </section>

      {/* 2ème Section : Vraie Carte Interactive */}
      <section id="carte-interactive" className="py-20 px-6 bg-gray-50 scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <RealSenegalMap /> 
        </div>
      </section>
    </main>
  );
}