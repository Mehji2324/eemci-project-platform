export type DegreeLevel = 'Téchnicien' | 'Téchnicien Spécialisé' | 'Bachelor' | 'Master' | 'Doctorat' | 'Certification';
export type School = 'Management & IT' | 'Hôtellerie & Tourisme';

export interface Program {
  id: string;
  slug: string;
  title: string;
  school: School;
  level: DegreeLevel;
  duration: string; // e.g., "2 ans", "3 ans"
  language: 'Français' | 'Anglais' | 'Bilingue';
  description: string;
  image: string;
  accredited: boolean;
  featured?: boolean;
  curriculum: {
    semester: string;
    modules: string[];
  }[];
  careers: string[];
  admissionRequirements: string[];
  tuition: {
    inscription: number;
    annual: number;
  };
}

export const PROGRAMS: Program[] = [
  {
    id: '1',
    slug: 'master-rh',
    title: 'Master Européen en Management des Ressources Humaines',
    school: 'Management & IT',
    level: 'Master',
    duration: '2 ans',
    language: 'Français',
    description: 'Devenez un expert stratégique en gestion du capital humain, capable de piloter le changement dans des environnements complexes.',
    image: '/program-hr.png',
    accredited: true,
    featured: true,
    curriculum: [
      { semester: 'Semestre 1', modules: ['Stratégie RH', 'Droit du travail approfondi', 'Psychologie des organisations'] },
      { semester: 'Semestre 2', modules: ['Gestion de la paie', 'Recrutement 2.0', 'Relations sociales'] }
    ],
    careers: ['Directeur des Ressources Humaines', 'Responsable de Formation', 'Consultant RH'],
    admissionRequirements: ['Bac+3 en Management ou équivalent', 'Entretien de motivation', 'Test de français'],
    tuition: { inscription: 5000, annual: 35000 }
  },
  {
    id: '2',
    slug: 'bachelor-marketing-digital',
    title: 'Bachelor en Marketing Digital & E-Commerce',
    school: 'Management & IT',
    level: 'Bachelor',
    duration: '3 ans',
    language: 'Bilingue',
    description: 'Maîtrisez les outils du digital, du SEO aux réseaux sociaux, pour propulser les entreprises dans l\'ère numérique.',
    image: '/program-marketing.png',
    accredited: true,
    curriculum: [
      { semester: 'Année 1', modules: ['Fondamentaux du marketing', 'Outils PAO', 'Économie numérique'] },
      { semester: 'Année 2', modules: ['SEO/SEA', 'Content Strategy', 'Web Analytics'] }
    ],
    careers: ['Social Media Manager', 'Responsable E-commerce', 'Traffic Manager'],
    admissionRequirements: ['Baccalauréat toutes séries', 'Entretien'],
    tuition: { inscription: 4000, annual: 28000 }
  },
  {
    id: '3',
    slug: 'master-management-touristique',
    title: 'Master en Management & Stratégies Touristiques',
    school: 'Hôtellerie & Tourisme',
    level: 'Master',
    duration: '2 ans',
    language: 'Français',
    description: 'Préparez-vous aux postes de direction dans l\'industrie mondiale du voyage et de l\'hospitalité.',
    image: '/hospitality-ai.png',
    accredited: true,
    featured: true,
    curriculum: [
      { semester: 'Semestre 1', modules: ['Économie du tourisme', 'Management hôtelier', 'Marketing territorial'] }
    ],
    careers: ['Directeur d\'hôtel', 'Manager d\'agence de voyage', 'Consultant en développement touristique'],
    admissionRequirements: ['Bac+3 en Tourisme ou Gestion', 'Anglais courant'],
    tuition: { inscription: 5000, annual: 32000 }
  },
  {
    id: '4',
    slug: 'ts-informatique',
    title: 'Technicien Spécialisé en Développement Informatique',
    school: 'Management & IT',
    level: 'Téchnicien Spécialisé',
    duration: '2 ans',
    language: 'Français',
    description: 'Maîtrisez le cycle de vie complet du développement logiciel et des applications web.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    accredited: true,
    curriculum: [
      { semester: 'Semestre 1', modules: ['Algorithmique', 'Bases de données', 'HTML/CSS'] }
    ],
    careers: ['Développeur Web Fullstack', 'Analyste Programmeur'],
    admissionRequirements: ['Baccalauréat scientifique ou technique'],
    tuition: { inscription: 3000, annual: 22000 }
  }
];
