export interface AppDocument {
  id: number;
  title: string;
  description: string | null;
  type: string;
  mime_type: string;
  size: number;
  download_count: number;
  is_public: boolean;
  uploaded_by: {
    id: number;
    name: string;
  } | null;
  classe: {
    id: number;
    name: string;
  } | null;
  module: {
    id: number;
    name: string;
  } | null;
  created_at: string;
  updated_at: string;
}

export const DOCUMENT_TYPES = [
  'Course Material',
  'Assignment',
  'Practical Work',
  'Exam',
  'Correction',
  'School Certificate',
  'Enrollment Certificate',
  'Transcript',
  'Administrative Document',
] as const;

export type DocumentType = typeof DOCUMENT_TYPES[number];
