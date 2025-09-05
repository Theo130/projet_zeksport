import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Admin() {
  const { auth } = usePage().props;
  const user = auth?.user;

  console.log('Admin page loaded', user); // Pour déboguer

  return (
    <div className="min-h-screen bg-gray-100">
      <Head title="Administration - ZEK Sport" />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Page d'Administration
          </h1>
          
          <p className="text-gray-600 mb-4">
            Bienvenue {user?.prenom || 'Administrateur'}
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded">
              <h3 className="font-semibold">Informations utilisateur :</h3>
              <p>Nom: {user?.nom}</p>
              <p>Prénom: {user?.prenom}</p>
              <p>Role: {user?.role}</p>
            </div>
            
            <button
              onClick={() => router.get('/dashboard')}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              ← Retour au Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}