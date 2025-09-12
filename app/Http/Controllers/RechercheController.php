<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produit;
use Inertia\Inertia;

class RechercheController extends Controller
{
    // 🔍 Recherche live (instantanée, début du mot)
    public function index(Request $request)
    {
        $query = $request->input('q');

        $resultats = Produit::with('categorie', 'subcategorie')
            ->where('nom', 'like', $query . '%') // commence par
            ->limit(10)
            ->get();

        return response()->json($resultats);
    }

    // 🔍 Recherche complète (quand on appuie sur Entrée)
    public function resultats(Request $request)
    {
        $query = $request->input('q');

        // ✅ Recherche classique avec LIKE au lieu de Meilisearch
        $produits = Produit::with('categorie', 'subcategorie')
            ->where('nom', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%")
            ->orWhereHas('categorie', function($q) use ($query) {
                $q->where('nom', 'LIKE', "%{$query}%");
            })
            ->orWhereHas('subcategorie', function($q) use ($query) {
                $q->where('nom', 'LIKE', "%{$query}%");
            })
            ->get();

        return Inertia::render('Recherche/Resultats', [
            'produits' => $produits,
            'query' => $query
        ]);
    }
}