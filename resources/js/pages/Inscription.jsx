import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';     // adapte le chemin si besoin

export default function Inscription() {
  const { data, setData, post, processing, errors } = useForm({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    role: 'client',                 // client ou admin
    mot_de_passe: '',
    mot_de_passe_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('inscription.store'));       // helper route()
  };

  return (
    <MainLayout>
      <Head title="Inscription" />

      <div className="p-6 bg-white max-w-3xl mx-auto rounded shadow">
        <h1 className="text-3xl font-bold mb-8 text-center">Créer un compte</h1>

        <form onSubmit={submit} className="space-y-6">
          {/* ----- Prénom ----- */}
          <div>
            <label className="block font-medium mb-1">Prénom *</label>
            <input
              type="text"
              value={data.prenom}
              onChange={e => setData('prenom', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.prenom && <p className="text-sm text-red-500">{errors.prenom}</p>}
          </div>

          {/* ----- Nom ----- */}
          <div>
            <label className="block font-medium mb-1">Nom *</label>
            <input
              type="text"
              value={data.nom}
              onChange={e => setData('nom', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.nom && <p className="text-sm text-red-500">{errors.nom}</p>}
          </div>

          {/* ----- Email ----- */}
          <div>
            <label className="block font-medium mb-1">E-mail *</label>
            <input
              type="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* ----- Téléphone ----- */}
          <div>
            <label className="block font-medium mb-1">Téléphone</label>
            <input
              type="tel"
              value={data.telephone}
              onChange={e => setData('telephone', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.telephone && <p className="text-sm text-red-500">{errors.telephone}</p>}
          </div>

          {/* ----- Rôle admin ----- */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="role_admin"
              checked={data.role === 'admin'}
              onChange={e => setData('role', e.target.checked ? 'admin' : 'client')}
              className="border rounded"
            />
            <label htmlFor="role_admin">Compte administrateur</label>
          </div>

          {/* ----- Mot de passe ----- */}
          <div>
            <label className="block font-medium mb-1">Mot de passe *</label>
            <input
              type="password"
              value={data.mot_de_passe}
              onChange={e => setData('mot_de_passe', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.mot_de_passe && <p className="text-sm text-red-500">{errors.mot_de_passe}</p>}
          </div>

          {/* ----- Confirmation ----- */}
          <div>
            <label className="block font-medium mb-1">Confirmez le mot de passe *</label>
            <input
              type="password"
              value={data.mot_de_passe_confirmation}
              onChange={e => setData('mot_de_passe_confirmation', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* ----- Bouton ----- */}
          <button
            type="submit"
            disabled={processing}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded transition"
          >
            {processing ? 'Création…' : 'Créer le compte'}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
