<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * L'attribut root view pour les requêtes Inertia (souvent app.blade.php)
     */
    protected $rootView = 'app';

    /**
     * Détermine si l'utilisateur actuel peut accéder à Inertia DevTools.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Partage les props globales avec toutes les vues Inertia.
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [

            // ✅ Partage l'utilisateur connecté avec plus d'infos
            'auth' => [
                'user' => $request->user() ? [
                    'id'     => $request->user()->id,
                    'nom'    => $request->user()->nom,
                    'prenom' => $request->user()->prenom,
                    'email'  => $request->user()->email,
                    'role'   => $request->user()->role,
                    'telephone' => $request->user()->telephone, // AJOUTÉ
                    'nom_complet' => $request->user()->prenom . ' ' . $request->user()->nom, // AJOUTÉ
                    'is_admin' => $request->user()->role === 'admin', // AJOUTÉ
                ] : null,
            ],

            // ✅ AMÉLIORÉ : Messages flash avec gestion des erreurs de validation
            'flash' => [
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
                'info'    => $request->session()->get('info'),
                'warning' => $request->session()->get('warning'),
            ],
            
            // ✅ AJOUTÉ : Erreurs de validation (pour les formulaires)
            'errors' => function () use ($request) {
                return $request->session()->get('errors') 
                    ? $request->session()->get('errors')->getBag('default')->getMessages()
                    : (object) [];
            },
        ]);
    }
}