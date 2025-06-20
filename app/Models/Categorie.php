<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = ['nom'];

    // Une catégorie a plusieurs sous-catégories
    public function subcategories()
    {
        return $this->hasMany(Subcategorie::class, 'id_categorie');
    }
}