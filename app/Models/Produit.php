<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    protected $table = 'produits';

    protected $fillable = [
        'nom',
        'description',
        'prix',
        'stock',
        'image_url',
        'id_subcategorie',
    ];

    // 🔗 Relation avec la sous-catégorie
    public function souscategorie()
    {
        return $this->belongsTo(Subcategorie::class, 'id_subcategorie');
    }

    // 🔗 Relation avec la catégorie via la sous-catégorie
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
}
