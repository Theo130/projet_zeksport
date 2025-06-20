import React from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import MainLayout from "../../Layouts/MainLayout";

export default function Index({ categorie, souscategorie, produits }) {
    return (

        <MainLayout>


            <div className="p-6 bg-white">

                <Link
                    href="/home"
                    className="inline-block mb-6 px-5 py-2 bg-emerald-400 text-white text-sm font-semibold rounded-md shadow hover:bg-black transition duration-300"
                >
                    ← Retour à l'accueil
                </Link>



                {/* <h1 className="text-black text-xl font-bold">
                    Produits - {categorie} / {souscategorie}
                </h1> */}

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
            </div>

        </MainLayout>

    );
}
