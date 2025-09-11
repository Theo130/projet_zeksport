<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Laravel\Scout\Searchable; // ← COMMENTÉ pour désactiver Meilisearch

class Produit extends Model
{
    use HasFactory; // ← Retirer Searchable
    // use Searchable; // ← COMMENTÉ

    protected $table = 'produits';
    
    // Désactiver les timestamps car votre table n'en a pas
    public $timestamps = false;

    protected $fillable = [
        'nom',
        'description',
        'prix',
        'stock',
        'image_url',
        'id_categorie',
        'id_subcategorie', // Ajouter cette ligne car elle existe dans votre table
    ];

    protected $casts = [
        'prix' => 'decimal:2',
        'stock' => 'integer',
    ];

    // Commenter temporairement toute la fonction Meilisearch
    /*
    public function toSearchableArray()
    {
        $this->loadMissing(['categorie', 'subcategorie']);

        return [
            'nom' => $this->nom,
            'description' => $this->description,
            'categorie' => $this->categorie ? $this->categorie->nom : null,
            'subcategorie' => $this->subcategorie ? $this->subcategorie->nom : null,
        ];
    }
    */

    // Relations avec les catégories
    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'id_categorie');
    }

    public function subcategorie()
    {
        return $this->belongsTo(Subcategorie::class, 'id_subcategorie');
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