'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Extrait structuré des acteurs issus de votre étude Excel
interface Acteur {
  id: number;
  nom: string;
  nature: 'Public' | 'Privé';
  type: string;
  pole: string;
  anciennete: string;
  outils: string[];
}

const DATA_ACTEURS: Acteur[] = [
  // EXEMPLES SECTEUR PUBLIC & PARAPUBLIC
  { id: 1, nom: "ASPT - Agence de Promotion Touristique", nature: "Public", type: "Agence de promotion", pole: "Pôle Dakar", anciennete: "Plus de 6 ans", outils: ["Site web", "Facebook", "Instagram", "E-mail"] },
  { id: 2, nom: "Ministère du Tourisme & de l'Artisanat", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle Dakar", anciennete: "Plus de 6 ans", outils: ["Site web", "E-mail professionnel"] },
  { id: 3, nom: "Parc National du Djoudj", nature: "Public", type: "Site touristique / Parc national", pole: "Pôle Nord (Saint-Louis)", anciennete: "Plus de 6 ans", outils: ["Facebook", "E-mail"] },
  { id: 4, nom: "Réserve Naturelle de Palmarin", nature: "Public", type: "Site touristique / Parc national", pole: "Pôle Centre (Sine Saloum)", anciennete: "Plus de 6 ans", outils: ["WhatsApp Business", "Facebook"] },
  
  // EXEMPLES SECTEUR PRIVÉ
  { id: 5, nom: "Guide Touristique Indépendant Dakar", nature: "Privé", type: "Guide touristique", pole: "Pôle Dakar", anciennete: "Plus de 6 ans", outils: ["WhatsApp Business", "Instagram", "Facebook"] },
  { id: 6, nom: "Hôtel & Resort Petite Côte", nature: "Privé", type: "Hôtel", pole: "Pôle Thiès (Saly / Mbour)", anciennete: "Plus de 6 ans", outils: ["Plateforme de réservation", "Site web", "Instagram"] },
  { id: 7, nom: "Ecolodge du Saloum", nature: "Privé", type: "Campement / Ecolodge", pole: "Pôle Centre (Sine Saloum)", anciennete: "3 à 6 ans", outils: ["Site web", "WhatsApp Business", "Instagram"] },
  { id: 8, nom: "Casamance Evasion - Agence de Voyage", nature: "Privé", type: "Agence de voyage / Tour opérateur", pole: "Pôle Sud (Casamance)", anciennete: "Plus de 6 ans", outils: ["Site web", "Facebook", "WhatsApp"] },
  { id: 9, nom: "Startup Travel Tech Sénégal", nature: "Privé", type: "Startup en développement", pole: "Pôle Dakar", anciennete: "1 à 3 ans", outils: ["Plateforme digitale", "TikTok", "Instagram"] },
  { id: 10, nom: "Auberge & Table D'hôtes Saint-Louis", nature: "Privé", type: "Auberge / Maison d'hôtes", pole: "Pôle Nord (Saint-Louis)", anciennete: "Plus de 6 ans", outils: ["Instagram", "WhatsApp Business"] },
];

const POLES_LIST = [
  "Tous les pôles",
  "Pôle Dakar",
  "Pôle Thiès (Saly / Mbour)",
  "Pôle Nord (Saint-Louis)",
  "Pôle Centre (Sine Saloum)",
  "Pôle Sud (Casamance)",
  "Pôle Sud-Est (Kédougou)",
  "Pôle Nord-Est (Matam)",
];

export default function CategoriesPage() {
  const [selectedNature, setSelectedNature] = useState<'Privé' | 'Public'>('Privé');
  const [selectedPole, setSelectedPole] = useState<string>('Tous les pôles');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Filtrage dynamique
  const filteredActeurs = useMemo(() => {
    return DATA_ACTEURS.filter((item) => {
      const matchNature = item.nature === selectedNature;
      const matchPole = selectedPole === 'Tous les pôles' || item.pole.includes(selectedPole.split(' ')[1]);
      const matchSearch = item.nom.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchNature && matchPole && matchSearch;
    });
  }, [selectedNature, selectedPole, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 pt-36 md:pt-44 pb-20">
      
      {/* BARRE DE NAVIGATION AVEC LOGO CENTRÉ & MENU RESPONSIVE */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-28 md:h-36 flex flex-col justify-between items-center py-2 relative">
          
          {/* Logo AWAKO TOURS (Même taille que sur l'accueil, centré) */}
          <Link href="/" className="flex items-center justify-center h-20 md:h-24">
            <Image 
              src="/logo-transparent.png" 
              alt="AWAKO TOURS Logo" 
              width={500} 
              height={180} 
              priority
              className="h-full w-auto object-contain max-h-24 md:max-h-32 transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Menu de Navigation Ordinateur */}
          <div className="hidden md:flex items-center gap-8 text-base font-medium text-gray-600 pb-2">
            <Link href="/" className="hover:text-orange-500 transition duration-200">Accueil</Link>
            <Link href="/explorer" className="hover:text-orange-500 transition duration-200">Découvrir</Link>
            <Link href="/#poles" className="hover:text-orange-500 transition duration-200">Pôles touristiques</Link>
            <Link href="/categories" className="text-orange-500 font-bold border-b-2 border-orange-500 pb-1">Catégories</Link>
            <Link href="/a-propos" className="hover:text-orange-500 transition duration-200">À propos</Link>
          </div>

          {/* Bouton Hamburger Téléphone */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden absolute right-6 top-6 p-2 text-gray-700 text-3xl focus:outline-none"
            aria-label="Menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Menu Déroulant Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex flex-col space-y-4 text-base font-medium text-gray-700 shadow-lg">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500 transition">
              Accueil
            </Link>
            <Link href="/explorer" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500 transition">
              Découvrir
            </Link>
            <Link href="/#poles" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500 transition">
              Pôles touristiques
            </Link>
            <Link href="/categories" onClick={() => setIsMenuOpen(false)} className="text-orange-500 font-bold">
              Catégories
            </Link>
            <Link href="/a-propos" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500 transition">
              À propos
            </Link>
          </div>
        )}
      </nav>

      {/* EN-TÊTE DE LA PAGE */}
      <div className="bg-blue-950 text-white py-12 px-6 mb-10 shadow-lg">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-orange-400 font-bold text-xs uppercase tracking-widest bg-orange-500/20 px-3.5 py-1.5 rounded-full border border-orange-500/30">
            Répertoire Officiel des Acteurs
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-3">
            Catégories du Tourisme Sénégalais
          </h1>
          <p className="text-gray-300 text-sm md:text-base mt-2 max-w-2xl mx-auto font-light">
            Explorez les acteurs du tourisme recensés selon leur secteur d'activité et leur pôle géographique.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. SELECTION DU SECTEUR (PUBLIC VS PRIVÉ) */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-2xl shadow-md border border-gray-200 inline-flex gap-2">
            <button
              onClick={() => setSelectedNature('Privé')}
              className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 ${
                selectedNature === 'Privé'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>🏢</span> Secteur Privé
            </button>

            <button
              onClick={() => setSelectedNature('Public')}
              className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 ${
                selectedNature === 'Public'
                  ? 'bg-blue-950 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>🏛️</span> Secteur Public & Parapublic
            </button>
          </div>
        </div>

        {/* 2. FILTRES ET RECHERCHE */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Recherche textuelle */}
          <div className="w-full md:w-1/2">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Recherche</label>
            <input
              type="text"
              placeholder="Ex: Hôtel, Guide, Agence, Ministère..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Filtre par Pôle */}
          <div className="w-full md:w-1/2">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Filtrer par Pôle Touristique</label>
            <select
              value={selectedPole}
              onChange={(e) => setSelectedPole(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-orange-500 bg-white"
            >
              {POLES_LIST.map((pole) => (
                <option key={pole} value={pole}>{pole}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. COMPTEUR DE RÉSULTATS */}
        <div className="mb-6 flex justify-between items-center text-sm font-semibold text-gray-500">
          <span>Affichage de : <strong className="text-blue-950">{filteredActeurs.length}</strong> structure(s)</span>
          <span className="text-xs bg-gray-200 px-3 py-1 rounded-full text-gray-700">Secteur {selectedNature}</span>
        </div>

        {/* 4. GRILLE DES CARTES D'ACTEURS */}
        {filteredActeurs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActeurs.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      item.nature === 'Public' ? 'bg-blue-100 text-blue-900' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-xs font-medium text-gray-400">📍 {item.pole}</span>
                  </div>

                  <h3 className="text-lg font-bold text-blue-950 mb-2">
                    {item.nom}
                  </h3>

                  <p className="text-xs text-gray-500 mb-4">
                    ⏱️ Expérience : <strong className="text-gray-700">{item.anciennete}</strong>
                  </p>

                  <div className="border-t border-gray-50 pt-3">
                    <span className="text-[11px] font-bold text-gray-400 block mb-2">Outils digitaux utilisés :</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.outils.map((outil, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-1 rounded-md">
                          {outil}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-orange-500 hover:underline cursor-pointer">
                    Consulter la fiche →
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="text-lg font-bold text-blue-950">Aucun résultat trouvé</h3>
            <p className="text-sm text-gray-500 mt-1">Essayez de modifier votre pôle ou votre terme de recherche.</p>
          </div>
        )}

      </div>
    </div>
  );
}