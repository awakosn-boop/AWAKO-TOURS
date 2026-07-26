'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Structure } from '@/types';
import Link from 'next/link';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  structures: Structure[];
  center?: [number, number];
  zoom?: number;
}

export default function MapLeaflet({
  structures,
  center = [14.4974, -14.4524],
  zoom = 7,
}: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      className="w-full h-full rounded-2xl z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {structures.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]} icon={customIcon}>
          <Popup className="rounded-xl overflow-hidden shadow-lg">
            <div className="w-52 font-sans">
              <img
                src={item.image_principale}
                alt={item.nom}
                className="w-full h-24 object-cover rounded-t-lg"
              />
              <div className="p-2">
                <h4 className="font-bold text-blue-950 text-sm leading-tight">{item.nom}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.adresse}</p>
                {item.telephone && (
                  <p className="text-xs text-sky-600 font-semibold mt-1">📞 {item.telephone}</p>
                )}
                <Link
                  href={`/structure/${item.slug}`}
                  className="mt-2 block text-center text-xs bg-blue-900 text-white font-medium py-1.5 rounded-lg hover:bg-sky-600 transition"
                >
                  Voir la fiche
                </Link>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}