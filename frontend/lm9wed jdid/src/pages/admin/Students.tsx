import { useState, useEffect } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { Search, Plus, MoreHorizontal, X } from 'lucide-react';
import { api } from '@/lib/api';

export default function Students() {
  const [q, setQ] = useState('');
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    first_name: '', 
    last_name: '', 
    email: '', 
    password: '', 
    password_confirmation: '', 
    phone: '', 
    date_of_birth: '', 
    place_of_birth: '', 
    gender: 'M', 
    nationality: '', 
    address: '', 
    guardian_name: '', 
    guardian_phone: '' 
  });
  const [error, setError] = useState('');
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await api.get('/students');
      setList(res.data.data ?? res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = list.filter(s => {
    const name = (s.user?.first_name + ' ' + s.user?.last_name).toLowerCase();
    const mat = String(s.matricule ?? s.id ?? '').toLowerCase();
    return name.includes(q.toLowerCase()) || mat.includes(q.toLowerCase());
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', formData);
      setIsModalOpen(false);
      setFormData({ 
        first_name: '', 
        last_name: '', 
        email: '', 
        password: '', 
        password_confirmation: '', 
        phone: '', 
        date_of_birth: '', 
        place_of_birth: '', 
        gender: 'M', 
        nationality: '', 
        address: '', 
        guardian_name: '', 
        guardian_phone: '' 
      });
      alert('Étudiant ajouté avec succès');
      fetchStudents();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Étudiants"
        description={`${filtered.length} étudiants enregistrés dans le système académique.`}
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
              { key: 'matricule', header: 'ID', cell: (r) => <span className="font-mono text-xs text-ink-soft">{r.matricule ?? r.id}</span> },
              { key: 'name', header: 'Nom', cell: (r) => <span className="font-medium text-ink">{r.user?.first_name + ' ' + r.user?.last_name}</span> },
              { key: 'program', header: 'Programme', cell: (r) => <span className="text-ink-soft">{r.filiere?.name ?? '—'}</span> },
              { key: 'level', header: 'Niveau', cell: (r) => <Badge tone="slate">{r.classe?.level ?? '—'}</Badge> },
              { key: 'status', header: 'Statut', cell: (r) => <Badge tone={r.status==='active'?'emerald':'accent'}>{r.status}</Badge> },
              { key: 'actions', header: <span className="sr-only">Actions</span>, headerClassName: 'w-10', cell: (s: any) => (
                <div className="relative">
                  <button
                    className="rounded-lg p-1.5 text-ink-soft transition hover:bg-white hover:text-ink"
                    aria-label="Actions étudiant"
                    onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === s.id ? null : s.id); }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  {openMenu === s.id && (
                    <div className="absolute right-0 z-50 mt-1 w-40 rounded-lg border border-slate-200 bg-white shadow-lg">
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-emerald-600 hover:bg-slate-50"
                        onClick={async () => {
                          try {
                            await api.post(`/admin/students/${s.id}/validate`, {});
                            setOpenMenu(null);
                            fetchStudents();
                          } catch(e: any) {
                            alert(e.response?.data?.message || 'Erreur validation');
                          }
                        }}
                      >
                        ✓ Valider
                      </button>
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-slate-50"
                        onClick={async () => {
                          const reason = prompt('Raison du rejet:');
                          if (!reason) return;
                          try {
                            await api.post(`/admin/students/${s.id}/reject`, { reason });
                            setOpenMenu(null);
                            fetchStudents();
                          } catch(e: any) {
                            alert(e.response?.data?.message || 'Erreur rejet');
                          }
                        }}
                      >
                        ✗ Rejeter
                      </button>
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                        onClick={async () => {
                          if (!confirm('Supprimer cet étudiant?')) return;
                          try {
                            await api.delete(`/students/${s.id}`);
                            setOpenMenu(null);
                            fetchStudents();
                          } catch(e: any) {
                            alert(e.response?.data?.message || 'Erreur suppression');
                          }
                        }}
                      >
                        🗑 Supprimer
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
          <Card className="w-full max-w-lg">
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Ajouter un étudiant</h2>
                <button onClick={() => setIsModalOpen(false)}><X className="h-5 w-5" /></button>
              </div>
              {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Prénom" required value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} />
                  <Input label="Nom" required value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} />
                </div>
                <Input label="Email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <Input label="Mot de passe" type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                <Input label="Confirmation mot de passe" type="password" required value={formData.password_confirmation} onChange={e => setFormData({...formData, password_confirmation: e.target.value})} />
                <Input label="Téléphone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <Input label="Date de naissance" type="date" required value={formData.date_of_birth} onChange={e => setFormData({...formData, date_of_birth: e.target.value})} />
                <Input label="Lieu de naissance" value={formData.place_of_birth} onChange={e => setFormData({...formData, place_of_birth: e.target.value})} />
                <div>
                  <label className="block text-sm font-medium mb-1">Genre</label>
                  <select className="w-full rounded-lg border border-slate-300 p-2" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                    <option value="M">Homme</option>
                    <option value="F">Femme</option>
                  </select>
                </div>
                <Input label="Nationalité" value={formData.nationality} onChange={e => setFormData({...formData, nationality: e.target.value})} />
                <Input label="Adresse" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                <Input label="Nom du tuteur" value={formData.guardian_name} onChange={e => setFormData({...formData, guardian_name: e.target.value})} />
                <Input label="Téléphone tuteur" value={formData.guardian_phone} onChange={e => setFormData({...formData, guardian_phone: e.target.value})} />
                <Button type="submit" className="w-full">Enregistrer</Button>
              </form>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
