import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { TESTIMONIALS } from '@/lib/data';
import { useTranslation } from 'react-i18next';

export default function Testimonials() {
  const { t } = useTranslation();

  return (
    <Section
      eyebrow={t('testimonials.eyebrow')}
      title={t('testimonials.title')}
      lead={t('testimonials.lead')}
      className="bg-primary-900 text-white"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {TESTIMONIALS.map((te, i) => (
          <motion.div
            key={te.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10"
          >
            <Quote className="mb-3 h-7 w-7 text-accent-400" />
            <p className="text-sm leading-relaxed text-primary-50/90">&quot;{t(`testimonials.items.${te.name}.quote`)}&quot;</p>
            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="font-medium text-white">{te.name}</p>
              <p className="text-xs text-primary-100/70">{t(`testimonials.items.${te.name}.role`)}</p>
              <p className="text-xs text-accent-300 mt-1">{te.program} · Promo {te.promo}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
