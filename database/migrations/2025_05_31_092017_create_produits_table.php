<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Produit extends Model
{
    use HasFactory, Searchable;

    protected $table = 'produits';
    
    // Désactiver les timestamps si vous ne les voulez pas
    public $timestamps = false;

    protected $fillable = [
        'nom',
        'description',
        'prix',
        'stock',
        'image_url',
        'id_categorie', // ← CHANGÉ pour correspondre à la migration
    ];

    protected $casts = [
        'prix' => 'decimal:2',
        'stock' => 'integer',
    ];

    // 🔍 Données à indexer dans Meilisearch
    public function toSearchableArray()
    {
        $this->loadMissing('categorie');

        return [
            'nom' => $this->nom,
            'description' => $this->description,
            'categorie' => $this->categorie ? $this->categorie->nom : null,
        ];
    }

    // Relation directe avec les catégories (selon votre migration)
    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'id_categorie');
    }

    // ===== RELATIONS POUR LE PANIER =====

    /**
     * Relation many-to-many avec les paniers
     */
    public function paniers()
    {
        return $this->belongsToMany(Panier::class, 'panier_produit', 'id_produit', 'id_panier')
                    ->withPivot('quantite');
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