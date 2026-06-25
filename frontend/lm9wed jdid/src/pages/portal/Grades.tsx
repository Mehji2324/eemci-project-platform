import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { PageHeader } from '@/components/ui/PageHeader';

const G = [
  { c:'Finance d\'entreprise', cc:14.5, exam:16.5, avg:15.5 },
  { c:'Marketing digital',     cc:13.0, exam:14.0, avg:13.5 },
  { c:'Anglais',               cc:17.0, exam:17.5, avg:17.25 },
  { c:'Contrôle de gestion',   cc:12.0, exam:13.5, avg:12.75 }
];
const tone = (g:number) => g>=16?'emerald':g>=12?'primary':'rose';

export default function PortalGrades() {
  return (
    <div className="space-y-6">
      <PageHeader title="Mes notes" description="Résultats du semestre en contrôle continu et examens." />
      <Card>
        <CardHeader><CardTitle>Semestre 3 — Moyenne 15.8/20</CardTitle></CardHeader>
        <CardBody>
          <DataTable
            data={G}
            rowKey={(g) => g.c}
            columns={[
              { key: 'course', header: 'Matière', cell: (g) => <span className="font-medium text-ink">{g.c}</span> },
              { key: 'cc', header: 'CC', cell: (g) => g.cc },
              { key: 'exam', header: 'Examen', cell: (g) => g.exam },
              { key: 'avg', header: 'Moyenne', cell: (g) => <Badge tone={tone(g.avg)}>{g.avg}/20</Badge> },
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}
