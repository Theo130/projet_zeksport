import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function Inscription() {
  const { data, setData, post, processing, errors, reset } = useForm({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    role: 'client', // Valeur par défaut
    mot_de_passe: '',
    mot_de_passe_confirmation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    post(route('inscription.store'), {
      onSuccess: () => {
        // Réinitialiser le formulaire en cas de succès
        reset();
      },
      onError: () => {
        // Gérer les erreurs si nécessaire
        console.log('Erreur lors de l\'inscription');
      }
    });
  };

  return (
    <MainLayout>
      <Head title="Inscription - ZEK Sport" />

      <div className="p-6 bg-white max-w-3xl mx-auto rounded shadow mt-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Créer un compte</h1>

        {/* Affichage des erreurs générales */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.general}
          </div>
        )}

        <form onSubmit={submit} className="space-y-6">

          {/* ----- Prénom ----- */}
          <div>
            <label className="block font-medium mb-2 text-gray-700">Prénom *</label>
            <input
              type="text"
              value={data.prenom}
              onChange={e => setData('prenom', e.target.value)}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.prenom ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Votre prénom"
              required
            />
            {errors.prenom && <p className="text-sm text-red-500 mt-1">{errors.prenom}</p>}
          </div>

          {/* ----- Nom ----- */}
          <div>
            <label className="block font-medium mb-2 text-gray-700">Nom *</label>
            <input
              type="text"
              value={data.nom}
              onChange={e => setData('nom', e.target.value)}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.nom ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Votre nom"
              required
            />
            {errors.nom && <p className="text-sm text-red-500 mt-1">{errors.nom}</p>}
          </div>

          {/* ----- Email ----- */}
          <div>
            <label className="block font-medium mb-2 text-gray-700">E-mail *</label>
            <input
              type="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="votre@email.com"
              required
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700">Téléphone</label>
            <input
              type="tel"
              value={data.telephone}
              onChange={e => setData('telephone', e.target.value)}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.telephone ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="06 12 34 56 78"
              maxLength={10}
              pattern="[0-9]*"
              inputMode="numeric"
            />
            {errors.telephone && <p className="text-sm text-red-500 mt-1">{errors.telephone}</p>}
          </div>


          <div>
            <label className="block font-medium mb-2 text-gray-700">Mot de passe *</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={data.mot_de_passe}
                onChange={e => setData('mot_de_passe', e.target.value)}
                className={`w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.mot_de_passe ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Minimum 8 caractères"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.mot_de_passe && <p className="text-sm text-red-500 mt-1">{errors.mot_de_passe}</p>}
            <p className="text-xs text-gray-500 mt-1">
              Le mot de passe doit contenir au moins 8 caractères avec des lettres majuscules, minuscules et des chiffres.
            </p>
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700">Confirmez le mot de passe *</label>
            <div className="relative">
              <input
                type={showPasswordConfirmation ? "text" : "password"}
                value={data.mot_de_passe_confirmation}
                onChange={e => setData('mot_de_passe_confirmation', e.target.value)}
                className={`w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.mot_de_passe_confirmation ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Répétez votre mot de passe"
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPasswordConfirmation ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.mot_de_passe_confirmation && (
              <p className="text-sm text-red-500 mt-1">{errors.mot_de_passe_confirmation}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? 'Création en cours...' : 'Créer le compte'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Vous avez déjà un compte ?{' '}
            <a href={route('connexion')} className="text-emerald-600 hover:text-emerald-700 font-medium">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}