import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';
import { BookOpen, GraduationCap, Calendar, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from '@/hooks/useToast';
import type { DashboardStats } from '@/types/report';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function TeacherReports() {
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
      toast.error('Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-brand-600" /></div>;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <PageHeader title="Mes Analytiques" description="Indicateurs clés de vos classes et modules." />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Classes Assignées" value={stats.total_classes} icon={GraduationCap} />
        <KpiCard title="Modules Actifs" value={stats.total_modules} icon={BookOpen} />
        <KpiCard title="Moyenne des notes" value={`${stats.average_grade.toFixed(2)}/20`} icon={Calendar} />
      </div>

      <Card>
        <CardHeader><CardTitle>Aperçu (Demo - Données fictives)</CardTitle></CardHeader>
        <CardBody className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[{name: 'Math', val: 14}, {name: 'Physique', val: 12}]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 20]} />
              <Tooltip />
              <Bar dataKey="val" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  );
}
