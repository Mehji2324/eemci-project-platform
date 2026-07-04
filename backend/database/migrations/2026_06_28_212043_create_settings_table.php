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
        Schema::create('settings', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->string('group')->index();
            $blueprint->string('key')->unique();
            $blueprint->text('value')->nullable();
            $blueprint->string('type')->default('string');
            $blueprint->boolean('is_public')->default(false);
            $blueprint->boolean('is_secret')->default(false);
            $blueprint->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
