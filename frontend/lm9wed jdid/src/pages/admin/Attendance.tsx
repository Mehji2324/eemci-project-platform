import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const DATA = [
  { d:'Lun', present:92, absent:8 },{ d:'Mar', present:88, absent:12 },
  { d:'Mer', present:94, absent:6 },{ d:'Jeu', present:90, absent:10 },
  { d:'Ven', present:85, absent:15 }
];
const STUDENTS = [
  { name:'Sofia Alami', days:[true,true,true,true,true] },
  { name:'Karim Naciri', days:[true,false,true,true,true] },
  { name:'Hicham Bennani', days:[true,true,true,false,true] },
  { name:'Imane El Idrissi', days:[true,true,true,true,false] },
  { name:'Yassine Berrada', days:[false,true,true,true,true] }
];

export default function Attendance() {
  return (
    <div className="space-y-6">
      <PageHeader title="Présences" description="Suivi hebdomadaire de l'assiduité par programme." />
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Assiduité hebdomadaire</CardTitle>
          <Badge tone="emerald">Moyenne : 89.8%</Badge>
        </CardHeader>
        <CardBody className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="d" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip />
              <Bar dataKey="present" stackId="a" fill="#10B981" radius={[0,0,0,0]} />
              <Bar dataKey="absent"  stackId="a" fill="#EF4444" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>Présences récentes — Master Finance · M1</CardTitle></CardHeader>
        <CardBody>
          <DataTable
            data={STUDENTS}
            rowKey={(row) => row.name}
            columns={[
              { key: 'student', header: 'Étudiant', cell: (row) => <span className="font-medium text-ink">{row.name}</span> },
              ...['Lun','Mar','Mer','Jeu','Ven'].map((day, index) => ({
                key: day,
                header: day,
                cell: (row: typeof STUDENTS[number]) => (
                  <span
                    className={`inline-block h-3 w-3 rounded-full ${row.days[index] ? 'bg-emerald-500' : 'bg-rose-400'}`}
                    aria-label={row.days[index] ? 'Présent' : 'Absent'}
                  />
                ),
              })),
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}
