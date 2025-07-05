<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /** ───────── Table & clés ───────── */
    protected $table      = 'utilisateurs';   // <- ta table MySQL
    protected $primaryKey = 'id';
    public    $incrementing = true;
    protected $keyType    = 'int';

    /** ───────── Timestamps ─────────── */
    public $timestamps = false;              // CHANGÉ : désactive complètement les timestamps automatiques
    // Ou si tu veux garder seulement created_at :
    // public $timestamps = true;
    // const CREATED_AT = 'date_creation';
    // const UPDATED_AT = null;

    /** ───────── Remplissage ────────── */
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'role',
        'mot_de_passe',
    ];

    /** ───────── JSON hidden ────────── */
    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    /** ───────── Méthodes d'authentification Laravel ─────────── */
    
    /**
     * AJOUTÉ : Indique à Laravel le nom du champ password dans la DB
     */
    public function getAuthPasswordName()
    {
        return 'mot_de_passe';
    }
    
    /**
     * Retourne le mot de passe pour l'authentification
     */
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

    /** ───────── Accesseurs optionnels ─────────── */
    
    /**
     * AJOUTÉ : Accesseur pour avoir le nom complet
     */
    public function getNomCompletAttribute()
    {
        return $this->prenom . ' ' . $this->nom;
    }
    
    /**
     * AJOUTÉ : Vérifier si l'utilisateur est admin
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }
}