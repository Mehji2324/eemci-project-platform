import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Award, BookOpen, CalendarCheck, ClipboardList, LayoutDashboard, LogOut, UserCircle } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/cn';

const NAV = [
  { to:'/teacher', label:'Accueil', icon:LayoutDashboard, end:true },
  { to:'/teacher/courses', label:'Mes cours', icon:BookOpen },
  { to:'/teacher/attendance', label:'Présences', icon:CalendarCheck },
  { to:'/teacher/grades', label:'Notes', icon:Award },
];

export default function TeacherLayout() {
  const nav = useNavigate();
  const user = auth.user();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex" aria-label="Espace enseignant">
            {NAV.map(({to,label,icon:Icon,end}) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({isActive})=>cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition',
                  isActive ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-100' : 'text-ink-soft hover:bg-slate-100 hover:text-ink'
                )}
              >
                <Icon className="h-4 w-4" />{label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ClipboardList className="hidden h-5 w-5 text-primary-600 sm:block" aria-hidden="true" />
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-ink-soft">Enseignant</p>
            </div>
            <UserCircle className="hidden h-8 w-8 text-primary-600 sm:block" aria-hidden="true" />
            <button
              onClick={()=>{auth.logout(); nav('/login');}}
              className="rounded-lg p-2 text-ink-soft transition hover:bg-slate-100 hover:text-ink"
              aria-label="Déconnexion"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
        <nav className="container flex gap-1 overflow-x-auto pb-3 md:hidden" aria-label="Espace enseignant mobile">
          {NAV.map(({to,label,icon:Icon,end}) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({isActive})=>cn(
                'flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium',
                isActive ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-100' : 'text-ink-soft'
              )}
            >
              <Icon className="h-3.5 w-3.5" />{label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main id="main" className="container py-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}
