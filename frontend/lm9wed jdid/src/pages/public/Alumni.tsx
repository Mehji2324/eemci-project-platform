import { Section } from '@/components/ui/Section';
import { TESTIMONIALS } from '@/lib/data';
import { Quote } from 'lucide-react';

export default function Alumni() {
  return (
    <Section eyebrow="Alumni" title="Un réseau qui ouvre les portes"
      lead="Plus de 1 200 diplômés actifs au Maroc, en Europe et à l'international.">
      <div className="grid md:grid-cols-2 gap-5">
        {TESTIMONIALS.map(t => (
          <div key={t.name} className="p-7 bg-white rounded-2xl border border-slate-200/70">
            <Quote className="w-7 h-7 text-accent-500 mb-3" />
            <p className="text-ink-soft leading-relaxed">"{t.quote}"</p>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="font-display text-lg font-semibold">{t.name}</p>
              <p className="text-sm text-ink-soft">{t.role}</p>
              <p className="text-xs text-primary-600 mt-1">{t.program} · Promo {t.promo}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
