import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { SCHOOLS } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function Schools() {
  return (
    <Section eyebrow="Nos écoles" title="Deux écoles, une même exigence">
      <div className="space-y-10">
        {SCHOOLS.map((s,i) => (
          <div key={s.slug} className={`grid md:grid-cols-2 gap-8 items-center ${i%2?'md:flex-row-reverse':''}`}>
            <img src={s.image} alt={s.name} className="rounded-4xl w-full h-[380px] object-cover shadow-soft" />
            <div>
              <h3 className="font-display text-3xl font-semibold">{s.name}</h3>
              <p className="mt-3 text-ink-soft text-lg">{s.short}</p>
              <ul className="mt-5 space-y-2">
                {s.bullets.map(b => <li key={b} className="text-ink">• {b}</li>)}
              </ul>
              <Link to={`/programs?school=${s.slug}`} className="inline-block mt-6">
                <Button rightIcon={<ArrowRight className="w-4 h-4" />}>Voir les programmes</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
