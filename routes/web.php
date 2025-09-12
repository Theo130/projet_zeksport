<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\RechercheController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\AdminController; 
use App\Http\Controllers\AdminController2;



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

//Routes d'authentification
Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return redirect()->route('connexion');
    })->name('login');
    
    Route::get('/connexion', [AuthController::class, 'showConnexion'])->name('connexion');
    Route::get('/connexioninscription', function () {
        return redirect()->route('connexion');
    })->name('connexioninscription.jsx');
    Route::get('/inscription', [AuthController::class, 'showInscription'])->name('inscription');
    Route::post('/inscription', [AuthController::class, 'inscription'])->name('inscription.store');
    Route::post('/connexion', [AuthController::class, 'connexion'])->name('connexion.store');
});

//Routes pour utilisateurs connectés
Route::middleware('auth')->group(function () {
    //Déconnexion
    Route::post('/deconnexion', [AuthController::class, 'deconnexion'])->name('deconnexion');
    
    //Dashboard
    Route::get('/mon-compte', function () {
        return Inertia::render('Dashboard', [
            'user' => auth()->user()
        ]);
    })->name('dashboard');
    
    // ROUTE POUR LA MISE À JOUR DU PROFIL
    Route::put('/profile', [AuthController::class, 'updateProfile'])->name('profile.update');
});

// Routes panier pour utilisateurs connectés
Route::middleware('auth')->group(function () {
    Route::get('/panier', [PanierController::class, 'index'])->name('panier.index');
    Route::post('/panier/ajouter', [PanierController::class, 'ajouter'])->name('panier.ajouter');
    Route::delete('/panier/supprimer', [PanierController::class, 'supprimer'])->name('panier.supprimer');
    Route::patch('/panier/quantite', [PanierController::class, 'modifierQuantite'])->name('panier.quantite');
    Route::delete('/panier/vider', [PanierController::class, 'vider'])->name('panier.vider');
    Route::get('/api/panier/nombre', [PanierController::class, 'nombreArticles'])->name('panier.nombre');
});





// Routes d'administration pour les admins
Route::middleware(['auth'])->prefix('admin')->group(function () {
    // Gestion des produits
    Route::get('/produits', [AdminController::class, 'produits'])->name('admin.produits');
    Route::post('/produits', [AdminController::class, 'creerProduit'])->name('admin.produits.store');
    Route::put('/produits/{id}', [AdminController::class, 'modifierProduit'])->name('admin.produits.update');
    Route::delete('/produits/{id}', [AdminController::class, 'supprimerProduit'])->name('admin.produits.destroy');
});
//route pr utilisateurs
Route::middleware(['auth'])->prefix('admin')->group(function () {
    // routes utilisateurs avc AdminController2
    Route::get('/utilisateurs', [AdminController2::class, 'index'])->name('admin2.utilisateurs');
    Route::put('/utilisateurs/{id}/role', [AdminController2::class, 'changerRole'])->name('admin2.changer-role');
    Route::delete('/utilisateurs/{id}', [AdminController2::class, 'supprimer'])->name('admin2.supprimer');
});