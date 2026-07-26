'use client';
import { useState } from 'react';
import Link from 'next/link';

// --- DONNÉES DES PÔLES ET COORDONNÉES GPS ---
interface Pole {
  id: string;
  name: string;
  regions: string;
  departments: string[];
  description: string;
  color: string;
  gallery: string[];
  lat: number;
  lng: number;
}

const POLES_DATA: Record<string, Pole> = {
  dakar: {
    id: 'dakar',
    name: 'Pôle Dakar',
    regions: 'Région de Dakar',
    departments: ['Dakar', 'Pikine', 'Guédiawaye', 'Rufisque', 'Keur Massar'],
    description: 'Capitale dynamique, Gorée, Ngor, Almadies et Lac Rose.',
    color: '#24d700',
    gallery: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572252821143-035a26a9f029?auto=format&fit=crop&w=800&q=80',
    ],
    lat: 14.6934,
    lng: -17.4479,
  },
  thies: {
    id: 'thies',
    name: 'Pôle Thiès',
    regions: 'Région de Thiès',
    departments: ['Thiès', 'Mbour', 'Tivaouane'],
    description: 'Petite Côte, Saly Portudal, Somone et Tivaouane.',
    color: '#00d9bb',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    ],
    lat: 14.7833,
    lng: -16.9167,
  },
  nord: {
    id: 'nord',
    name: 'Pôle Nord (Saint-Louis)',
    regions: 'Saint-Louis',
    departments: ['Saint-Louis', 'Dagana', 'Podor'],
    description: 'Patrimoine UNESCO, Parc du Djoudj et Fleuve Sénégal.',
    color: '#fffe3a',
    gallery: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
    ],
    lat: 16.0326,
    lng: -16.4818,
  },
  nord_est: {
    id: 'nord_est',
    name: 'Pôle Nord-Est (Matam)',
    regions: 'Matam',
    departments: ['Matam', 'Kanel', 'Ranérou Ferlo'],
    description: 'Le Fouta pastoral, les berges du fleuve et le Ferlo.',
    color: '#0a9af5',
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    ],
    lat: 15.6559,
    lng: -13.2554,
  },
  louga_diourbel: {
    id: 'louga_diourbel',
    name: 'Pôle Louga / Diourbel',
    regions: 'Louga & Diourbel',
    departments: ['Louga', 'Linguère', 'Kébémer', 'Diourbel', 'Bambey', 'Mbacké'],
    description: 'Désert de Lompoul, cité sainte de Touba et le Djolof.',
    color: '#f50c0c',
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    ],
    lat: 15.6187,
    lng: -15.5418,
  },
  centre: {
    id: 'centre',
    name: 'Pôle Centre',
    regions: 'Fatick, Kaolack, Kaffrine',
    departments: ['Fatick', 'Foundiougne', 'Gossas', 'Kaolack', 'Nioro du Rip', 'Guinguinéo', 'Kaffrine', 'Birkelane', 'Koungheul', 'Malem Hodar'],
    description: 'Delta du Sine Saloum, mangroves et îles.',
    color: '#003dd7',
    gallery: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    ],
    lat: 14.1504,
    lng: -16.0730,
  },
  sud_est: {
    id: 'sud_est',
    name: 'Pôle Sud-Est',
    regions: 'Tambacounda, Kédougou',
    departments: ['Tambacounda', 'Bakel', 'Goudiry', 'Koumpentoum', 'Kédougou', 'Salémata', 'Saraya'],
    description: 'Niokolo-Koba, cascade de Dindéfélo et pays Bassari.',
    color: '#aa229f',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    ],
    lat: 13.7689,
    lng: -13.6673,
  },
  sud: {
    id: 'sud',
    name: 'Pôle Sud (Casamance)',
    regions: 'Ziguinchor, Sédhiou, Kolda',
    departments: ['Ziguinchor', 'Bignona', 'Oussouye', 'Sédhiou', 'Bounkiling', 'Goudomp', 'Kolda', 'Vélingara', 'Médina Yoro Foulah'],
    description: 'Casamance : Cap Skirring, bolongs et traditions.',
    color: '#f5960a',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    ],
    lat: 12.5833,
    lng: -16.2719,
  },
};

// --- DONNÉES DÉCOUVERTES ---
const DISCOVER_ITEMS = [
  {
    id: 1,
    title: 'Patrimoine & Sites UNESCO',
    category: 'Histoire',
    icon: '🏛️',
    description: 'Maison des Esclaves à Gorée, architecture coloniale de Saint-Louis et sites mégalithiques.',
    tag: 'Culture & Mémoire',
  },
  {
    id: 2,
    title: 'Culture & Art de Vivre',
    category: 'Culture',
    icon: '🎭',
    description: 'Festivals de musique, lutte sénégalaise, artisanat local et valeurs de la Teranga.',
    tag: 'Tradition',
  },
  {
    id: 3,
    title: 'Gastronomie du Terroir',
    category: 'Gastronomie',
    icon: '🍲',
    description: 'Ceebu Jën national, Yassa, Mafé et jus naturels locaux (Bouye & Bissap).',
    tag: 'Saveurs',
  },
  {
    id: 4,
    title: 'Écotourisme & Nature',
    category: 'Nature',
    icon: '🌿',
    description: 'Réserve du Djoudj, bolongs du Sine Saloum, cascades de Dindéfélo et Niokolo-Koba.',
    tag: 'Aventure Verte',
  },
];

// --- DONNÉES GALERIE D'IMAGES ---
const GALLERY_ITEMS = [
  { id: 1, title: 'Île de Gorée', category: 'Patrimoine', location: 'Dakar', image: 'https://images.unsplash.com/photo-1572252821143-035a26a9f029?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Plage de Saly', category: 'Plages', location: 'Thiès', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Pont Faidherbe', category: 'Patrimoine', location: 'Saint-Louis', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Delta du Sine Saloum', category: 'Nature', location: 'Fatick', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Cascade de Dindéfélo', category: 'Nature', location: 'Kédougou', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Cap Skirring', category: 'Plages', location: 'Casamance', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
];

function gpsToSvg(lat: number, lng: number) {
  const minLat = 12.0;
  const maxLat = 16.7;
  const minLng = -17.6;
  const maxLng = -11.3;

  const svgWidth = 600;
  const svgHeight = 500;

  const x = ((lng - minLng) / (maxLng - minLng)) * svgWidth;
  const y = ((maxLat - lat) / (maxLat - minLat)) * svgHeight;

  return { x, y };
}

export default function SenegalTouristPage() {
  const [selectedPoleId, setSelectedPoleId] = useState<string>('dakar');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('Tous');

  const activePole = POLES_DATA[selectedPoleId] || POLES_DATA.dakar;
  const activeCoords = gpsToSvg(activePole.lat, activePole.lng);

  // Fonction de défilement interne ultra fluide
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPole = (id: string) => {
    setSelectedPoleId(id);
    setCurrentImageIndex(0);
  };

  const filteredGallery = activeCategory === 'Tous' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="w-full bg-slate-50 min-h-screen">

      {/* 1. SECTION DÉCOUVRIR (SANS AUCUNE BARRE DE NAVIGATION PARASITE) */}
      <section id="decouvrir" className="max-w-7xl mx-auto px-4 pt-10 pb-16">
        
        {/* En-tête de la section */}
        <div className="text-center mb-10">
          <span className="text-orange-500 font-bold uppercase tracking-wider text-xs px-3.5 py-1.5 bg-orange-100 rounded-full">
            Explorez La Teranga
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-blue-950 mt-3">
            Découvrir le Sénégal
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-2xl mx-auto">
            Une terre de contrastes d'une richesse exceptionnelle, entre traditions ancestrales, plages de rêve, gastronomie généreuse et réserves naturelles uniques.
          </p>
        </div>

        {/* MENTION / TABLEAU RÉCAPITULATIF À CÔTÉ DES CARTES DÉCOUVERTES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Grille des cartes de découverte (8 colonnes) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {DISCOVER_ITEMS.map((item) => (
              <div
                key={item.id} 
                onClick={() => scrollToSection('poles')}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-3 bg-orange-50 rounded-2xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-blue-950 mb-2 group-hover:text-orange-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-blue-950 group-hover:text-orange-500 transition-colors">
                  <span>Voir sur la carte</span>
                  <span>↓</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tableau synthétique à côté (4 colonnes) pour remplacer élégamment la barre */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-100 shadow-md p-6">
            <h3 className="text-base font-bold text-blue-950 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <span>📌</span> Aperçu Général
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider font-bold text-gray-400 border-b border-gray-100">
                    <th className="pb-2">Thématique</th>
                    <th className="pb-2 text-right">Incontournables</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs">
                  <tr>
                    <td className="py-3 font-semibold text-blue-950">🏛️ Histoire</td>
                    <td className="py-3 text-right text-gray-500">Gorée, St-Louis</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-blue-950">🎭 Culture</td>
                    <td className="py-3 text-right text-gray-500">Teranga, Lutte</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-blue-950">🍲 Cuisine</td>
                    <td className="py-3 text-right text-gray-500">Ceebu Jën, Yassa</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-blue-950">🌿 Nature</td>
                    <td className="py-3 text-right text-gray-500">Djoudj, Saloum</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => scrollToSection('poles')}
              className="mt-6 w-full py-3 rounded-2xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs shadow transition text-center block"
            >
              Explorer les 8 Pôles →
            </button>
          </div>

        </div>
      </section>

      {/* 2. SECTION CARTE INTERACTIVE (#POLES) */}
      <section id="poles" className="max-w-7xl mx-auto px-4 py-16 scroll-mt-10">
        <div className="text-center mb-8">
          <span className="text-orange-500 font-bold uppercase tracking-wider text-xs px-3.5 py-1.5 bg-orange-100 rounded-full">
            Carte Officielle
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-blue-950 mt-3">
            Les 8 Pôles Touristiques du Sénégal
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CARTE SVG */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-xl relative flex flex-col items-center justify-center min-h-[480px]">
            <div className="relative w-full max-w-[550px] aspect-[4/3] flex items-center justify-center">
              <img 
                src="/carte-senegal.svg" 
                alt="Carte officielle des 8 pôles touristiques du Sénégal" 
                className="w-full h-auto object-contain drop-shadow-md"
              />

              <svg
                viewBox="0 0 600 500"
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {activeCoords && (
                  <g transform={`translate(${activeCoords.x}, ${activeCoords.y})`}>
                    <circle r="20" fill={activePole.color} className="animate-ping opacity-75" />
                    <circle r="12" fill={activePole.color} className="opacity-40" />
                    <circle r="6" fill="#ffffff" stroke={activePole.color} strokeWidth="3" />
                  </g>
                )}
              </svg>
            </div>

            {/* Boutons des pôles */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {Object.values(POLES_DATA).map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPole(p.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedPoleId === p.id
                      ? 'text-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: selectedPoleId === p.id ? p.color : undefined,
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* DÉTAILS DU PÔLE SÉLECTIONNÉ */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden sticky top-10">
              <div className="relative h-56 bg-gray-900 group">
                <img 
                  src={activePole.gallery[currentImageIndex] || activePole.gallery[0]} 
                  alt={activePole.name} 
                  className="w-full h-full object-cover opacity-85 transition-all duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-4 left-6 right-6 text-white z-10">
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-widest bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-md">
                    {activePole.regions}
                  </span>
                  <h3 className="text-2xl font-black mt-1">{activePole.name}</h3>
                </div>

                {activePole.gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev - 1 + activePole.gallery.length) % activePole.gallery.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition z-20"
                    >
                      ❮
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev + 1) % activePole.gallery.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition z-20"
                    >
                      ❯
                    </button>
                  </>
                )}
              </div>

              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{activePole.description}</p>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Départements ({activePole.departments.length})
                </h4>
                <div className="flex flex-wrap gap-1.5 mb-8 max-h-36 overflow-y-auto">
                  {activePole.departments.map((dept, i) => (
                    <span key={i} className="bg-orange-50 border border-orange-200 text-orange-900 px-3 py-1 rounded-lg text-xs font-semibold">
                      {dept}
                    </span>
                  ))}
                </div>

                <Link 
                  href={`/poles/${activePole.id}`} 
                  className="block w-full text-center py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition"
                >
                  Explorer {activePole.name} →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. GALERIE D'IMAGES GLOBALE */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-xs px-3.5 py-1.5 bg-orange-100 rounded-full">
              Inspiration & Découverte
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-blue-950 mt-3">
              Galerie d'Images du Sénégal
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              Explorez la richesse culturelle, les paysages époustouflants et les plages paradisiaques de la Teranga.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {['Tous', 'Plages', 'Patrimoine', 'Nature'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-blue-950 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div 
                key={item.id} 
                className="group relative h-72 rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gray-100 cursor-pointer"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded backdrop-blur-md">
                    {item.category} • {item.location}
                  </span>
                  <h4 className="text-xl font-bold mt-1 group-hover:text-orange-300 transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-blue-950 text-white pt-16 pb-8 border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link href="/" className="inline-flex justify-center md:justify-start mb-4">
              <img 
                src="/logo-transparent.png" 
                alt="Logo Officiel" 
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Portail officiel pour la découverte des 8 pôles touristiques et culturels du Sénégal. Préparez votre prochain séjour au cœur de la Teranga.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-orange-400 transition">Accueil</Link></li>
              <li>
                <button onClick={() => scrollToSection('decouvrir')} className="hover:text-orange-400 transition">
                  Découvrir
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('poles')} className="hover:text-orange-400 transition">
                  Pôles touristiques
                </button>
              </li>
              <li><Link href="/galerie" className="hover:text-orange-400 transition">Galerie</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-4">
              Pôles à découvrir
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              {Object.values(POLES_DATA).map((pole) => (
                <li key={pole.id}>
                  <Link href={`/poles/${pole.id}`} className="hover:text-orange-400 transition">
                    {pole.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-4">
              Restez informé
            </h4>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="w-full px-4 py-2.5 rounded-xl bg-blue-900 text-white border border-blue-800 text-sm focus:outline-none focus:border-orange-500"
              />
              <button 
                type="submit" 
                className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-sm transition"
              >
                S'abonner
              </button>
            </form>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-blue-900 text-center text-xs text-gray-400">
          <p>© 2026 Tous droits réservés.</p>
        </div>
      </footer>

    </div>
  );
}