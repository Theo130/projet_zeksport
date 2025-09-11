<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Afficher la page d'accueil
     */
    public function index()
    {
        // Récupérer les produits mis en avant pour "Meilleures ventes"
        $produitsRecents = Produit::with('categorie', 'subcategorie')
            ->where('mise_en_avant', true) // Seulement les produits mis en avant
            ->orderBy('id', 'desc')
            ->take(8)
            ->get();

        return Inertia::render('Home', [
            'produitsRecents' => $produitsRecents
        ]);
    }
}