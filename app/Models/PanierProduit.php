<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PanierProduit extends Model
{
    use HasFactory;

    protected $table = 'panier_produit';
    
    protected $fillable = [
        'id_panier',
        'id_produit',
        'quantite',
    ];

    // IMPORTANT : Désactiver les timestamps car la table n'en a pas
    public $timestamps = false;

    /**
     * Relation avec le panier
     */
    public function panier()
    {
        return $this->belongsTo(Panier::class, 'id_panier');
    }

    /**
     * Relation avec le produit
     */
    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    }
}