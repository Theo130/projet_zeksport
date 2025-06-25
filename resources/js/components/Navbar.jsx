import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { Link } from '@inertiajs/react';

export default function Navbar() {
  const [recherche, setRecherche] = useState('');
  const [resultats, setResultats] = useState([]);

  const rechercher = debounce(async (texte) => {
    if (texte.trim() === '') return setResultats([]);
    try {
      const res = await fetch(`/recherche?q=${texte}`);
      setResultats(await res.json());
    } catch (e) {
      console.error('Erreur de recherche', e);
    }
  }, 300);

  useEffect(() => {
    rechercher(recherche);
    return () => rechercher.cancel();
  }, [recherche, rechercher]);

  const resetRecherche = () => {
    setRecherche('');
    setResultats([]);
  };

  return (
    <header className="w-full">
      {/* Bandeau noir */}
      <div className="bg-black text-white flex justify-between items-center px-8 py-1">
        {/* Logo cliquable */}
        <Link href="/">
          <img
            src="/images/logo_zek_sport.png"
            alt="Logo"
            className="w-20 h-20"
          />
        </Link>

        {/* Zone droite */}
        <div className="flex flex-col items-end gap-2">
          <Link href="/connexioninscription" className="text-sm hover:underline font-medium">
            S’identifier
          </Link>

          <div className="flex items-center gap-2">
            {/* Formulaire de recherche */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (recherche.trim())
                  window.location.href = `/recherche/resultats?q=${encodeURIComponent(recherche)}`;
              }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Recherche"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="h-10 w-72 pl-4 pr-10 rounded-md bg-white text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button type="submit">
                <img
                  src="/images/loupe.png"
                  alt="recherche"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6"
                />
              </button>

              {/* Autocomplete */}
              {resultats.length > 0 && (
                <div className="absolute top-full left-0 w-72 bg-white shadow-lg z-50 rounded-md mt-1 max-h-60 overflow-y-auto">
                  {resultats.map((p) => (
                    <Link
                      key={p.id}
                      href={`/produits/detail/${p.id}`}
                      onClick={resetRecherche}
                      className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                    >
                      {p.nom}
                    </Link>
                  ))}
                </div>
              )}
            </form>

            {/* Profil & Panier */}
            <a href="#" className="ml-1">
              <img src="/images/bonhomme.png" alt="profil" className="w-9 h-9" />
            </a>
            <Link href="/panier" className="ml-1">
              <img src="/images/panier.png" alt="panier" className="w-9 h-9" />
            </Link>
          </div>
        </div>
      </div>

      {/* Menu principal */}
      <nav className="bg-white flex justify-center gap-14 py-3 border-y border-gray-200">
        <button className="font-medium hover:text-gray-600">Homme</button>
        <button className="font-medium hover:text-gray-600">Femme</button>
        <button className="font-medium hover:text-gray-600">Enfant</button>
        <button className="font-medium hover:text-gray-600">Sport</button>
        <button className="font-medium hover:text-gray-600">Marques</button>
      </nav>
    </header>
  );
}
