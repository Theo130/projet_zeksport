import React from 'react';
import { Head } from '@inertiajs/react';import { Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';


export default function Inscription() {
  return (
    <MainLayout>
  

      <div className="p-6 bg-white max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-10">Enregistrer</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Colonne gauche */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Prénom *</label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block font-medium">Nom *</label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block font-medium">Adresse email *</label>
              <input type="email" className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block font-medium">Numéro de portable *</label>
              <input type="tel" className="w-full border rounded px-3 py-2" />
            </div>

            <p className="text-sm text-gray-600">
              Le mot de passe doit contenir au moins 8 caractères incluant au moins un chiffre.
            </p>

            <div>
              <label className="block font-medium">Mot de passe *</label>
              <input type="password" className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block font-medium">Confirmer le mot de passe *</label>
              <input type="password" className="w-full border rounded px-3 py-2" />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" />
              <label className="text-sm">
                Veuillez cocher cette case si vous souhaitez recevoir de nos nouvelles par SMS
              </label>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Pays</label>
              <select className="w-full border rounded px-3 py-2">
                <option>France</option>
                <option>Belgique</option>
                <option>Suisse</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Adresse</label>
              <input
                type="text"
                placeholder="Veuillez entrer votre adresse ou votre code postal."
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <button type="button" className="bg-black text-white px-4 py-2 rounded">
              ou entrer votre adresse manuellement
            </button>

            <div className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <label className="text-sm">
                Utiliser l'adresse de facturation comme adresse de livraison
              </label>
            </div>
          </div>

          <div className="md:col-span-2 mt-8">
            <button
              type="submit"
              className="bg-emerald-400 hover:bg-black text-white font-semibold px-6 py-3 rounded transition"
            >
              Créer un compte
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
    
  );
}
