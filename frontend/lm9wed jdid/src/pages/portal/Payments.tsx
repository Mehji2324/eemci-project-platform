import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DataTable } from '@/components/ui/DataTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { Download } from 'lucide-react';

const P = [
  { ref:'INV-2025-0142', label:'Tranche 1 - Sept 2025', amt:12000, status:'paid' },
  { ref:'INV-2025-0287', label:'Tranche 2 - Déc 2025',  amt:12000, status:'paid' },
  { ref:'INV-2026-0011', label:'Tranche 3 - Mars 2026', amt:12000, status:'pending' }
];

export default function PortalPayments() {
  return (
    <div className="space-y-6">
      <PageHeader title="Paiements" description="Historique des factures, reçus et règlements." />
      <Card>
        <CardHeader><CardTitle>Historique des paiements</CardTitle></CardHeader>
        <CardBody>
          <DataTable
            data={P}
            rowKey={(p) => p.ref}
            columns={[
              { key: 'ref', header: 'Référence', cell: (p) => <span className="font-mono text-xs text-ink-soft">{p.ref}</span> },
              { key: 'label', header: 'Libellé', cell: (p) => <span className="font-medium text-ink">{p.label}</span> },
              { key: 'amount', header: 'Montant', cell: (p) => <span className="font-display font-semibold text-ink">{p.amt.toLocaleString('fr-FR')} MAD</span> },
              { key: 'status', header: 'Statut', cell: (p) => <Badge tone={p.status==='paid'?'emerald':'accent'}>{p.status==='paid'?'Payé':'À régler'}</Badge> },
              { key: 'action', header: <span className="sr-only">Action</span>, cell: (p) => (
                p.status==='paid'
                  ? <Button variant="ghost" size="sm" leftIcon={<Download className="h-3.5 w-3.5" />}>Reçu</Button>
                  : <Button variant="accent" size="sm">Payer</Button>
              ) },
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}
