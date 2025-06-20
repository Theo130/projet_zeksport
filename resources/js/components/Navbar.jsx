import React from 'react';

export default function Navbar() {
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
            {/* Champ recherche avec loupe dedans */}
            <div className="relative">
              <input
                type="text"
                placeholder="Recherche"
                className="h-10 w-[300px] pl-4 pr-10 rounded-md bg-white text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <img
                src="/images/loupe.png"
                alt="recherche"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
              />
            </div>

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
