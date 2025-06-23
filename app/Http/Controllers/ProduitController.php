<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\Categorie;
use App\Models\Subcategorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduitController extends Controller
{
    // Afficher un produit individuel
    public function show($id)
    {
        // Charger les relations pour avoir tout ce qu'il faut dans Detailproduit.jsx
        $produit = Produit::with('categorie', 'souscategorie')->findOrFail($id);

        return Inertia::render('Produits/Detailproduit', [
            'produit' => $produit
        ]);
    }

    // Afficher tous les produits d'une catégorie/souscat
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
