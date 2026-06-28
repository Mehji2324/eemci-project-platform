import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import PortalLayout from './components/layout/PortalLayout';
import TeacherLayout from './components/layout/TeacherLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PageLoader from './components/ui/PageLoader';
import { useUiStore } from './lib/store';

const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const Schools = lazy(() => import('./pages/public/Schools'));
const Programs = lazy(() => import('./pages/public/Programs'));
const ProgramDetail = lazy(() => import('./pages/public/ProgramDetail'));
const Admissions = lazy(() => import('./pages/public/Admissions'));
const Apply = lazy(() => import('./pages/public/Apply'));
const Contact = lazy(() => import('./pages/public/Contact'));
const Alumni = lazy(() => import('./pages/public/Alumni'));
const News = lazy(() => import('./pages/public/News'));
const Login = lazy(() => import('./pages/auth/Login'));
const NotFound = lazy(() => import('./pages/public/NotFound'));

// Admin
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminStudents  = lazy(() => import('./pages/admin/Students'));
const AdminTeachers  = lazy(() => import('./pages/admin/Teachers'));
const AdminCourses   = lazy(() => import('./pages/admin/Courses'));
const AdminAttendance= lazy(() => import('./pages/admin/Attendance'));
const AdminGrades    = lazy(() => import('./pages/admin/Grades'));
const AdminPayments  = lazy(() => import('./pages/admin/Payments'));
const AdminReports   = lazy(() => import('./pages/admin/Reports'));
const AdminSettings  = lazy(() => import('./pages/admin/Settings'));
const AdminDocuments = lazy(() => import('./pages/admin/Documents'));

// Portal (student)
const PortalDashboard = lazy(() => import('./pages/portal/Dashboard'));
const PortalCourses   = lazy(() => import('./pages/portal/Courses'));
const PortalGrades    = lazy(() => import('./pages/portal/Grades'));
const PortalSchedule  = lazy(() => import('./pages/portal/Schedule'));
const PortalPayments  = lazy(() => import('./pages/portal/Payments'));
const PortalDocuments = lazy(() => import('./pages/portal/Documents'));
const PortalReports   = lazy(() => import('./pages/portal/Reports'));

// Teacher
const TeacherDashboard = lazy(() => import('./pages/teacher/Dashboard'));
const TeacherCourses   = lazy(() => import('./pages/teacher/Courses'));
const TeacherAttendance= lazy(() => import('./pages/teacher/Attendance'));
const TeacherGrades    = lazy(() => import('./pages/teacher/Grades'));
const TeacherDocuments = lazy(() => import('./pages/teacher/Documents'));
const TeacherReports   = lazy(() => import('./pages/teacher/Reports'));

export default function App() {
  const { theme, lang } = useUiStore();

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [theme, lang]);

  return (
    <Suspense fallback={<PageLoader />}>
      <a href="#main" className="skip-link">Aller au contenu</a>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/admissions/apply" element={<Apply />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/news" element={<News />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute role="admin"><DashboardLayout /></ProtectedRoute>}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/teachers" element={<AdminTeachers />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/grades" element={<AdminGrades />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/documents" element={<AdminDocuments />} />
        </Route>

        <Route element={<ProtectedRoute role="student"><PortalLayout /></ProtectedRoute>}>
          <Route path="/portal" element={<PortalDashboard />} />
          <Route path="/portal/courses" element={<PortalCourses />} />
          <Route path="/portal/grades" element={<PortalGrades />} />
          <Route path="/portal/schedule" element={<PortalSchedule />} />
          <Route path="/portal/payments" element={<PortalPayments />} />
          <Route path="/portal/documents" element={<PortalDocuments />} />
          <Route path="/portal/reports" element={<PortalReports />} />
        </Route>

        <Route element={<ProtectedRoute role="teacher"><TeacherLayout /></ProtectedRoute>}>
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/courses" element={<TeacherCourses />} />
          <Route path="/teacher/attendance" element={<TeacherAttendance />} />
          <Route path="/teacher/grades" element={<TeacherGrades />} />
          <Route path="/teacher/documents" element={<TeacherDocuments />} />
          <Route path="/teacher/reports" element={<TeacherReports />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
