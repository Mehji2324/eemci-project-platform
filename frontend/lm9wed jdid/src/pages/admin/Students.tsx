import { useState, useEffect } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { Search, Plus, MoreHorizontal, X, Eye, EyeOff, Lock } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from '@/hooks/useToast';

export default function Students() {
  const [q, setQ] = useState('');
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credentialsView, setCredentialsView] = useState<{name:string, matricule:string, email:string} | null>(null);
  const [credentials, setCredentials] = useState<{email: string, password: string} | null>(null);
  const [rejectInput, setRejectInput] = useState<{studentId: number, reason: string} | null>(null);
  const [isCredentialsViewOpen, setIsCredentialsViewOpen] = useState(false);
  const [selectedStudentForCredentials, setSelectedStudentForCredentials] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);

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
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      const submitData = {
        ...formData,
        password: 'TempPass123!',
        password_confirmation: 'TempPass123!',
        address: formData.address || 'Non renseigné',
        guardian_name: formData.guardian_name || null,
        guardian_phone: formData.guardian_phone || null,
      };
      const registerRes = await api.post('/auth/register', submitData);
      const studentId = registerRes.data?.user?.id;
      
      if (studentId) {
        const studentsRes = await api.get('/students');
        const students = studentsRes.data.data ?? studentsRes.data;
        const student = students.find((s: any) => s.user_id === studentId || s.user?.id === studentId);
        
        if (student) {
          const validateRes = await api.post(`/admin/students/${student.id}/validate`, {});
          const creds = validateRes.data?.credentials;
          if (creds) {
            setCredentials({ email: creds.email, password: creds.password });
          }
        }
      }
      
      setIsModalOpen(false);
      setFormData({ 
        first_name: '', last_name: '', email: '',
        password: 'TempPass123!', password_confirmation: 'TempPass123!',
        phone: '', date_of_birth: '', place_of_birth: '',
        gender: 'M', nationality: '',
        address: 'Non renseigné', guardian_name: null, guardian_phone: null
      });
      fetchStudents();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    }
  };

  const handleViewCredentials = async (student: any) => {
    try {
      setSelectedStudentForCredentials(student);
      setCredentialsView({
        matricule: student.matricule || '—',
        email: student.user?.email || '—',
        password: "Contactez l'administrateur",
      });
      setIsCredentialsViewOpen(true);
    } catch (e) {
      toast.error('Erreur lors de la récupération des identifiants');
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
              { key: 'id', header: 'ID', cell: (r) => <span className="font-mono text-xs text-ink-soft">{r.id}</span> },
              { key: 'name', header: 'Nom', cell: (r) => <span className="font-medium text-ink">{r.user?.first_name + ' ' + r.user?.last_name}</span> },
              { key: 'program', header: 'Programme', cell: (r) => <span className="text-ink-soft">{r.filiere?.name ?? '—'}</span> },
              { key: 'level', header: 'Niveau', cell: (r) => <Badge tone="slate">{r.classe?.level ?? '—'}</Badge> },
              { key: 'status', header: 'Statut', cell: (r) => <Badge tone={r.status==='active'?'emerald':'accent'}>{r.status}</Badge> },
              { key: 'actions', header: <span className="sr-only">Actions</span>, headerClassName: 'w-10', cell: (s: any) => (
                <div className="relative" data-dropdown="true">
                  <button
                    className="rounded-lg p-1.5 text-ink-soft transition hover:bg-white hover:text-ink"
                    aria-label="Actions étudiant"
                    onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === s.id ? null : s.id); }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  {openMenu === s.id && (
                    <div className="absolute right-0 z-50 mt-1 w-40 rounded-lg border border-slate-200 bg-white shadow-lg">
                      {s.status === 'pending' ? (
                        <>
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-emerald-600 hover:bg-slate-50"
                            onClick={async (e) => {
                              e.stopPropagation();
                              try {
                                const validateRes = await api.post(`/admin/students/${s.id}/validate`, {});
                                const creds = validateRes.data?.credentials;
                                if (creds) {
                                  setCredentials({ email: creds.email, password: creds.password });
                                }
                                setOpenMenu(null);
                                fetchStudents();
                              } catch(e: any) { alert(e.response?.data?.message || 'Erreur validation'); }
                            }}>
                            Valider
                          </button>
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-slate-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRejectInput({ studentId: s.id, reason: '' });
                              setOpenMenu(null);
                            }}>
                            Rejeter
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCredentialsView({
                                name: (s.user?.first_name ?? '') + ' ' + (s.user?.last_name ?? ''),
                                matricule: s.matricule ?? '—',
                                email: s.user?.email ?? '—',
                              });
                              setOpenMenu(null);
                            }}>
                            Voir credentials
                          </button>
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-slate-50"
                            onClick={async (e) => {
                              e.stopPropagation();
                              if (!confirm('Supprimer cet étudiant?')) return;
                              try {
                                await api.delete(`/students/${s.id}`);
                                setOpenMenu(null);
                                fetchStudents();
                              } catch(err: any) { alert(err.response?.data?.message || 'Erreur suppression'); }
                            }}>
                            Supprimer
                          </button>
                        </>
                      )}
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
          <Card className="w-full max-w-3xl">
            <CardBody className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-ink">Ajouter un étudiant</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-ink transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>
              {error && <div className="mb-6 p-3 rounded-lg bg-red-50 text-sm text-red-600 border border-red-100">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <Input label="Prénom" required value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} />
                    <Input label="Email personnel" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    <Input label="Date de naissance" type="date" required value={formData.date_of_birth} onChange={e => setFormData({...formData, date_of_birth: e.target.value})} />
                    <Input label="Lieu de naissance" value={formData.place_of_birth} onChange={e => setFormData({...formData, place_of_birth: e.target.value})} />
                    <Input label="Nationalité" value={formData.nationality} onChange={e => setFormData({...formData, nationality: e.target.value})} />
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <Input label="Nom" required value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} />
                    <Input label="Téléphone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Genre</label>
                      <select 
                        className="w-full rounded-lg border border-slate-300 p-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" 
                        value={formData.gender} 
                        onChange={e => setFormData({...formData, gender: e.target.value})}
                      >
                        <option value="M">Homme</option>
                        <option value="F">Femme</option>
                      </select>
                    </div>
                    <Input label="Adresse" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <Button type="submit" className="w-full sm:w-auto px-8">Enregistrer l'étudiant</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      )}

      {isCredentialsViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-ink">Identifiants de l'étudiant</h2>
                <button onClick={() => setIsCredentialsViewOpen(false)}><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-xs font-medium text-slate-400 uppercase">Matricule</p>
                  <p className="font-mono text-sm font-medium text-ink">{credentialsView?.matricule || '—'}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-xs font-medium text-slate-400 uppercase">Email académique</p>
                  <p className="font-mono text-sm font-medium text-ink">{credentialsView?.email || '—'}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-slate-400 uppercase">Mot de passe</p>
                    <button onClick={() => setShowPassword(!showPassword)} className="text-primary-600">
                      {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </button>
                  </div>
                  <p className="font-mono text-sm font-medium text-ink">
                    {showPassword ? credentialsView?.password : '••••••••'}
                  </p>
                </div>
                <Button 
                  onClick={async () => {
                    try {
                      await api.post(`/students/${selectedStudentForCredentials?.id}/reset-password`, {});
                      toast.success('Mot de passe réinitialisé');
                    } catch {
                      toast.info('Fonctionnalité à venir');
                    }
                  }} 
                  className="w-full mt-4"
                >
                  Réinitialiser le mot de passe
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {credentialsView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Informations de connexion</h2>
              <p className="text-sm text-slate-500">{credentialsView.name}</p>
            </div>
            <div className="space-y-3 rounded-lg bg-slate-50 p-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Matricule</p>
                <p className="mt-1 font-mono text-sm font-medium text-slate-900">{credentialsView.matricule}</p>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Email académique</p>
                <p className="mt-1 font-mono text-sm font-medium text-slate-900">{credentialsView.email}</p>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Mot de passe</p>
                <p className="mt-1 text-sm text-slate-500 italic">Réinitialisable par l'administrateur</p>
              </div>
            </div>
            <button
              onClick={() => setCredentialsView(null)}
              className="mt-6 w-full rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {credentials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Étudiant ajouté avec succès</h2>
                <p className="text-sm text-slate-500">Les identifiants ont été générés automatiquement</p>
              </div>
            </div>
            <div className="space-y-3 rounded-lg bg-slate-50 p-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Email académique</p>
                <p className="mt-1 font-mono text-sm font-medium text-slate-900">{credentials.email}</p>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Mot de passe temporaire</p>
                <p className="mt-1 font-mono text-sm font-medium text-slate-900">{credentials.password}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">L'étudiant devra changer son mot de passe lors de la première connexion.</p>
            <button
              onClick={() => setCredentials(null)}
              className="mt-6 w-full rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {rejectInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Rejeter la candidature</h2>
            <p className="text-sm text-slate-500 mb-4">Veuillez indiquer la raison du rejet.</p>
            <textarea
              className="w-full rounded-lg border border-slate-300 p-3 text-sm resize-none"
              rows={3}
              placeholder="Raison du rejet..."
              value={rejectInput.reason}
              onChange={(e) => setRejectInput({ ...rejectInput, reason: e.target.value })}
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setRejectInput(null)}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                onClick={async () => {
                  if (!rejectInput.reason.trim()) return;
                  try {
                    await api.post(`/admin/students/${rejectInput.studentId}/reject`, { reason: rejectInput.reason });
                    setRejectInput(null);
                    fetchStudents();
                  } catch(err: any) {
                    alert(err.response?.data?.message || 'Erreur rejet');
                  }
                }}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
              >
                Confirmer le rejet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
