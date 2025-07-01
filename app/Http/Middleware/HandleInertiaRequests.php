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

            // ✅ Partage l'utilisateur connecté
            'auth' => [
                'user' => $request->user() ? [
                    'id'     => $request->user()->id,
                    'nom'    => $request->user()->nom,
                    'prenom' => $request->user()->prenom,
                    'email'  => $request->user()->email,
                    'role'   => $request->user()->role,
                ] : null,
            ],

            // ✅ Tu peux aussi partager des flashs ici si besoin :
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
            ],
        ]);
    }
}
