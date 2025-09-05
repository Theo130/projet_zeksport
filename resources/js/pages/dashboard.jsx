import React, { useState } from 'react';
import { Head, usePage, router, useForm } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

export default function Dashboard() {
  const { auth, flash } = usePage().props;
  const user = auth?.user;
  const [modeEdition, setModeEdition] = useState(false);

  // Formulaire pour la modification du profil
  const { data, setData, put, processing, errors, reset } = useForm({
    prenom: user?.prenom || '',
    nom: user?.nom || '',
    email: user?.email || '',
    telephone: user?.telephone || '',
  });

  const handleLogout = (e) => {
    e.preventDefault();
    router.post(route('deconnexion'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    put(route('profile.update'), {
      preserveScroll: true,
      onSuccess: () => {
        setModeEdition(false);
        // Les données seront automatiquement mises à jour via Inertia
      },
      onError: () => {
        // Les erreurs sont gérées automatiquement via le formulaire
      }
    });
  };

  const annulerModification = () => {
    setModeEdition(false);
    // Remettre les valeurs d'origine
    reset();
    setData({
      prenom: user?.prenom || '',
      nom: user?.nom || '',
      email: user?.email || '',
      telephone: user?.telephone || '',
    });
  };

  return (
    <MainLayout>
      <Head title="Dashboard - ZEK Sport" />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Bienvenue sur ZEK Sport !
            </h1>
            {user?.role === 'admin' && (
              <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium">
                Administrateur
              </span>
            )}
          </div>

          {/* Messages de succès/erreur */}
          {flash?.success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {flash.success}
            </div>
          )}

          {flash?.error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {flash.error}
            </div>
          )}
          
          {user && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Mes informations personnelles
                </h2>
                {!modeEdition ? (
                  <button
                    onClick={() => setModeEdition(true)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition text-sm"
                  >
                    ✏️ Modifier
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={annulerModification}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition text-sm"
                    >
                      Annuler
                    </button>
                  </div>
                )}
              </div>

              {!modeEdition ? (
                // Mode affichage
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Prénom</p>
                      <p className="text-gray-900">{user.prenom}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Nom</p>
                      <p className="text-gray-900">{user.nom}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Email</p>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Téléphone</p>
                      <p className="text-gray-900">{user.telephone || 'Non renseigné'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Rôle</p>
                      <p className="text-gray-900 capitalize">{user.role}</p>
                    </div>
                    
                  </div>
                </div>
              ) : (
                // Mode édition
                <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        value={data.prenom}
                        onChange={e => setData('prenom', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          errors.prenom ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.prenom && (
                        <p className="text-sm text-red-500 mt-1">{errors.prenom}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        value={data.nom}
                        onChange={e => setData('nom', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          errors.nom ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.nom && (
                        <p className="text-sm text-red-500 mt-1">{errors.nom}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={data.telephone}
                        onChange={e => setData('telephone', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          errors.telephone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="06 12 34 56 78"
                      />
                      {errors.telephone && (
                        <p className="text-sm text-red-500 mt-1">{errors.telephone}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      disabled={processing}
                      className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processing ? 'Enregistrement...' : '💾 Enregistrer les modifications'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Actions rapides */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Actions rapides</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href={route('panier.index')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mr-3">
                  🛒
                </div>
                <div>
                  <p className="font-medium">Mon panier</p>
                  <p className="text-sm text-gray-500">Voir mes articles</p>
                </div>
              </a>

              

{user?.role === 'admin' ? (
  <button
    onClick={() => {
      console.log('Clic sur admin button'); // Pour déboguer
      router.get('/admin'); // Utilisez .get() au lieu de .visit()
    }}
    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-red-50 transition text-left w-full"
  >
    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-3">
      ⚙️
    </div>
    <div>
      <p className="font-medium">Administration</p>
      <p className="text-sm text-gray-500">Gérer la plateforme</p>
    </div>
  </button>
) : (
  <a
                  href="/"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-3">
                    🛍️
                  </div>
                  <div>
                    <p className="font-medium">Continuer les achats</p>
                    <p className="text-sm text-gray-500">Découvrir nos produits</p>
                  </div>
                </a>
)}
                
           

              <button
                onClick={handleLogout}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-red-50 transition text-left w-full"
              >
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-3">
                  🚪
                </div>
                <div>
                  <p className="font-medium">Se déconnecter</p>
                  <p className="text-sm text-gray-500">Quitter mon compte</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}