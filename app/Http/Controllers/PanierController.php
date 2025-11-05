<?php

namespace App\Http\Controllers;

use App\Models\Panier;
use App\Models\Produit;
use App\Models\PanierProduit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PanierController extends Controller
{
    /**
     * afficher le panier de l'utilisateur
     */
    public function index()
    {
        $user = Auth::user();
        $panier = $user->obtenirPanier();
        
        // Charger les produits avec leurs donnees completes
        $produitsPanier = $panier->produits()->get();
        
        // calcule le total
        $total = $panier->getTotal();
        $nombreArticles = $panier->getNombreArticles();

        return Inertia::render('Panier', [
            'produits' => $produitsPanier,
            'total' => number_format($total, 2, ',', ' '),
            'nombreArticles' => $nombreArticles,
        ]);
    }

    public function ajouter(Request $request)
    {
        $request->validate([
            'produit_id' => 'required|exists:produits,id',
            'quantite' => 'integer|min:1|max:10',
        ]);

        $user = Auth::user();
        $produit = Produit::findOrFail($request->produit_id);
        $quantite = $request->quantite ?? 1;

        // Verifier le stock
        if (!$produit->estEnStock($quantite)) {
            return back()->withErrors([
                'stock' => 'Stock insuffisant pour ce produit.'
            ]);
        }

        // Obtenir ou créer le panier
        $panier = $user->obtenirPanier();

        // Verifier si le produit est déjà dans le panier
        $existant = PanierProduit::where('id_panier', $panier->id)
                                  ->where('id_produit', $produit->id)
                                  ->first();

        if ($existant) {
            // augmenter la quantité
            $nouvelleQuantite = $existant->quantite + $quantite;
            
            if (!$produit->estEnStock($nouvelleQuantite)) {
                return back()->withErrors([
                    'stock' => 'Stock insuffisant pour cette quantité.'
                ]);
            }
            
            $existant->update(['quantite' => $nouvelleQuantite]);
        } else {
            // Ajouter nouveau produit
            PanierProduit::create([
                'id_panier' => $panier->id,
                'id_produit' => $produit->id,
                'quantite' => $quantite,
            ]);
        }

        return back()->with('success', 'Produit ajouté au panier avec succès !');
    }

    /**
     * supprimer un produit du panier
     */
    public function supprimer(Request $request)
    {
        $request->validate([
            'produit_id' => 'required|exists:produits,id',
        ]);

        $user = Auth::user();
        $panier = $user->panier;

        if (!$panier) {
            return back()->withErrors(['error' => 'Panier introuvable.']);
        }

        // supprimer le produit du panier
        PanierProduit::where('id_panier', $panier->id)
                     ->where('id_produit', $request->produit_id)
                     ->delete();

        return back()->with('success', 'Produit supprimé du panier.');
    }

    /**
     * modif la quantite dun produit dans le panier
     */
    public function modifierQuantite(Request $request)
    {
        $request->validate([
            'produit_id' => 'required|exists:produits,id',
            'quantite' => 'required|integer|min:1|max:10',
        ]);

        $user = Auth::user();
        $panier = $user->panier;
        $produit = Produit::findOrFail($request->produit_id);

        if (!$panier) {
            return back()->withErrors(['error' => 'Panier introuvable.']);
        }

        // Verifier le stock
        if (!$produit->estEnStock($request->quantite)) {
            return back()->withErrors([
                'stock' => 'Stock insuffisant pour cette quantité.'
            ]);
        }

        // mettre à jour la quantité
        PanierProduit::where('id_panier', $panier->id)
                     ->where('id_produit', $request->produit_id)
                     ->update(['quantite' => $request->quantite]);

        return back()->with('success', 'Quantité mise à jour.');
    }

    /**
     * Vider complètement le panier
     */
    public function vider()
    {
        $user = Auth::user();
        $panier = $user->panier;

        if ($panier) {
            PanierProduit::where('id_panier', $panier->id)->delete();
        }

        return back()->with('success', 'Panier vidé avec succès.');
    }
}