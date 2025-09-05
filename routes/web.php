<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\RechercheController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;

// ===============================================
// ROUTES EXISTANTES (conservées exactement comme tu les avais)
// ===============================================

// Afficher resultat qd je recherche un truc
Route::get('/recherche/resultats', [RechercheController::class, 'resultats']);

// Pour quand je clique sur produit dans barre de recherche
Route::get('/produits/detail/{id}', [ProduitController::class, 'show']);

Route::get('/produit/{id}', [ProduitController::class, 'show']);
Route::get('/produits/{categorie}/{souscategorie}', [ProduitController::class, 'index']);
Route::get('/recherche', [RechercheController::class, 'index']);

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/panier', function () {
    return Inertia::render('Panier');
})->name('panier.jsx');

Route::get('/admin', function () {
    return Inertia::render('Admin');
})->middleware(['auth'])->name('admin');

// Routes d'authentification
Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return redirect()->route('connexion');
    })->name('login');
    
    // Page de connexion/inscription 
    Route::get('/connexion', [AuthController::class, 'showConnexion'])->name('connexion');
    
    Route::get('/connexioninscription', function () {
        return redirect()->route('connexion');
    })->name('connexioninscription.jsx');
    
    // Page d'inscription 
    Route::get('/inscription', [AuthController::class, 'showInscription'])->name('inscription');
    
    // Traitement de l'inscription
  Route::post('/inscription', [AuthController::class, 'inscription'])->name('inscription.store');
    
    // Traitement de la connexion
    Route::post('/connexion', [AuthController::class, 'connexion'])->name('connexion.store');
});

// Routes pour utilisateurs connectés
Route::middleware('auth')->group(function () {
    // Déconnexion
    Route::post('/deconnexion', [AuthController::class, 'deconnexion'])->name('deconnexion');
    
    // Dashboard
    Route::get('/mon-compte', function () {
        return Inertia::render('Dashboard', [
            'user' => auth()->user()
        ]);
    })->name('dashboard');
});

use App\Http\Controllers\PanierController;

// Routes panier pour utilisateurs connectés
Route::middleware('auth')->group(function () {
    // Afficher le panier
    Route::get('/panier', [PanierController::class, 'index'])->name('panier.index');
    
    // Ajouter un produit au panier
    Route::post('/panier/ajouter', [PanierController::class, 'ajouter'])->name('panier.ajouter');
    
    // Supprimer un produit du panier
    Route::delete('/panier/supprimer', [PanierController::class, 'supprimer'])->name('panier.supprimer');
    
    // Modifier la quantité dun produit
    Route::patch('/panier/quantite', [PanierController::class, 'modifierQuantite'])->name('panier.quantite');
    
    // Vider le panier
    Route::delete('/panier/vider', [PanierController::class, 'vider'])->name('panier.vider');
    
    // API pour obtenir le nombre d'articles (pour la navbar)
    Route::get('/api/panier/nombre', [PanierController::class, 'nombreArticles'])->name('panier.nombre');
});