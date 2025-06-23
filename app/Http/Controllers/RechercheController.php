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

    // 🔍 Recherche complète avec "intelligence"
    public function resultats(Request $request)
    {
        $query = strtolower($request->input('q')); // mise en minuscule

        // On enlève les espaces de la recherche
        $normalizedQuery = str_replace(' ', '', $query);

        $produits = Produit::with('categorie', 'souscategorie')
            ->whereRaw('LOWER(REPLACE(nom, "-", "")) LIKE ?', ['%' . $normalizedQuery . '%'])
            ->get();

        return Inertia::render('Recherche/Resultats', [
            'produits' => $produits,
            'query' => $request->input('q') // on garde la requête d'origine pour l'affichage
        ]);
    }
}
