import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';
import { GraduationCap, CreditCard, CalendarCheck, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from '@/hooks/useToast';
import type { DashboardStats } from '@/types/report';

export default function PortalReports() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/reports/dashboard');
      setStats(res.data.data);
    } catch (err) {
      toast.error('Erreur lors du chargement de vos analytiques');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-brand-600" /></div>;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <PageHeader title="Mon Suivi" description="Consultez votre progression, absences et paiements." />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <KpiCard title="Moyenne Générale" value={`${stats.my_average?.toFixed(2) || '0.00'}/20`} icon={GraduationCap} />
        <KpiCard title="Total Paiements" value={`${stats.my_payments || 0} MAD`} icon={CreditCard} />
        <KpiCard title="Absences Cumulées" value={`${stats.my_absences || 0} H`} icon={CalendarCheck} />
      </div>
    </div>
  );
}
