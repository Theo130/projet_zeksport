<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * Le nom de la table dans la base de données
     */
    protected $table = 'utilisateurs';

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
        'remember_token',
    ];

    /**
     * Les attributs qui doivent être castés.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'date_creation' => 'datetime',
    ];

    /**
     * Le nom de la colonne de mot de passe
     */
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

    /**
     * Mutateur pour hasher automatiquement le mot de passe
     */
    public function setMotDePasseAttribute($value)
    {
        $this->attributes['mot_de_passe'] = bcrypt($value);
    }

    /**
     * Vérifier si l'utilisateur est admin
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    /**
     * Vérifier si l'utilisateur est client
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

    // ===== NOUVELLES RELATIONS POUR LE PANIER =====

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

    /**
     * Définir les timestamps personnalisés
     */
    const CREATED_AT = 'date_creation';
    const UPDATED_AT = null; // Si tu n'as pas de colonne updated_at
}