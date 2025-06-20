<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProduitController;


Route::get('/produit/{id}', [ProduitController::class, 'show']);
Route::get('/produits/{categorie}/{souscategorie}', [ProduitController::class, 'index']);



// Route::get('/test-db', function () {
//     try {
//         DB::connection()->getPdo();
//         return 'Connexion réussie à la base de données: ' . DB::connection()->getDatabaseName();
//     } catch (\Exception $e) {
//         return 'Erreur de connexion : ' . $e->getMessage();
//     }
// });


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/home', function () {
    return Inertia::render('Home');
})->name('home.jsx');

Route::get('/connexioninscription', function () {
    return Inertia::render('ConnexionInscription');
})->name('connexionInscription.jsx');

Route::get('/panier', function () {
    return Inertia::render('Panier');
})->name('panier.jsx');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
