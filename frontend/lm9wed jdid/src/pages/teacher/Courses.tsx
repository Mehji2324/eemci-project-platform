import { BookOpen, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const COURSES = [
  { code:'FIN-501', title:'Finance d\'entreprise', group:'Master Finance M1', students:42, hours:60, progress:72, comprehension:86 },
  { code:'FIN-402', title:'Analyse financière', group:'Bachelor Finance', students:34, hours:45, progress:58, comprehension:78 },
  { code:'CTL-302', title:'Contrôle de gestion', group:'Master Finance M2', students:28, hours:45, progress:64, comprehension:71 },
  { code:'AUD-510', title:'Audit et reporting', group:'Master Finance M2', students:30, hours:30, progress:46, comprehension:83 },
];

export default function TeacherCourses() {
  return (
    <div className="space-y-6">
      <PageHeader title="Mes cours" description="Modules affectés, volumes horaires et progression pédagogique." />
      <Card>
        <CardHeader>
          <CardTitle>Progression et compréhension</CardTitle>
        </CardHeader>
        <CardBody className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={COURSES}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="code" stroke="#64748B" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="#64748B" fontSize={12} />
              <Tooltip />
              <Bar dataKey="progress" name="Progression %" fill="#D4A017" radius={[6, 6, 0, 0]} />
              <Bar dataKey="comprehension" name="Compréhension %" fill="#1E3A8A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2">
        {COURSES.map((course) => (
          <Card key={course.code}>
            <CardBody>
              <div className="flex items-start justify-between gap-4">
                <Badge tone="primary">{course.code}</Badge>
                <span className="text-xs font-medium text-ink-soft">{course.progress}% complété</span>
              </div>
              <h2 className="mt-3 font-display text-lg font-semibold text-ink">{course.title}</h2>
              <p className="mt-1 text-sm text-ink-soft">{course.group}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100" aria-label={`${course.progress}% complété`}>
                <div className="h-full rounded-full bg-primary-600" style={{ width: `${course.progress}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-medium">
                <span className="text-ink-soft">Compréhension estimée</span>
                <Badge tone={course.comprehension >= 80 ? 'emerald' : course.comprehension >= 72 ? 'primary' : 'accent'}>{course.comprehension}%</Badge>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium text-ink-soft">
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{course.students} étudiants</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{course.hours}h</span>
                <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" />Semestre 3</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
