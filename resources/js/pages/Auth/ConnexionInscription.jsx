import React from "react";
import { Head, useForm } from '@inertiajs/react';
import MainLayout from "../../Layouts/MainLayout";

export default function ConnexionInscription() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    mot_de_passe: "",
  });

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
                <input
                  type="password"
                  name="mot_de_passe"
                  placeholder="Mot de passe"
                  value={data.mot_de_passe}
                  onChange={e => setData('mot_de_passe', e.target.value)}
                  className={`w-full h-10 px-3 bg-gray-200 rounded focus:outline-none placeholder-black text-black ${
                    errors.mot_de_passe ? 'border border-red-500' : ''
                  }`}
                  required
                />
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