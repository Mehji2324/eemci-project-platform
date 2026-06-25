import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { PageHeader } from '@/components/ui/PageHeader';

const GRADES = [
  { student:'Sofia Alami',   course:'Finance d\'entreprise', grade:16.5 },
  { student:'Karim Naciri',  course:'Marketing digital',     grade:14.0 },
  { student:'Hicham Bennani',course:'Cybersécurité',         grade:18.0 },
  { student:'Imane El Idrissi', course:'Stratégie RH',       grade:15.5 },
  { student:'Yassine Berrada', course:'Logistique globale',  grade:12.5 }
];
const tone = (g:number) => g>=16 ? 'emerald' : g>=12 ? 'primary' : 'rose';

export default function Grades() {
  return (
    <div className="space-y-6">
      <PageHeader title="Notes" description="Dernières évaluations saisies par les équipes pédagogiques." />
      <Card>
        <CardHeader><CardTitle>Dernières notes saisies</CardTitle></CardHeader>
        <CardBody>
          <DataTable
            data={GRADES}
            rowKey={(g) => `${g.student}-${g.course}`}
            columns={[
              { key: 'student', header: 'Étudiant', cell: (g) => <span className="font-medium text-ink">{g.student}</span> },
              { key: 'course', header: 'Matière', cell: (g) => <span className="text-ink-soft">{g.course}</span> },
              { key: 'grade', header: 'Note /20', cell: (g) => <span className="font-display font-semibold text-ink">{g.grade}</span> },
              { key: 'mention', header: 'Mention', cell: (g) => <Badge tone={tone(g.grade)}>{g.grade>=16?'Très bien':g.grade>=14?'Bien':g.grade>=12?'Assez bien':'Insuffisant'}</Badge> },
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}
