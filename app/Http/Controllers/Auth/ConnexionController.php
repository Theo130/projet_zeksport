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
            return redirect()->intended('/');
        }

        // Échec de la connexion
        return back()->withErrors([
            'email' => 'Identifiants incorrects.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Déconnecté']);
    }
}
