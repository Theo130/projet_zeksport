<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConnexionController extends Controller
{
    public function login(Request $request)
    {
        // Validation des champs
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'mot_de_passe' => ['required'],
        ]);

        // Tentative de connexion (Laravel attend 'password' ici !)
        if (Auth::attempt([
            'email' => $credentials['email'],
            'password' => $credentials['mot_de_passe'], // ✅ correspond à getAuthPassword()
        ])) {
            $request->session()->regenerate();
            
            // AMÉLIORÉ : Message de succès et redirection intelligente
            return redirect()->intended(route('dashboard'))
                ->with('success', 'Connexion réussie ! Bon retour sur ZEK Sport.');
        }

        // AMÉLIORÉ : Gestion d'erreur plus claire
        return back()->withErrors([
            'email' => 'Ces identifiants ne correspondent à aucun compte.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // AMÉLIORÉ : Redirection vers l'accueil avec message
        return redirect()->route('home')
            ->with('success', 'Vous avez été déconnecté(e) avec succès.');
    }
}