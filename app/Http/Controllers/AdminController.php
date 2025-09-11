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
     * Afficher la page de gestion des produits
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
     * Créer un nouveau produit
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

        Produit::create($validated);

        return redirect()->route('admin.produits')
                        ->with('success', 'Produit créé avec succès!');
    }

    /**
     * Modifier un produit existant
     */
    public function modifierProduit(Request $request, $id)
    {
        $produit = Produit::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image_url' => 'nullable|url',
            'id_categorie' => 'required|exists:categories,id',
            'id_subcategorie' => 'nullable|exists:subcategories,id'
        ]);

        $produit->update($validated);

        return redirect()->route('admin.produits')
                        ->with('success', 'Produit modifié avec succès!');
    }

    /**
     * Supprimer un produit
     */
    public function supprimerProduit($id)
    {
        $produit = Produit::findOrFail($id);
        $nom = $produit->nom;
        
        $produit->delete();

        return redirect()->route('admin.produits')
                        ->with('success', "Produit \"$nom\" supprimé avec succès!");
    }

    /**
     * Afficher la page de gestion des utilisateurs
     */
    public function utilisateurs()
    {
        $utilisateurs = User::all();

        return Inertia::render('admin/Utilisateurs', [
            'utilisateurs' => $utilisateurs
        ]);
    }

    /**
     * Modifier le rôle d'un utilisateur
     */
    public function modifierRole(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $validated = $request->validate([
            'role' => 'required|in:user,admin'
        ]);

        $user->update($validated);

        return redirect()->route('admin.utilisateurs')
                        ->with('success', 'Rôle modifié avec succès!');
    }

    /**
     * Supprimer un utilisateur
     */
    public function supprimerUtilisateur($id)
    {
        $user = User::findOrFail($id);
        
        // Empêcher la suppression de son propre compte
        if ($user->id === auth()->id()) {
            return redirect()->route('admin.utilisateurs')
                            ->with('error', 'Vous ne pouvez pas supprimer votre propre compte!');
        }

        $nom = $user->name;
        $user->delete();

        return redirect()->route('admin.utilisateurs')
                        ->with('success', "Utilisateur \"$nom\" supprimé avec succès!");
    }
}