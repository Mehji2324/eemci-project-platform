import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { Input } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';

type GradeStatus = 'Publié' | 'Brouillon' | 'À revoir';
type GradeRow = {
  id: string;
  student: string;
  assessment: string;
  course: string;
  grade: number;
  status: GradeStatus;
};

const STORAGE_KEY = 'eemci_teacher_manual_grades';

const INITIAL_GRADES: GradeRow[] = [
  { id:'g-1', student:'Sofia Alami', assessment:'Contrôle continu', course:'Finance d\'entreprise', grade:16.5, status:'Publié' },
  { id:'g-2', student:'Karim Naciri', assessment:'Étude de cas', course:'Analyse financière', grade:14, status:'Brouillon' },
  { id:'g-3', student:'Hicham Bennani', assessment:'Examen blanc', course:'Contrôle de gestion', grade:12.5, status:'Publié' },
  { id:'g-4', student:'Imane El Idrissi', assessment:'Projet groupe', course:'Audit et reporting', grade:17, status:'Publié' },
  { id:'g-5', student:'Yassine Berrada', assessment:'Contrôle continu', course:'Finance d\'entreprise', grade:11.5, status:'À revoir' },
];

const COURSES = ['Finance d\'entreprise', 'Analyse financière', 'Contrôle de gestion', 'Audit et reporting'];
const STATUSES: GradeStatus[] = ['Publié', 'Brouillon', 'À revoir'];

const tone = (grade: number) => grade >= 16 ? 'emerald' : grade >= 12 ? 'primary' : 'rose';

export default function TeacherGrades() {
  const [manualGrades, setManualGrades] = useState<GradeRow[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as GradeRow[];
    } catch {
      return [];
    }
  });
  const [form, setForm] = useState({
    student: '',
    assessment: '',
    course: COURSES[0],
    grade: '',
    status: 'Brouillon' as GradeStatus,
  });
  const [error, setError] = useState('');
  const grades = useMemo(() => [...manualGrades, ...INITIAL_GRADES], [manualGrades]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(manualGrades));
  }, [manualGrades]);

  const addGrade = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const grade = Number(form.grade);

    if (!form.student.trim() || !form.assessment.trim()) {
      setError('Veuillez renseigner l’étudiant et l’évaluation.');
      return;
    }

    if (Number.isNaN(grade) || grade < 0 || grade > 20) {
      setError('La note doit être comprise entre 0 et 20.');
      return;
    }

    setManualGrades((current) => [
      {
        id: `manual-${Date.now()}`,
        student: form.student.trim(),
        assessment: form.assessment.trim(),
        course: form.course,
        grade,
        status: form.status,
      },
      ...current,
    ]);
    setForm({ student: '', assessment: '', course: COURSES[0], grade: '', status: 'Brouillon' });
    setError('');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Notes" description="Saisie et suivi des évaluations de vos modules." />
      <Card>
        <CardHeader>
          <CardTitle>Ajouter une note manuellement</CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={addGrade} className="grid gap-4 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <Input
                label="Étudiant"
                value={form.student}
                onChange={(event) => setForm({ ...form, student: event.target.value })}
                placeholder="Nom complet"
              />
            </div>
            <div className="lg:col-span-2">
              <Input
                label="Évaluation"
                value={form.assessment}
                onChange={(event) => setForm({ ...form, assessment: event.target.value })}
                placeholder="Contrôle, examen, projet..."
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="course" className="text-sm font-medium text-ink">Cours</label>
              <select
                id="course"
                value={form.course}
                onChange={(event) => setForm({ ...form, course: event.target.value })}
                className="h-10 w-full rounded-lg border border-surface-border bg-surface px-3.5 text-sm text-ink outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              >
                {COURSES.map((course) => <option key={course} value={course}>{course}</option>)}
              </select>
            </div>
            <Input
              label="Note /20"
              type="number"
              min="0"
              max="20"
              step="0.25"
              value={form.grade}
              onChange={(event) => setForm({ ...form, grade: event.target.value })}
            />
            <div className="space-y-1.5">
              <label htmlFor="status" className="text-sm font-medium text-ink">Statut</label>
              <select
                id="status"
                value={form.status}
                onChange={(event) => setForm({ ...form, status: event.target.value as GradeStatus })}
                className="h-10 w-full rounded-lg border border-surface-border bg-surface px-3.5 text-sm text-ink outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              >
                {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div className="flex items-end lg:col-span-6">
              <Button type="submit">Ajouter la note</Button>
            </div>
            {error && <p className="text-sm font-medium text-rose-600 lg:col-span-6">{error}</p>}
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Évaluations récentes</CardTitle>
        </CardHeader>
        <CardBody>
          <DataTable
            data={grades}
            rowKey={(row) => row.id}
            columns={[
              { key:'student', header:'Étudiant', cell:(row) => <span className="font-medium text-ink">{row.student}</span> },
              { key:'assessment', header:'Évaluation', cell:(row) => <span className="text-ink-soft">{row.assessment}</span> },
              { key:'course', header:'Cours', cell:(row) => <span className="text-ink-soft">{row.course}</span> },
              { key:'grade', header:'Note /20', cell:(row) => <Badge tone={tone(row.grade)}>{row.grade}/20</Badge> },
              { key:'status', header:'Statut', cell:(row) => <Badge tone={row.status === 'Publié' ? 'emerald' : row.status === 'Brouillon' ? 'slate' : 'accent'}>{row.status}</Badge> },
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}
