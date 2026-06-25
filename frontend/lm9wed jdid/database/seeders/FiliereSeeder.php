<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class FiliereSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $filieres = collect([
            ['nom' => "Action Commerciale et Marketing", 'niveau' => "Technicien", 'duree' => "2 ans", 'domaine' => "Commerce", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Administration des réseaux Informatiques", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Audit, comptabilité et contrôle de gestion", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Finance & Comptabilité", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Banque et assurance", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Finance & Comptabilité", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Big data, business analytics et aide à la décision", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Commerce International (Bachelor)", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Commerce", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Commerce International (Technicien Spécialisé)", 'niveau' => "Technicien Spécialisé", 'duree' => "2 ans", 'domaine' => "Commerce", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Commerce international et logistique", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Commerce", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Communication Touristique et Événementielle", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Comptabilité, Audit Et Contrôle De Gestion", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Finance & Comptabilité", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Cybersécurité et protection des systèmes d'information", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Développement des applications mobiles", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Développement et aménagement touristique durable", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Développement et innovation touristiques", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Développement Informatique", 'niveau' => "Technicien Spécialisé", 'duree' => "2 ans", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Développeur Web", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Economie internationale et mondialisation", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Commerce", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Entrepreneuriat et stratégies des entreprises touristiques", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Entrepreneuriat Hôtelier Et Touristique", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Tourisme & Hôtellerie", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Expert IT – Applications Intelligentes Et Big Data", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Expert IT – Cybersécurité Et Haute Disponibilité", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Finance d'entreprises et ingénierie financière", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Finance & Comptabilité", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Finance de marché, banque et assurance", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Finance & Comptabilité", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Finance et contrôle de gestion", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Finance & Comptabilité", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Finance, contrôle et performance des entreprises hôtelières", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Hôtellerie", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Financier Comptable", 'niveau' => "Technicien Spécialisé", 'duree' => "2 ans", 'domaine' => "Finance & Comptabilité", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Génie logiciel et ingénierie des systèmes", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Géographie et aménagement des destinations touristiques", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Gestion des Activités Touristiques", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Gestion des Entreprises", 'niveau' => "Technicien Spécialisé", 'duree' => "2 ans", 'domaine' => "Management", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Gestion des Ressources Humaines", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Management", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Gestion des Services d'Hospitalité", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Hôtellerie", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Gestion du patrimoine", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Finance & Comptabilité", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Gestion Hôtelière", 'niveau' => "Technicien Spécialisé", 'duree' => "2 ans", 'domaine' => "Hôtellerie", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Gestion Informatisée", 'niveau' => "Technicien", 'duree' => "2 ans", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Gestion opérationnelle en hôtellerie-restauration", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Hôtellerie", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Innovation et transformation digitale de l'hôtellerie", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Hôtellerie", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Intelligence Artificielle approfondie", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Intelligence artificielle et science des données", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Juriste D'Entreprise", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Droit", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Logistique", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Logistique & Transport", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Management de l'innovation et entrepreneuriat", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Management", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Management des organisations et conduite du changement", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Management", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Management des PME", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Management", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Management Des Ressources Humaines", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Management", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Management des Ressources Humaines et développement des compétences", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Management", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Management Digital", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Management", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Management En Commerce International", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Commerce", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Management Et Stratégies D'Entreprises", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Management", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Management Et Stratégies Financières", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Finance & Comptabilité", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Management Et Stratégies Touristiques", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Management Hôtelier Et Évènementiel", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Hôtellerie", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Management Hôtelier et Restauration", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Hôtellerie", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Management Hôtelier et Touristique", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Tourisme & Hôtellerie", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Management industriel", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Management", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Management international et interculturel", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Management", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Management public et des politiques organisationnelles", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Management", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Management Stratégique Et Financier Des Organisations", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Finance & Comptabilité", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Management stratégique et gouvernance des organisations", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Management", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Marketing digital", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Marketing", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Marketing digital et e-business", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Marketing", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Marketing international", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Marketing", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Marketing stratégique et comportement du consommateur", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Marketing", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Patrimoine, identité et tourisme", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Pilotage Des Systèmes D'Information", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Psychologie du tourisme et de l'expérience", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Qualité, expérience client et excellence de service", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Hôtellerie", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Qualité, Expérience Client Et Hospitalité De Luxe", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Hôtellerie", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Réception d'Hôtel", 'niveau' => "Technicien", 'duree' => "2 ans", 'domaine' => "Hôtellerie", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Réseaux, télécommunication et cloud computing", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Revenue Management Et Performance Hôtelière", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Hôtellerie", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Sciences du tourisme", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Sécurité Informatique", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Sociologie et anthropologie du tourisme", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Supervision et Exploitation Hôtelière", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Hôtellerie", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Systèmes d'Information et Transformation Digitale", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Systèmes et Réseaux Informatiques", 'niveau' => "Technicien Spécialisé", 'duree' => "2 ans", 'domaine' => "Informatique", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Tourisme Culturel Et Patrimonial", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Tourisme culturel, patrimonial et créatif", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Tourisme durable et responsable", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Tourisme International Et Mobilités (Master)", 'niveau' => "Master", 'duree' => "2 ans", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Tourisme international et mobilités (Doctorat)", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Tourisme rural, écotourisme et tourisme communautaire", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Tourisme", 'ecole' => "Tourisme & Hôtellerie"],
            ['nom' => "Transport, logistique et supply chain (Bachelor)", 'niveau' => "Bachelor", 'duree' => "1 an", 'domaine' => "Logistique & Transport", 'ecole' => "Commerce, Management & IT"],
            ['nom' => "Transport, logistique et supply chain (Doctorat)", 'niveau' => "Doctorat", 'duree' => "3 ans", 'domaine' => "Logistique & Transport", 'ecole' => "Commerce, Management & IT"],
        ])->map(function (array $filiere) use ($now) {
            $filiere['slug'] = Str::slug($filiere['nom'].' '.$filiere['niveau']);
            $filiere['is_active'] = true;
            $filiere['created_at'] = $now;
            $filiere['updated_at'] = $now;

            return $filiere;
        })->all();

        DB::table('filieres')->upsert(
            $filieres,
            ['slug'],
            ['nom', 'niveau', 'duree', 'domaine', 'ecole', 'is_active', 'updated_at']
        );
    }
}
