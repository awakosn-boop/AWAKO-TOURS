export interface Pole {
    id: string;
    slug: string;
    nom: string;
    regions: string[];
    description: string;
  }
  
  export interface Structure {
    id: string;
    nom: string;
    slug: string;
    description: string;
    category: string;
    subcategory: string;
    pole_id: string;
    region: string;
    departement: string;
    commune: string;
    adresse: string;
    latitude: number;
    longitude: number;
    telephone?: string;
    email?: string;
    site_web?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    whatsapp?: string;
    image_principale: string;
    galerie?: string[];
    etoiles?: number;
    services?: string[];
  }