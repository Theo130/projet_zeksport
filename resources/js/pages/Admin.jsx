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
                🛡️ Administration ZEK Sport
              </h1>
              <p className="text-gray-600">
                Gérez votre plateforme e-commerce
              </p>
            </div>
            
            {/* Bouton retour dashboard */}
            <Link 
              href={route('dashboard')} 
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
            >
              ← Retour au dashboard
            </Link>
          </div>
        </div>

        {/* Cards principales - 2 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Gestion des produits */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-8">
              <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                Gestion des produits
              </h3>
              <p className="text-gray-600 text-center mb-8">
                Ajoutez, modifiez et gérez tous vos produits, leurs prix, leur stock et leurs images
              </p>
              
              <Link 
                href={route('admin.produits')} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition duration-200 block text-center text-lg"
              >
                Accéder aux produits
              </Link>
              
              <div className="mt-6 text-center">
                <div className="flex justify-center gap-4 text-sm text-gray-500">
                  <span>• Ajouter produits</span>
                  <span>• Modifier stock</span>
                  <span>• Gestion images</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gestion des utilisateurs */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-8">
              <div className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <span className="text-4xl">👥</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                Liste des utilisateurs
              </h3>
              <p className="text-gray-600 text-center mb-8">
                Consultez et gérez les comptes clients et administrateurs de la plateforme
              </p>
              
              <Link 
                href={route('admin.utilisateurs')} 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-lg transition duration-200 block text-center text-lg"
              >
                Voir les utilisateurs
              </Link>
              
              <div className="mt-6 text-center">
                <div className="flex justify-center gap-4 text-sm text-gray-500">
                  <span>• Liste clients</span>
                  <span>• Comptes admin</span>
                  <span>• Gestion rôles</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section statistiques optionnelle */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            📊 Statistiques rapides
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-2xl font-bold text-blue-600">0</p>
              <p className="text-sm text-gray-600">Produits</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-2xl font-bold text-green-600">0</p>
              <p className="text-sm text-gray-600">Catégories</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-2xl font-bold text-purple-600">0</p>
              <p className="text-sm text-gray-600">Utilisateurs</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-2xl font-bold text-red-600">0</p>
              <p className="text-sm text-gray-600">Commandes</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}