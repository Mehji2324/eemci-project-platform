import { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Globe, Moon, Sun, ChevronDown, GraduationCap, Building2, BookOpen, Phone } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { cn } from '@/lib/cn';
import { useUiStore } from '@/lib/store';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { lang, setLang } = useUiStore();
  const { i18n, t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const MEGA_LINKS = [
    {
      to: '/about',
      label: t('nav.school'),
      dropdown: [
        { to: '/about', label: t('nav.about'), icon: Building2, desc: t('nav.history_mission') },
        { to: '/alumni', label: t('nav.alumni'), icon: GraduationCap, desc: t('nav.alumni_desc') },
      ],
    },
    { to: '/schools', label: t('nav.schools') },
    {
      to: '/programs',
      label: t('nav.programs'),
      dropdown: [
        { to: '/programs?level=Technicien', label: t('nav.level_bac'), icon: BookOpen, desc: t('nav.level_bac_desc') },
        { to: '/programs?level=Bac%2B2', label: t('nav.level_ts'), icon: BookOpen, desc: t('nav.level_ts_desc') },
        { to: '/programs?level=Bac%2B3', label: t('nav.level_bachelor'), icon: BookOpen, desc: t('nav.level_bachelor_desc') },
        { to: '/programs?level=Bac%2B5', label: t('nav.level_master'), icon: BookOpen, desc: t('nav.level_master_desc') },
        { to: '/programs?level=Bac%2B8', label: t('nav.level_doctorate'), icon: BookOpen, desc: t('nav.level_doctorate_desc') },
      ],
    },
    { to: '/news', label: t('nav.news') },
    { to: '/contact', label: t('nav.contact') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  const changeLang = (l: 'fr' | 'en' | 'ar') => {
    setLang(l);
    i18n.changeLanguage(l);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-surface-border/60 shadow-soft'
            : 'bg-transparent'
        )}
      >
        {/* Top bar – phone & social */}
        {!scrolled && (
          <div className="hidden lg:flex border-b border-surface-border/40">
            <div className="container h-9 flex items-center justify-between text-xs text-ink-muted">
              <div className="flex items-center gap-4">
                <a href={`tel:${t('common.phone').replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-primary-600 transition">
                  <Phone className="w-3 h-3" /> {t('common.phone')}
                </a>
                <span>·</span>
                <a href={`mailto:${t('common.email')}`} className="hover:text-primary-600 transition">{t('common.email')}</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent-600 font-semibold">✓ {t('common.accredited')}</span>
                <span>·</span>
                <span>{t('common.double_degree')}</span>
                <span>·</span>
                <span>{t('common.fede_member')}</span>
              </div>
            </div>
          </div>
        )}

        <div className="container h-16 md:h-[70px] flex items-center justify-between gap-4">
          <Logo variant="dark" size="md" />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" ref={dropdownRef}>
            {MEGA_LINKS.map((link) => (
              <div
                key={link.to}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.to)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink
                  to={link.to}
                  onClick={() => setActiveDropdown(null)}
                  className={({ isActive }) =>
                    cn(
                      'nav-link inline-flex items-center gap-1',
                      isActive && 'nav-link-active'
                    )
                  }
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200',
                        activeDropdown === link.to ? 'rotate-180' : ''
                      )}
                    />
                  )}
                </NavLink>

                {/* Dropdown */}
                {link.dropdown && activeDropdown === link.to && (
                  <div className={cn(
                    "absolute top-full mt-3 w-72 rounded-2xl border border-surface-border bg-surface shadow-xl py-2 animate-fade-down",
                    i18n.language === 'ar' ? "right-0" : "left-0"
                  )}>
                    {link.dropdown.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={closeMenus}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-surface-subtle transition-colors duration-150 rounded-xl mx-1"
                        >
                          <span className="w-8 h-8 rounded-xl bg-primary-50 grid place-items-center shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-primary-600" />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-ink">{item.label}</span>
                            <span className="block text-xs text-ink-muted mt-0.5">{item.desc}</span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Language picker */}
            <div className="relative group hidden md:block">
              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-sm text-ink-soft hover:bg-surface-subtle transition font-medium">
                <Globe className="w-4 h-4" />
                <span>{lang.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className={cn(
                "absolute top-full mt-3 w-40 rounded-xl bg-surface shadow-xl border border-surface-border py-1.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50",
                i18n.language === 'ar' ? "left-0" : "right-0"
              )}>
                {(['fr', 'en', 'ar'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => changeLang(l)}
                    className={cn(
                      'w-full text-left px-4 py-2 text-sm hover:bg-primary-50 transition rounded-lg mx-auto',
                      lang === l ? 'text-primary-700 font-semibold' : 'text-ink-soft',
                      i18n.language === 'ar' ? 'text-right' : 'text-left'
                    )}
                  >
                    {l === 'fr' ? 'Français' : l === 'en' ? 'English' : 'العربية'}
                  </button>
                ))}
              </div>
            </div>

            <Link to="/login" className="hidden md:block">
              <Button variant="ghost" size="sm">
                {t('nav.login')}
              </Button>
            </Link>
            <Link to="/admissions/apply" className="hidden md:block">
              <Button variant="accent" size="sm">
                {t('nav.apply')}
              </Button>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 rounded-xl grid place-items-center text-ink hover:bg-surface-subtle transition"
              aria-label={t('common.open_menu')}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-over */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-primary-950/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <aside className={cn(
            "absolute top-0 bottom-0 w-[85vw] max-w-sm bg-surface shadow-2xl flex flex-col animate-fade-up",
            i18n.language === 'ar' ? "left-0" : "right-0"
          )}>
            <div className="flex items-center justify-between p-5 border-b border-surface-border">
              <Logo size="md" />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-xl grid place-items-center text-ink-soft hover:bg-surface-subtle transition"
                aria-label={t('common.close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {MEGA_LINKS.map((link) => (
                <div key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition',
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-ink hover:bg-surface-subtle'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                  {link.dropdown && (
                    <div className={cn(
                      "mt-1 space-y-0.5 pl-4",
                      i18n.language === 'ar' ? "mr-4 border-r-2 border-l-0 pr-4" : "ml-4 border-l-2 border-r-0 pl-4",
                      "border-surface-border"
                    )}>
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          onClick={closeMenus}
                          className="block py-2 text-sm text-ink-soft hover:text-primary-600 transition"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="p-4 space-y-3 border-t border-surface-border">
              <div className="flex gap-2">
                {(['fr', 'en', 'ar'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => changeLang(l)}
                    className={cn(
                      'flex-1 py-2 rounded-xl text-sm font-semibold border transition',
                      lang === l
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'border-surface-border text-ink-soft hover:border-primary-300'
                    )}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <Link to="/login" onClick={closeMenus} className="block">
                <Button variant="secondary" size="lg" className="w-full">{t('nav.login')}</Button>
              </Link>
              <Link to="/admissions/apply" onClick={closeMenus} className="block">
                <Button variant="accent" size="lg" className="w-full">{t('nav.register_now')}</Button>
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
