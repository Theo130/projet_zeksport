import React from 'react';
import MainLayout from '../Layouts/MainLayout';

export default function Panier() {
  return (
    <MainLayout>
      <div className="bg-white px-6 py-10">
        <h2 className="text-xl font-semibold mb-6">Mon panier</h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Liste des produits */}
          <div className="flex-1 flex flex-col gap-4">
            {[1, 2, 3].map((item, index) => (
              <div key={index} className="flex items-center border rounded p-4 gap-4 bg-white shadow-sm">
                <img
                  src="/image/produit1.PNG"
                  alt="Produit"
                  className="w-[100px] h-[120px] object-cover"
                />
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase">UNDER ARMOUR</p>
                  <p className="text-sm">Under Armour T-Shirt UA Tech</p>
                  <p className="text-sm mt-1">35,00 €</p>
                  <p className="text-sm text-gray-600">Taille : M</p>
                </div>
                <button className="text-red-600 hover:underline text-sm">Supprimer</button>
              </div>
            ))}
          </div>

          {/* Résumé paiement */}
          <div className="w-full lg:w-[300px] border rounded p-4 h-fit">
            <p className="text-sm mb-4">Total :</p>
            <p className="text-right font-semibold text-lg mb-4">33,00€</p>
            <button className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition">
              Paiement en toute sécurité
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

