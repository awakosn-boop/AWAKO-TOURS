'use client';
import { useState } from 'react';
import Link from 'next/link';

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

interface GalleryItem {
  id: number;
  title: string;
  categories: string[];
  location: string;
  image: string;
}

const POLES_DATA: Record<string, Pole> = {
  dakar: {
    id: 'dakar',
    name: 'Pôle Dakar',
    regions: 'Région de Dakar',
    departments: ['Dakar', 'Pikine', 'Guédiawaye', 'Rufisque', 'Keur Massar'],
    description: 'Capitale dynamique, Gorée, Ngor, Almadies, Corniche Ouest et Lac Rose.',
    color: '#24d700',
    gallery: [
      '/dakarIlegoree.jpg',
      '/dakarMonuRenaiss.jpg',
      '/dakarLacRose.jpg',
      '/dakarIleNgor.jpg',
      '/dakarMosqueDivCORNICHE.jpg',
      '/dakarRueGOREE.jpg',
      '/dakarIleGOREEMaison.jpg',
      '/dakarPlageGOREE.jpg',
      '/dakarKermel.jpg',
      '/dakarMarche.jpg',
    ],
    lat: 14.6934,
    lng: -17.4479,
  },
  thies: {
    id: 'thies',
    name: 'Pôle Thiès',
    regions: 'Région de Thiès',
    departments: ['Thiès', 'Mbour', 'Tivaouane'],
    description: 'Petite Côte, Saly Portudal, Somone, Joal-Fadiouth, Réserve de Bandia et Tivaouane.',
    color: '#00d9bb',
    gallery: [
      '/thiesJoal.jpg',
      '/thiesJoal2.jpg',
      '/thiesPalmbeach.jpg',
      '/thiesLagune.jpg',
      '/thieslagunesomone.jpg',
      '/thiesBandia.jpg',
      '/thies.jpg',
      '/thiesEglise.jpg',
    ],
    lat: 14.7833,
    lng: -16.9167,
  },
  nord: {
    id: 'nord',
    name: 'Pôle Nord (Saint-Louis)',
    regions: 'Saint-Louis',
    departments: ['Saint-Louis', 'Dagana', 'Podor'],
    description: 'Patrimoine UNESCO, Parc du Djoudj, Ile de Saint-Louis et Fleuve Sénégal.',
    color: '#fffe3a',
    gallery: [
      '/saintlouisPont.jpg',
      '/saintlouis.jpg',
      '/saintlouisILE.jpg',
      '/saintlouis2.jpg',
      '/saintlouisDjoudj.jpg',
      '/saintlouisArchitecture.jpg',
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
      '/matamFleuve.jpg',
      '/matamFerlo.jpg',
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
      '/lompoulDesert.jpg',
      '/toubaMosquee.jpg',
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
      '/saloumDelta.jpg',
      '/saloumMangrove.jpg',
    ],
    lat: 14.1504,
    lng: -16.0730,
  },
  sud_est: {
    id: 'sud_est',
    name: 'Pôle Sud-Est',
    regions: 'Tambacounda, Kédougou',
    departments: ['Tambacounda', 'Bakel', 'Goudiry', 'Koumpentoum', 'Kédougou', 'Salémata', 'Saraya'],
    description: 'Niokolo-Koba, lodges éco-responsables, cascade de Dindéfélo, cascades d\'Ibel/Inguili et Pays Bassari.',
    color: '#aa229f',
    gallery: [
      '/tambaniokolodge.jpg',
      '/tambaniokolodge2.jpg',
      '/tambaniokolodge3.png',
      '/kedougouCascadeDindefelo.jpg',
      '/kedougouCascadeInguili.jpg',
      '/kedougoubassari.jpg',
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
      '/capSkirringPlage.jpg',
      '/casamanceCapskirring.jpg',
      '/casamanceBolongs.jpg',
    ],
    lat: 12.5833,
    lng: -16.2719,
  },
};

const DISCOVER_ITEMS = [
  {
    id: 1,
    title: 'Patrimoine & Sites UNESCO',
    category: 'Histoire',
    icon: '🏛️',
    description: 'Maison des Esclaves à Gorée, architecture coloniale et pont de Saint-Louis, Pays Bassari et sites mégalithiques.',
    tag: 'Culture & Mémoire',
    targetPole: 'dakar',
    targetCategory: 'Patrimoine',
    previewPhotos: [
      '/dakarIleGOREEMaison.jpg',
      '/saintlouisPont.jpg',
      '/saintlouisILE.jpg'
    ],
    associatedPoles: ['Pôle Dakar', 'Pôle Nord (Saint-Louis)', 'Pôle Sud-Est (Kédougou)'],
  },
  {
    id: 2,
    title: 'Culture & Art de Vivre',
    category: 'Culture',
    icon: '🎭',
    description: 'Festivals de musique, traditions Bassari et Bédik, lutte sénégalaise et valeurs de la Teranga.',
    tag: 'Tradition',
    targetPole: 'sud_est',
    targetCategory: 'Culture',
    previewPhotos: [
      '/kedougoubassari.jpg',
      '/thiesJoal2.jpg',
      '/dakarRueGOREE.jpg'
    ],
    associatedPoles: ['Pôle Sud-Est (Kédougou)', 'Pôle Thiès', 'Pôle Dakar'],
  },
  {
    id: 3,
    title: 'Gastronomie du Terroir',
    category: 'Gastronomie',
    icon: '🍲',
    description: 'Ceebu Jën national, Yassa, Mafé et jus naturels locaux (Bouye & Bissap).',
    tag: 'Saveurs',
    targetPole: 'dakar',
    targetCategory: 'Culture',
    previewPhotos: [
      '/dakarKermel.jpg',
      '/dakarMarche.jpg'
    ],
    associatedPoles: ['Tous les Pôles', 'Pôle Dakar', 'Pôle Nord (Saint-Louis)'],
  },
  {
    id: 4,
    title: 'Écotourisme & Nature',
    category: 'Nature',
    icon: '🌿',
    description: 'Parc National du Niokolo-Koba & Lodges, Cascades de Dindéfélo/Inguili, Réserve du Djoudj et Sine Saloum.',
    tag: 'Aventure Verte',
    targetPole: 'sud_est',
    targetCategory: 'Nature',
    previewPhotos: [
      '/tambaniokolodge.jpg',
      '/tambaniokolodge2.jpg',
      '/kedougouCascadeDindefelo.jpg'
    ],
    associatedPoles: ['Pôle Sud-Est (Tambacounda/Kédougou)', 'Pôle Centre', 'Pôle Nord'],
  },
];

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: 'Monument de la Renaissance', categories: ['Patrimoine', 'Sites Historiques'], location: 'Dakar', image: '/dakarMonuRenaiss.jpg' },
  { id: 2, title: 'Maison des Esclaves', categories: ['Patrimoine', 'Îles', 'Sites Historiques'], location: 'Gorée (Dakar)', image: '/dakarIleGOREEMaison.jpg' },
  { id: 3, title: 'Vue Aérienne de Gorée', categories: ['Îles', 'Patrimoine', 'Plages'], location: 'Gorée (Dakar)', image: '/dakarIlegoree.jpg' },
  { id: 4, title: 'Plage de Gorée', categories: ['Plages', 'Îles'], location: 'Gorée (Dakar)', image: '/dakarPlageGOREE.jpg' },
  { id: 5, title: 'Ruelle Colorée de Gorée', categories: ['Patrimoine', 'Îles', 'Culture'], location: 'Gorée (Dakar)', image: '/dakarRueGOREE.jpg' },
  { id: 6, title: 'Île de Ngor', categories: ['Îles', 'Plages', 'Nature'], location: 'Dakar', image: '/dakarIleNgor.jpg' },
  { id: 7, title: 'Lac Rose', categories: ['Nature', 'Sites Historiques'], location: 'Dakar', image: '/dakarLacRose.jpg' },
  { id: 8, title: 'Mosquée de la Divinité & Corniche', categories: ['Patrimoine', 'Plages', 'Sites Historiques'], location: 'Dakar', image: '/dakarMosqueDivCORNICHE.jpg' },
  { id: 9, title: 'Marché Kermel', categories: ['Culture', 'Patrimoine'], location: 'Dakar', image: '/dakarKermel.jpg' },
  { id: 10, title: 'Marché Pittoresque', categories: ['Culture'], location: 'Dakar', image: '/dakarMarche.jpg' },
  { id: 11, title: 'Joal-Fadiouth', categories: ['Patrimoine', 'Culture', 'Sites Historiques'], location: 'Thiès', image: '/thiesJoal.jpg' },
  { id: 12, title: 'Île aux Coquillages (Joal)', categories: ['Patrimoine', 'Îles', 'Culture'], location: 'Thiès', image: '/thiesJoal2.jpg' },
  { id: 13, title: 'Station Balnéaire & Plage Palm Beach', categories: ['Plages'], location: 'Saly (Thiès)', image: '/thiesPalmbeach.jpg' },
  { id: 14, title: 'Lagune de Somone', categories: ['Nature', 'Plages'], location: 'Somone (Thiès)', image: '/thiesLagune.jpg' },
  { id: 15, title: 'Réserve Naturelle de la Lagune', categories: ['Nature', 'Plages'], location: 'Somone (Thiès)', image: '/thieslagunesomone.jpg' },
  { id: 16, title: 'Réserve de Bandia', categories: ['Nature'], location: 'Thiès', image: '/thiesBandia.jpg' },
  { id: 17, title: 'Paysage de Baobabs', categories: ['Nature'], location: 'Thiès', image: '/thies.jpg' },
  { id: 18, title: 'Église de Joal-Fadiouth', categories: ['Patrimoine', 'Culture', 'Sites Historiques'], location: 'Thiès', image: '/thiesEglise.jpg' },
  { id: 19, title: 'Cascade de Dindéfélo', categories: ['Nature', 'Sites Historiques'], location: 'Kédougou', image: '/kedougouCascadeDindefelo.jpg' },
  { id: 20, title: 'Cascade d\'Inguili', categories: ['Nature'], location: 'Kédougou', image: '/kedougouCascadeInguili.jpg' },
  { id: 21, title: 'Pays Bassari & Traditions', categories: ['Culture', 'Patrimoine', 'Sites Historiques'], location: 'Kédougou', image: '/kedougoubassari.jpg' },
  { id: 22, title: 'Niokolo Lodge - Vue Fleuve', categories: ['Nature', 'Sites Historiques'], location: 'Tambacounda (Niokolo-Koba)', image: '/tambaniokolodge.jpg' },
  { id: 23, title: 'Niokolo Lodge - Hébergement & Safari', categories: ['Nature', 'Culture'], location: 'Tambacounda (Niokolo-Koba)', image: '/tambaniokolodge2.jpg' },
  { id: 24, title: 'Niokolo Lodge - Écotourisme', categories: ['Nature'], location: 'Tambacounda (Niokolo-Koba)', image: '/tambaniokolodge3.png' },
  { id: 25, title: 'Pont Faidherbe', categories: ['Patrimoine', 'Sites Historiques'], location: 'Saint-Louis', image: '/saintlouisPont.jpg' },
  { id: 26, title: 'Bateaux sur le Fleuve Sénégal', categories: ['Nature', 'Culture'], location: 'Saint-Louis', image: '/saintlouis.jpg' },
  { id: 27, title: 'Île de Saint-Louis', categories: ['Îles', 'Patrimoine', 'Sites Historiques'], location: 'Saint-Louis', image: '/saintlouisILE.jpg' },
  { id: 28, title: 'Paysage & Charme de Saint-Louis', categories: ['Patrimoine', 'Culture'], location: 'Saint-Louis', image: '/saintlouis2.jpg' },
  { id: 29, title: 'Parc National des Oiseaux du Djoudj', categories: ['Nature'], location: 'Saint-Louis', image: '/saintlouisDjoudj.jpg' },
  { id: 30, title: 'Architecture Coloniale', categories: ['Patrimoine', 'Culture'], location: 'Saint-Louis', image: '/saintlouisArchitecture.jpg' },
  { id: 31, title: 'Fleuve Sénégal', categories: ['Nature'], location: 'Matam', image: '/matamFleuve.jpg' },
  { id: 32, title: 'Paysage du Ferlo', categories: ['Nature'], location: 'Matam', image: '/matamFerlo.jpg' },
  { id: 33, title: 'Désert de Lompoul', categories: ['Nature'], location: 'Louga', image: '/lompoulDesert.jpg' },
  { id: 34, title: 'Grande Mosquée de Touba', categories: ['Patrimoine', 'Sites Historiques', 'Culture'], location: 'Diourbel', image: '/toubaMosquee.jpg' },
  { id: 35, title: 'Delta du Sine Saloum', categories: ['Nature', 'Îles'], location: 'Fatick / Kaolack', image: '/saloumDelta.jpg' },
  { id: 36, title: 'Mangroves du Saloum', categories: ['Nature'], location: 'Fatick', image: '/saloumMangrove.jpg' },
  { id: 37, title: 'Plages de Cap Skirring', categories: ['Plages', 'Nature'], location: 'Ziguinchor (Casamance)', image: '/capSkirringPlage.jpg' },
  { id: 38, title: 'Plage du Cap Skirring', categories: ['Plages', 'Nature'], location: 'Cap Skirring (Casamance)', image: '/casamanceCapskirring.jpg' },
  { id: 39, title: 'Bolongs de Casamance', categories: ['Nature', 'Îles'], location: 'Casamance', image: '/casamanceBolongs.jpg' },
];

const ALBUM_CATEGORIES = [
  'Îles', 
  'Patrimoine', 
  'Plages', 
  'Nature', 
  'Culture', 
  'Sites Historiques'
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

  const [activeCategoryModal, setActiveCategoryModal] = useState<string | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);

  const activePole = POLES_DATA[selectedPoleId] || POLES_DATA.dakar;
  const activeCoords = gpsToSvg(activePole.lat, activePole.lng);

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

  const handleDiscoverCardClick = (poleId: string) => {
    setSelectedPoleId(poleId);
    setCurrentImageIndex(0);
    scrollToSection('poles');
  };

  const openAlbumModal = (category: string) => {
    setActiveCategoryModal(category);
    setModalImageIndex(0);
  };

  const closeModal = () => {
    setActiveCategoryModal(null);
  };

  const modalImages = activeCategoryModal
    ? GALLERY_ITEMS.filter((item) => item.categories.includes(activeCategoryModal))
    : [];

  return (
    <div className="w-full bg-slate-50 min-h-screen">

      {/* 1. SECTION CARTE INTERACTIVE (#POLES) */}
      <section id="poles" className="max-w-7xl mx-auto px-4 pt-12 pb-16 scroll-mt-28">
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
                {activePole.gallery.length > 0 ? (
                  <img 
                    src={activePole.gallery[currentImageIndex] || activePole.gallery[0]} 
                    alt={activePole.name} 
                    className="w-full h-full object-cover opacity-85 transition-all duration-300" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-semibold bg-slate-800">
                    Image à venir
                  </div>
                )}
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

      {/* 2. SECTION DÉCOUVRIR LE SÉNÉGAL */}
      <section id="decouvrir" className="max-w-7xl mx-auto px-4 py-16 border-t border-gray-100">
        
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DISCOVER_ITEMS.map((item) => (
              <div
                key={item.id} 
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
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
                  
                  <p className="text-gray-600 text-xs leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* APERÇU MINIATURES DE PHOTOS ASSOCIÉES */}
                  {item.previewPhotos && item.previewPhotos.length > 0 && (
                    <div className="mb-4">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                        Aperçu Photos :
                      </span>
                      <div className="flex gap-2">
                        {item.previewPhotos.map((imgSrc, idx) => (
                          <div 
                            key={idx}
                            onClick={() => openAlbumModal(item.targetCategory)}
                            className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                          >
                            <img src={imgSrc} alt="Miniature" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PÔLES LIÉS */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.associatedPoles.map((pName, idx) => (
                      <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        📍 {pName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* BOUTONS D'ACTION */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleDiscoverCardClick(item.targetPole)}
                    className="text-xs font-bold text-blue-950 hover:text-orange-500 transition-colors flex items-center gap-1"
                  >
                    <span>Voir sur la carte</span>
                    <span>↑</span>
                  </button>

                  <button
                    onClick={() => openAlbumModal(item.targetCategory)}
                    className="text-[11px] font-bold text-orange-500 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-xl transition-colors"
                  >
                    Galerie 📸
                  </button>
                </div>
              </div>
            ))}
          </div>

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
                  <tr className="cursor-pointer hover:bg-orange-50/50" onClick={() => handleDiscoverCardClick('dakar')}>
                    <td className="py-3 font-semibold text-blue-950">🏛️ Histoire</td>
                    <td className="py-3 text-right text-gray-500">Gorée, St-Louis, Bassari</td>
                  </tr>
                  <tr className="cursor-pointer hover:bg-orange-50/50" onClick={() => handleDiscoverCardClick('sud_est')}>
                    <td className="py-3 font-semibold text-blue-950">🎭 Culture</td>
                    <td className="py-3 text-right text-gray-500">Teranga, Lutte, Traditions</td>
                  </tr>
                  <tr className="cursor-pointer hover:bg-orange-50/50" onClick={() => handleDiscoverCardClick('dakar')}>
                    <td className="py-3 font-semibold text-blue-950">🍲 Cuisine</td>
                    <td className="py-3 text-right text-gray-500">Ceebu Jën, Yassa</td>
                  </tr>
                  <tr className="cursor-pointer hover:bg-orange-50/50" onClick={() => handleDiscoverCardClick('sud_est')}>
                    <td className="py-3 font-semibold text-blue-950">🌿 Nature</td>
                    <td className="py-3 text-right text-gray-500">Niokolo Lodge, Dindéfélo, Djoudj</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => scrollToSection('poles')}
              className="mt-6 w-full py-3 rounded-2xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs shadow transition text-center block"
            >
              Explorer les 8 Pôles ↑
            </button>
          </div>

        </div>
      </section>

      {/* 3. GALERIE REGROUPÉE PAR ALBUMS AVEC POP-UP SLIDER */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-xs px-3.5 py-1.5 bg-orange-100 rounded-full">
              Albums & Collections
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-blue-950 mt-3">
              Galerie Thématique
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              Cliquez sur un album pour faire défiler ses plus belles photos.
            </p>
          </div>

          {/* GRILLE D'ALBUMS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALBUM_CATEGORIES.map((category) => {
              const albumImages = GALLERY_ITEMS.filter((item) => item.categories.includes(category));
              const coverImage = albumImages[0]?.image || '/dakarIlegoree.jpg';

              return (
                <div
                  key={category}
                  onClick={() => openAlbumModal(category)}
                  className="group relative h-80 rounded-3xl overflow-hidden shadow-lg border border-gray-100 cursor-pointer transform hover:-translate-y-1.5 transition-all duration-300"
                >
                  <img 
                    src={coverImage} 
                    alt={category} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-md">
                        {albumImages.length} photo{albumImages.length > 1 ? 's' : ''}
                      </span>
                      <h3 className="text-2xl font-black mt-2 group-hover:text-orange-300 transition-colors">
                        {category}
                      </h3>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-orange-500 transition-colors">
                      ➔
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* POP-UP / MODALE SLIDER */}
      {activeCategoryModal && modalImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          
          <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-30 bg-black/60 hover:bg-black text-white w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition"
            >
              ✕
            </button>

            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
                  Album Thématique
                </span>
                <h3 className="text-lg font-bold">{activeCategoryModal}</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {modalImageIndex + 1} / {modalImages.length}
              </span>
            </div>

            <div className="relative h-72 sm:h-80 bg-black flex items-center justify-center">
              <img
                src={modalImages[modalImageIndex].image}
                alt={modalImages[modalImageIndex].title}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {modalImages.length > 1 && (
                <>
                  <button
                    onClick={() => setModalImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2.5 rounded-full backdrop-blur-sm transition"
                  >
                    ❮
                  </button>
                  <button
                    onClick={() => setModalImageIndex((prev) => (prev + 1) % modalImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2.5 rounded-full backdrop-blur-sm transition"
                  >
                    ❯
                  </button>
                </>
              )}
            </div>

            <div className="p-4 bg-slate-900 text-white border-t border-slate-800">
              <h4 className="text-base font-bold text-orange-400">
                {modalImages[modalImageIndex].title}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                📍 {modalImages[modalImageIndex].location}
              </p>
            </div>

          </div>
        </div>
      )}

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
                <button onClick={() => scrollToSection('poles')} className="hover:text-orange-400 transition">
                  Carte Interactive
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('decouvrir')} className="hover:text-orange-400 transition">
                  Découvrir le Sénégal
                </button>
              </li>
            </ul>
          </div>

        </div>
      </footer>

    </div>
  );
}