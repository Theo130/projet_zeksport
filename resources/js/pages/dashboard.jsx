import React from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

export default function Dashboard() {
  const { auth } = usePage().props;
  const user = auth?.user;

  const handleLogout = (e) => {
    e.preventDefault();
    router.post(route('deconnexion'));
  };

  return (
    <MainLayout>
      <Head title="Dashboard - ZEK Sport" />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Bienvenue sur ZEK Sport !
          </h1>
          
          {user && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Bonjour {user.prenom} {user.nom} !
              </h2>
              <p className="text-gray-600">
                Email : {user.email}
              </p>
              <p className="text-gray-600">
                Rôle : <span className="font-medium">{user.role}</span>
              </p>
              {user.telephone && (
                <p className="text-gray-600">
                  Téléphone : {user.telephone}
                </p>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h3 className="font-medium text-emerald-800">Mes commandes</h3>
                <p className="text-sm text-emerald-600">Gérer vos commandes</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800">Mon profil</h3>
                <p className="text-sm text-blue-600">Modifier vos informations</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800">Produits</h3>
                <p className="text-sm text-purple-600">Découvrir nos produits</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}