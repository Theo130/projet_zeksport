<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategorie extends Model
{
    use HasFactory;

    protected $table = 'subcategories';

    protected $fillable = ['nom', 'id_categorie'];

    // Une sous-catégorie appartient à une catégorie
    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'id_categorie');
    }

    // Une sous-catégorie a plusieurs produits
    public function produits()
    {
        return $this->hasMany(Produit::class, 'id_subcategorie');
    }
}
