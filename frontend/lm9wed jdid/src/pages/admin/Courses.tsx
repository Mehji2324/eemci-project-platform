import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/PageHeader';
import { Plus, Users, Clock } from 'lucide-react';

const COURSES = [
  { code:'FIN-501', title:'Finance d\'entreprise', teacher:'Dr. Alaoui', students:42, hours:60 },
  { code:'MKT-301', title:'Marketing digital',     teacher:'Pr. Berrada', students:38, hours:45 },
  { code:'IT-505',  title:'Cybersécurité avancée', teacher:'M. Boutaleb', students:24, hours:60 },
  { code:'RH-401',  title:'Stratégie RH',          teacher:'Mme Cherkaoui', students:30, hours:45 },
  { code:'CI-502',  title:'Logistique globale',    teacher:'Dr. El Mansouri', students:28, hours:60 },
  { code:'TOU-403', title:'Yield management',      teacher:'Pr. Filali', students:22, hours:30 }
];

export default function Courses() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cours"
        description={`${COURSES.length} cours actifs ce semestre.`}
        actions={<Button leftIcon={<Plus className="h-4 w-4" />}>Nouveau cours</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map(c => (
          <Card key={c.code}><CardBody>
            <Badge tone="primary">{c.code}</Badge>
            <h3 className="mt-3 font-display text-lg font-semibold text-ink">{c.title}</h3>
            <p className="text-sm text-ink-soft mt-1">{c.teacher}</p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium text-ink-soft">
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{c.students} étudiants</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{c.hours}h</span>
            </div>
          </CardBody></Card>
        ))}
      </div>
    </div>
  );
}
