import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function Show({ produit }) {
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



                {/* Bloc produit */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Image */}
                    <div className="w-full md:w-1/2 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={`/images/${produit.image_url}`}
                            alt={produit.nom}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Infos produit */}
                    <div className="w-full md:w-1/2">
                        <h1 className="text-3xl font-bold text-black mb-2">{produit.nom}</h1>
                        <p className="text-xl font-semibold text-blue-600 mb-4">{produit.prix} €</p>

                        <p className="text-gray-700 text-sm leading-relaxed mb-6">
                            {produit.description}
                        </p>

                        <button className="mt-10 w-full bg-emerald-400 text-black font-semibold px-4 py-2 rounded-md shadow hover:bg-black transition duration-300">
                            Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
