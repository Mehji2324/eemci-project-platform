import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, GraduationCap } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PROGRAMS } from '@/lib/data';
import { cn } from '@/lib/cn';
import { useTranslation } from 'react-i18next';

const LEVELS = ['Tous', 'Bac', 'Bac+2', 'Bac+3', 'Bac+5', 'Bac+8'] as const;

export default function ProgramsShowcase() {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState<typeof LEVELS[number]>('Tous');
  const items = useMemo(() => filter === 'Tous' ? PROGRAMS.slice(0, 8) : PROGRAMS.filter(p => p.level === filter).slice(0, 8), [filter]);

  return (
    <Section
      id="programs"
      eyebrow={t('showcase.eyebrow')}
      title={t('showcase.title')}
      lead={t('showcase.lead')}
      className="bg-surface-muted"
    >
      <div className="mb-10 flex flex-wrap gap-2">
        {LEVELS.map(l => (
          <button
            key={l}
            onClick={() => setFilter(l)}
            aria-pressed={filter === l}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition',
              filter === l ? 'bg-primary-600 text-white shadow-xs' : 'border border-surface-border bg-surface text-ink-soft hover:bg-surface-subtle hover:text-ink'
            )}
          >
            {t(`showcase.levels.${l}`)}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link to={`/programs/${p.slug}`} className="group block h-full">
              <div className="flex h-full flex-col rounded-2xl border border-surface-border bg-surface p-6 transition hover:border-primary-300 hover:shadow-soft">
                <Badge tone={p.school === 'hospitality-tourism' ? 'emerald' : 'primary'}>{p.domain}</Badge>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink transition group-hover:text-primary-700">{p.title}</h3>
                <p className="text-sm text-ink-soft mt-2 line-clamp-2">{p.summary}</p>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-surface-border pt-4 text-xs text-ink-soft">
                  <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" />{p.level}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{p.duration}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/programs">
          <Button variant="outline" size="lg" rightIcon={<ArrowRight className={cn("w-4 h-4", i18n.language === 'ar' && "rotate-180")} />}>
            {t('showcase.all_programs')}
          </Button>
        </Link>
      </div>
    </Section>
  );
}
