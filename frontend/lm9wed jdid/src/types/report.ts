export interface DashboardStats {
  total_students: number;
  active_students: number;
  total_teachers: number;
  total_classes: number;
  total_modules: number;
  total_documents: number;
  document_downloads: number;
  total_payments: number;
  pending_payments: number;
  attendance_rate: number;
  average_grade: number;
  revenue_trend?: { name: string; total: number }[];
  my_payments?: number;
  my_average?: number;
  my_absences?: number;
}
