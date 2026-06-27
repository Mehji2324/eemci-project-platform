import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Award, Calendar, CreditCard, LogOut, UserCircle } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/cn';

const NAV = [
  { to:'/portal', label:'Accueil', icon:LayoutDashboard, end:true },
  { to:'/portal/courses', label:'Cours', icon:BookOpen },
  { to:'/portal/schedule', label:'Planning', icon:Calendar },
  { to:'/portal/grades', label:'Notes', icon:Award },
  { to:'/portal/payments', label:'Paiements', icon:CreditCard }
];

export default function PortalLayout() {
  const nav = useNavigate();
  const user = auth.user();
  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="sticky top-0 z-30 glass border-b border-surface-border/60">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex" aria-label="Portail étudiant">
            {NAV.map(({to,label,icon:Icon,end}) => (
              <NavLink key={to} to={to} end={end}
                className={({isActive})=>cn(
                  'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary-50 text-primary-700 shadow-xs border border-primary-100'
                    : 'text-ink-soft hover:bg-surface-subtle hover:text-ink'
                )}>
                <Icon className="h-4 w-4" />{label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-ink">{user?.name}</p>
                <p className="text-xs text-ink-soft">Étudiant</p>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-600 text-sm font-bold text-white shadow-sm shadow-primary-600/20">
                {user?.name.charAt(0)}
              </div>
            </div>
            <button
              onClick={()=>{auth.logout(); nav('/login');}}
              className="rounded-xl p-2 text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink"
              aria-label="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
        <nav className="container flex gap-1 overflow-x-auto pb-3 md:hidden" aria-label="Portail étudiant mobile">
          {NAV.map(({to,label,icon:Icon,end}) => (
            <NavLink key={to} to={to} end={end}
              className={({isActive})=>cn(
                'flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary-50 text-primary-700 shadow-xs border border-primary-100'
                  : 'text-ink-soft hover:bg-surface-subtle'
              )}>
              <Icon className="w-3.5 h-3.5" />{label}
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
