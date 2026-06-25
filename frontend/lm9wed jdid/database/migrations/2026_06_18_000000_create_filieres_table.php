<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('filieres', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->enum('niveau', [
                'Technicien',
                'Technicien Spécialisé',
                'Bachelor',
                'Master',
                'Doctorat',
            ]);
            $table->string('duree');
            $table->string('domaine');
            $table->enum('ecole', [
                'Commerce, Management & IT',
                'Tourisme & Hôtellerie',
            ]);
            $table->string('slug')->unique();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('niveau');
            $table->index('domaine');
            $table->index('ecole');
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('filieres');
    }
};
