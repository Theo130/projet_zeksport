<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\Categorie;
use App\Models\Subcategorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduitController extends Controller
{


    public function show($id)
{
    $produit = Produit::findOrFail($id);

   return Inertia::render('Produits/Detailproduit', [
    'produit' => $produit
]);
}

    public function index($categorie, $souscategorie)
    {
        // Trouver la catégorie correspondante
        $cat = Categorie::where('nom', $categorie)->firstOrFail();

        // Trouver la sous-catégorie liée à cette catégorie
        $subcat = Subcategorie::where('nom', $souscategorie)
                    ->where('id_categorie', $cat->id)
                    ->firstOrFail();

        // Récupérer les produits de cette sous-catégorie
        $produits = $subcat->produits;

        // Envoyer les données à la vue React
        return Inertia::render('Produits/Index', [
            'categorie' => $categorie,
            'souscategorie' => $souscategorie,
            'produits' => $produits
        ]);
    }
}

