import { Card, CardBody } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/PageHeader';
import { Award, CalendarCheck, Wallet, Clock } from 'lucide-react';

export default function PortalDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Semestre 3 · 2025-26"
        title="Bonjour Salma"
        description="Prochain cours : Marketing Digital · 10h00 · Salle B12"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Moyenne générale" value="15.8/20" icon={<Award className="w-4 h-4" />} tone="primary" />
        <KpiCard label="Assiduité" value="94%" icon={<CalendarCheck className="w-4 h-4" />} tone="emerald" />
        <KpiCard label="Solde" value="0 MAD" icon={<Wallet className="w-4 h-4" />} tone="emerald" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardBody>
            <h3 className="mb-4 font-display text-lg font-semibold text-ink">Aujourd'hui</h3>
            <div className="space-y-3">
              {[
                { t:'10:00', c:'Marketing Digital', r:'Salle B12' },
                { t:'13:30', c:'Analyse financière', r:'Salle A05' },
                { t:'15:30', c:'Anglais des affaires', r:'Salle C03' }
              ].map((s,i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg p-3 transition hover:bg-slate-50">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary-50 text-primary-700">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{s.c}</p>
                    <p className="text-xs text-ink-soft">{s.t} · {s.r}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="mb-4 font-display text-lg font-semibold text-ink">Dernières notes</h3>
            <div className="space-y-3">
              {[
                { c:'Finance d\'entreprise', g:16.5 },
                { c:'Marketing digital', g:14.0 },
                { c:'Anglais', g:17.0 }
              ].map((g,i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span>{g.c}</span>
                  <Badge tone={g.g>=16?'emerald':g.g>=12?'primary':'red'}>{g.g}/20</Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
