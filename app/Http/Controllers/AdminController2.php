<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class AdminController2 extends Controller
{
    /**
     * Afficher la liste des utilisateurs
     */
    public function index()
    {
        $utilisateurs = User::orderBy('date_creation', 'desc')->get();

        return Inertia::render('Admin/Utilisateurs', [
            'utilisateurs' => $utilisateurs
        ]);
    }

    /**
     * Changer le rôle d'un utilisateur
     */
    public function changerRole(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        // Empêcher la modification de son propre rôle
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'Vous ne pouvez pas modifier votre propre rôle!');
        }
        
        $validated = $request->validate([
            'role' => 'required|in:admin,client'
        ]);

        $user->update($validated);

        return redirect()->back()->with('success', 'Rôle modifié avec succès!');
    }

    /**
     * Supprimer un utilisateur
     */
    public function supprimer($id)
    {
        $user = User::findOrFail($id);
        
        // Empêcher la suppression de son propre compte
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'Vous ne pouvez pas supprimer votre propre compte!');
        }

        $nom = $user->prenom . ' ' . $user->nom;
        $user->delete();

        return redirect()->back()->with('success', "Utilisateur \"$nom\" supprimé avec succès!");
    }
}