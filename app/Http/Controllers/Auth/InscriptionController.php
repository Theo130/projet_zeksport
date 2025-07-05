<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class InscriptionController extends Controller
{
    public function store(Request $request)
    {
        /* -------- Validation -------- */
        $validated = $request->validate([
            'prenom'       => ['required', 'string', 'max:191'],
            'nom'          => ['required', 'string', 'max:191'],
            'email'        => ['required', 'email', 'max:191', 'unique:utilisateurs,email'],
            'telephone'    => ['nullable', 'string', 'max:191'],
            'role'         => ['nullable', 'in:admin,client'], // CHANGÉ : nullable
            'mot_de_passe' => ['required', 'confirmed', Password::min(8)->numbers()],
        ]);

        /* -------- Création -------- */
        $user = User::create([
            'prenom'       => $validated['prenom'],
            'nom'          => $validated['nom'],
            'email'        => $validated['email'],
            'telephone'    => $validated['telephone'] ?? null,
            'role'         => $validated['role'] ?? 'client', // CHANGÉ : défaut à 'client'
            'mot_de_passe' => Hash::make($validated['mot_de_passe']),
        ]);

        /* -------- Connexion automatique -------- */
        Auth::login($user);

        /* -------- Redirection avec message de succès -------- */
        return redirect()->route('dashboard')->with('success', 'Compte créé avec succès ! Bienvenue sur ZEK Sport.');
    }
}