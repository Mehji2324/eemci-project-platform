import { z } from 'zod';

export const applicationSchema = z.object({
  // Personal Info
  firstName: z.string().min(2, 'Le prénom est requis'),
  lastName: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  birthDate: z.string().min(1, 'Date de naissance requise'),
  gender: z.enum(['M', 'F']),
  
  // Program Selection
  school: z.string().min(1, 'Veuillez choisir une école'),
  programId: z.string().min(1, 'Veuillez choisir un programme'),
  
  // Academic Background
  lastDiploma: z.string().min(2, 'Dernier diplôme obtenu requis'),
  institution: z.string().min(2, 'Établissement requis'),
  graduationYear: z.string().optional(),
  
  // Documents (URLs to Supabase Storage)
  documents: z.object({
    identityCard: z.string().optional(),
    diploma: z.string().optional(),
    transcripts: z.string().optional(),
  }).optional()
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
