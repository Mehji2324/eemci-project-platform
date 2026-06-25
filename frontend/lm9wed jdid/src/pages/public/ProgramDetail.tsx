import { useParams, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { PROGRAMS } from '@/lib/data';
import { GraduationCap, Clock, BadgeCheck, Briefcase, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

const TABS = ['Présentation','Programme','Débouchés','Admission'] as const;

export default function ProgramDetail() {
  const { slug } = useParams();
  const p = PROGRAMS.find(x => x.slug === slug);
  const [tab, setTab] = useState<typeof TABS[number]>('Présentation');
  const [open, setOpen] = useState<string | null>(null);

  if (!p) return <Navigate to="/programs" replace />;

  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white pt-20 pb-12">
        <div className="container">
          <Link to="/programs" className="text-sm text-primary-100 hover:text-white">← Tous les programmes</Link>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge tone="accent">{p.level}</Badge>
            <Badge tone="slate">{p.domain}</Badge>
            <Badge tone="emerald">{p.school==='hospitality-tourism'?'Hôtellerie & Tourisme':'Management & IT'}</Badge>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-semibold mt-4 max-w-4xl leading-tight">{p.title}</h1>
          <p className="mt-4 text-lg text-primary-100/90 max-w-3xl">{p.summary}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex gap-1 border-b border-slate-200 mb-8 overflow-x-auto">
              {TABS.map(t => (
                <button key={t} onClick={()=>setTab(t)}
                  className={cn('px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap',
                    tab===t ? 'border-primary-600 text-primary-700' : 'border-transparent text-ink-soft hover:text-ink')}>
                  {t}
                </button>
              ))}
            </div>

            {tab==='Présentation' && (
              <div className="prose max-w-none">
                <h3 className="font-display text-2xl font-semibold">À propos du programme</h3>
                <p className="text-ink-soft">{p.summary}</p>
                <p className="text-ink-soft mt-4">Ce parcours combine fondamentaux théoriques, mises en pratique et stages encadrés. Les étudiants bénéficient d'un accompagnement individualisé et d'un accès au réseau professionnel EEMCI.</p>
              </div>
            )}

            {tab==='Programme' && (
              <div className="space-y-3">
                {p.curriculum.map(c => (
                  <div key={c.semester} className="border border-slate-200 rounded-2xl bg-white overflow-hidden">
                    <button onClick={()=>setOpen(open===c.semester ? null : c.semester)} className="w-full flex items-center justify-between p-5 text-left">
                      <span className="font-display text-lg font-semibold">{c.semester}</span>
                      <ChevronDown className={cn('w-5 h-5 transition', open===c.semester && 'rotate-180')} />
                    </button>
                    {open===c.semester && (
                      <ul className="px-5 pb-5 space-y-2">
                        {c.courses.map(course => (
                          <li key={course} className="flex items-center gap-2 text-ink-soft text-sm">
                            <BadgeCheck className="w-4 h-4 text-primary-600" />{course}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {tab==='Débouchés' && (
              <div className="grid sm:grid-cols-2 gap-4">
                {p.careers.map(c => (
                  <Card key={c}><CardBody>
                    <Briefcase className="w-6 h-6 text-accent-500" />
                    <h4 className="font-display text-lg font-semibold mt-3">{c}</h4>
                    <p className="text-sm text-ink-soft mt-1">Secteur en forte demande au Maroc et à l'international.</p>
                  </CardBody></Card>
                ))}
              </div>
            )}

            {tab==='Admission' && (
              <div className="space-y-4 text-ink-soft">
                <p>L'admission se fait sur étude de dossier et entretien de motivation. Conditions générales :</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Diplôme requis selon le niveau (Bac, Bac+2, Bac+3, etc.)</li>
                  <li>Dossier de candidature complet</li>
                  <li>Entretien individuel</li>
                  <li>Test de positionnement le cas échéant</li>
                </ul>
                <Link to="/admissions/apply"><Button className="mt-4" rightIcon={<ArrowRight className="w-4 h-4" />}>Postuler maintenant</Button></Link>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 self-start">
            <Card>
              <CardBody className="space-y-4">
                <h3 className="font-display text-xl font-semibold">En bref</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-primary-600" /><span>{p.level}</span></div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary-600" /><span>{p.duration}</span></div>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs text-ink-soft">Frais de scolarité</p>
                  <p className="font-display text-2xl font-semibold">{p.tuition}</p>
                </div>
                <Link to="/admissions/apply"><Button className="w-full" size="lg">Candidater</Button></Link>
                <Link to="/contact"><Button className="w-full" variant="outline" size="lg">Demander une brochure</Button></Link>
              </CardBody>
            </Card>
          </aside>
        </div>
      </section>
    </>
  );
}
