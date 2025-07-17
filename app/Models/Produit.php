<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Produit extends Model
{
    use HasFactory, Searchable;

    protected $table = 'produits';

    protected $fillable = [
        'nom',
        'description',
        'prix',
        'stock',
        'image_url',
        'id_subcategorie',
    ];

    // 🔍 Données à indexer dans Meilisearch
    public function toSearchableArray()
    {
        $this->loadMissing('souscategorie.categorie');

        return [
            'nom' => $this->nom,
            'description' => $this->description,
            'categorie' => $this->categorie ? $this->categorie->nom : null,
            'souscategorie' => $this->souscategorie ? $this->souscategorie->nom : null,
        ];
    }

    public function souscategorie()
    {
        return $this->belongsTo(Subcategorie::class, 'id_subcategorie');
    }

    public function categorie()
    {
        return $this->hasOneThrough(
            Categorie::class,
            Subcategorie::class,
            'id',              // Foreign key on Subcategorie table...
            'id',              // Foreign key on Categorie table...
            'id_subcategorie', // Local key on Produit table...
            'id_categorie'     // Local key on Subcategorie table...
        );
    }

    // ===== RELATIONS POUR LE PANIER (CORRIGÉES) =====

    /**
     * Relation many-to-many avec les paniers (CORRIGÉE)
     */
    public function paniers()
    {
        return $this->belongsToMany(Panier::class, 'panier_produit', 'id_produit', 'id_panier')
                    ->withPivot('quantite');
                    // Retiré ->withTimestamps() car la table n'a pas ces colonnes
    }

    /**
     * Vérifier si le produit est en stock
     */
    public function estEnStock($quantite = 1)
    {
        return $this->stock >= $quantite;
    }

    /**
     * Réduire le stock
     */
    public function reduireStock($quantite)
    {
        if ($this->estEnStock($quantite)) {
            $this->decrement('stock', $quantite);
            return true;
        }
        return false;
    }

    /**
     * Augmenter le stock
     */
    public function augmenterStock($quantite)
    {
        $this->increment('stock', $quantite);
    }
}