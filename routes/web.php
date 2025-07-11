<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\RechercheController;
// use App\Http\Controllers\Auth\InscriptionController;
// use App\Http\Controllers\Auth\ConnexionController;












Route::get('/connexioninscription', function () {
    return Inertia::render('Inscription');
})->name('login');








 //afficher resultat qd je recherche un truc
Route::get('/recherche/resultats', [RechercheController::class, 'resultats']);
// pour quand je clique sur produit dans barre de recherche
Route::get('/produits/detail/{id}', [ProduitController::class, 'show']);


Route::get('/produit/{id}', [ProduitController::class, 'show']);
Route::get('/produits/{categorie}/{souscategorie}', [ProduitController::class, 'index']);
Route::get('/recherche', [RechercheController::class, 'index']);


Route::get('/', function () {
    return Inertia::render('Home');
})->name('home.jsx');



Route::get('/inscription', function () {
    return Inertia::render('Inscription');
})->name('Inscription.jsx');


Route::get('/connexioninscription', function () {
    return Inertia::render('ConnexionInscription');
})->name('connexioninscription.jsx');

Route::get('/panier', function () {
    return Inertia::render('Panier');
})->name('panier.jsx');













