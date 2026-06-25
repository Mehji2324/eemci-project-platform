import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { Plus, Mail } from 'lucide-react';

const TEACHERS = [
  { name:'Dr. Hicham Alaoui',     dept:'Finance',      courses:4, email:'h.alaoui@eemci.ma' },
  { name:'Pr. Nadia Berrada',     dept:'Marketing',    courses:3, email:'n.berrada@eemci.ma' },
  { name:'M. Karim Boutaleb',     dept:'IT',           courses:5, email:'k.boutaleb@eemci.ma' },
  { name:'Mme Salma Cherkaoui',   dept:'RH',           courses:3, email:'s.cherkaoui@eemci.ma' },
  { name:'Dr. Younes El Mansouri',dept:'Commerce Int.',courses:4, email:'y.elmansouri@eemci.ma' },
  { name:'Pr. Imane Filali',      dept:'Tourisme',     courses:3, email:'i.filali@eemci.ma' }
];

export default function Teachers() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Enseignants"
        description="Corps professoral EEMCI et affectations pédagogiques."
        actions={<Button leftIcon={<Plus className="h-4 w-4" />}>Inviter</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEACHERS.map(t => (
          <Card key={t.email}><CardBody>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary-700 text-sm font-semibold text-white">
                {t.name.split(' ').slice(-2).map(s=>s[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{t.name}</p>
                <p className="text-xs text-ink-soft">{t.dept}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Badge tone="primary">{t.courses} cours</Badge>
              <a href={`mailto:${t.email}`} className="rounded-lg p-2 text-ink-soft transition hover:bg-slate-50 hover:text-primary-600" aria-label={`Envoyer un email à ${t.name}`}><Mail className="h-4 w-4" /></a>
            </div>
          </CardBody></Card>
        ))}
      </div>
    </div>
  );
}
