import { Badge } from '@/components/ui/Badge';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { PageHeader } from '@/components/ui/PageHeader';

const ROWS = [
  { name:'Sofia Alami', group:'Master Finance M1', rate:96, last:'Présent' },
  { name:'Karim Naciri', group:'Master Finance M1', rate:88, last:'Présent' },
  { name:'Hicham Bennani', group:'Bachelor Finance', rate:92, last:'Absent' },
  { name:'Imane El Idrissi', group:'Master Finance M2', rate:94, last:'Présent' },
  { name:'Yassine Berrada', group:'Bachelor Finance', rate:81, last:'Retard' },
];

export default function TeacherAttendance() {
  return (
    <div className="space-y-6">
      <PageHeader title="Présences" description="Suivi des présences pour vos groupes et séances récentes." />
      <Card>
        <CardHeader>
          <CardTitle>Séance récente · Finance d'entreprise</CardTitle>
        </CardHeader>
        <CardBody>
          <DataTable
            data={ROWS}
            rowKey={(row) => row.name}
            columns={[
              { key:'name', header:'Étudiant', cell:(row) => <span className="font-medium text-ink">{row.name}</span> },
              { key:'group', header:'Groupe', cell:(row) => <span className="text-ink-soft">{row.group}</span> },
              { key:'rate', header:'Assiduité', cell:(row) => <span className="font-display font-semibold text-ink">{row.rate}%</span> },
              { key:'last', header:'Dernière séance', cell:(row) => (
                <Badge tone={row.last === 'Présent' ? 'emerald' : row.last === 'Retard' ? 'accent' : 'rose'}>{row.last}</Badge>
              ) },
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}
