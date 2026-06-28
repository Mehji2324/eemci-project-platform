import { useState, useEffect } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { Search, File, Download } from 'lucide-react';
import { api } from '@/lib/api';
import type { AppDocument } from '@/types/document';
import { toast } from '@/hooks/useToast';

export default function PortalDocuments() {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<AppDocument[]>([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await api.get('/documents');
      setList(res.data.data ?? res.data);
    } catch (e) {
      console.error(e);
      toast.error('Erreur lors du chargement des documents');
    } finally {
      setLoading(false);
    }
  };

  const filtered = list.filter(d => {
    const searchStr = (d.title + ' ' + (d.description || '')).toLowerCase();
    return searchStr.includes(q.toLowerCase());
  });

  const handleDownload = async (doc: AppDocument) => {
    try {
      const res = await api.get(`/documents/${doc.id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      const extension = doc.mime_type.split('/')[1] || 'pdf';
      link.setAttribute('download', `${doc.title.replace(/\s+/g, '_')}.${extension}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      
      setList(list.map(d => d.id === doc.id ? { ...d, download_count: d.download_count + 1 } : d));
    } catch (e) {
      toast.error('Erreur lors du téléchargement');
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ressources & Documents"
        description="Accédez aux supports de cours, documents administratifs et ressources pédagogiques."
      />

      <Card>
        <CardBody className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Rechercher par titre ou description..." value={q} onChange={e=>setQ(e.target.value)} className="pl-10" />
          </div>
          <DataTable
            data={filtered}
            rowKey={(r) => r.id}
            columns={[
              { key: 'title', header: 'Document', cell: (r) => (
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                    <File className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-ink">{r.title}</div>
                    <div className="text-xs text-ink-soft max-w-md truncate">{r.description}</div>
                  </div>
                </div>
              ) },
              { key: 'details', header: 'Détails', cell: (r) => (
                <div className="text-xs space-y-1">
                  <div>Type: <span className="font-medium">{r.type}</span></div>
                  <div>Module: <span className="text-ink-soft">{r.module?.name ?? '—'}</span></div>
                  <div>Prof: <span className="text-ink-soft">{r.uploaded_by?.name ?? 'Administration'}</span></div>
                </div>
              )},
              { key: 'meta', header: 'Fichier', cell: (r) => (
                <div className="text-xs text-ink-soft">
                  <div>{(r.size / 1024 / 1024).toFixed(2)} MB</div>
                  <div>{new Date(r.created_at).toLocaleDateString()}</div>
                </div>
              )},
              { key: 'actions', header: <span className="sr-only">Actions</span>, headerClassName: 'w-10', cell: (s: AppDocument) => (
                <button
                  className="rounded-lg bg-slate-100 p-2 text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-600"
                  onClick={() => handleDownload(s)}
                  title="Télécharger"
                >
                  <Download className="h-4 w-4" />
                </button>
              ) },
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}
