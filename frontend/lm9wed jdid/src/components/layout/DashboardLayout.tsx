import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, CalendarCheck,
  Award, CreditCard, BarChart3, Settings, LogOut, Menu, X, Bell, Search, PanelLeftClose
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/cn';

const NAV = [
  { to:'/admin', label:'Tableau de bord', icon:LayoutDashboard, end:true },
  { to:'/admin/students', label:'Étudiants', icon:Users },
  { to:'/admin/teachers', label:'Enseignants', icon:GraduationCap },
  { to:'/admin/courses', label:'Cours', icon:BookOpen },
  { to:'/admin/attendance', label:'Présences', icon:CalendarCheck },
  { to:'/admin/grades', label:'Notes', icon:Award },
  { to:'/admin/payments', label:'Paiements', icon:CreditCard },
  { to:'/admin/reports', label:'Rapports', icon:BarChart3 },
  { to:'/admin/settings', label:'Paramètres', icon:Settings }
];

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const user = auth.user();

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className={cn(
        'fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200/80 bg-white transition-transform lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <Logo />
          <button onClick={()=>setOpen(false)} className="rounded-lg p-2 text-ink-soft transition hover:bg-slate-100 hover:text-ink lg:hidden" aria-label="Fermer le menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-1 p-3" aria-label="Administration">
          {NAV.map(({to,label,icon:Icon,end}) => (
            <NavLink key={to} to={to} end={end} onClick={()=>setOpen(false)}
              className={({isActive})=>cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition',
                isActive ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-100' : 'text-ink-soft hover:bg-slate-100 hover:text-ink')}>
              <Icon className="h-4 w-4" />{label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-4 left-3 right-3">
          <div className="rounded-lg border border-slate-200/80 bg-slate-50 p-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-700 text-sm font-semibold text-white">
                {user?.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-ink-soft truncate">{user?.email}</p>
              </div>
              <button onClick={()=>{auth.logout(); nav('/login');}} className="rounded-lg p-2 text-ink-soft transition hover:bg-white hover:text-ink" title="Déconnexion" aria-label="Déconnexion">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 h-16 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-full items-center gap-3 px-4 lg:px-8">
            <button onClick={()=>setOpen(true)} className="rounded-lg p-2 text-ink-soft transition hover:bg-slate-100 hover:text-ink lg:hidden" aria-label="Ouvrir le menu">
              <Menu className="h-5 w-5" />
            </button>
            <PanelLeftClose className="hidden h-5 w-5 text-slate-300 lg:block" aria-hidden="true" />
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input placeholder="Rechercher étudiant, cours..." className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-primary-300 focus:bg-white focus:ring-2 focus:ring-primary-100" />
            </div>
            <button className="relative rounded-lg p-2 text-ink-soft transition hover:bg-slate-100 hover:text-ink" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-500" />
            </button>
          </div>
        </header>

        <main id="main" className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
