<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Produit extends Model
{
    use HasFactory; 
    
    protected $table = 'produits';
    
    // j'ai desactivé pcq ma table na pas cette colone
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

   
    // Relations avec les catégories
    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'id_categorie');
    }

    public function subcategorie()
    {
        return $this->belongsTo(Subcategorie::class, 'id_subcategorie');
    }


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