<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('panier_produit', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_panier')->constrained('paniers');
            $table->foreignId('id_produit')->constrained('produits');
            $table->integer('quantite');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('panier_produits');
    }
};
