import { Section } from '@/components/ui/Section';
import { NEWS } from '@/lib/data';
import { Calendar } from 'lucide-react';

export default function News() {
  return (
    <Section eyebrow="Actualités" title="L'actualité de l'EEMCI">
      <div className="grid md:grid-cols-3 gap-5">
        {NEWS.map(n => (
          <article key={n.id} className="p-6 bg-white rounded-2xl border border-slate-200/70 hover:shadow-soft transition">
            <p className="text-xs text-ink-soft flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(n.date).toLocaleDateString('fr-FR')}</p>
            <h3 className="font-display text-xl font-semibold mt-3 leading-snug">{n.title}</h3>
            <p className="text-sm text-ink-soft mt-2">{n.excerpt}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
