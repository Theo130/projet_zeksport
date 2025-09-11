<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Produit;

class AdminController extends Controller
{
    /**
     * Afficher la page de gestion des produits
     */
    public function produits()
    {
        $produits = Produit::all(); // Récupère tous les produits
        
        return Inertia::render('Admin/Produits', [
            'produits' => $produits
        ]);
    }

    /**
     * Créer un nouveau produit
     */
    public function creerProduit(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            // Ajouter d'autres validations selon tes besoins
        ]);

        Produit::create($request->all());

        return redirect()->route('admin.produits')->with('success', 'Produit créé avec succès !');
    }

    /**
     * Modifier un produit existant
     */
    public function modifierProduit(Request $request, $id)
    {
        $produit = Produit::findOrFail($id);
        
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image_url' => 'nullable|url',
            'id_subcategorie' => 'required|exists:subcategories,id',
        ]);

        $produit->update($request->all());

        return redirect()->route('admin.produits')->with('success', 'Produit modifié avec succès !');
    }

    /**
     * Supprimer un produit
     */
    public function supprimerProduit($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->delete();

        return redirect()->route('admin.produits')->with('success', 'Produit supprimé avec succès !');
    }

    /**
     * Afficher la page de gestion des utilisateurs
     */
    public function utilisateurs()
    {
        $utilisateurs = User::all(); // Récupère tous les utilisateurs
        
        return Inertia::render('Admin/Utilisateurs', [
            'utilisateurs' => $utilisateurs
        ]);
    }

    /**
     * Modifier le rôle d'un utilisateur
     */
    public function modifierRole(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $request->validate([
            'role' => 'required|in:client,admin'
        ]);

        $user->update(['role' => $request->role]);

        return redirect()->route('admin.utilisateurs')->with('success', 'Rôle modifié avec succès !');
    }

    /**
     * Supprimer un utilisateur
     */
    public function supprimerUtilisateur($id)
    {
        $user = User::findOrFail($id);
        
        // Empêcher la suppression de son propre compte
        if ($user->id === auth()->id()) {
            return redirect()->route('admin.utilisateurs')->with('error', 'Vous ne pouvez pas supprimer votre propre compte !');
        }

        $user->delete();

        return redirect()->route('admin.utilisateurs')->with('success', 'Utilisateur supprimé avec succès !');
    }
}