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
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_commande')->constrained('commandes');
            $table->decimal('montant', 10, 2);
            $table->timestamp('date_paiement')->useCurrent();
            $table->enum('moyen_paiement', ['Carte', 'PayPal', 'Autre']);
            $table->enum('statut', ['réussi', 'échoué', 'en attente'])->default('en attente');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
