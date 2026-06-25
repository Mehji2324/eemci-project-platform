export const SITE = {
  name: 'EEMCI',
  fullName: 'École Européenne de Management, Commerce & IT et d\'Hôtellerie & Tourisme',
  tagline: 'De Meknès au monde — votre diplôme franco-marocain d\'excellence.',
  city: 'Meknès, Maroc',
  director: 'Dr. Ahmed Sbaïbi',
  levels: 'Bac → Bac+8',
  doubleDegree: 'Maroc + France',
  phone: '0535400417',
  phone2: '0661319276',
  phone3: '0661822936',
  phone4: '0661963888',
  whatsapp: '212661337841',
  email: 'contact@eemci.ma',
  address: 'Rue Accra, Imm 14, Ville Nouvelle, Meknès 50000, Maroc (En face hôtel Nice)',
  addressUrl: 'https://maps.app.goo.gl/H67wTNyMkyUZpjdH6',
  gps: { lat: 33.8989936, lng: -5.5494582 },
  facebook: 'https://web.facebook.com/EEMCI.OFFICIEL',
  instagram: 'https://www.instagram.com/eemcimeknes/',
  founded: 2011
};

export const OPENING_HOURS = [
  { day: 'Lundi – Vendredi', hours: '8h30–12h30 / 14h30–19h15' },
  { day: 'Samedi', hours: '9h00–12h30 / 14h30–18h30' },
  { day: 'Dimanche', hours: '10h00–13h00' },
];

export const STATS = [
  { value: 14, suffix: '+', label: 'Années d\'expérience', sub: 'Depuis 2011' },
  { value: 2,  suffix: '',  label: 'Écoles d\'excellence',  sub: 'Management & Hôtellerie' },
  { value: 25, suffix: '+', label: 'Programmes diplômants', sub: 'Bac à Bac+8' },
  { value: 1200,suffix:'+', label: 'Diplômés actifs',       sub: 'Au Maroc & à l\'international' }
];

export const PILLARS = [
  { icon: 'Award',     title: 'Double diplôme FR-MA',     text: 'Diplômes accrédités par l\'État marocain et reconnus en France via nos partenaires européens.' },
  { icon: 'Briefcase', title: 'Pédagogie pratique',        text: 'Enseignants professionnels du terrain, projets réels et stages encadrés.' },
  { icon: 'Globe2',    title: 'Réseau européen',           text: 'FEDE, WES\'SUP et institutions partenaires garantissent une mobilité internationale.' },
  { icon: 'Users',     title: 'Suivi personnalisé',        text: 'Accompagnement individuel de l\'inscription jusqu\'à l\'insertion professionnelle.' },
  { icon: 'MapPin',    title: 'Campus en ville nouvelle',  text: 'Salles équipées pour le travail collaboratif et la pratique professionnelle.' },
  { icon: 'TrendingUp',title: 'Insertion professionnelle', text: 'Plus de 90 % de nos diplômés en activité dans les 6 mois.' }
];

export const CORE_VALUES = [
  'Excellence Accréditée',
  'Ouverture Mondiale',
  'Proximité & Expertise',
  'Diversité & Partage',
];

export const HISTORY = [
  { year: '2011', event: 'Fondation à Meknès' },
  { year: '2013–2015', event: 'Accréditation État Marocain' },
  { year: '2015–2016', event: 'Partenariats européens FEDE et MIIB\'S, double diplôme Maroc + France' },
  { year: '2018', event: 'Alliances Adecco, DEKRA, APTIV et Journée Panafricaine' },
  { year: '2030', event: 'Vision : référence africaine en Management, Commerce & IT' },
];

export const SITEMAP = [
  { label: 'Accueil', url: '/' },
  { label: 'À Propos', url: '/about' },
  { label: 'École Management & IT', url: '/schools' },
  { label: 'École Hôtellerie & Tourisme', url: '/schools' },
  { label: 'Toutes les formations', url: '/programs' },
  { label: 'Contact', url: '/contact' },
  { label: 'Pré-inscription', url: '/admissions/apply' },
];

export const SCHOOLS = [
  {
    slug: 'management-commerce-it',
    name: 'École de Management, Commerce & IT',
    color: 'primary',
    image: '/management-ai.png',
    short: 'Management, Finance, Marketing, Ressources Humaines, Commerce International et Informatique.',
    bullets: ['Bachelor Européen','Master Européen','Doctorat Européen','Classes Préparatoires']
  },
  {
    slug: 'hospitality-tourism',
    name: 'École d\'Hôtellerie & Tourisme',
    color: 'emerald2',
    image: '/hospitality-ai.png',
    short: 'Formez-vous aux métiers du tourisme, de l\'hôtellerie et du management hôtelier international.',
    bullets: ['Management Hôtelier','Tourisme Culturel','Stratégies Touristiques','Gestion d\'établissement']
  }
];

export type Program = {
  slug: string;
  title: string;
  school: 'management-commerce-it' | 'hospitality-tourism';
  level: 'Bac' | 'Bac+2' | 'Bac+3' | 'Bac+5' | 'Bac+8';
  domain: string;
  duration: string;
  tuition: string;
  summary: string;
  careers: string[];
  curriculum: { semester: string; courses: string[] }[];
};

export const PROGRAMS: Program[] = [
  // ── ÉCOLE MANAGEMENT, COMMERCE & IT ────────────────────────────────────────
  {
    slug: 'technicien-gestion',
    title: 'Technicien — Gestion & Commerce',
    school: 'management-commerce-it',
    level: 'Bac', domain: 'Management',
    duration: '2 ans', tuition: 'Sur dossier',
    summary: 'Première approche des métiers de la gestion et du commerce. Filières : Action Commerciale & Marketing, Gestion Informatisée.',
    careers: ['Commercial','Assistant administratif','Gestionnaire de stocks','Agent commercial'],
    curriculum: [
      { semester:'S1-S2', courses:['Fondamentaux commerce','Comptabilité de base','Bureautique','Communication'] },
      { semester:'S3-S4', courses:['Marketing opérationnel','Gestion informatisée','Stage professionnel','Projet de fin d\'études'] }
    ]
  },
  {
    slug: 'master-finance',

    title: 'Master Européen Finance',
    school: 'management-commerce-it',
    level: 'Bac+5', domain: 'Finance',
    duration: '2 ans', tuition: 'Sur dossier',
    summary: 'Formez-vous aux métiers de la finance d\'entreprise, de marché et de l\'audit, avec une double reconnaissance européenne.',
    careers: ['Analyste financier','Auditeur','Contrôleur de gestion','Directeur financier'],
    curriculum: [
      { semester:'M1 — S1', courses:['Finance d\'entreprise','Comptabilité analytique','Mathématiques financières','Anglais des affaires'] },
      { semester:'M1 — S2', courses:['Marchés financiers','Fiscalité','Contrôle de gestion','Stage 2 mois'] },
      { semester:'M2 — S3', courses:['Ingénierie financière','Audit','Risk management','Stratégie financière'] },
      { semester:'M2 — S4', courses:['Mémoire de recherche','Stage 6 mois','Soutenance'] }
    ]
  },
  {
    slug: 'master-rh',
    title: 'Master Européen Ressources Humaines',
    school: 'management-commerce-it',
    level: 'Bac+5', domain: 'Management',
    duration: '2 ans', tuition: 'Sur dossier',
    summary: 'Stratégie RH, recrutement, gestion des talents et psychologie du travail pour piloter le capital humain.',
    careers: ['DRH','Responsable recrutement','Consultant RH','Talent manager'],
    curriculum: [
      { semester:'M1', courses:['Stratégie RH','Droit social','Psychologie du travail','GPEC'] },
      { semester:'M2', courses:['Recrutement & marque employeur','SIRH','Politique de rémunération','Mémoire'] }
    ]
  },
  {
    slug: 'master-informatique-cyber-securite',
    title: 'Master Informatique & Cybersécurité',
    school: 'management-commerce-it',
    level: 'Bac+5', domain: 'IT',
    duration: '2 ans', tuition: 'Sur dossier',
    summary: 'Architecture des systèmes, sécurité offensive et défensive, et management de projets IT critiques.',
    careers: ['Analyste cybersécurité','Architecte SI','Pentester','Chef de projet IT'],
    curriculum: [
      { semester:'M1', courses:['Réseaux avancés','Cryptographie','Cloud computing','Dev sécurisé'] },
      { semester:'M2', courses:['SOC & SIEM','Pentest','Conformité ISO 27001','Mémoire & stage'] }
    ]
  },
  {
    slug: 'master-commerce-international',
    title: 'Master Commerce International',
    school: 'management-commerce-it',
    level: 'Bac+5', domain: 'Commerce',
    duration: '2 ans', tuition: 'Sur dossier',
    summary: 'Stratégies d\'export, négociation interculturelle et développement international des entreprises.',
    careers: ['Export Manager','Acheteur international','Responsable zone export','Trader'],
    curriculum: [
      { semester:'M1', courses:['Commerce international','Logistique globale','Négociation interculturelle','Droit du commerce'] },
      { semester:'M2', courses:['Marketing international','Stratégie d\'export','Finance internationale','Mémoire'] }
    ]
  },
  {
    slug: 'bachelor-marketing-digital',
    title: 'Bachelor Marketing Digital',
    school: 'management-commerce-it',
    level: 'Bac+3', domain: 'Marketing',
    duration: '3 ans', tuition: 'Sur dossier',
    summary: 'Maîtrisez les leviers du marketing digital : SEO, SEA, social media, data et e-commerce.',
    careers: ['Chef de projet digital','Community manager','Traffic manager','Growth marketer'],
    curriculum: [
      { semester:'L1', courses:['Fondamentaux marketing','Communication digitale','Design graphique'] },
      { semester:'L2', courses:['SEO/SEA','Social media','Analytics'] },
      { semester:'L3', courses:['Stratégie digitale','E-commerce','Projet professionnel'] }
    ]
  },
  {
    slug: 'bachelor-grh',
    title: 'Bachelor Gestion des Ressources Humaines',
    school: 'management-commerce-it',
    level: 'Bac+3', domain: 'Management',
    duration: '3 ans', tuition: 'Sur dossier',
    summary: 'Acquérez les compétences clés en gestion des ressources humaines, droit social et management des équipes.',
    careers: ['Assistant RH','Chargé de recrutement','Gestionnaire paie','Chargé de formation'],
    curriculum: [
      { semester:'L1', courses:['Introduction RH','Droit du travail','Communication'] },
      { semester:'L2', courses:['Recrutement','Gestion de la paie','Management d\'équipe'] },
      { semester:'L3', courses:['GPEC','Politique RH','Stage professionnel'] }
    ]
  },
  {
    slug: 'ts-financier-comptable',
    title: 'Technicien Spécialisé Financier Comptable',
    school: 'management-commerce-it',
    level: 'Bac+2', domain: 'Finance',
    duration: '2 ans', tuition: 'Sur dossier',
    summary: 'Programme accrédité par l\'État marocain pour devenir technicien comptable et financier opérationnel.',
    careers: ['Comptable','Assistant financier','Aide-contrôleur','Gestionnaire administratif'],
    curriculum: [
      { semester:'S1-S2', courses:['Comptabilité générale','Fiscalité','Mathématiques financières','Bureautique'] },
      { semester:'S3-S4', courses:['Comptabilité des sociétés','Analyse financière','Stage','Projet de fin d\'études'] }
    ]
  },
  {
    slug: 'ts-gestion-entreprises',
    title: 'Technicien Spécialisé Gestion des Entreprises',
    school: 'management-commerce-it',
    level: 'Bac+2', domain: 'Management',
    duration: '2 ans', tuition: 'Sur dossier',
    summary: 'Formation opérationnelle aux fondamentaux de la gestion d\'entreprise, accréditée par l\'État.',
    careers: ['Assistant de gestion','Assistant commercial','Gestionnaire administratif'],
    curriculum: [
      { semester:'S1-S2', courses:['Gestion d\'entreprise','Marketing','Comptabilité','Communication'] },
      { semester:'S3-S4', courses:['Management','GRH','Stratégie','Stage'] }
    ]
  },
  {
    slug: 'master-management-strategies-touristiques',
    title: 'Master Management & Stratégies Touristiques',
    school: 'hospitality-tourism',
    level: 'Bac+5', domain: 'Tourisme',
    duration: '2 ans', tuition: 'Sur dossier',
    summary: 'Pilotez des structures touristiques et hôtelières dans un environnement international compétitif.',
    careers: ['Directeur d\'hôtel','Manager touristique','Responsable développement','Consultant'],
    curriculum: [
      { semester:'M1', courses:['Management hôtelier','Marketing touristique','Yield management','Anglais'] },
      { semester:'M2', courses:['Stratégie d\'établissement','Finance hôtelière','RSE & tourisme durable','Mémoire'] }
    ]
  },
  {
    slug: 'master-tourisme-culturel',
    title: 'Master Tourisme Culturel et Patrimonial',
    school: 'hospitality-tourism',
    level: 'Bac+5', domain: 'Tourisme',
    duration: '2 ans', tuition: 'Sur dossier',
    summary: 'Valorisation du patrimoine, ingénierie culturelle et développement de destinations touristiques.',
    careers: ['Chargé de mission patrimoine','Médiateur culturel','Chef de projet touristique'],
    curriculum: [
      { semester:'M1', courses:['Patrimoine & société','Ingénierie touristique','Médiation culturelle'] },
      { semester:'M2', courses:['Projet de territoire','Tourisme durable','Mémoire de recherche'] }
    ]
  },
  {
    slug: 'doctorat-europeen',
    title: 'Doctorat Européen',
    school: 'management-commerce-it',
    level: 'Bac+8', domain: 'Recherche',
    duration: '3 ans', tuition: 'Sur dossier',
    summary: 'Doctorat européen pour les chercheurs souhaitant une carrière académique ou un haut niveau d\'expertise.',
    careers: ['Enseignant-chercheur','Consultant senior','Expert sectoriel'],
    curriculum: [
      { semester:'D1', courses:['Méthodologie de recherche','Séminaires doctoraux'] },
      { semester:'D2-D3', courses:['Publications','Conférences','Thèse'] }
    ]
  },
  // ── ÉCOLE HÔTELLERIE & TOURISME ─────────────────────────────────────────
  {
    slug: 'technicien-hotellerie',
    title: 'Technicien — Tourisme & Hôtellerie',
    school: 'hospitality-tourism',
    level: 'Bac', domain: 'Tourisme',
    duration: '2 ans', tuition: 'Sur dossier',
    summary: 'Formation aux métiers de l\'accueil et de la réception hôtelière. Filière : Réception d\'Hôtel.',
    careers: ['Réceptionniste','Agent d\'accueil','Veilleur de nuit','Gouvernante'],
    curriculum: [
      { semester:'S1-S2', courses:['Technique de réception','Hébergement','Langues','Communication professionnelle'] },
      { semester:'S3-S4', courses:['Gestion hôtelière','Informatique hôtelière','Stage en établissement hôtelier'] }
    ]
  },
  {
    slug: 'ts-hotellerie',
    title: 'Technicien Spécialisé — Gestion Hôtelière',
    school: 'hospitality-tourism',
    level: 'Bac+2', domain: 'Tourisme',
    duration: '2 ans', tuition: 'Sur dossier',
    summary: 'Gestion opérationnelle d\'un établissement hôtelier. Filière : Gestion Hôtelière.',
    careers: ['Chef de réception','Responsable hébergement','Assistant directeur hôtel'],
    curriculum: [
      { semester:'S1-S2', courses:['Gestion des opérations hôtelières','Revenue management','Langues étrangères','Informatique'] },
      { semester:'S3-S4', courses:['Management hôtelier','Finance hôtelière','Stage opérationnel'] }
    ]
  },
  {
    slug: 'bachelor-hotellerie',
    title: 'Bachelor Management Hôtelier',
    school: 'hospitality-tourism',
    level: 'Bac+3', domain: 'Tourisme',
    duration: '3 ans', tuition: 'Sur dossier',
    summary: 'Management hôtelier de luxe, double diplôme Maroc et France (180 ECTS). Spécialisations : Développement et Innovation Touristiques, Gestion Opérationnelle H&R, Management Hôtelier et Touristique, etc.',
    careers: ['Directeur adjoint hôtel','Responsable hébergement','Chef de projet touristique','Revenue manager'],
    curriculum: [
      { semester:'L1', courses:['Introduction hôtellerie-tourisme','Gestion de la réception','Langues','Marketing'] },
      { semester:'L2', courses:['Revenue management','F&B management','Droit hôtelier','Projet tutoré'] },
      { semester:'L3', courses:['Stratégie hôtelière','Tourisme durable','Mémoire professionnel'] }
    ]
  },
  {
    slug: 'bachelor-finance',
    title: 'Bachelor Finance & Comptabilité',
    school: 'management-commerce-it',
    level: 'Bac+3', domain: 'Finance',
    duration: '3 ans', tuition: 'Sur dossier',
    summary: 'Formation complète en finance d\'entreprise, comptabilité et fiscalité avec double diplôme franco-marocain.',
    careers: ['Comptable','Assistant financier','Contrôleur de gestion junior','Analyste financier junior'],
    curriculum: [
      { semester:'L1', courses:['Comptabilité générale','Mathématiques financières','Droit des affaires'] },
      { semester:'L2', courses:['Fiscalité','Comptabilité analytique','Finance d\'entreprise'] },
      { semester:'L3', courses:['Audit','Contrôle de gestion','Stage professionnel','Mémoire'] }
    ]
  },
  {
    slug: 'bachelor-it',
    title: 'Bachelor Informatique & Cybersécurité',
    school: 'management-commerce-it',
    level: 'Bac+3', domain: 'IT',
    duration: '3 ans', tuition: 'Sur dossier',
    summary: 'Développement web, intelligence artificielle, cybersécurité et réseaux. Filières : Sécurité Informatique, IA, Développeur Web, Applications Mobiles, Administration Réseaux.',
    careers: ['Développeur web/mobile','Administrateur réseaux','Analyste sécurité junior','Chef de projet IT'],
    curriculum: [
      { semester:'L1', courses:['Algorithmique','Bases de données','Programmation orientée objet'] },
      { semester:'L2', courses:['Développement web','Réseaux','Sécurité informatique'] },
      { semester:'L3', courses:['IA & Machine Learning','Cybersécurité','Projet de fin d\'études'] }
    ]
  },
  {
    slug: 'master-finance-audit',
    title: 'Master Comptabilité, Audit & Contrôle de Gestion',
    school: 'management-commerce-it',
    level: 'Bac+5', domain: 'Finance',
    duration: '2 ans', tuition: 'Sur dossier',
    summary: 'Expertise en audit, comptabilité avancée et contrôle de gestion pour les cabinets et grandes entreprises.',
    careers: ['Auditeur senior','Contrôleur de gestion','Expert-comptable','Directeur administratif'],
    curriculum: [
      { semester:'M1', courses:['Audit légal','Normes IFRS','Contrôle de gestion avancé','Droit fiscal'] },
      { semester:'M2', courses:['Audit interne','Gouvernance d\'entreprise','Mission d\'audit','Mémoire'] }
    ]
  },
  {
    slug: 'master-expert-it',
    title: 'Master Expert IT — IA & Big Data',
    school: 'management-commerce-it',
    level: 'Bac+5', domain: 'IT',
    duration: '2 ans', tuition: 'Sur dossier',
    summary: 'Expertise en Intelligence Artificielle, Big Data, Cybersécurité et Systèmes d\'Information. Filières : Applications Intelligentes, Cybersécurité Haute Disponibilité, Pilotage SI.',
    careers: ['Data scientist','Expert cybersécurité','Architecte IA','DSI adjoint'],
    curriculum: [
      { semester:'M1', courses:['Machine learning','Big data','Sécurité systèmes','Cloud & DevOps'] },
      { semester:'M2', courses:['Deep learning','SOC avancé','Pilotage SI','Mémoire & stage'] }
    ]
  },
  {
    slug: 'master-hotellerie-evenementiel',
    title: 'Master Management Hôtelier & Évènementiel',
    school: 'hospitality-tourism',
    level: 'Bac+5', domain: 'Tourisme',
    duration: '2 ans', tuition: 'Sur dossier',
    summary: 'Direction stratégique pour les grands groupes hôteliers et l\'événementiel. Spécialisations : Revenue Management, Qualité & Hospitalité de Luxe, Entrepreneuriat Hôtelier, Tourisme International.',
    careers: ['Directeur général hôtel','Revenue manager senior','Consultant hôtellerie','Directeur événementiel'],
    curriculum: [
      { semester:'M1', courses:['Stratégie hôtelière','Yield management','Marketing du luxe','Management évènementiel'] },
      { semester:'M2', courses:['Leadership','Finance hôtelière avancée','RSE & développement durable','Thèse professionnelle'] }
    ]
  },
  {
    slug: 'doctorat-tourisme',
    title: 'Doctorat — Tourisme & Hôtellerie',
    school: 'hospitality-tourism',
    level: 'Bac+8', domain: 'Tourisme',
    duration: '3 ans', tuition: 'Sur dossier',
    summary: 'Recherche et innovation pour le tourisme de demain. Spécialisations : Sciences du Tourisme, Développement Durable, Tourisme Culturel, Sociologie, Géographie et Aménagement des destinations.',
    careers: ['Enseignant-chercheur','Expert tourisme','Consultant senior','Directeur d\'institut'],
    curriculum: [
      { semester:'D1', courses:['Méthodologie de recherche','Séminaires spécialisés','Revue de littérature'] },
      { semester:'D2-D3', courses:['Publications scientifiques','Conférences internationales','Thèse de doctorat'] }
    ]
  }
];

export const TESTIMONIALS = [
  { name:'Mehdi B.',  role:'Analyste sécurité, multinationale', program:'Informatique & Cyber Sécurité', promo:2021, quote:'L\'EEMCI m\'a donné une formation solide et un double diplôme qui a fait la différence en entretien.' },
  { name:'Salma K.',  role:'Banquière, Casablanca',             program:'Management & Finance',          promo:2020, quote:'Les stages encadrés et le réseau de l\'école m\'ont permis de décrocher un poste dans une grande banque.' },
  { name:'Youssef M.',role:'Export Manager, agroalimentaire',    program:'Commerce International',       promo:2019, quote:'Diplômé en Commerce International, je suis Export Manager dans une entreprise agroalimentaire. Les cours étaient alignés sur les besoins réels du marché.' },
  { name:'Leila T.',  role:'Social media strategist, startup',   program:'Marketing Digital',            promo:2023, quote:'Grâce au Bachelor Marketing Digital, je gère aujourd\'hui toute la stratégie social media d\'une startup en pleine croissance. EEMCI, c\'est du concret !' },
  { name:'Omar R.',   role:'Chef de projet IT, éditeur logiciels', program:'Développement Informatique', promo:2021, quote:'Mon Master en Développement Informatique m\'a propulsé Chef de Projet IT. L\'encadrement des profs était top niveau.' }
];

export const PARTNERS = [
  {
    name: 'MIIB\'S',
    desc: 'Partenaire académique français — validation Bachelor, Master et Doctorat européens',
    logo: 'https://eemci.ma/wp-content/uploads/2025/12/2.png',
    url: 'https://eemci.ma',
    category: 'Académique'
  },
  {
    name: 'WES\'SUP',
    desc: 'Méthodes pédagogiques innovantes, Management & IT',
    logo: 'https://eemci.ma/wp-content/uploads/2025/12/1.png',
    url: 'https://wessup.fr',
    category: 'Académique'
  },
  {
    name: 'FEDE',
    desc: 'Fédération Européenne des Écoles — système LMD et standards européens',
    logo: 'https://eemci.ma/wp-content/uploads/2025/12/LES-LOGOS-DES-PQR.png',
    url: 'https://fede.info',
    category: 'Académique'
  },
  {
    name: 'Adecco',
    desc: 'Stages et insertion professionnelle',
    logo: 'https://eemci.ma/wp-content/uploads/2025/12/3.png',
    url: 'https://adecco.ma',
    category: 'Entreprise'
  },
  {
    name: 'DEKRA',
    desc: 'Qualité, sécurité et certification internationale',
    logo: 'https://eemci.ma/wp-content/uploads/2025/12/4.png',
    url: 'https://dekra.com',
    category: 'Certification'
  },
  {
    name: 'APTIV',
    desc: 'Technologies intelligentes et systèmes embarqués',
    logo: 'https://eemci.ma/wp-content/uploads/2025/12/5.png',
    url: 'https://aptiv.com',
    category: 'Entreprise'
  },
];

export const NEWS = [
  { id:1, title:'Ouverture de l\'École Hôtellerie & Tourisme', date:'2025-09-01', excerpt:'EEMCI inaugure sa seconde école dédiée aux métiers du tourisme et de l\'hôtellerie.' },
  { id:2, title:'Rentrée 2026 : candidatures ouvertes',       date:'2026-01-15', excerpt:'Les inscriptions pour la rentrée 2026 sont désormais ouvertes pour tous nos programmes.' },
  { id:3, title:'Partenariat renforcé avec WES\'SUP',         date:'2025-11-10', excerpt:'Nouveaux parcours en alternance et mobilité étudiante avec notre partenaire français.' }
];
