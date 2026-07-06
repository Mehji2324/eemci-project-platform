import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { PROGRAMS } from '@/lib/data';
import { Search, GraduationCap, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';

const LEVELS = ['Tous','Bac+2','Bac+3','Bac+5','Bac+8'];
const SCHOOLS = [
  { v:'tous', l:'Toutes écoles' },
  { v:'management-commerce-it', l:'Management & IT' },
  { v:'hospitality-tourism', l:'Hôtellerie & Tourisme' }
];

export default function Programs() {
  const [params] = useSearchParams();
  const [q, setQ] = useState('');
  const [level, setLevel] = useState('Tous');
  const [school, setSchool] = useState(params.get('school') ?? 'tous');

  const list = useMemo(() => PROGRAMS.filter(p =>
    (level==='Tous' || p.level===level) &&
    (school==='tous' || p.school===school) &&
    (q==='' || p.title.toLowerCase().includes(q.toLowerCase()))
  ), [q, level, school]);

  return (
    <Section eyebrow="Catalogue" title="Tous nos programmes diplômants"
      lead="Filtrez par niveau, école et domaine pour trouver le parcours qui vous correspond.">
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Rechercher un programme..." value={q} onChange={e=>setQ(e.target.value)} className="pl-10" />
        </div>
        <select value={level} onChange={e=>setLevel(e.target.value)}
          className="h-11 px-4 rounded-xl border border-surface-border bg-surface text-ink">
          {LEVELS.map(l => <option key={l}>{l}</option>)}
        </select>
        <select value={school} onChange={e=>setSchool(e.target.value)}
          className="h-11 px-4 rounded-xl border border-surface-border bg-surface text-ink">
          {SCHOOLS.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map(p => (
          <Link key={p.slug} to={`/programs/${p.slug}`}
            className="group p-6 bg-surface rounded-2xl border border-surface-border hover:border-primary-300 hover:shadow-soft transition">
            <div className="flex items-center justify-between">
              <Badge tone={p.school==='hospitality-tourism'?'emerald':'primary'}>{p.domain}</Badge>
              <span className={cn('text-xs font-medium',
                p.school==='hospitality-tourism'?'text-emerald-700':'text-primary-700')}>{p.level}</span>
            </div>
            <h3 className="font-display text-lg font-semibold mt-4 leading-snug group-hover:text-primary-700">{p.title}</h3>
            <p className="text-sm text-ink-soft mt-2 line-clamp-3">{p.summary}</p>
            <div className="mt-5 pt-4 border-t border-surface-border flex items-center justify-between text-xs text-ink-soft">
              <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" />{p.level}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{p.duration}</span>
            </div>
          </Link>
        ))}
        {list.length===0 && (
          <div className="md:col-span-3 p-12 text-center text-ink-soft">Aucun programme ne correspond à votre recherche.</div>
        )}
      </div>
    </Section>
  );
}
