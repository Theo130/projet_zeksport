<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * afficher la page d'accueil
     */
    public function index()
    {
        // recup les produits mis en avant pour meilleures ventes
        $produitsRecents = Produit::with('categorie', 'subcategorie')
            ->where('mise_en_avant', true) 
            ->orderBy('id', 'desc')
            ->take(8)
            ->get();

        return Inertia::render('Home', [
            'produitsRecents' => $produitsRecents
        ]);
    }
}