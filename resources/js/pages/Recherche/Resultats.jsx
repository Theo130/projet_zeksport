import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function Resultats({ produits, query }) {
  return (
    <MainLayout>
      <Head title={`Résultats pour "${query}"`} />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-black mb-6">
          Résultats pour : <span className="text-blue-600">"{query}"</span>
        </h1>

        {produits.length === 0 ? (
          <p className="text-gray-600">Aucun produit trouvé.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produits.map((produit) => (
              <div
                key={produit.id}
                className="bg-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300 p-4"
              >
                <Link
                  href={`/produits/${produit.categorie}/${produit.souscategorie}/${produit.id}`}
                  className="block mb-4"
                >
                  <div className="w-full h-56 bg-gray-300 rounded overflow-hidden">
                    <img
                      src={`/images/${produit.image_url}`}
                      alt={produit.nom}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h2 className="text-lg font-semibold text-black mt-3">{produit.nom}</h2>
                  <p className="font-bold text-black">{produit.prix} €</p>
                </Link>

                <button className="w-full bg-emerald-400 text-white text-sm font-semibold px-4 py-2 rounded-md shadow hover:bg-black transition duration-300">
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

