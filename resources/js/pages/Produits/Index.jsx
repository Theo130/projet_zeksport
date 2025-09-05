import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import MainLayout from "../../Layouts/MainLayout";

export default function Index({ categorie, souscategorie, produits }) {
    const { auth } = usePage().props;
    const utilisateurConnecte = !!auth?.user;

    const ajouterAuPanier = (produitId) => {
        if (!utilisateurConnecte) {
            // Rediriger vers la connexion si pas connecté
            router.visit(route('connexion'));
            return;
        }

        router.post(route('panier.ajouter'), {
            produit_id: produitId,
            quantite: 1
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // Optionnel : vous pouvez ajouter une notification de succès ici
            },
            onError: (errors) => {
                console.error('Erreur lors de l\'ajout au panier:', errors);
            }
        });
    };

    return (
        <MainLayout>
            <div className="p-6 bg-white">

                <Link
                    href="/"
                    className="inline-block mb-6 px-5 py-2 bg-emerald-400 text-white text-sm font-semibold rounded-md shadow hover:bg-black transition duration-300"
                >
                    ← Retour à l'accueil
                </Link>

                <h1 className="text-3xl font-bold mb-8 capitalize text-black">
                    {categorie} / {souscategorie}
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {produits.map((produit) => (
                        <div
                            key={produit.id}
                            className="bg-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300 p-4"
                        >
                            <Link href={`/produit/${produit.id}`} className="block mb-4">
                                <div className="w-full h-56 bg-gray-100 rounded overflow-hidden flex items-center justify-center group">
                                    <img
                                        src={
                                            produit.image_url && produit.image_url.startsWith('http')
                                                ? produit.image_url
                                                : produit.image_url 
                                                    ? `/images/${produit.image_url}`
                                                    : '/images/placeholder.jpg' // Image par défaut
                                        }
                                        alt={produit.nom}
                                        className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    />
                                </div>
                                <h2 className="text-lg font-semibold text-black mt-3">{produit.nom}</h2>
                                <p className="font-bold text-black">{produit.prix} €</p>
                            </Link>

                            {/* Informations sur le stock */}
                            <div className="mb-2">
                                {produit.stock > 0 ? (
                                    <p className="text-sm text-green-600">
                                        En stock ({produit.stock} disponible{produit.stock > 1 ? 's' : ''})
                                    </p>
                                ) : (
                                    <p className="text-sm text-red-600">Rupture de stock</p>
                                )}
                            </div>

                            <button 
                                onClick={() => ajouterAuPanier(produit.id)}
                                disabled={produit.stock === 0}
                                className={`w-full text-sm font-semibold px-4 py-2 rounded-md shadow transition duration-300 ${
                                    produit.stock > 0 
                                        ? 'bg-emerald-400 text-white hover:bg-black' 
                                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                }`}
                            >
                                {utilisateurConnecte ? 
                                    (produit.stock > 0 ? 'Ajouter au panier' : 'Indisponible') 
                                    : 'Se connecter pour acheter'
                                }
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}