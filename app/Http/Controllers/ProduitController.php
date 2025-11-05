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
       
        $produit = Produit::with('categorie', 'subcategorie')->findOrFail($id);

        return Inertia::render('Produits/Detailproduit', [
            'produit' => $produit
        ]);
    }

    // Afficher tous les produits d'une categorie/souscat
    public function index($categorie, $souscategorie)
    {
       
        $cat = Categorie::where('nom', $categorie)->firstOrFail();

        // Trouver la sous-categorie liée à cette categorie
        $subcat = Subcategorie::where('nom', $souscategorie)
                    ->where('id_categorie', $cat->id)
                    ->firstOrFail();

        // Recuperer les produits de cette sous-categorie
        $produits = $subcat->produits;

        // Envoyer les donnees a React
        return Inertia::render('Produits/Index', [
            'categorie' => $categorie,
            'souscategorie' => $souscategorie,
            'produits' => $produits
        ]);
    }
}
