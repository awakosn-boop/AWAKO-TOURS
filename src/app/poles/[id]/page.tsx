'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Pole {
  id: string;
  name: string;
  regions: string;
  departments: string[];
  description: string;
  highlights: string[];
  color: string;
  gallery: { title: string; image: string; location: string }[];
  lat: number;
  lng: number;
}

const POLES_DATA: Record<string, Pole> = {
  dakar: {
    id: 'dakar',
    name: 'Pôle Dakar',
    regions: 'Région de Dakar',
    departments: ['Dakar', 'Pikine', 'Guédiawaye', 'Rufisque', 'Keur Massar'],
    description: 'Capitale dynamique et cosmopolite, regorgeant de sites historiques majeurs, d’îles côtières prisées et de manifestations culturelles de premier plan.',
    highlights: ['Île de Gorée & Maison des Esclaves', 'Monument de la Renaissance Africaine', 'Île de Ngor & Corniche Ouest', 'Lac Rose & Marchés traditionnels'],
    color: '#24d700',
    gallery: [
      { title: 'Vue Aérienne de Gorée', image: '/dakarIlegoree.jpg', location: 'Gorée (Dakar)' },
      { title: 'Monument de la Renaissance', image: '/dakarMonuRenaiss.jpg', location: 'Dakar' },
      { title: 'Lac Rose', image: '/dakarLacRose.jpg', location: 'Dakar' },
      { title: 'Île de Ngor', image: '/dakarIleNgor.jpg', location: 'Dakar' },
      { title: 'Mosquée de la Divinité', image: '/dakarMosqueDivCORNICHE.jpg', location: 'Corniche Ouest' },
      { title: 'Ruelle de Gorée', image: '/dakarRueGOREE.jpg', location: 'Gorée' },
    ],
    lat: 14.6934,
    lng: -17.4479,
  },
  thies: {
    id: 'thies',
    name: 'Pôle Thiès',
    regions: 'Région de Thiès',
    departments: ['Thiès', 'Mbour', 'Tivaouane'],
    description: 'Le cœur balnéaire du Sénégal avec la Petite Côte, enrichi par des réserves naturelles florissantes et des sites culturels uniques.',
    highlights: ['Station balnéaire de Saly Portudal', 'Lagune de la Somone', 'Île aux Coquillages de Joal-Fadiouth', 'Réserve de faune de Bandia'],
    color: '#00d9bb',
    gallery: [
      { title: 'Joal-Fadiouth', image: '/thiesJoal.jpg', location: 'Joal-Fadiouth' },
      { title: 'Île aux Coquillages', image: '/thiesJoal2.jpg', location: 'Joal-Fadiouth' },
      { title: 'Plage de Saly', image: '/thiesPalmbeach.jpg', location: 'Saly Portudal' },
      { title: 'Lagune de Somone', image: '/thiesLagune.jpg', location: 'Somone' },
      { title: 'Réserve de Bandia', image: '/thiesBandia.jpg', location: 'Bandia' },
      { title: 'Église de Fadiouth', image: '/thiesEglise.jpg', location: 'Fadiouth' },
    ],
    lat: 14.7833,
    lng: -16.9167,
  },
  nord: {
    id: 'nord',
    name: 'Pôle Nord (Saint-Louis)',
    regions: 'Saint-Louis',
    departments: ['Saint-Louis', 'Dagana', 'Podor'],
    description: 'Une plongée fascinante dans l’histoire coloniale sénégalaise et dans la biodiversité exceptionnelle de la vallée du fleuve.',
    highlights: ['Île historique de Saint-Louis (UNESCO)', 'Parc National des Oiseaux du Djoudj', 'Pont Faidherbe', 'Fleuve Sénégal & Comptoirs de Podor'],
    color: '#fffe3a',
    gallery: [
      { title: 'Bateaux sur le Fleuve', image: '/saintlouis.jpg', location: 'Saint-Louis' },
      { title: 'Île Historique', image: '/saintlouisILE.jpg', location: 'Saint-Louis' },
      { title: 'Pont Faidherbe', image: '/saintlouisPont.jpg', location: 'Saint-Louis' },
      { title: 'Paysage de Saint-Louis', image: '/saintlouis2.jpg', location: 'Saint-Louis' },
    ],
    lat: 16.0326,
    lng: -16.4818,
  },
  nord_est: {
    id: 'nord_est',
    name: 'Pôle Nord-Est (Matam)',
    regions: 'Matam',
    departments: ['Matam', 'Kanel', 'Ranérou Ferlo'],
    description: 'Les terres authentiques du Fouta, entre paysages pastoraux du Ferlo et traditions séculaires des berges du fleuve.',
    highlights: ['Berges du fleuve Sénégal', 'Réserve de faune du Ferlo', 'Culture et artisanat Foutanke', 'Architecture traditionnelle'],
    color: '#0a9af5',
    gallery: [],
    lat: 15.6559,
    lng: -13.2554,
  },
  louga_diourbel: {
    id: 'louga_diourbel',
    name: 'Pôle Louga / Diourbel',
    regions: 'Louga & Diourbel',
    departments: ['Louga', 'Linguère', 'Kébémer', 'Diourbel', 'Bambey', 'Mbacké'],
    description: 'Une zone riche en contrastes, abritant le désert côtier de Lompoul et la grande cité spirituelle de Touba.',
    highlights: ['Désert de Lompoul & safaris dunes', 'Grande Mosquée de Touba', 'Patrimoine du Djolof', 'Côte Grande Nord'],
    color: '#f50c0c',
    gallery: [],
    lat: 15.6187,
    lng: -15.5418,
  },
  centre: {
    id: 'centre',
    name: 'Pôle Centre (Sine Saloum)',
    regions: 'Fatick, Kaolack, Kaffrine',
    departments: ['Fatick', 'Foundiougne', 'Gossas', 'Kaolack', 'Nioro du Rip', 'Guinguinéo', 'Kaffrine', 'Birkelane', 'Koungheul', 'Malem Hodar'],
    description: 'Le royaume des bolongs, mangroves et pirogues traditionnelles, idéal pour la pêche, l’écotourisme et le calme.',
    highlights: ['Delta du Sine Saloum (UNESCO)', 'Pirogue & observation des oiseaux', 'Îles de Mar Lodj et Djiffer', 'Sites mégalithiques de Sine Ngayène'],
    color: '#003dd7',
    gallery: [],
    lat: 14.1504,
    lng: -16.0730,
  },
  sud_est: {
    id: 'sud_est',
    name: 'Pôle Sud-Est',
    regions: 'Tambacounda, Kédougou',
    departments: ['Tambacounda', 'Bakel', 'Goudiry', 'Koumpentoum', 'Kédougou', 'Salémata', 'Saraya'],
    description: 'La région des grands parcs, des cascades spectaculaires et du relief montagneux du Pays Bassari.',
    highlights: ['Parc National du Niokolo-Koba & Lodges', 'Cascade de Dindéfélo & Cascade d\'Inguili', 'Pays Bassari & Bédik (UNESCO)', 'Écotourisme au Niokolo Lodge'],
    color: '#aa229f',
    gallery: [
      { title: 'Niokolo Lodge - Vue Fleuve', image: '/tambaniokolodge.jpg', location: 'Niokolo-Koba' },
      { title: 'Niokolo Lodge - Safari', image: '/tambaniokolodge2.jpg', location: 'Niokolo-Koba' },
      { title: 'Niokolo Lodge - Écotourisme', image: '/tambaniokolodge3.png', location: 'Niokolo-Koba' },
      { title: 'Cascade de Dindéfélo', image: '/kedougouCascadeDindefelo.jpg', location: 'Kédougou' },
      { title: 'Cascade d\'Inguili', image: '/kedougouCascadeInguili.jpg', location: 'Kédougou' },
      { title: 'Pays Bassari', image: '/kedougoubassari.jpg', location: 'Kédougou' },
    ],
    lat: 13.7689,
    lng: -13.6673,
  },
  sud: {
    id: 'sud',
    name: 'Pôle Sud (Casamance)',
    regions: 'Ziguinchor, Sédhiou, Kolda',
    departments: ['Ziguinchor', 'Bignona', 'Oussouye', 'Sédhiou', 'Bounkiling', 'Goudomp', 'Kolda', 'Vélingara', 'Médina Yoro Foulah'],
    description: 'Une végétation luxuriante, des plages de sable fin à perte de vue et une culture traditionnelle Diola préservée.',
    highlights: ['Plages de Cap Skirring', 'Île de Carabane', 'Royaume d\'Oussouye', 'Navigation dans les Bolongs'],
    color: '#f5960a',
    gallery: [
      { title: 'Plage de Cap Skirring', image: '/casamanceCapskirring.jpg', location: 'Cap Skirring' },
    ],
    lat: 12.5833,
    lng: -16.2719,
  },
};

export default function PolesPage() {
  const [selectedPoleId, setSelectedPoleId] = useState<string>('dakar');
  const [activePhotoModal, setActivePhotoModal] = useState<{ image: string; title: string; location: string } | null>(null);

  const activePole = POLES_DATA[selectedPoleId] || POLES_DATA.dakar;

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-800">

      {/* 1. BARRE DE NAVIGATION (NAVBAR HARMONISÉE) */}
      <header className="sticky top-0 z-40 bg-blue-950/95 backdrop-blur-md border-b border-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/logo-transparent.png" 
              alt="Logo Teranga Tourism" 
              className="h-14 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <Link href="/" className="hover:text-orange-400 transition-colors">
              Accueil
            </Link>
            <Link href="/poles" className="text-orange-400 font-bold border-b-2 border-orange-400 pb-1">
              Pôles Touristiques
            </Link>
            <Link href="/decouvrir" className="hover:text-orange-400 transition-colors">
              Découvrir
            </Link>
            <Link href="/galerie" className="hover:text-orange-400 transition-colors">
              Galerie
            </Link>
          </nav>

          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all"
          >
            Préparer mon Voyage
          </Link>
        </div>
      </header>

      {/* 2. HERO BANNER */}
      <section className="bg-blue-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span className="text-orange-400 font-bold uppercase tracking-wider text-xs px-3.5 py-1.5 bg-orange-950/60 border border-orange-500/30 rounded-full">
            Territoires & Destinations
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-4 text-white">
            Les 8 Pôles Touristiques du Sénégal
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Parcourez la diversité paysagère, culturelle et historique des 8 régions touristiques majeures du pays de la Teranga.
          </p>
        </div>
      </section>

      {/* 3. SÉLECTEUR DE PÔLES (FILTRES ONGLET) */}
      <section className="max-w-7xl mx-auto px-4 -mt-7 relative z-20">
        <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-xl flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar">
          {Object.values(POLES_DATA).map((pole) => {
            const isSelected = pole.id === selectedPoleId;
            return (
              <button
                key={pole.id}
                onClick={() => setSelectedPoleId(pole.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-orange-500 text-white shadow-md scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {pole.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. PRÉSENTATION DÉTAILLÉE DU PÔLE SÉLECTIONNÉ */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* BANDEAU GAUCHE : INFOS DU PÔLE */}
          <div className="lg:col-span-5 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-100">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activePole.color }} />
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                  {activePole.regions}
                </span>
              </div>

              <h2 className="text-3xl font-black text-blue-950 mb-4">
                {activePole.name}
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {activePole.description}
              </p>

              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Incontournables du Pôle :
              </h3>
              <ul className="space-y-2.5 mb-6">
                {activePole.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-blue-950">
                    <span className="text-orange-500 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Départements inclus ({activePole.departments.length}) :
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-8">
                {activePole.departments.map((dept, idx) => (
                  <span key={idx} className="bg-orange-50 border border-orange-200 text-orange-950 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                    {dept}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/poles/${activePole.id}`}
              className="w-full text-center py-3.5 rounded-2xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-sm shadow-md transition"
            >
              Découvrir le circuit {activePole.name} →
            </Link>
          </div>

          {/* BANDEAU DROIT : GALERIE DE PHOTOS DU PÔLE */}
          <div className="lg:col-span-7 p-8 bg-slate-50/50">
            <h3 className="text-base font-bold text-blue-950 mb-6 flex items-center justify-between">
              <span>📸 Galerie Photos - {activePole.name}</span>
              <span className="text-xs font-semibold text-orange-500">
                {activePole.gallery.length} photo{activePole.gallery.length > 1 ? 's' : ''}
              </span>
            </h3>

            {activePole.gallery.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {activePole.gallery.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActivePhotoModal(item)}
                    className="group relative h-44 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-bold group-hover:text-orange-300 transition-colors line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-300">📍 {item.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-gray-300 text-center p-6">
                <span className="text-3xl mb-2">🖼️</span>
                <p className="text-slate-500 text-sm font-semibold">
                  Photos bientôt disponibles pour ce pôle.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 5. VUE EN GRILLE DE TOUS LES PÔLES */}
      <section className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-200">
        <div className="text-center mb-10">
          <span className="text-orange-500 font-bold uppercase tracking-wider text-xs px-3.5 py-1.5 bg-orange-100 rounded-full">
            Aperçu Global
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-blue-950 mt-3">
            Tous les Pôles en un coup d'œil
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(POLES_DATA).map((p) => {
            const coverImg = p.gallery[0]?.image || '/dakarIlegoree.jpg';
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPoleId(p.id)}
                className={`bg-white rounded-3xl overflow-hidden border transition-all cursor-pointer group hover:-translate-y-1 shadow-md ${
                  p.id === selectedPoleId ? 'border-orange-500 ring-2 ring-orange-400/20' : 'border-gray-100'
                }`}
              >
                <div className="relative h-40 overflow-hidden bg-slate-900">
                  <img
                    src={coverImg}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white">
                    {p.departments.length} Dépts
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-blue-950 group-hover:text-orange-500 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-orange-500">
                    <span>Explorer le pôle</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MODALE VISIONNEUSE PHOTO */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-2xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition"
            >
              ✕
            </button>
            <div className="h-80 bg-black flex items-center justify-center">
              <img
                src={activePhotoModal.image}
                alt={activePhotoModal.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 text-white">
              <h4 className="text-lg font-bold text-orange-400">{activePhotoModal.title}</h4>
              <p className="text-xs text-slate-400 mt-1">📍 {activePhotoModal.location}</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. FOOTER HARMONISÉ */}
      <footer className="bg-blue-950 text-white pt-16 pb-8 border-t border-blue-900 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link href="/" className="inline-flex justify-center md:justify-start mb-4">
              <img 
                src="/logo-transparent.png" 
                alt="Logo Officiel" 
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Portail officiel pour la découverte des 8 pôles touristiques et culturels du Sénégal. Préparez votre prochain séjour au cœur de la Teranga.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link href="/" className="hover:text-orange-400 transition">Accueil</Link></li>
              <li><Link href="/poles" className="hover:text-orange-400 transition">Pôles Touristiques</Link></li>
              <li><Link href="/decouvrir" className="hover:text-orange-400 transition">Découvrir</Link></li>
              <li><Link href="/galerie" className="hover:text-orange-400 transition">Galerie</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-4">
              Pôles à découvrir
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {Object.values(POLES_DATA).map((pole) => (
                <li key={pole.id}>
                  <button onClick={() => setSelectedPoleId(pole.id)} className="hover:text-orange-400 transition text-left">
                    {pole.name}
                  </button>
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

        <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-blue-900 text-center text-xs text-slate-400">
          <p>© 2026 Tous droits réservés.</p>
        </div>
      </footer>

    </div>
  );
}