import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function Detailproduit({ produit }) {
    const { auth } = usePage().props;
    const utilisateurConnecte = !!auth?.user;
    const [quantite, setQuantite] = useState(1);
    const [ajoutEnCours, setAjoutEnCours] = useState(false);

    const ajouterAuPanier = () => {
        if (!utilisateurConnecte) {
            router.visit(route('connexion'));
            return;
        }

        setAjoutEnCours(true);

        router.post(route('panier.ajouter'), {
            produit_id: produit.id,
            quantite: quantite
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setAjoutEnCours(false);
                // Optionnel : ajouter une notification de succès
            },
            onError: (errors) => {
                setAjoutEnCours(false);
                console.error('Erreur lors de l\'ajout au panier:', errors);
            }
        });
    };

    return (
        <MainLayout>
            <Head title={produit.nom} />

            <div className="p-6 bg-white max-w-5xl mx-auto">
                <button
                    onClick={() => window.history.back()}
                    className="inline-block mb-6 px-5 py-2 bg-emerald-400 text-white text-sm font-semibold rounded-md shadow hover:bg-black transition duration-300"
                >
                    ← Retour à la page précédente
                </button>

                {/* bloc produit */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* image */}
                    <div className="w-full md:w-1/2 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={
                                produit.image_url?.includes('http')
                                    ? produit.image_url
                                    : `/images/${produit.image_url || 'default.jpg'}`
                            }
                            alt={produit.nom}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* nnfos produit */}
                    <div className="w-full md:w-1/2">
                        <h1 className="text-3xl font-bold text-black mb-2">{produit.nom}</h1>
                        <p className="text-xl font-semibold text-emerald-400 mb-4">{produit.prix} €</p>

                        {/* la description */}
                        <p className="text-gray-700 text-sm leading-relaxed mb-6">
                            {produit.description || 'Aucune description disponible.'}
                        </p>

                        {/* stocke et Categories */}
                        <div className="text-sm text-gray-600 mb-6 space-y-1">
                            <p>
                                <span className="font-semibold">Stock :</span> 
                                <span className={`ml-1 ${produit.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {produit.stock > 0 ? `${produit.stock} disponible${produit.stock > 1 ? 's' : ''}` : 'Rupture de stock'}
                                </span>
                            </p>
                            <p><span className="font-semibold">Catégorie :</span> {produit.categorie?.nom || 'Non renseignée'}</p>
                        </div>

                        {/* selecteur de quantite et bouton panier */}
                        {produit.stock > 0 && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantité :
                                </label>
                                <select
                                    value={quantite}
                                    onChange={(e) => setQuantite(parseInt(e.target.value))}
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    {[...Array(Math.min(produit.stock, 10))].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <button 
                            onClick={ajouterAuPanier}
                            disabled={produit.stock === 0 || ajoutEnCours}
                            className={`mt-4 w-full font-semibold px-4 py-3 rounded-md shadow transition duration-300 ${
                                produit.stock > 0 && !ajoutEnCours
                                    ? 'bg-emerald-400 text-white hover:bg-black hover:text-white' 
                                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                            }`}
                        >
                            {ajoutEnCours ? 'Ajout en cours...' :
                             !utilisateurConnecte ? 'Se connecter pour acheter' :
                             produit.stock === 0 ? 'Produit indisponible' :
                             'Ajouter au panier'}
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}