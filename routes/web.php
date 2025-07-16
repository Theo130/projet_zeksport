<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\RechercheController;
use App\Http\Controllers\AuthController;

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

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home.jsx');

Route::get('/panier', function () {
    return Inertia::render('Panier');
})->name('panier.jsx');

// ===============================================
// ROUTES D'AUTHENTIFICATION (nouvelles + corrections)
// ===============================================

// Routes d'authentification
Route::middleware('guest')->group(function () {
    // CORRECTION IMPORTANTE : Route login requise par Laravel (résout l'erreur 419)
    Route::get('/login', function () {
        return redirect()->route('connexion');
    })->name('login');
    
    // Page de connexion/inscription (nouvelle version)
    Route::get('/connexion', [AuthController::class, 'showConnexion'])->name('connexion');
    
    // Ton ancienne route connexioninscription (conservée pour compatibilité)
    Route::get('/connexioninscription', function () {
        return redirect()->route('connexion');
    })->name('connexioninscription.jsx');
    
    // Page d'inscription (nouvelle version)
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
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'user' => auth()->user()
        ]);
    })->name('dashboard');
});