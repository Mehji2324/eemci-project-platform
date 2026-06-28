import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, CalendarCheck,
  Award, CreditCard, BarChart3, Settings, LogOut, Menu, X, Bell, Search, PanelLeftClose, ChevronLeft, FileText
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
  { to:'/admin/documents', label:'Documents', icon:FileText },
  { to:'/admin/reports', label:'Rapports', icon:BarChart3 },
  { to:'/admin/settings', label:'Paramètres', icon:Settings }
];

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const nav = useNavigate();
  const user = auth.user();

  const sidebarWidth = collapsed ? 'w-[72px]' : 'w-72';

  return (
    <div className="min-h-screen bg-surface-muted">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-40 border-r border-surface-border bg-surface transition-all duration-300 lg:translate-x-0 flex flex-col',
        sidebarWidth,
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex h-16 items-center justify-between border-b border-surface-border px-4 shrink-0">
          {!collapsed && <Logo />}
          <button
            onClick={() => setOpen(false)}
            className="rounded-xl p-2 text-ink-soft transition-colors hover:bg-surface-subtle hover:text-ink lg:hidden"
            aria-label="Fermer le menu"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:grid h-8 w-8 place-items-center rounded-lg text-ink-muted hover:bg-surface-subtle hover:text-ink transition-colors"
            aria-label={collapsed ? 'Agrandir le menu' : 'Réduire le menu'}
          >
            <ChevronLeft className={cn('h-4 w-4 transition-transform duration-300', collapsed && 'rotate-180')} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3 overflow-y-auto" aria-label="Administration">
          {NAV.map(({to,label,icon:Icon,end}) => (
            <NavLink key={to} to={to} end={end} onClick={()=>setOpen(false)}
              title={collapsed ? label : undefined}
              className={({isActive})=>cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                collapsed && 'justify-center px-0',
                isActive
                  ? 'bg-primary-50 text-primary-700 shadow-xs border border-primary-100'
                  : 'text-ink-soft hover:bg-surface-subtle hover:text-ink'
              )}>
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User card */}
        <div className="p-3 shrink-0 border-t border-surface-border">
          <div className={cn('rounded-xl bg-surface-muted p-3', collapsed && 'p-2')}>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-600 text-sm font-bold text-white shadow-sm shadow-primary-600/20">
                {user?.name.charAt(0)}
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink truncate">{user?.name}</p>
                  <p className="text-xs text-ink-soft truncate">{user?.email}</p>
                </div>
              )}
              {!collapsed && (
                <button
                  onClick={()=>{auth.logout(); nav('/login');}}
                  className="rounded-lg p-2 text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink"
                  title="Déconnexion"
                  aria-label="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main content */}
      <div className={cn('transition-all duration-300', collapsed ? 'lg:pl-[72px]' : 'lg:pl-72')}>
        <header className="sticky top-0 z-20 h-16 border-b border-surface-border glass">
          <div className="flex h-full items-center gap-3 px-4 lg:px-8">
            <button
              onClick={()=>setOpen(true)}
              className="rounded-xl p-2 text-ink-soft transition-colors hover:bg-surface-subtle hover:text-ink lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                placeholder="Rechercher étudiant, cours..."
                className="h-10 w-full rounded-xl border border-surface-border bg-surface-muted pl-10 pr-4 text-sm outline-none transition-all duration-200 focus:border-primary-500 focus:bg-surface focus:ring-4 focus:ring-primary-500/10 placeholder:text-ink-muted"
              />
            </div>
            <button
              className="relative rounded-xl p-2.5 text-ink-soft transition-colors hover:bg-surface-subtle hover:text-ink"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent-500 ring-2 ring-surface" />
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
