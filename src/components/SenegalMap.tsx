'use client';

import dynamic from 'next/dynamic';

const RealSenegalMap = dynamic(() => import('./RealSenegalMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center bg-gray-100 rounded-lg">
      <p className="text-gray-500">Chargement de la carte du Sénégal...</p>
    </div>
  ),
});

export default function SenegalMap() {
  return <RealSenegalMap />;
}