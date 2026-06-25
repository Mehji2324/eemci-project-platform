import { Users, GraduationCap, CreditCard, CalendarCheck } from 'lucide-react';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card, CardHeader, CardBody, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/PageHeader';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

const ENROLL = [
  { m:'Sep',v:120 },{m:'Oct',v:180},{m:'Nov',v:160},{m:'Déc',v:200},
  { m:'Jan',v:240 },{m:'Fév',v:210},{m:'Mar',v:280},{m:'Avr',v:320}
];
const REV = [
  { m:'Sep',v:1.2 },{m:'Oct',v:1.8},{m:'Nov',v:1.5},{m:'Déc',v:2.0},
  { m:'Jan',v:2.4 },{m:'Fév',v:2.1},{m:'Mar',v:2.8},{m:'Avr',v:3.1}
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Console admin"
        title="Bonjour, Admin"
        description="Voici un aperçu de l'activité EEMCI aujourd'hui."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Étudiants actifs" value="1 284" trend={12} icon={<Users className="w-4 h-4" />} tone="primary" />
        <KpiCard label="Enseignants" value="96" trend={3} icon={<GraduationCap className="w-4 h-4" />} tone="accent" />
        <KpiCard label="Revenus (MAD)" value="24M" trend={8} icon={<CreditCard className="w-4 h-4" />} tone="emerald" />
        <KpiCard label="Taux d'assiduité" value="87%" trend={-2} icon={<CalendarCheck className="w-4 h-4" />} tone="red" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Évolution des inscriptions</CardTitle>
              <CardDescription>Progression mensuelle des nouveaux inscrits.</CardDescription>
            </div>
            <Badge tone="primary">Année 2025-26</Badge>
          </CardHeader>
          <CardBody className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ENROLL}>
                <defs>
                  <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="m" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="v" stroke="#1E3A8A" fill="url(#gp)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenus mensuels</CardTitle>
            <CardDescription>Montants en millions MAD.</CardDescription>
          </CardHeader>
          <CardBody className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REV}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="m" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip />
                <Bar dataKey="v" fill="#D4A017" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Candidatures récentes</CardTitle></CardHeader>
          <CardBody>
            <ul className="divide-y divide-slate-100">
              {[
                { n:'Imane El Idrissi', p:'Master Finance', s:'Nouveau' },
                { n:'Yassine Berrada',  p:'Bachelor Marketing Digital', s:'En revue' },
                { n:'Sara Tazi',        p:'Master RH', s:'Accepté' },
                { n:'Anas Chraibi',     p:'Doctorat Européen', s:'En revue' }
              ].map(r => (
                <li key={r.n} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="font-medium text-sm">{r.n}</p>
                    <p className="text-xs text-ink-soft">{r.p}</p>
                  </div>
                  <Badge tone={r.s==='Accepté'?'emerald':r.s==='Nouveau'?'primary':'accent'}>{r.s}</Badge>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Paiements en attente</CardTitle></CardHeader>
          <CardBody>
            <ul className="divide-y divide-slate-100">
              {[
                { n:'Sofia Alami',   a:'12 000 MAD', d:'15 j' },
                { n:'Karim Naciri',  a:'8 500 MAD',  d:'22 j' },
                { n:'Hicham Bennani',a:'18 000 MAD', d:'30 j' },
                { n:'Nadia Senhaji', a:'6 200 MAD',  d:'5 j' }
              ].map(r => (
                <li key={r.n} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="font-medium text-sm">{r.n}</p>
                    <p className="text-xs text-ink-soft">Échéance dans {r.d}</p>
                  </div>
                  <span className="font-display font-semibold">{r.a}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
