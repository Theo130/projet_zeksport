import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

const Button = ({ label }) => (
  <button className="bg-black text-white px-4 py-2 rounded-md font-semibold tracking-wide hover:bg-gray-800 transition">
    {label}
  </button>
);

export default function Home({ produitsRecents = [] }) {
  const { auth } = usePage().props;
  const utilisateurConnecte = !!auth?.user;

  const ajouterAuPanier = (produitId) => {
    if (!utilisateurConnecte) {
      router.visit(route('connexion'));
      return;
    }

    router.post(route('panier.ajouter'), {
      produit_id: produitId,
      quantite: 1
    }, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        // notification de succès optionnelle
      },
      onError: (errors) => {
        console.error('Erreur lors de l\'ajout au panier:', errors);
      } // mess erreur si lajt ne marche pas
    });
  };

  return (
    <MainLayout>
      {/* image en premier */}
      <div
        className="w-full h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/image1.png')" }}
      ></div>

      {/* les 3 bloc homme femme enfant */}
      <div className="flex flex-col md:flex-row justify-between gap-6 p-6 bg-white">
        {/* partie homme */}
        <div
          className="relative w-full md:w-1/3 h-[450px] rounded-md overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/images/imagehomme.jpg')" }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-between py-8 px-4 text-white bg-black/30">
            <h2 className="text-3xl font-bold drop-shadow-md">HOMME</h2>
            <div className="flex flex-col gap-3 w-full">
              <Link href="/produits/homme/vetement">
                <button className="bg-white text-black font-medium py-2 rounded w-full">
                  Vêtements
                </button>
              </Link>
              <Link href="/produits/homme/chaussure">
                <button className="bg-white text-black font-medium py-2 rounded w-full">
                  Chaussures
                </button>
              </Link>
            </div>
          </div>
        </div>


        {/* partie femme */}
        <div
          className="relative w-full md:w-1/3 h-[450px] rounded-md overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/images/imagefemme.jpg')" }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-between py-8 px-4 text-white bg-black/30">
            <h2 className="text-3xl font-bold drop-shadow-md">FEMME</h2>
            <div className="flex flex-col gap-3 w-full">
              <Link href="/produits/femme/vetement">
                <button className="bg-white text-black font-medium py-2 rounded w-full">Vêtements</button>
              </Link>
              <Link href="/produits/femme/chaussure">
                <button className="bg-white text-black font-medium py-2 rounded w-full">Chaussures</button>
              </Link>
            </div>
          </div>
        </div>

        {/* partie enfant */}
        <div
          className="relative w-full md:w-1/3 h-[450px] rounded-md overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/images/imageenfant.jpg')" }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-between py-8 px-4 text-white bg-black/30">
            <h2 className="text-3xl font-bold drop-shadow-md">ENFANT</h2>
            <div className="flex flex-col gap-3 w-full">
              <Link href="/produits/enfant/vetement">
                <button className="bg-white text-black font-medium py-2 rounded w-full">
                  Vêtements
                </button>
              </Link>
              <Link href="/produits/enfant/chaussure">
                <button className="bg-white text-black font-medium py-2 rounded w-full">
                  Chaussures
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Section des produits récents */}
      <div className="bg-white px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl text-black font-bold">
            Meilleures ventes
          </h1>
        </div>

        {/* Grille des produits */}
        {produitsRecents.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produitsRecents.map((produit) => (
              <div
                key={produit.id}
                className="bg-gray-100 rounded-lg shadow hover:shadow-lg transition duration-300 p-4"
              >
                <Link href={`/produit/${produit.id}`} className="block mb-4">
                  <div className="w-full h-48 bg-gray-200 rounded overflow-hidden flex items-center justify-center group">
                    <img
                      src={
                        produit.image_url && produit.image_url.startsWith('http')
                          ? produit.image_url
                          : produit.image_url
                            ? `/images/${produit.image_url}`
                            : '/images/placeholder.jpg'
                      }
                      alt={produit.nom}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-black mt-3 line-clamp-2">{produit.nom}</h3>
                  <p className="font-bold text-emerald-600 text-lg">{produit.prix} €</p>
                </Link>


                {/* informations sur le stock */}
                <div className="mb-2">
                  {produit.stock > 0 ? (
                    <p className="text-sm text-green-600">
                      En stock ({produit.stock} disponible{produit.stock > 1 ? 's' : ''})
                    </p>
                  ) : (
                    <p className="text-sm text-red-600">Rupture de stock</p>
                  )}
                </div>

                <button
                  onClick={() => ajouterAuPanier(produit.id)}
                  disabled={produit.stock === 0}
                  className={`w-full text-sm font-semibold px-4 py-2 rounded-md shadow transition duration-300 ${produit.stock > 0
                    ? 'bg-emerald-400 text-white hover:bg-black'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    }`}
                >
                  {utilisateurConnecte ?
                    (produit.stock > 0 ? 'Ajouter au panier' : 'Indisponible')
                    : 'Se connecter pour acheter'
                  }
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun produit récent à afficher pour le moment.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
