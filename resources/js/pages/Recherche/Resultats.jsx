import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function Resultats({ produits, query }) {
  return (
    <MainLayout>
      <Head title={`Résultats pour "${query}"`} />

      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-black">
          Résultats pour : <span className="text-emerald-600">"{query}"</span>
        </h1>

        {produits.length === 0 ? (
          <p className="text-gray-600">Aucun produit trouvé pour cette recherche.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {produits.map((produit) => (
              <a
                key={produit.id}
                href={`/produits/detail/${produit.id}`}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-4"
              >
                <div className="w-full h-56 bg-gray-300 rounded mb-4 overflow-hidden">
                  <img
                    src={`/images/${produit.image_url}`}
                    alt={produit.nom}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-lg font-semibold text-black mb-1">{produit.nom}</h2>
                <p className="text-emerald-600 font-bold">{produit.prix} €</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
