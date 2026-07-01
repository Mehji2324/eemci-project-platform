import { useState, useEffect } from 'react';
import { Plus, Search, File, MoreHorizontal, Download, X } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { api } from '@/lib/api';
import { type AppDocument, DOCUMENT_TYPES } from '@/types/document';
import { toast } from '@/hooks/useToast';

export default function AdminDocuments() {
  const [q, setQ] = useState('');
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<AppDocument[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(DOCUMENT_TYPES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [classeId, setClasseId] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    fetchDocuments();
    fetchOptions();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchOptions = async () => {
    try {
      const [clsRes, modRes] = await Promise.all([
        api.get('/classes'),
        api.get('/modules')
      ]);
      setClasses(clsRes.data.data ?? clsRes.data ?? []);
      setModules(modRes.data.data ?? modRes.data ?? []);
    } catch (e) {
      console.error(e);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Veuillez sélectionner un fichier');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('file', file);
    if (classeId) formData.append('classe_id', classeId);
    if (moduleId) formData.append('module_id', moduleId);
    formData.append('is_public', isPublic ? '1' : '0');

    try {
      await api.post('/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Document ajouté avec succès');
      setIsModalOpen(false);
      resetForm();
      fetchDocuments();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erreur lors de l\'ajout');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setType(DOCUMENT_TYPES[0]);
    setFile(null);
    setClasseId('');
    setModuleId('');
    setIsPublic(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce document ?')) return;
    try {
      await api.delete(`/documents/${id}`);
      toast.success('Document supprimé');
      setOpenMenu(null);
      fetchDocuments();
    } catch (e: any) {
      toast.error(e.response?.data?.message || 'Erreur suppression');
    }
  };

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
      
      // Optimistic update of download count
      setList(list.map(d => d.id === doc.id ? { ...d, download_count: d.download_count + 1 } : d));
    } catch (e) {
      toast.error('Erreur lors du téléchargement');
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des Documents"
        description={`Gérez tous les documents académiques et administratifs.`}
        actions={<Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setIsModalOpen(true)}>Ajouter</Button>}
      />

      <Card>
        <CardBody className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Rechercher..." value={q} onChange={e=>setQ(e.target.value)} className="pl-10" />
          </div>
          <DataTable
            data={filtered}
            rowKey={(r) => r.id}
            columns={[
              { key: 'title', header: 'Titre', cell: (r) => (
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-emerald-600" />
                  <div>
                    <div className="font-medium text-ink">{r.title}</div>
                    <div className="text-xs text-ink-soft">{r.type}</div>
                  </div>
                </div>
              ) },
              { key: 'uploader', header: 'Ajouté par', cell: (r) => <span className="text-ink-soft">{r.uploaded_by?.name ?? '—'}</span> },
              { key: 'context', header: 'Contexte', cell: (r) => (
                <div className="text-xs">
                  {r.classe && <Badge tone="slate" className="mb-1">{r.classe.name}</Badge>}
                  {r.module && <Badge tone="primary">{r.module.name}</Badge>}
                  {!r.classe && !r.module && (r.is_public ? <Badge tone="emerald">Public</Badge> : <span className="text-ink-soft">—</span>)}
                </div>
              )},
              { key: 'size', header: 'Taille', cell: (r) => <span className="text-ink-soft font-mono text-xs">{(r.size ? (r.size / 1024 / 1024).toFixed(2) : '0.00') + ' MB'}</span> },
              { key: 'downloads', header: 'Téléchargements', cell: (r) => <span className="text-ink-soft">{r.download_count}</span> },
              { key: 'actions', header: <span className="sr-only">Actions</span>, headerClassName: 'w-10', cell: (s: AppDocument) => (
                <div className="relative">
                  <button
                    className="rounded-lg p-1.5 text-ink-soft transition hover:bg-white hover:text-ink"
                    onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === s.id ? null : s.id); }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  {openMenu === s.id && (
                    <div className="absolute right-0 z-50 mt-1 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-emerald-600 hover:bg-slate-50"
                        onClick={() => { setOpenMenu(null); handleDownload(s); }}
                      >
                        <Download className="h-4 w-4" /> Télécharger
                      </button>
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-slate-50 border-t border-slate-100"
                        onClick={() => handleDelete(s.id)}
                      >
                        <X className="h-4 w-4" /> Supprimer
                      </button>
                    </div>
                  )}
                </div>
              ) },
            ]}
          />
        </CardBody>
      </Card>
      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Nouveau Document</h2>
                <button onClick={() => { setIsModalOpen(false); resetForm(); }}><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Titre" required value={title} onChange={e => setTitle(e.target.value)} />
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea 
                    className="w-full rounded-lg border border-slate-300 p-2 text-sm" 
                    rows={3} 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Type de document</label>
                  <select className="w-full rounded-lg border border-slate-300 p-2 text-sm" value={type} onChange={e => setType(e.target.value as any)}>
                    {DOCUMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Classe (Optionnel)</label>
                    <select className="w-full rounded-lg border border-slate-300 p-2 text-sm" value={classeId} onChange={e => setClasseId(e.target.value)}>
                      <option value="">-- Aucune --</option>
                      {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Module (Optionnel)</label>
                    <select className="w-full rounded-lg border border-slate-300 p-2 text-sm" value={moduleId} onChange={e => setModuleId(e.target.value)}>
                      <option value="">-- Aucun --</option>
                      {modules.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isPublic" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
                  <label htmlFor="isPublic" className="text-sm font-medium">Document public (visible par tous les étudiants autorisés)</label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Fichier (Max 20MB)</label>
                  <input 
                    type="file" 
                    required 
                    onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full rounded-lg border border-slate-300 p-2 text-sm bg-slate-50"
                  />
                </div>

                <Button type="submit" className="w-full">Uploader le document</Button>
              </form>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
