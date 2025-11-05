import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

export default function Admin() {
  return (
    <MainLayout>
      <Head title="Administration - ZEK Sport" />
      <div className="max-w-4xl mx-auto p-6">
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Administration ZEK Sport
              </h1>
              <p className="text-gray-600">
                Gérez votre plateforme e-commerce
              </p>
            </div>

            <Link
              href={route('dashboard')}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
            >
              ← Retour au dashboard
            </Link>
          </div>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-blue-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                Gestion des produits
              </h3>
              <Link
                href={route('admin.produits')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition duration-200 block text-center text-lg"
              >
                Accéder aux produits
              </Link>
            </div>
          </div>

          <div className="bg-purple-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                Liste des utilisateurs
              </h3>
              <Link
                href={route('admin2.utilisateurs')}  
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-lg transition duration-200 block text-center text-lg"
              >
                Voir les utilisateurs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}