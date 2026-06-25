import { Navigate } from 'react-router-dom';
import { auth, type Role } from '@/lib/auth';

export default function ProtectedRoute({ role, children }:{role:Role; children:React.ReactNode}) {
  const u = auth.user();
  if (!u) return <Navigate to="/login" replace />;
  if (u.role !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
}
