<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * Le nom de la table dans la base de données
     */
    protected $table = 'utilisateurs';

    /**
     * Désactiver les timestamps automatiques car on a seulement date_creation
     */
    public $timestamps = false;

    /**
     * Les attributs qui sont assignables en masse.
     */
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'role',
        'mot_de_passe',
    ];

    /**
     * Les attributs qui doivent être cachés pour la sérialisation.
     */
    protected $hidden = [
        'mot_de_passe',
    ];

    /**
     * Les attributs qui doivent être castés.
     */
    protected $casts = [
        'date_creation' => 'datetime',
    ];

    /**
     * Le nom de la colonne de mot de passe pour l'authentification
     */
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

    /**
     * Retourner le nom de la colonne du mot de passe
     */
    public function getAuthPasswordName()
    {
        return 'mot_de_passe';
    }

    /**
     * Mutateur pour hasher automatiquement le mot de passe
     */
    public function setMotDePasseAttribute($value)
    {
        $this->attributes['mot_de_passe'] = Hash::make($value);
    }

    /**
     * verifier si l utilisateur est admin
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    /**
     * verifier si l utilisateur est client
     */
    public function isClient()
    {
        return $this->role === 'client';
    }

    /**
     * Nom complet de l'utilisateur
     */
    public function getNomCompletAttribute()
    {
        return $this->prenom . ' ' . $this->nom;
    }

    /**
     * Relation avec le panier
     */
    public function panier()
    {
        return $this->hasOne(Panier::class, 'id_utilisateur');
    }

    /**
     * Obtenir ou créer le panier de l'utilisateur
     */
    public function obtenirPanier()
    {
        return $this->panier()->firstOrCreate(['id_utilisateur' => $this->id]);
    }
}