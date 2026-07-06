<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Filiere;
use App\Models\Classe;

class ProgramsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = [
            [
                'id' => '1',
                'specialty' => 'Ressources Humaines',
                'school' => 'Management & IT',
                'level' => 'Master',
                'code' => 'ME-RH',
            ],
            [
                'id' => '2',
                'specialty' => 'Marketing Digital & E-Commerce',
                'school' => 'Management & IT',
                'level' => 'Bachelor',
                'code' => 'BD-MKT',
            ],
            [
                'id' => '3',
                'specialty' => 'Management & Stratégies Touristiques',
                'school' => 'Hôtellerie & Tourisme',
                'level' => 'Master',
                'code' => 'MT-TOUR',
            ],
            [
                'id' => '4',
                'specialty' => 'Développement Informatique',
                'school' => 'Management & IT',
                'level' => 'Téchnicien Spécialisé',
                'code' => 'TS-DEV',
            ],
        ];

        foreach ($programs as $prog) {
            $filiere = Filiere::updateOrCreate(
                ['code' => $prog['code']],
                [
                    'name' => $prog['specialty'],
                    'school' => $prog['school'],
                    'is_active' => true,
                ]
            );

            Classe::updateOrCreate(
                ['external_id' => $prog['id']],
                [
                    'filiere_id' => $filiere->id,
                    'name' => $prog['specialty'] . ' - ' . $prog['level'],
                    'level' => $prog['level'],
                    'academic_year' => '2024-2025',
                    'capacity' => 50,
                ]
            );
        }
    }
}
