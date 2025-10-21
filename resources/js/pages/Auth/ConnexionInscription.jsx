import React, { useState } from "react";
import { Head, useForm } from '@inertiajs/react';
import MainLayout from "../../Layouts/MainLayout";

export default function ConnexionInscription() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    mot_de_passe: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    post(route('connexion.store'), {
      onSuccess: () => {
        // Réinitialiser le formulaire en cas de succès
        reset();
      },
      onError: () => {
        // En cas d'erreur, on peut gérer ici si besoin
        console.log('Erreur de connexion');
      }
    });
  };

  return (
    <MainLayout>
      <Head title="Connexion - ZEK Sport" />
      
      <div className="bg-white py-12 px-4 md:px-16">
        <div className="flex flex-col md:flex-row justify-center items-start gap-8 mb-8">
          
          {/* --------- Bloc Connexion --------- */}
          <div className="w-full md:w-1/2 bg-white p-6 border rounded">
            <h2 className="text-xl font-semibold mb-4 text-black">Connexion</h2>

            {/* Affichage des erreurs générales */}
            {errors.general && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.general}
              </div>
            )}

            {/* INFO : Pas besoin de champ rôle pour la connexion */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded text-sm">
              <strong> Information :</strong> Connectez-vous avec votre email et mot de passe. 
              Votre rôle (Client/Admin) est automatiquement détecté.
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Adresse e-mail"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  className={`w-full h-10 px-3 bg-gray-200 rounded focus:outline-none placeholder-black text-black ${
                    errors.email ? 'border border-red-500' : ''
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="mot_de_passe"
                    placeholder="Mot de passe"
                    value={data.mot_de_passe}
                    onChange={e => setData('mot_de_passe', e.target.value)}
                    className={`w-full h-10 px-3 pr-10 bg-gray-200 rounded focus:outline-none placeholder-black text-black ${
                      errors.mot_de_passe ? 'border border-red-500' : ''
                    }`}
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
                {errors.mot_de_passe && (
                  <p className="text-sm text-red-500 mt-1">{errors.mot_de_passe}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-emerald-400 text-white py-2 rounded font-semibold hover:bg-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Connexion...' : 'S\'identifier'}
              </button>
            </form>

            <div className="mt-3">
              <a href="#" className="text-sm text-gray-700 hover:underline">
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          {/* --------- Bloc Inscription --------- */}
          <div className="w-full md:w-1/2 bg-white p-6 border rounded text-center">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Nouveau client de ZEK Sport ?
            </h2>
            <p className="text-gray-600 mb-4">
              Créez votre compte pour accéder à tous nos produits et services.
            </p>
            <a
              href={route('inscription')}
              className="block w-full bg-emerald-400 text-white py-2 rounded font-semibold hover:bg-emerald-500 transition"
            >
              S'enregistrer
            </a>
          </div>
        </div>

        <p className="text-sm text-center text-gray-700">
          Nous utilisons ces données en accord avec notre{" "}
          <a href="#" className="underline hover:text-black">
            Politique de Confidentialité
          </a>
        </p>
      </div>
    </MainLayout>
  );
}