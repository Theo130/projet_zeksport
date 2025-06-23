import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

export default function Navbar() {
  const [recherche, setRecherche] = useState('');
  const [resultats, setResultats] = useState([]);

  const rechercher = debounce(async (texte) => {
    if (texte.trim() === '') {
      setResultats([]);
      return;
    }

    try {
      const response = await fetch(`/recherche?q=${texte}`);
      const data = await response.json();
      setResultats(data);
    } catch (error) {
      console.error('Erreur de recherche', error);
    }
  }, 300);

  useEffect(() => {
    rechercher(recherche);
  }, [recherche]);

  const handleClickResultat = () => {
    setRecherche('');
    setResultats([]);
  };

  return (
    <header className="w-full">
      {/* Bandeau noir */}
      <div className="bg-black text-white flex justify-between items-center px-8 py-2">
        {/* Logo */}
        <div>
          <img src="/images/logo_zek_sport.png" alt="Logo" className="w-[120px] h-[120px]" />
        </div>

        {/* Section droite */}
        <div className="flex flex-col items-end gap-2">
          {/* Lien de connexion */}
          <a href="/connexion" className="text-white text-sm hover:underline font-medium">
            S’identifier
          </a>

          {/* Recherche + icônes */}
          <div className="flex items-center gap-2">
            {/* Champ recherche avec résultats + redirection sur Entrée ou clic loupe */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (recherche.trim() !== '') {
                  window.location.href = `/recherche/resultats?q=${encodeURIComponent(recherche)}`;
                }
              }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Recherche"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="h-10 w-[300px] pl-4 pr-10 rounded-md bg-white text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button type="submit">
                <img
                  src="/images/loupe.png"
                  alt="recherche"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
                />
              </button>

              {/* Résultats live */}
              {resultats.length > 0 && (
                <div className="absolute top-full left-0 w-[300px] bg-white shadow-lg z-50 rounded-md mt-1 max-h-60 overflow-y-auto">
                  {resultats.map((produit) => (
                    <a
                      key={produit.id}
                      href={`/produits/detail/${produit.id}`}
                      onClick={handleClickResultat}
                      className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                    >
                      {produit.nom}
                    </a>
                  ))}
                </div>
              )}
            </form>

            {/* Icônes profil & panier */}
            <a href="#" className="ml-1">
              <img src="/images/bonhomme.png" alt="profil" className="w-9 h-9" />
            </a>
            <a href="/panier" className="ml-1">
              <img src="/images/panier.png" alt="panier" className="w-9 h-9" />
            </a>
          </div>
        </div>
      </div>

      {/* Bandeau catégories */}
      <nav className="bg-white flex justify-center gap-14 py-3 border-t border-b border-gray-200">
        <a href="#" className="text-black hover:text-gray-600 font-medium">Homme</a>
        <a href="#" className="text-black hover:text-gray-600 font-medium">Femme</a>
        <a href="#" className="text-black hover:text-gray-600 font-medium">Enfant</a>
        <a href="#" className="text-black hover:text-gray-600 font-medium">Sport</a>
        <a href="#" className="text-black hover:text-gray-600 font-medium">Marques</a>
      </nav>
    </header>
  );
}
