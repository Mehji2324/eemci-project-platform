import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const DOMAIN = [
  { name:'Management', v:340 },{name:'Finance',v:220},{name:'IT',v:180},
  { name:'Marketing', v:160 },{name:'Commerce Int.',v:140},{name:'Tourisme',v:120}
];
const COLORS = ['#1E3A8A','#D4A017','#0F766E','#7B9CFF','#F5C842','#10B981'];
const PERF = [
  { m:'Sep',v:13.4 },{ m:'Oct',v:14.1 },{ m:'Nov',v:13.9 },
  { m:'Déc',v:14.5 },{ m:'Jan',v:14.8 },{ m:'Fév',v:15.1 }
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <PageHeader title="Rapports" description="Indicateurs académiques et analytiques consolidés." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Répartition par domaine</CardTitle></CardHeader>
          <CardBody className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={DOMAIN} dataKey="v" nameKey="name" innerRadius={60} outerRadius={110} paddingAngle={2}>
                  {DOMAIN.map((_,i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle>Moyenne générale /20</CardTitle></CardHeader>
          <CardBody className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PERF}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="m" stroke="#64748B" fontSize={12} />
                <YAxis domain={[10,20]} stroke="#64748B" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke="#1E3A8A" strokeWidth={3} dot={{r:5,fill:'#D4A017'}} />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
