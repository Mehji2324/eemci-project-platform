import { Award, BookOpen, CalendarCheck, Clock, FileText, Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';
import { PageHeader } from '@/components/ui/PageHeader';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const TODAY = [
  { time:'09:00', course:'Finance d\'entreprise', room:'Salle A05', group:'Master Finance M1' },
  { time:'11:00', course:'Analyse financière', room:'Salle B12', group:'Bachelor Finance' },
  { time:'15:30', course:'Contrôle de gestion', room:'Salle C03', group:'Master Finance M2' },
];

const TASKS = [
  { label:'Saisir les notes du contrôle continu', due:'Aujourd\'hui', tone:'accent' as const },
  { label:'Valider les présences de la semaine', due:'Demain', tone:'primary' as const },
  { label:'Publier le support du chapitre 4', due:'Vendredi', tone:'emerald' as const },
];

const UNDERSTANDING = [
  { level:'Très bien compris', value:48, color:'#10B981' },
  { level:'Compris', value:37, color:'#1E3A8A' },
  { level:'À renforcer', value:15, color:'#D4A017' },
];

const COURSE_STATS = [
  { course:'Finance', moyenne:15.8, comprehension:86 },
  { course:'Analyse', moyenne:14.4, comprehension:78 },
  { course:'Contrôle', moyenne:13.2, comprehension:71 },
  { course:'Audit', moyenne:16.1, comprehension:83 },
];

const PROGRESS = [
  { week:'S1', assiduite:88, comprehension:68 },
  { week:'S2', assiduite:91, comprehension:72 },
  { week:'S3', assiduite:87, comprehension:76 },
  { week:'S4', assiduite:93, comprehension:81 },
  { week:'S5', assiduite:91, comprehension:84 },
  { week:'S6', assiduite:94, comprehension:86 },
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Espace enseignant"
        title="Bonjour, Dr. Alaoui"
        description="Vue d'ensemble de vos cours, groupes et actions pédagogiques."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Cours actifs" value="4" icon={<BookOpen className="h-4 w-4" />} tone="primary" />
        <KpiCard label="Étudiants suivis" value="134" icon={<Users className="h-4 w-4" />} tone="accent" />
        <KpiCard label="Assiduité moyenne" value="91%" trend={4} icon={<CalendarCheck className="h-4 w-4" />} tone="emerald" />
        <KpiCard label="Compréhension moyenne" value="82%" trend={6} icon={<Award className="h-4 w-4" />} tone="primary" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Évolution étudiants</CardTitle>
          </CardHeader>
          <CardBody className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROGRESS}>
                <defs>
                  <linearGradient id="teacherComprehension" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="teacherAttendance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.24} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="week" stroke="#64748B" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="#64748B" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="comprehension" name="Compréhension" stroke="#1E3A8A" fill="url(#teacherComprehension)" strokeWidth={2} />
                <Area type="monotone" dataKey="assiduite" name="Assiduité" stroke="#10B981" fill="url(#teacherAttendance)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Niveau de compréhension</CardTitle>
          </CardHeader>
          <CardBody className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={UNDERSTANDING} dataKey="value" nameKey="level" innerRadius={58} outerRadius={105} paddingAngle={2}>
                  {UNDERSTANDING.map((item) => <Cell key={item.level} fill={item.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compréhension par cours</CardTitle>
        </CardHeader>
        <CardBody className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={COURSE_STATS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="course" stroke="#64748B" fontSize={12} />
              <YAxis yAxisId="left" domain={[0, 20]} stroke="#64748B" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} stroke="#64748B" fontSize={12} />
              <Tooltip />
              <Bar yAxisId="left" dataKey="moyenne" name="Moyenne /20" fill="#D4A017" radius={[6, 6, 0, 0]} />
              <Bar yAxisId="right" dataKey="comprehension" name="Compréhension %" fill="#1E3A8A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Planning du jour</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {TODAY.map((item) => (
                <div key={`${item.time}-${item.course}`} className="flex items-center gap-4 rounded-lg border border-slate-100 p-3">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary-50 text-primary-700">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-ink">{item.course}</p>
                    <p className="text-xs text-ink-soft">{item.time} · {item.room} · {item.group}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Actions prioritaires</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {TASKS.map((task) => (
                <div key={task.label} className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 p-3">
                  <div className="flex gap-3">
                    <FileText className="mt-0.5 h-4 w-4 text-primary-600" />
                    <p className="text-sm font-medium text-ink">{task.label}</p>
                  </div>
                  <Badge tone={task.tone}>{task.due}</Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
