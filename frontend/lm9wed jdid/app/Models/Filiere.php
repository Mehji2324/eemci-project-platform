<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Filiere extends Model
{
    protected $fillable = [
        'nom',
        'niveau',
        'duree',
        'domaine',
        'ecole',
        'slug',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeNiveau(Builder $query, string $niveau): Builder
    {
        return $query->where('niveau', $niveau);
    }

    public function scopeDomaine(Builder $query, string $domaine): Builder
    {
        return $query->where('domaine', $domaine);
    }

    public function scopeEcole(Builder $query, string $ecole): Builder
    {
        return $query->where('ecole', $ecole);
    }
}
