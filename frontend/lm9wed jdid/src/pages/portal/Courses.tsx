import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/PageHeader';

const COURSES = [
  { code:'FIN-501', title:'Finance d\'entreprise', teacher:'Dr. Alaoui', progress:65 },
  { code:'MKT-301', title:'Marketing digital',     teacher:'Pr. Berrada', progress:80 },
  { code:'ENG-201', title:'Anglais des affaires',  teacher:'Mrs. Smith', progress:45 },
  { code:'CTL-302', title:'Contrôle de gestion',   teacher:'M. Tahiri', progress:55 }
];

export default function PortalCourses() {
  return (
    <div className="space-y-6">
      <PageHeader title="Mes cours" description="Progression des modules suivis ce semestre." />
      <div className="grid gap-4 sm:grid-cols-2">
        {COURSES.map(c => (
          <Card key={c.code}><CardBody>
            <div className="flex items-center justify-between">
              <Badge tone="primary">{c.code}</Badge>
              <span className="text-xs text-ink-soft">{c.progress}% complété</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-ink">{c.title}</h3>
            <p className="text-sm text-ink-soft mt-1">{c.teacher}</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100" aria-label={`${c.progress}% complété`}>
              <div className="h-full rounded-full bg-primary-600" style={{width:`${c.progress}%`}} />
            </div>
          </CardBody></Card>
        ))}
      </div>
    </div>
  );
}
