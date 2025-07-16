<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AuthController extends Controller
{
    /**
     * Afficher la page de connexion
     */
    public function showConnexion()
    {
        return Inertia::render('Auth/ConnexionInscription');
    }

    /**
     * Afficher la page d'inscription
     */
    public function showInscription()
    {
        return Inertia::render('Auth/Inscription');
    }

    /**
     * Traiter l'inscription
     */
    public function inscription(Request $request)
    {
        // Validation des données
        $validated = $request->validate([
            'prenom' => ['required', 'string', 'max:50'],
            'nom' => ['required', 'string', 'max:50'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:utilisateurs,email'],
            'telephone' => ['nullable', 'string', 'max:20'],
            'role' => ['required', 'in:client,admin'],
            'mot_de_passe' => [
                'required', 
                'confirmed', 
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
            ],
        ], [
            // Messages d'erreur personnalisés en français
            'prenom.required' => 'Le prénom est obligatoire.',
            'nom.required' => 'Le nom est obligatoire.',
            'email.required' => 'L\'adresse e-mail est obligatoire.',
            'email.email' => 'L\'adresse e-mail doit être valide.',
            'email.unique' => 'Cette adresse e-mail est déjà utilisée.',
            'role.required' => 'Le rôle est obligatoire.',
            'role.in' => 'Le rôle doit être client ou admin.',
            'mot_de_passe.required' => 'Le mot de passe est obligatoire.',
            'mot_de_passe.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
            'mot_de_passe.min' => 'Le mot de passe doit contenir au moins 8 caractères.',
        ]);

        try {
            // Créer l'utilisateur
            $user = User::create([
                'prenom' => $validated['prenom'],
                'nom' => $validated['nom'],
                'email' => $validated['email'],
                'telephone' => $validated['telephone'],
                'role' => $validated['role'],
                'mot_de_passe' => $validated['mot_de_passe'], // sera hashé automatiquement
            ]);

            // Connecter automatiquement l'utilisateur après inscription
            Auth::login($user);

            // Rediriger vers le dashboard avec message de succès
            return redirect()->route('dashboard')->with('success', 'Compte créé avec succès ! Bienvenue sur ZEK Sport.');

        } catch (\Exception $e) {
            // En cas d'erreur, retourner avec un message d'erreur
            return back()->withErrors([
                'general' => 'Une erreur est survenue lors de la création du compte. Veuillez réessayer.'
            ])->withInput();
        }
    }

    /**
     * Traiter la connexion
     */
    public function connexion(Request $request)
    {
        // Validation des données
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'mot_de_passe' => ['required'],
        ], [
            'email.required' => 'L\'adresse e-mail est obligatoire.',
            'email.email' => 'L\'adresse e-mail doit être valide.',
            'mot_de_passe.required' => 'Le mot de passe est obligatoire.',
        ]);

        // Tentative de connexion
        $user = User::where('email', $validated['email'])->first();

        if ($user && Hash::check($validated['mot_de_passe'], $user->mot_de_passe)) {
            // Connexion réussie
            Auth::login($user, $request->boolean('remember'));
            
            $request->session()->regenerate();

            // Rediriger vers la page prévue ou dashboard
            $intended = redirect()->intended(route('dashboard'));
            
            return $intended->with('success', 'Connexion réussie ! Bienvenue sur ZEK Sport.');
        }

        // Échec de la connexion
        return back()->withErrors([
            'email' => 'Ces identifiants ne correspondent à aucun compte.',
        ])->withInput($request->only('email'));
    }

    /**
     * Déconnexion
     */
    public function deconnexion(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // CORRECTION : Utiliser le nom de route correct 'home.jsx' au lieu de 'accueil'
        return redirect()->route('home.jsx')->with('success', 'Déconnexion réussie.');
    }
}