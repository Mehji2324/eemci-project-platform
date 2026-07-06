import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { PILLARS } from '@/lib/data';
import { useTranslation } from 'react-i18next';
import type { ElementType } from 'react';

export default function WhyChoose() {
  const { t } = useTranslation();

  return (
    <Section
      eyebrow={t('pillars.eyebrow')}
      title={t('pillars.title')}
      lead={t('pillars.lead')}
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p, i) => {
          const Icon = (Icons as Record<string, ElementType>)[p.icon] ?? Icons.Star;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group rounded-2xl border border-surface-border bg-surface p-6 transition hover:border-primary-200 hover:shadow-soft sm:p-7"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-50 text-primary-600 transition group-hover:bg-primary-600 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">{t(`pillars.pillar_${i}.title`)}</h3>
              <p className="text-ink-soft mt-2 text-sm leading-relaxed">{t(`pillars.pillar_${i}.text`)}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
