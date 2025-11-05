<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Produit;
use App\Models\Categorie;
use App\Models\Subcategorie;

class AdminController extends Controller
{
    /**
     * afficher la page de gestion des produits
     */
    public function produits()
    {
        $produits = Produit::with(['categorie', 'subcategorie'])->get();
        $categories = Categorie::all();
        $subcategories = Subcategorie::all();

        return Inertia::render('Admin/Produits', [
            'produits' => $produits,
            'categories' => $categories,
            'subcategories' => $subcategories
        ]);
    }

    /**
     * creer un nouveau produit
     */
    public function creerProduit(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image_url' => 'nullable|url',
            'id_categorie' => 'required|exists:categories,id',
            'id_subcategorie' => 'nullable|exists:subcategories,id'
        ]);

        // gerer le cas où id_subcategorie est vide
        if (empty($validated['id_subcategorie'])) {
            $validated['id_subcategorie'] = null;
        }

        Produit::create($validated);

        return redirect()->route('admin.produits')
                        ->with('success', 'Produit créé avec succès!');
    }

    /**
     * modifier un produit existant
     */
     public function modifierProduit(Request $request, $id)
    {
    $produit = Produit::findOrFail($id);

    $validated = $request->validate(
        [
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image_url' => 'nullable|string',
            'id_categorie' => 'required|exists:categories,id',
            'id_subcategorie' => 'required|exists:subcategories,id',
        ],
        [
            'id_subcategorie.required' => 'Tu as oublié de sélectionner la sous-catégorie.',
            'id_subcategorie.exists'   => 'La sous-catégorie choisie est invalide.',
        ]
    );

    $produit->update($validated);

    return back()->with('success', 'Produit mis à jour.');
    }

    /**
     * supprimer un produit
     */
    public function supprimerProduit($id)
    {
        $produit = Produit::findOrFail($id);
        $nom = $produit->nom;
        
        $produit->delete();

        return redirect()->route('admin.produits')
                        ->with('success', "Produit \"$nom\" supprimé avec succès!");
    }

  
}