import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';
import { Users, GraduationCap, FileText, CreditCard, Download, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from '@/hooks/useToast';
import type { DashboardStats } from '@/types/report';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function AdminReports() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [exporting, setExporting] = useState<string | null>(null);

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

  const handleExport = async (type: string, format: string) => {
    setExporting(`${type}-${format}`);
    try {
      const res = await api.get(`/reports/${type}?export=${format}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}_report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Export généré avec succès');
    } catch (err) {
      toast.error('Erreur lors de l\'export. Assurez-vous que les dépendances backend sont installées.');
    } finally {
      setExporting(null);
    }
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-brand-600" /></div>;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <PageHeader title="Rapports et Analytiques" description="Tableau de bord consolidé des performances et exports." />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Étudiants" value={stats.total_students} icon={<Users />} trend={{ value: 5, label: 'ce mois', isPositive: true }} />
        <KpiCard title="Revenus Validés" value={`${stats.total_payments.toLocaleString()} MAD`} icon={<CreditCard />} />
        <KpiCard title="Taux de Présence" value={`${stats.attendance_rate}%`} icon={<GraduationCap />} />
        <KpiCard title="Documents (DLs)" value={stats.document_downloads} icon={<FileText />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Évolution des Revenus (6 derniers mois)</CardTitle></CardHeader>
          <CardBody className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.revenue_trend || []}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#1E3A8A" fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Exports (CSV & PDF)</CardTitle></CardHeader>
          <CardBody>
            <div className="space-y-4">
              {['students', 'payments', 'attendance'].map(type => (
                <div key={type} className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                  <div className="capitalize font-medium text-slate-700">{type}</div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleExport(type, 'csv')}
                      disabled={exporting !== null}
                      className="flex items-center text-xs font-semibold text-brand-600 hover:text-brand-800 disabled:opacity-50"
                    >
                      <Download className="mr-1 h-3 w-3" /> CSV
                    </button>
                    <button
                      onClick={() => handleExport(type, 'pdf')}
                      disabled={exporting !== null}
                      className="flex items-center text-xs font-semibold text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      <Download className="mr-1 h-3 w-3" /> PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-slate-500">
              Note: PDF exports require the Barryvdh DOMPDF package on the backend.
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
