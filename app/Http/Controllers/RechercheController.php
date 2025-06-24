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

        $resultats = Produit::with('categorie', 'souscategorie')
            ->where('nom', 'like', $query . '%') // commence par
            ->limit(10)
            ->get();

        return response()->json($resultats);
    }

    // 🔍 Recherche complète avec Meilisearch (intelligente)
    public function resultats(Request $request)
    {
        $query = $request->input('q');

        // ✅ Utilisation de Meilisearch via Laravel Scout
        $produits = Produit::search($query)->get();

        return Inertia::render('Recherche/Resultats', [
            'produits' => $produits,
            'query' => $query
        ]);
    }
}
