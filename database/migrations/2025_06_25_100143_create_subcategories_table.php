<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
  public function up()
{
    Schema::create('subcategories', function (Blueprint $table) {
        $table->id();
        $table->string('nom');
        $table->unsignedBigInteger('id_categorie');
        $table->timestamps();

        // Clé étrangère vers la table categories
        $table->foreign('id_categorie')->references('id')->on('categories')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subcategories');
    }
};
