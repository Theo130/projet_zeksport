import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

export default function Panier({ produits, total, nombreArticles }) {
  const [quantitesLocales, setQuantitesLocales] = useState({});

  const supprimerProduit = (produitId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit du panier ?')) {
      router.delete(route('panier.supprimer'), {
        data: { produit_id: produitId },
        preserveState: true,
        preserveScroll: true,
      });
    }
  };

  const modifierQuantite = (produitId, nouvelleQuantite) => {
    if (nouvelleQuantite < 1 || nouvelleQuantite > 10) return;

    // Mettre à jour localement pour un feedback immédiat
    setQuantitesLocales(prev => ({
      ...prev,
      [produitId]: nouvelleQuantite
    }));

    // Envoyer la mise à jour au serveur
    router.patch(route('panier.quantite'), {
      produit_id: produitId,
      quantite: nouvelleQuantite
    }, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        // Réinitialiser la quantité locale en cas de succès
        setQuantitesLocales(prev => {
          const newState = { ...prev };
          delete newState[produitId];
          return newState;
        });
      },
      onError: () => {
        // Réinitialiser la quantité locale en cas d'erreur
        setQuantitesLocales(prev => {
          const newState = { ...prev };
          delete newState[produitId];
          return newState;
        });
      }
    });
  };

  const viderPanier = () => {
    if (confirm('Êtes-vous sûr de vouloir vider complètement votre panier ?')) {
      router.delete(route('panier.vider'), {
        preserveState: true,
      });
    }
  };

  const getQuantiteAffichee = (produit) => {
    return quantitesLocales[produit.id] ?? produit.pivot.quantite;
  };

  return (
    <MainLayout>
      <Head title="Mon panier - ZEK Sport" />
      
      <div className="bg-white px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Mon panier</h2>
          {produits.length > 0 && (
            <button
              onClick={viderPanier}
              className="text-sm text-red-600 hover:text-red-800 hover:underline"
            >
              Vider le panier
            </button>
          )}
        </div>

        {produits.length === 0 ? (
          // Panier vide
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 7H19M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Votre panier est vide</h3>
            <p className="text-gray-500 mb-6">Découvrez nos produits et ajoutez-en à votre panier !</p>
            <a
              href="/"
              className="inline-block bg-emerald-400 text-white px-6 py-2 rounded-md hover:bg-emerald-500 transition"
            >
              Continuer les achats
            </a>
          </div>
        ) : (
          // Panier avec produits
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Liste des produits */}
            <div className="flex-1 flex flex-col gap-4">
              {produits.map((produit) => (
                <div key={produit.id} className="flex items-center border rounded p-4 gap-4 bg-white shadow-sm">
                  <img
                    src={
                      produit.image_url?.startsWith('http')
                        ? produit.image_url
                        : `/images/${produit.image_url || 'default.jpg'}`
                    }
                    alt={produit.nom}
                    className="w-[100px] h-[120px] object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase text-gray-600">
                      {produit.categorie?.nom || 'Catégorie'}
                    </p>
                    <p className="text-sm font-medium text-gray-900">{produit.nom}</p>
                    <p className="text-sm font-semibold text-emerald-600 mt-1">
                      {produit.prix} € × {getQuantiteAffichee(produit)} = {(produit.prix * getQuantiteAffichee(produit)).toFixed(2)} €
                    </p>
                    
                    {/* Contrôles de quantité */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => modifierQuantite(produit.id, getQuantiteAffichee(produit) - 1)}
                        disabled={getQuantiteAffichee(produit) <= 1}
                        className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-medium">
                        {getQuantiteAffichee(produit)}
                      </span>
                      <button
                        onClick={() => modifierQuantite(produit.id, getQuantiteAffichee(produit) + 1)}
                        disabled={getQuantiteAffichee(produit) >= Math.min(produit.stock, 10)}
                        className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-1">
                      Stock disponible : {produit.stock}
                    </p>
                  </div>
                  <button
                    onClick={() => supprimerProduit(produit.id)}
                    className="text-red-600 hover:text-red-800 hover:underline text-sm"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>

            {/* Résumé paiement */}
            <div className="w-full lg:w-[300px] border rounded p-4 h-fit">
              <h3 className="text-lg font-semibold mb-4">Récapitulatif</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Articles ({nombreArticles})</span>
                  <span>{total} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Livraison</span>
                  <span className="text-green-600">Gratuite</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{total} €</span>
                </div>
              </div>
              
              <button className="w-full bg-emerald-400 text-white py-3 rounded hover:bg-emerald-500 transition font-semibold">
                Procéder au paiement
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full mt-2 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 transition"
              >
                Continuer les achats
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}