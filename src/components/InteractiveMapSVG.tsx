'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Pole {
  id: string;
  name: string;
  regions: string;
  departments: string[];
  description: string;
  image: string;
}

const POLES_DATA: Record<string, Pole> = {
  dakar: {
    id: 'dakar',
    name: 'Pôle Dakar',
    regions: 'Région de Dakar',
    departments: ['Dakar', 'Pikine', 'Guédiawaye', 'Rufisque', 'Keur Massar'],
    description: 'Capitale dynamique, Gorée, Ngor, la Pointe des Almadies et le Lac Rose.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
  },
  thies: {
    id: 'thies',
    name: 'Pôle Thiès',
    regions: 'Région de Thiès',
    departments: ['Thiès', 'Mbour', 'Tivaouane'],
    description: 'La Petite Côte, les stations balnéaires de Saly/Somone et la cité religieuse de Tivaouane.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  sud: {
    id: 'sud',
    name: 'Pôle Sud',
    regions: 'Ziguinchor, Sédhiou, Kolda (Casamance)',
    departments: ['Ziguinchor', 'Bignona', 'Oussouye', 'Sédhiou', 'Bounkiling', 'Goudomp', 'Kolda', 'Vélingara', 'Médina Yoro Foulah'],
    description: 'Casamance naturelle : plages de Cap Skirring, bolongs, traditions diolas et haute-Casamance.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
  sud_est: {
    id: 'sud_est',
    name: 'Pôle Sud-Est',
    regions: 'Tambacounda, Kédougou',
    departments: ['Tambacounda', 'Bakel', 'Goudiry', 'Koumpentoum', 'Kédougou', 'Salémata', 'Saraya'],
    description: 'Écotourisme, Parc du Niokolo-Koba, cascade de Dindéfélo et pays Bassari/Bedik.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
  },
  nord: {
    id: 'nord',
    name: 'Pôle Nord',
    regions: 'Région de Saint-Louis',
    departments: ['Saint-Louis', 'Dagana', 'Podor'],
    description: 'Patrimoine historique mondial de l’UNESCO, Parc des oiseaux du Djoudj et la vallée du Fleuve.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
  },
  nord_est: {
    id: 'nord_est',
    name: 'Pôle Nord-Est',
    regions: 'Région de Matam',
    departments: ['Matam', 'Kanel', 'Ranérou Ferlo'],
    description: 'Le Fouta pastoral, les berges du fleuve Sénégal et la réserve de faune du Ferlo.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
  },
  centre: {
    id: 'centre',
    name: 'Pôle Centre',
    regions: 'Fatick, Kaolack, Kaffrine',
    departments: ['Fatick', 'Foundiougne', 'Gossas', 'Kaolack', 'Nioro du Rip', 'Guinguinéo', 'Kaffrine', 'Birkelane', 'Koungheul', 'Malem Hodar'],
    description: 'Delta du Sine Saloum (mangroves et îles), carrefour commercial et richesses culturelles du Saloum.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
  },
  louga_diourbel: {
    id: 'louga_diourbel',
    name: 'Pôle Louga / Diourbel',
    regions: 'Régions de Louga & Diourbel',
    departments: ['Louga', 'Linguère', 'Kébémer', 'Diourbel', 'Bambey', 'Mbacké'],
    description: 'Désert de Lompoul, grande cité religieuse de Touba et le cœur du Djolof.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
  },
};

export default function InteractiveMapSVG() {
  const [selectedPoleId, setSelectedPoleId] = useState<string>('dakar');
  const [hoveredPoleId, setHoveredPoleId] = useState<string | null>(null);

  const activePole = POLES_DATA[selectedPoleId] || POLES_DATA.dakar;

  return (
    <div className="w-full">
      {/* En-tête */}
      <div className="text-center mb-12">
        <span className="text-orange-500 font-bold uppercase tracking-wider text-xs px-3.5 py-1.5 bg-orange-100 rounded-full">
          Découverte Régionale
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-blue-950 mt-3">
          Les 8 Pôles Touristiques du Sénégal
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-3 text-base">
          Cliquez sur un pôle géographique pour afficher ses régions et départements associés.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Carte SVG Interactive */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden">
          
          <div className="absolute top-4 left-4 bg-blue-950/90 text-white px-4 py-2 rounded-xl text-xs font-semibold backdrop-blur-md z-10 shadow-md">
            Pôle : <span className="text-orange-400 font-bold">{POLES_DATA[hoveredPoleId || selectedPoleId]?.name}</span>
          </div>

          <svg
            viewBox="0 0 800 600"
            className="w-full h-auto drop-shadow-md select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="800" height="600" fill="#f0f9ff" rx="20" />
            
            {/* Océan */}
            <path d="M 50,0 Q 120,200 100,300 T 150,600 L 0,600 L 0,0 Z" fill="#e0f2fe" />
            <text x="30" y="300" fill="#0284c7" fontSize="12" fontWeight="bold" transform="rotate(-90 30,300)">
              OCÉAN ATLANTIQUE
            </text>

            {/* 1. DAKAR */}
            <g
              onClick={() => setSelectedPoleId('dakar')}
              onMouseEnter={() => setHoveredPoleId('dakar')}
              onMouseLeave={() => setHoveredPoleId(null)}
              className="cursor-pointer transition-all duration-300"
            >
              <circle
                cx="120"
                cy="280"
                r="22"
                fill={selectedPoleId === 'dakar' ? '#f97316' : '#fdba74'}
                stroke="#ffffff"
                strokeWidth="3"
                className="hover:scale-110 origin-center transition-transform"
              />
              <text x="120" y="284" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                Dakar
              </text>
            </g>

            {/* 2. THIÈS */}
            <g
              onClick={() => setSelectedPoleId('thies')}
              onMouseEnter={() => setHoveredPoleId('thies')}
              onMouseLeave={() => setHoveredPoleId(null)}
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M 145,250 Q 210,240 210,310 T 180,360 Z"
                fill={selectedPoleId === 'thies' ? '#f97316' : '#38bdf8'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x="175" y="300" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">
                Thiès
              </text>
            </g>

            {/* 3. LOUGA / DIOURBEL */}
            <g
              onClick={() => setSelectedPoleId('louga_diourbel')}
              onMouseEnter={() => setHoveredPoleId('louga_diourbel')}
              onMouseLeave={() => setHoveredPoleId(null)}
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M 160,160 L 380,160 L 330,300 L 210,310 L 145,250 Z"
                fill={selectedPoleId === 'louga_diourbel' ? '#f97316' : '#a855f7'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x="250" y="230" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                Louga / Diourbel
              </text>
            </g>

            {/* 4. NORD (Saint-Louis) */}
            <g
              onClick={() => setSelectedPoleId('nord')}
              onMouseEnter={() => setHoveredPoleId('nord')}
              onMouseLeave={() => setHoveredPoleId(null)}
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M 160,80 Q 300,50 480,90 L 380,160 L 160,160 Z"
                fill={selectedPoleId === 'nord' ? '#f97316' : '#0d9488'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x="300" y="115" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                Nord (Saint-Louis)
              </text>
            </g>

            {/* 5. NORD-EST (Matam) */}
            <g
              onClick={() => setSelectedPoleId('nord_est')}
              onMouseEnter={() => setHoveredPoleId('nord_est')}
              onMouseLeave={() => setHoveredPoleId(null)}
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M 480,90 L 680,130 L 580,240 L 380,160 Z"
                fill={selectedPoleId === 'nord_est' ? '#f97316' : '#eab308'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x="520" y="155" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">
                Nord-Est (Matam)
              </text>
            </g>

            {/* 6. CENTRE (Fatick, Kaolack, Kaffrine) */}
            <g
              onClick={() => setSelectedPoleId('centre')}
              onMouseEnter={() => setHoveredPoleId('centre')}
              onMouseLeave={() => setHoveredPoleId(null)}
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M 180,360 L 330,300 L 460,330 L 420,440 L 200,440 Z"
                fill={selectedPoleId === 'centre' ? '#f97316' : '#22c55e'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x="320" y="380" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                Centre
              </text>
            </g>

            {/* 7. SUD-EST (Tambacounda, Kédougou) */}
            <g
              onClick={() => setSelectedPoleId('sud_est')}
              onMouseEnter={() => setHoveredPoleId('sud_est')}
              onMouseLeave={() => setHoveredPoleId(null)}
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M 460,330 L 580,240 L 760,280 L 740,530 L 440,490 Z"
                fill={selectedPoleId === 'sud_est' ? '#f97316' : '#d97706'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x="580" y="380" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                Sud-Est
              </text>
            </g>

            {/* 8. SUD (Ziguinchor, Sédhiou, Kolda) */}
            <g
              onClick={() => setSelectedPoleId('sud')}
              onMouseEnter={() => setHoveredPoleId('sud')}
              onMouseLeave={() => setHoveredPoleId(null)}
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M 160,490 L 440,490 L 440,570 L 160,570 Z"
                fill={selectedPoleId === 'sud' ? '#f97316' : '#10b981'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x="300" y="535" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                Sud (Casamance)
              </text>
            </g>
          </svg>

          {/* Boutons de sélection rapide */}
          <div className="mt-4 flex flex-wrap gap-1.5 justify-center text-xs">
            {Object.values(POLES_DATA).map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPoleId(p.id)}
                className={`px-3 py-1.5 rounded-full font-semibold transition ${
                  selectedPoleId === p.id
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Panneau de détails */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden sticky top-36">
            
            <div className="relative h-48 bg-gray-900">
              <img
                src={activePole.image}
                alt={activePole.name}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
                  {activePole.regions}
                </span>
                <h3 className="text-2xl font-black mt-1">{activePole.name}</h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {activePole.description}
              </p>

              {/* Affichage des départements officiels */}
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Départements inclus ({activePole.departments.length})
              </h4>
              <div className="flex flex-wrap gap-1.5 mb-8 max-h-40 overflow-y-auto pr-1">
                {activePole.departments.map((dept, index) => (
                  <span
                    key={index}
                    className="bg-orange-50 border border-orange-200 text-orange-900 px-3 py-1 rounded-lg text-xs font-semibold"
                  >
                    {dept}
                  </span>
                ))}
              </div>

              <Link
                href={`/explorer?pole=${activePole.id}`}
                className="block w-full text-center py-3.5 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md hover:shadow-orange-500/30 transition duration-200"
              >
                Explorer la destination {activePole.name} →
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}