<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\RechercheController;


// pour afficher resultat qd je recherche un truc
Route::get('/recherche/resultats', [RechercheController::class, 'resultats']);
// pour quand je clique sur produit dans barre de recherche
Route::get('/produits/detail/{id}', [ProduitController::class, 'show']);


Route::get('/produit/{id}', [ProduitController::class, 'show']);
Route::get('/produits/{categorie}/{souscategorie}', [ProduitController::class, 'index']);
Route::get('/recherche', [RechercheController::class, 'index']);


Route::get('/', function () {
    return Inertia::render('Home');
})->name('home.jsx');

// Route::get('/home', function () {
//     return Inertia::render('Home');
// })->name('home.jsx');


Route::get('/inscription', function () {
    return Inertia::render('Inscription');
})->name('Inscription.jsx');


Route::get('/connexioninscription', function () {
    return Inertia::render('ConnexionInscription');
})->name('connexioninscription.jsx');

Route::get('/panier', function () {
    return Inertia::render('Panier');
})->name('panier.jsx');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
