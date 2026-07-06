import { PARTNERS } from '@/lib/data';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  'Académique': { bg: 'bg-primary-50', text: 'text-primary-700', dot: 'bg-primary-400' },
  'Entreprise': { bg: 'bg-accent-50', text: 'text-accent-700', dot: 'bg-accent-400' },
  'Certification': { bg: 'bg-teal-500/10', text: 'text-teal-700', dot: 'bg-teal-500' },
  'Institutionnel': { bg: 'bg-surface-muted', text: 'text-ink-soft', dot: 'bg-slate-400' },
};

// Duplicate the list to create a seamless infinite marquee
const MARQUEE_ITEMS = [...PARTNERS, ...PARTNERS];

export default function Partners() {
  const { t } = useTranslation();
  const title = t('partners.title');
  const titleSeparator = title.indexOf('&');
  const titleStart = titleSeparator >= 0 ? title.slice(0, titleSeparator).trim() : title;
  const titleHighlight = titleSeparator >= 0 ? title.slice(titleSeparator).trim() : '';

  return (
    <section className="relative overflow-hidden py-20">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-muted via-white to-surface-muted pointer-events-none" />
      <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />

      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-eyebrow mb-3">{t('partners.eyebrow')}</p>
          <h2 className="section-title mb-4">
            {titleStart}
            {titleHighlight && <span className="gradient-text"> {titleHighlight}</span>}
          </h2>
          <p className="section-lead max-w-2xl mx-auto">
            {t('partners.lead')}
          </p>
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.entries(CATEGORY_COLORS).map(([cat, colors]) => (
            <span
              key={cat}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-current/10",
                colors.bg,
                colors.text
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
              {t(`partners.categories.${cat}`)}
            </span>
          ))}
        </div>
      </div>

      {/* ── Infinite marquee ── */}
      <div className="relative w-full overflow-hidden group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-surface-muted to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-surface-muted to-transparent pointer-events-none" />

        <div className="flex w-max gap-6 animate-marquee group-hover:[animation-play-state:paused]">
          {MARQUEE_ITEMS.map((p, i) => {
            const colors = CATEGORY_COLORS[p.category] ?? CATEGORY_COLORS['Institutionnel'];
            return (
              <a
                key={`${p.name}-${i}`}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t('partners.label')} : ${p.name}`}
                className={cn(
                  'group/card flex w-56 flex-shrink-0 flex-col items-center gap-3 rounded-2xl border border-surface-border bg-surface p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-md'
                )}
              >
                {/* Logo */}
                <div className="flex h-14 w-full items-center justify-center">
                  <img
                    src={p.logo}
                    alt={`Logo ${p.name}`}
                    className="max-h-14 w-auto max-w-[8rem] object-contain grayscale transition-all duration-300 group-hover/card:grayscale-0"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to text if image fails
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (next) next.style.display = 'block';
                    }}
                  />
                  {/* Text fallback (hidden by default) */}
                  <span
                    className="hidden font-display text-xl font-bold text-primary-700"
                    aria-hidden="true"
                  >
                    {p.name}
                  </span>
                </div>

                {/* Name */}
                <p className="text-center text-sm font-semibold leading-tight text-ink">
                  {p.name}
                </p>

                {/* Category badge */}
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                    colors.bg,
                    colors.text
                  )}
                >
                  <span className={cn('h-1 w-1 rounded-full', colors.dot)} />
                  {t(`partners.categories.${p.category}`)}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom accreditation strip */}
      <div className="container mt-14">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-surface-border bg-surface p-6 shadow-xs md:flex-row md:gap-10 md:p-8">
          <div className="flex-1 text-center md:text-start">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-500 mb-1">
              {t('partners.accreditation.title2')}
            </p>
            <h3 className="font-display text-lg font-bold text-ink mb-1">
              {t('partners.accreditation.title')}
            </h3>
            <p className="text-sm text-ink-soft">
              {t('partners.accreditation.desc')}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: t('partners.accreditation.items.Accrédité Maroc'), emoji: '🇲🇦' },
              { label: t('partners.accreditation.items.Reconnu Europe'), emoji: '🇪🇺' },
              { label: t('partners.accreditation.items.Membre FEDE'), emoji: '🎓' },
              { label: t('partners.accreditation.items.Double Diplôme FR–MA'), emoji: '📜' },
            ].map(({ label, emoji }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-xl border border-surface-border bg-surface-subtle px-4 py-2 text-xs font-semibold text-ink-soft"
              >
                <span>{emoji}</span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
