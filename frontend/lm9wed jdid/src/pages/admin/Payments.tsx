import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { KpiCard } from '@/components/ui/KpiCard';
import { DataTable } from '@/components/ui/DataTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { CreditCard, Clock, CheckCircle2 } from 'lucide-react';

const PAY = [
  { student:'Sofia Alami',   amt:12000, status:'paid' },
  { student:'Karim Naciri',  amt:8500,  status:'pending' },
  { student:'Hicham Bennani',amt:18000, status:'paid' },
  { student:'Imane El Idrissi', amt:6200, status:'overdue' },
  { student:'Yassine Berrada', amt:9000, status:'paid' }
];

export default function Payments() {
  return (
    <div className="space-y-6">
      <PageHeader title="Paiements" description="Suivi des encaissements, échéances et retards." />
      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Encaissé ce mois" value="3.1M MAD" trend={8} icon={<CheckCircle2 className="w-4 h-4" />} tone="emerald" />
        <KpiCard label="En attente" value="450K MAD" icon={<Clock className="w-4 h-4" />} tone="accent" />
        <KpiCard label="En retard" value="120K MAD" trend={-3} icon={<CreditCard className="w-4 h-4" />} tone="red" />
      </div>
      <Card>
        <CardHeader><CardTitle>Transactions récentes</CardTitle></CardHeader>
        <CardBody>
          <DataTable
            data={PAY}
            rowKey={(p) => p.student}
            columns={[
              { key: 'student', header: 'Étudiant', cell: (p) => <span className="font-medium text-ink">{p.student}</span> },
              { key: 'amount', header: 'Montant', cell: (p) => <span className="font-display font-semibold text-ink">{p.amt.toLocaleString('fr-FR')} MAD</span> },
              { key: 'status', header: 'Statut', cell: (p) => <Badge tone={p.status==='paid'?'emerald':p.status==='pending'?'accent':'rose'}>{p.status==='paid'?'Payé':p.status==='pending'?'En attente':'En retard'}</Badge> },
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}
