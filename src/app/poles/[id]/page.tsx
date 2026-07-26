'use client';
import { use } from 'react';
import Link from 'next/link';

interface PoleData {
  id: string;
  name: string;
  region: string;
  heroImage: string;
  description: string;
  history: string;
  departments: string[];
  highlights: { title: string; desc: string; img: string }[];
}

const ALL_POLES: { id: string; name: string }[] = [
  { id: 'dakar', name: 'Pôle Dakar' },
  { id: 'thies', name: 'Pôle Thiès' },
  { id: 'nord', name: 'Pôle Nord (Saint-Louis)' },
  { id: 'matam', name: 'Pôle Nord-Est (Matam)' },
  { id: 'louga', name: 'Pôle Louga / Diourbel' },
  { id: 'centre', name: 'Pôle Centre' },
  { id: 'sud-est', name: 'Pôle Sud-Est' },
  { id: 'sud', name: 'Pôle Sud (Casamance)' },
];

const POLES_DETAILS: Record<string, PoleData> = {
  dakar: {
    id: 'dakar',
    name: 'Pôle Dakar',
    region: 'Région de Dakar',
    heroImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    description: 'La porte d’entrée culturelle et économique du Sénégal. Une presqu’île dynamique alliant modernité, plages urbaines et patrimoine historique mondial.',
    history: 'Ancien comptoir colonial et capitale depuis 1960, Dakar regorge de lieux mémoires majeurs comme l’île de Gorée, tout en étant le pôle artistique et contemporain d’Afrique de l’Ouest.',
    departments: ['Dakar', 'Pikine', 'Guédiawaye', 'Rufisque', 'Keur Massar'],
    highlights: [
      { title: 'Île de Gorée', desc: 'Site classé UNESCO, mémoire de la traite négrière et havre de paix coloré.', img: 'https://images.unsplash.com/photo-1572252821143-035a26a9f029?auto=format&fit=crop&w=600&q=80' },
      { title: 'Monument de la Renaissance', desc: 'Plus haute statue d’Afrique offrant une vue panoramique sur toute la ville.', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80' },
      { title: 'Les Almadies & Ngor', desc: 'La pointe de l’Afrique, spot prisé pour le surf, la gastronomie de mer et la détente.', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  thies: {
    id: 'thies',
    name: 'Pôle Thiès',
    region: 'Région de Thiès',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Le cœur balnéaire et artisanal du pays, abritant la célèbre Petite Côte et de paisibles lagunes.',
    history: 'Carrefour ferroviaire historique du Sénégal, Thiès est reconnue pour ses tapisseries d’art et son littoral exceptionnel qui attire des voyageurs du monde entier.',
    departments: ['Thiès', 'Mbour', 'Tivaouane'],
    highlights: [
      { title: 'Saly Portudal', desc: 'La station balnéaire référence du Sénégal avec ses plages et activités nautiques.', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
      { title: 'Lagune de la Somone', desc: 'Réserve naturelle protégée, idéale pour l’observation des oiseaux en pirogue.', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  nord: {
    id: 'nord',
    name: 'Pôle Nord (Saint-Louis)',
    region: 'Saint-Louis',
    heroImage: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    description: 'Une plongée élégante dans le passé colonial, entre architecture fluviale et réserves naturelles d’exception.',
    history: 'Première capitale du Sénégal et de l’Afrique Occidentale Française, Saint-Louis charme par son architecture coloniale bordée par le fleuve Sénégal.',
    departments: ['Saint-Louis', 'Dagana', 'Podor'],
    highlights: [
      { title: 'Pont Faidherbe', desc: 'Ouvrage métallique emblématique reliant l’île au continent.', img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80' },
      { title: 'Parc National du Djoudj', desc: '3ème plus grande réserve ornithologique au monde (UNESCO).', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  sud: {
    id: 'sud',
    name: 'Pôle Sud (Casamance)',
    region: 'Ziguinchor, Sédhiou, Kolda',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    description: 'Un paradis tropical bordé d’océan, de rizières, de forêts de fromagers et de bolongs majestueux.',
    history: 'Terre de traditions fortes et de culture Diola, la Casamance offre une authenticité unique guidée par l’hospitalité et la nature généreuse.',
    departments: ['Ziguinchor', 'Bignona', 'Oussouye', 'Sédhiou', 'Bounkiling', 'Goudomp', 'Kolda', 'Vélingara', 'Médina Yoro Foulah'],
    highlights: [
      { title: 'Cap Skirring', desc: 'Des kilomètres de plages de sable fin bordées de cocotiers.', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80' },
      { title: 'Île de Carabane', desc: 'Ancien comptoir sans voiture, accessible en pirogue au milieu des bolongs.', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80' },
    ],
  },
};

export default function SinglePolePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const poleId = resolvedParams.id;
  const pole = POLES_DETAILS[poleId] || POLES_DETAILS.dakar;

  return (
    <main className="w-full bg-[#121513] text-gray-100 min-h-screen flex flex-col justify-between font-sans">
      
      {/* BARRE NAVEGATION SUPERIEURE */}
      <nav className="bg-[#171c18] py-3.5 px-6 border-b border-[#242d25] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-[#16d026] hover:text-white font-bold text-xs flex items-center gap-2 transition">
            <span>← Accueil Carte</span>
          </Link>
          <span className="text-[11px] font-semibold bg-[#1e2520] border border-[#2a352d] px-3 py-1 rounded-full text-gray-300">
            {pole.region}
          </span>
        </div>
      </nav>

      {/* HERO SECTION UNIFIÉE SOMBRE/VERT */}
      <section className="relative h-[40vh] min-h-[320px] flex items-end justify-start bg-[#121513]">
        <img 
          src={pole.heroImage} 
          alt={pole.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121513] via-[#121513]/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 pb-8 w-full z-10">
          <span className="text-[#16d026] font-bold uppercase tracking-widest text-[10px] px-2.5 py-1 bg-[#16d026]/10 border border-[#16d026]/30 rounded-md inline-block mb-2">
            Pôle Touristique Officiel
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">{pole.name}</h1>
          <p className="text-xs md:text-sm text-gray-300 max-w-2xl mt-2 leading-relaxed font-normal">
            {pole.description}
          </p>
        </div>
      </section>

      {/* CONTENU PRINCIPAL & COLONNE LATERALE DE SELECTION */}
      <section className="max-w-7xl mx-auto px-6 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        
        {/* CONTENU DU POLE (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-[#171c18] p-6 rounded-2xl border border-[#242d25]">
            <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16d026]"></span>
              Présentation & Histoire
            </h2>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{pole.history}</p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white mb-3">Sites incontournables</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pole.highlights.map((item, idx) => (
                <div key={idx} className="bg-[#171c18] rounded-xl overflow-hidden border border-[#242d25] group">
                  <div className="h-36 overflow-hidden relative">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-85"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-xs text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#171c18] p-5 rounded-2xl border border-[#242d25]">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
              Départements rattachés ({pole.departments.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {pole.departments.map((dept, i) => (
                <span key={i} className="bg-[#1e2520] border border-[#2a352d] text-gray-200 font-medium px-3 py-1 rounded-lg text-xs">
                  📍 {dept}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* PANNEAU DE DROITE : SELECTION DIRECTE DES POLES (4 COLS) */}
        <div className="lg:col-span-4">
          <div className="bg-[#171c18] p-4 rounded-2xl border border-[#242d25] sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-[#242d25] mb-3">
              <h3 className="text-xs font-bold text-white">Changer de pôle</h3>
              <span className="text-[10px] text-[#16d026] bg-[#16d026]/10 border border-[#16d026]/30 px-2 py-0.5 rounded">
                8 Pôles
              </span>
            </div>

            <div className="space-y-1.5">
              {ALL_POLES.map((item) => {
                const isActive = item.id === pole.id;
                return (
                  <Link
                    key={item.id}
                    href={`/poles/${item.id}`}
                    className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between text-xs font-semibold ${
                      isActive
                        ? 'bg-[#16d026] text-black border-[#16d026] shadow-md'
                        : 'bg-[#1e2520] hover:bg-[#252e28] border-[#2a352d] text-gray-300'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-black"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

      </section>

      {/* FOOTER EXACTEMENT IDENTIQUE A L'ACCUEIL */}
      <footer className="bg-[#141815] border-t border-[#242c25] p-3.5 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-1">
          {ALL_POLES.map((item) => {
            const isActive = item.id === pole.id;
            return (
              <Link
                key={item.id}
                href={`/poles/${item.id}`}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#16d026] text-black border-[#16d026] shadow-lg shadow-emerald-900/30'
                    : 'bg-[#1e2421] text-gray-300 hover:text-white hover:bg-[#28312c] border-[#2a342d]'
                }`}
              >
                {isActive && <span className="w-2 h-2 rounded-full bg-black"></span>}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </footer>

    </main>
  );
}