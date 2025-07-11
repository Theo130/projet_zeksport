import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";

export default function ConnexionInscription() {
  const [form, setForm] = useState({
    email: "",
    mot_de_passe: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ➜ quand tu auras une API d’auth, appelle-la ici (fetch / axios…)
    console.table(form);
  };

  return (
    <MainLayout>
      <div className="bg-white py-12 px-4 md:px-16">
        <div className="flex flex-col md:flex-row justify-center items-start gap-8 mb-8">
          {/* --------- Bloc Connexion --------- */}
          <div className="w-full md:w-1/2 bg-white p-6 border rounded">
            <h2 className="text-xl font-semibold mb-4 text-black">Connexion</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Adresse e-mail"
                value={form.email}
                onChange={handleChange}
                className="w-full mb-2 h-10 px-3 bg-gray-200 rounded focus:outline-none placeholder-black text-black"
              />

              <input
                type="password"
                name="mot_de_passe"
                placeholder="Mot de passe"
                value={form.mot_de_passe}
                onChange={handleChange}
                className="w-full mb-2 h-10 px-3 bg-gray-200 rounded focus:outline-none placeholder-black text-black"
              />

              <button
                type="submit"
                className="w-full bg-emerald-400 text-white py-2 rounded font-semibold hover:bg-emerald-500 transition"
              >
                S’identifier
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
            <a
              href="/inscription"
              className="block w-full bg-emerald-400 text-white py-2 rounded font-semibold hover:bg-emerald-500 transition"
            >
              S’enregistrer
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
