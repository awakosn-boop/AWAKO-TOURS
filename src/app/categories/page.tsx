'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Acteur {
  id: number;
  nom: string;
  nature: 'Public' | 'Privé';
  type: string;
  pole: string;
  anciennete: string;
}

const DATA_ACTEURS: Acteur[] = [
  { id: 1, nom: "Structure publique du tourisme 1", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 2, nom: "Guide touristique 1", nature: "Privé", type: "Guide touristique", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 3, nom: "Structure publique du tourisme 2", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 4, nom: "Hôtel 1", nature: "Privé", type: "Hôtel", pole: "Pôle THIES (Thies, Diourbel)", anciennete: "Plus de 6 ans" },
  { id: 5, nom: "Agence de voyage / Tour opérateur 1", nature: "Privé", type: "Agence de voyage / Tour opérateur", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 6, nom: "Structure publique du tourisme 3", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 7, nom: "Hôtel 2", nature: "Privé", type: "Hôtel", pole: "Pôle THIES (Thies, Diourbel)", anciennete: "Plus de 6 ans" },
  { id: 8, nom: "Structure publique du tourisme 4", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle DAKAR (Dakar)", anciennete: "3 à 6 ans" },
  { id: 9, nom: "Guide touristique 2", nature: "Privé", type: "Guide touristique", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 10, nom: "Service de conciergerie d'affaires DMC 1", nature: "Privé", type: "Service de conciergerie d'affaires DMC", pole: "Pôle DAKAR (Dakar)", anciennete: "1 à 3 ans" },
  { id: 11, nom: "Startup en développement touristique 1", nature: "Privé", type: "Startup en développement touristique", pole: "Pôle DAKAR (Dakar)", anciennete: "Moins d'un an" },
  { id: 12, nom: "Guide touristique 3", nature: "Privé", type: "Guide touristique", pole: "Pôle DAKAR (Dakar)", anciennete: "3 à 6 ans" },
  { id: 13, nom: "Auberge / Maison d’hôtes / Résidence 1", nature: "Privé", type: "Auberge / Maison d’hôtes / Résidence", pole: "Pôle THIES (Thies, Diourbel)", anciennete: "3 à 6 ans" },
  { id: 14, nom: "Agence de voyage / Tour opérateur 2", nature: "Privé", type: "Agence de voyage / Tour opérateur", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 15, nom: "Label évènementiel de Culture 1", nature: "Privé", type: "Label évènementiel de Culture", pole: "Pôle DAKAR (Dakar)", anciennete: "3 à 6 ans" },
  { id: 16, nom: "Guide touristique 4", nature: "Privé", type: "Guide touristique", pole: "Pôle DAKAR (Dakar)", anciennete: "3 à 6 ans" },
  { id: 17, nom: "Hôtel 3", nature: "Privé", type: "Hôtel", pole: "Pôle THIES (Thies, Diourbel)", anciennete: "Plus de 6 ans" },
  { id: 18, nom: "Hôtel 4", nature: "Privé", type: "Hôtel", pole: "Pôle THIES (Thies, Diourbel)", anciennete: "3 à 6 ans" },
  { id: 19, nom: "Hôtel 5", nature: "Privé", type: "Hôtel", pole: "Pôle THIES (Thies, Diourbel)", anciennete: "Plus de 6 ans" },
  { id: 20, nom: "Hôtel 6", nature: "Privé", type: "Hôtel", pole: "Pôle THIES (Thies, Diourbel)", anciennete: "Plus de 6 ans" },
  { id: 21, nom: "Plateforme digitale 1", nature: "Privé", type: "Plateforme digitale", pole: "Pôle DAKAR (Dakar)", anciennete: "3 à 6 ans" },
  { id: 22, nom: "Hôtel 7", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 23, nom: "Structure publique du tourisme 5", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle NORD (Saint-Louis, Matam, Louga)", anciennete: "3 à 6 ans" },
  { id: 24, nom: "Auberge / Maison d’hôtes / Résidence 2", nature: "Privé", type: "Auberge / Maison d’hôtes / Résidence", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 25, nom: "Hôtel 8", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 26, nom: "Hôtel 9", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 27, nom: "Campement / Ecolodge 1", nature: "Privé", type: "Campement / Ecolodge", pole: "Pôle NORD (Saint-Louis, Matam, Louga)", anciennete: "Plus de 6 ans" },
  { id: 28, nom: "Hôtel 10", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 29, nom: "Hôtel 11", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 30, nom: "Agence de voyage / Tour opérateur 3", nature: "Privé", type: "Agence de voyage / Tour opérateur", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 31, nom: "Agence de voyage / Tour opérateur 4", nature: "Privé", type: "Agence de voyage / Tour opérateur", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 32, nom: "Guide touristique 5", nature: "Privé", type: "Guide touristique", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 33, nom: "Agence de voyage / Tour opérateur 5", nature: "Privé", type: "Agence de voyage / Tour opérateur", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 34, nom: "Campement / Ecolodge 2", nature: "Privé", type: "Campement / Ecolodge", pole: "Pôle CENTRE ( Fatick, Kaolack, Kaffrine)", anciennete: "Plus de 6 ans" },
  { id: 35, nom: "Agence de consulting touristique 1", nature: "Privé", type: "Agence de consulting touristique", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 36, nom: "Site touristique / Parc national / Réserve naturelle 1", nature: "Public", type: "Site touristique / Parc national / Réserve naturelle", pole: "Pôle NORD (Saint-Louis, Matam, Louga)", anciennete: "Plus de 6 ans" },
  { id: 37, nom: "Réceptif, agence de voyage, locations de véhicules 1", nature: "Privé", type: "Réceptif, agence de voyage, locations de véhicules", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 38, nom: "Institution de formation 1", nature: "Public", type: "Institution de formation", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 39, nom: "Guide touristique 6", nature: "Privé", type: "Guide touristique", pole: "Pôle CENTRE ( Fatick, Kaolack, Kaffrine)", anciennete: "Plus de 6 ans" },
  { id: 40, nom: "Hôtel 12", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "3 à 6 ans" },
  { id: 41, nom: "Hôtel 13", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 42, nom: "Agence de voyage / Tour opérateur 6", nature: "Privé", type: "Agence de voyage / Tour opérateur", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 43, nom: "Agence de voyage / Tour opérateur 7", nature: "Privé", type: "Agence de voyage / Tour opérateur", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 44, nom: "Agence sénégalaise de promotion touristique 1", nature: "Public", type: "Agence sénégalaise de promotion touristique", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 45, nom: "Auberge / Maison d’hôtes / Résidence 3", nature: "Privé", type: "Auberge / Maison d’hôtes / Résidence", pole: "Pôle NORD (Saint-Louis, Matam, Louga)", anciennete: "Plus de 6 ans" },
  { id: 46, nom: "Hôtel 14", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 47, nom: "Hôtel 15", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 48, nom: "Structure publique du tourisme 6", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 49, nom: "Institution de formation 2", nature: "Public", type: "Institution de formation", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 50, nom: "Laboratoire 1", nature: "Public", type: "Laboratoire", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 51, nom: "Comité d'Organisation des Jeux Olympiques de la Jeunesse 1", nature: "Public", type: "Comité d'Organisation des Jeux Olympiques de la Jeunesse", pole: "Pôle DAKAR (Dakar)", anciennete: "1 à 3 ans" },
  { id: 52, nom: "Hôtel 16", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 53, nom: "Media touristique 1", nature: "Public", type: "Media touristique", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 54, nom: "Structure publique du tourisme 7", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 55, nom: "Structure publique du tourisme 8", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 56, nom: "Site touristique / Parc national / Réserve naturelle 2", nature: "Public", type: "Site touristique / Parc national / Réserve naturelle", pole: "Pôle CENTRE ( Fatick, Kaolack, Kaffrine)", anciennete: "Plus de 6 ans" },
  { id: 57, nom: "Hôtel 17", nature: "Privé", type: "Hôtel", pole: "Pôle SUD-EST (Kedougou, Tambacounda)", anciennete: "Plus de 6 ans" },
  { id: 58, nom: "Structure publique du tourisme 9", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle NORD-EST (Matam)", anciennete: "1 à 3 ans" },
  { id: 59, nom: "Recherches sur le Tourisme fluvial 1", nature: "Public", type: "Recherches sur le Tourisme fluvial", pole: "Pôle NORD-EST (Matam)", anciennete: "Plus de 6 ans" },
  { id: 60, nom: "Guide touristique 7", nature: "Privé", type: "Guide touristique", pole: "Pôle SUD-EST (Kedougou, Tambacounda)", anciennete: "Plus de 6 ans" },
  { id: 61, nom: "Guide touristique 8", nature: "Privé", type: "Guide touristique", pole: "Pôle SUD-EST (Kedougou, Tambacounda)", anciennete: "Plus de 6 ans" },
  { id: 62, nom: "Campement / Ecolodge 3", nature: "Privé", type: "Campement / Ecolodge", pole: "Pôle SUD-EST (Kedougou, Tambacounda)", anciennete: "Plus de 6 ans" },
  { id: 63, nom: "Agence de voyage / Tour opérateur 8", nature: "Privé", type: "Agence de voyage / Tour opérateur", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 64, nom: "Hôtel 18", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 65, nom: "Hôtel 19", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 66, nom: "Structure publique du tourisme 10", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle NORD (Saint-Louis, Matam, Louga)", anciennete: "Plus de 6 ans" },
  { id: 67, nom: "Site touristique / Parc national / Réserve naturelle 3", nature: "Public", type: "Site touristique / Parc national / Réserve naturelle", pole: "Pôle NORD (Saint-Louis, Matam, Louga)", anciennete: "Plus de 6 ans" },
  { id: 68, nom: "Hôtel 20", nature: "Privé", type: "Hôtel", pole: "Pôle NORD (Saint-Louis, Matam, Louga)", anciennete: "Plus de 6 ans" },
  { id: 69, nom: "Hôtel 21", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 70, nom: "Hôtel 22", nature: "Privé", type: "Hôtel", pole: "Pôle THIES (Thies, Diourbel)", anciennete: "Plus de 6 ans" },
  { id: 71, nom: "Restaurant 1", nature: "Privé", type: "Restaurant", pole: "Pôle THIES (Thies, Diourbel)", anciennete: "Plus de 6 ans" },
  { id: 72, nom: "Structure publique du tourisme 11", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 73, nom: "Hôtel 23", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 74, nom: "Structure publique du tourisme 12", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 75, nom: "Structure publique du tourisme 13", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 76, nom: "Structure publique du tourisme 14", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 77, nom: "Structure publique du tourisme 15", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 78, nom: "Structure publique du tourisme 16", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 79, nom: "Structure publique du tourisme 17", nature: "Public", type: "Structure publique du tourisme", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 80, nom: "Site touristique / Parc national / Réserve naturelle 4", nature: "Public", type: "Site touristique / Parc national / Réserve naturelle", pole: "Pôle CENTRE ( Fatick, Kaolack, Kaffrine)", anciennete: "Plus de 6 ans" },
  { id: 81, nom: "Hôtel 24", nature: "Privé", type: "Hôtel", pole: "Pôle SUD (Ziguinchor, Sedhiou, Kolda)", anciennete: "Plus de 6 ans" },
  { id: 82, nom: "Site touristique / Parc national / Réserve naturelle 5", nature: "Public", type: "Site touristique / Parc national / Réserve naturelle", pole: "Pôle SUD (Ziguinchor, Sedhiou, Kolda)", anciennete: "Plus de 6 ans" },
  { id: 83, nom: "Hôtel 25", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 84, nom: "Hôtel 26", nature: "Privé", type: "Hôtel", pole: "Pôle THIES (Thies)", anciennete: "3 à 6 ans" },
  { id: 85, nom: "Auberge / Maison d’hôtes / Résidence 4", nature: "Privé", type: "Auberge / Maison d’hôtes / Résidence", pole: "Pôle THIES (Thies)", anciennete: "1 à 3 ans" },
  { id: 86, nom: "Auberge / Maison d’hôtes / Résidence 5", nature: "Privé", type: "Auberge / Maison d’hôtes / Résidence", pole: "Pôle THIES (Thies)", anciennete: "Plus de 6 ans" },
  { id: 87, nom: "Hôtel 27", nature: "Privé", type: "Hôtel", pole: "Pôle THIES (Thies)", anciennete: "3 à 6 ans" },
  { id: 88, nom: "Hôtel 28", nature: "Privé", type: "Hôtel", pole: "Pôle THIES (Thies)", anciennete: "Plus de 6 ans" },
  { id: 89, nom: "Agence de voyage / Tour opérateur 9", nature: "Privé", type: "Agence de voyage / Tour opérateur", pole: "Pôle SUD (Ziguinchor, Sedhiou, Kolda)", anciennete: "Plus de 6 ans" },
  { id: 90, nom: "Guide touristique 9", nature: "Privé", type: "Guide touristique", pole: "Pôle SUD (Ziguinchor, Sedhiou, Kolda)", anciennete: "Plus de 6 ans" },
  { id: 91, nom: "Hôtel 29", nature: "Privé", type: "Hôtel", pole: "Pôle SUD (Ziguinchor, Sedhiou, Kolda)", anciennete: "Plus de 6 ans" },
  { id: 92, nom: "Hôtel 30", nature: "Privé", type: "Hôtel", pole: "Pôle SUD (Ziguinchor, Sedhiou, Kolda)", anciennete: "Plus de 6 ans" },
  { id: 93, nom: "Hôtel 31", nature: "Privé", type: "Hôtel", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 94, nom: "Hôtel 32", nature: "Privé", type: "Hôtel", pole: "Pôle NORD (Saint-Louis, Matam, Louga)", anciennete: "Plus de 6 ans" },
  { id: 95, nom: "Hôtel 33", nature: "Privé", type: "Hôtel", pole: "Pôle SUD-EST (Kedougou, Tambacounda)", anciennete: "Plus de 6 ans" },
  { id: 96, nom: "Agence de voyage / Tour opérateur 10", nature: "Privé", type: "Agence de voyage / Tour opérateur", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 97, nom: "Agence de voyage / Tour opérateur 11", nature: "Privé", type: "Agence de voyage / Tour opérateur", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 98, nom: "Agence de voyage / Tour opérateur 12", nature: "Privé", type: "Agence de voyage / Tour opérateur", pole: "Pôle DAKAR (Dakar)", anciennete: "Plus de 6 ans" },
  { id: 99, nom: "Agence de voyage / Tour opérateur 13", nature: "Privé", type: "Agence de voyage / Tour opérateur", pole: "Pôle CENTRE ( Fatick, Kaolack, Kaffrine)", anciennete: "Plus de 6 ans" },
  { id: 100, nom: "Restaurant 2", nature: "Privé", type: "Restaurant", pole: "Pôle DAKAR (Dakar)", anciennete: "1 à 3 ans" },
  { id: 101, nom: "Établissement Touristique 1", nature: "Privé", type: "Autre", pole: "Pôle SUD-EST (Kedougou, Tambacounda)", anciennete: "Plus de 6 ans" }
];

const POLES_LIST = [
  "Tous les pôles",
  "Pôle DAKAR (Dakar)",
  "Pôle THIES (Thies, Diourbel)",
  "Pôle NORD (Saint-Louis, Matam, Louga)",
  "Pôle CENTRE ( Fatick, Kaolack, Kaffrine)",
  "Pôle SUD (Ziguinchor, Sedhiou, Kolda)",
  "Pôle SUD-EST (Kedougou, Tambacounda)",
  "Pôle NORD-EST (Matam)"
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
      const matchPole = selectedPole === 'Tous les pôles' || item.pole === selectedPole;
      const matchSearch = item.nom.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchNature && matchPole && matchSearch;
    });
  }, [selectedNature, selectedPole, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 pt-36 md:pt-44 pb-20">
      
      {/* BARRE DE NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-28 md:h-36 flex flex-col justify-between items-center py-2 relative">
          
          {/* Logo AWAKO TOURS */}
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

          {/* Menu Ordinateur */}
          <div className="hidden md:flex items-center gap-8 text-base font-medium text-gray-600 pb-2">
            <Link href="/" className="hover:text-orange-500 transition duration-200">Accueil</Link>
            <Link href="/#carte" className="hover:text-orange-500 transition duration-200">Explorer la carte</Link>
            <Link href="/#carte" className="hover:text-orange-500 transition duration-200">Pôles touristiques</Link>
            <Link href="/categories" className="text-orange-500 font-bold border-b-2 border-orange-500 pb-1">Catégories</Link>
          </div>

          {/* Bouton Hamburger Mobile */}
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
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500 transition">Accueil</Link>
            <Link href="/#carte" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500 transition">Explorer la carte</Link>
            <Link href="/#carte" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500 transition">Pôles touristiques</Link>
            <Link href="/categories" onClick={() => setIsMenuOpen(false)} className="text-orange-500 font-bold">Catégories</Link>
          </div>
        )}
      </nav>

      {/* EN-TÊTE DE LA PAGE */}
      <div className="bg-blue-950 text-white py-12 px-6 mb-10 shadow-lg">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-orange-400 font-bold text-xs uppercase tracking-widest bg-orange-500/20 px-3.5 py-1.5 rounded-full border border-orange-500/30">
            Répertoire National du Tourisme Sénégalais
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-3">
            Acteurs & Établissements Touristiques
          </h1>
          <p className="text-gray-300 text-sm md:text-base mt-2 max-w-2xl mx-auto font-light">
            Découvrez le répertoire complet des 101 acteurs touristiques recensés à travers les différents pôles géographiques du Sénégal.
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
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Rechercher une structure</label>
            <input
              type="text"
              placeholder="Ex: Hôtel, Guide, Agence, Restaurant..."
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
                  </div>

                  <h3 className="text-lg font-bold text-blue-950 mb-2">
                    {item.nom}
                  </h3>

                  <p className="text-xs text-gray-500 mb-2">
                    📍 Pôle : <strong className="text-gray-700">{item.pole}</strong>
                  </p>

                  <p className="text-xs text-gray-500 mb-4">
                    ⏱️ Ancienneté : <strong className="text-gray-700">{item.anciennete}</strong>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-orange-500 hover:underline cursor-pointer">
                    Fiche établissement →
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="text-lg font-bold text-blue-950">Aucune structure trouvée</h3>
            <p className="text-sm text-gray-500 mt-1">Essayez de modifier votre pôle ou votre mot-clé de recherche.</p>
          </div>
        )}

      </div>
    </div>
  );
}