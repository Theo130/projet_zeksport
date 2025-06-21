import React from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

const Button = ({ label }) => (
    <button className="bg-black text-white px-4 py-2 rounded-md font-semibold tracking-wide hover:bg-gray-800 transition">
        {label}
    </button>
);

export default function Home() {
    return (
        <MainLayout>

            {/* image en premier*/}
            <div
                className="w-full h-[500px] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/image1.png')" }}
            ></div>

            {/* le truc homme femme enfant */}
            <div className="flex flex-col md:flex-row justify-between gap-6 p-6 bg-white">
                {/* Bloc HOMME */}
                <div className="relative w-full md:w-1/3 h-[450px] bg-gray-400 rounded-md overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-between py-8 px-4 text-white">
                        <h2 className="text-3xl font-bold drop-shadow-md">HOMME</h2>
                        <div className="flex flex-col gap-3 w-full">
                            <Link href="/produits/homme/vetement">
                                <button className="bg-white text-black font-medium py-2 rounded w-full">Vêtements</button>
                            </Link>
                            <Link href="/produits/homme/chaussure">
                                <button className="bg-white text-black font-medium py-2 rounded w-full">Chaussures</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bloc FEMME */}
                <div className="relative w-full md:w-1/3 h-[450px] bg-gray-400 rounded-md overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-between py-8 px-4 text-white">
                        <h2 className="text-3xl font-bold drop-shadow-md">FEMME</h2>
                        <div className="flex flex-col gap-3 w-full">
                            <Link href="/produits/femme/vetement">
                                <button className="bg-white text-black font-medium py-2 rounded w-full">Vêtements</button>
                            </Link>
                            <Link href="/produits/femme/chaussure">
                                <button className="bg-white text-black font-medium py-2 rounded w-full">Chaussures</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bloc ENFANT */}
                <div className="relative w-full md:w-1/3 h-[450px] bg-gray-400 rounded-md overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-between py-8 px-4 text-white">
                        <h2 className="text-3xl font-bold drop-shadow-md">ENFANT</h2>
                        <div className="flex flex-col gap-3 w-full">
                            <Link href="/produits/enfant/vetement">
                                <button className="bg-white text-black font-medium py-2 rounded w-full">Vêtements</button>
                            </Link>
                            <Link href="/produits/enfant/chaussure">
                                <button className="bg-white text-black font-medium py-2 rounded w-full">Chaussures</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>




            {/* les produit en bas*/}
            <div className="bg-white px-4 py-8">
                <h1 className="text-black font-bold font-[Arial] -mt-2 ml-2">
                    Nouveauté
                </h1>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                    <div className="min-w-[250px] h-[150px] bg-gray-200 rounded-md flex items-center justify-center">

                    </div>
                    <div className="min-w-[250px] h-[150px] bg-gray-200 rounded-md flex items-center justify-center">

                    </div>
                    <div className="min-w-[250px] h-[150px] bg-gray-200 rounded-md flex items-center justify-center">

                    </div>
                    <div className="min-w-[250px] h-[150px] bg-gray-200 rounded-md flex items-center justify-center">

                    </div>
                    <div className="min-w-[250px] h-[150px] bg-gray-200 rounded-md flex items-center justify-center">

                    </div>
                    <div className="min-w-[250px] h-[150px] bg-gray-200 rounded-md flex items-center justify-center">

                    </div>
                    <div className="min-w-[250px] h-[150px] bg-gray-200 rounded-md flex items-center justify-center">

                    </div>
                    <div className="min-w-[250px] h-[150px] bg-gray-200 rounded-md flex items-center justify-center">

                    </div>
                    <div className="min-w-[250px] h-[150px] bg-gray-200 rounded-md flex items-center justify-center">

                    </div>
                </div>
            </div>


        </MainLayout>
    );
}
