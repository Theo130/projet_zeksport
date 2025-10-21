<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    use HasFactory;

    protected $table = 'paniers';
    
    protected $fillable = [
        'id_utilisateur',
    ];

    public $timestamps = false;

    /**
     * Relation avec l'utilisateur
     */
    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'id_utilisateur');
    }

    /**
     * Relation avec les articles du panier
     */
    public function articles()
    {
        return $this->hasMany(PanierProduit::class, 'id_panier');
    }

    /**
     * Relation many-to-many avec les produits 
     */
    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'panier_produit', 'id_panier', 'id_produit')
                    ->withPivot('quantite');
                    // Retiré ->withTimestamps() car la table n'a pas ces colonnes
    }

    /**
     * Calculer le total du panier
     */
    public function getTotal()
    {
        return $this->produits->sum(function ($produit) {
            return $produit->prix * $produit->pivot->quantite;
        });
    }

    /**
     * Calculer le nombre d'articles dans le panier
     */
    public function getNombreArticles()
    {
        return $this->produits->sum('pivot.quantite');
    }

    /**
     * Créer ou récupérer le panier d'un utilisateur
     */
    public static function obtenirPourUtilisateur($userId)
    {
        return static::firstOrCreate(['id_utilisateur' => $userId]);
    }
}