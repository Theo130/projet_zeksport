<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\RechercheController;
use App\Http\Controllers\Auth\InscriptionController;
use App\Http\Controllers\Auth\ConnexionController;

Route::middleware('auth')->post('/deconnexion', [ConnexionController::class, 'logout'])->name('logout');


// ⚠️ Place-le tout en haut de ton fichier
Route::get('/connexioninscription', function () {
    return Inertia::render('Inscription');
})->name('login');

// Pages accessibles aux invités (non connectés)
Route::middleware('guest')->group(function () {
    // Affiche le composant React
    Route::inertia('/inscription', 'Inscription')->name('inscription');

    // Traite le formulaire
    Route::post('/inscription', [InscriptionController::class, 'store'])
        ->name('inscription.store');
});

// Exemple : zone protégée (tu peux changer l’URL)
Route::middleware('auth')->get('/dashboard', fn () => inertia('Dashboard'))
     ->name('dashboard');

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







use Illuminate\Support\Facades\Auth;

Route::get('/whoami', function () {
    if (Auth::check()) {
        return response()->json([
            'connecté' => true,
            'utilisateur' => Auth::user(),
        ]);
    } else {
        return response()->json([
            'connecté' => false,
            'utilisateur' => null,
        ]);
    }
});

Route::get('/whoami-page', function () {
    return Inertia::render('Whoami');
});