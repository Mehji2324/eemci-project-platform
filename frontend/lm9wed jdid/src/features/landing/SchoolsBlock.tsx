import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SCHOOLS } from '@/lib/data';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';

export default function SchoolsBlock() {
  const { t } = useTranslation();

  return (
    <Section
      id="schools"
      eyebrow={t('schools.eyebrow')}
      title={t('schools.title')}
      lead={t('schools.lead')}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {SCHOOLS.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-surface-border bg-surface shadow-xs transition hover:border-primary-200 hover:shadow-soft"
          >
            <div className="relative h-56 overflow-hidden sm:h-64">
              <img
                src={s.image}
                alt={t(`schools.school_${i}.name`)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${s.color === 'primary' ? 'from-primary-900/80' : 'from-emerald-900/80'} via-transparent`} />
              <h3 className="absolute inset-x-5 bottom-5 font-display text-2xl font-semibold leading-tight text-white md:text-3xl">{t(`schools.school_${i}.name`)}</h3>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-ink-soft">{t(`schools.school_${i}.short`)}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {s.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-center gap-2 text-sm">
                    <Check className={`h-4 w-4 shrink-0 ${s.color === 'primary' ? 'text-primary-600' : 'text-emerald-600'}`} />
                    <span className="text-ink">{t(`schools.school_${i}.bullets.${bi}`)}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={`/programs?school=${s.slug}`}
                className={cn(
                  'mt-8 inline-flex items-center gap-2 font-medium transition hover:gap-3',
                  s.color === 'primary' ? 'text-primary-700' : 'text-emerald-700'
                )}
              >
                {t('schools.discover')} <ArrowUpRight className="h-4 w-4 shrink-0 rtl:-rotate-90" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
