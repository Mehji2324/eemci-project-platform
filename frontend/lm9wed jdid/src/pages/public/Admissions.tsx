import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Link } from 'react-router-dom';
import { FileText, MessageSquare, GraduationCap, ArrowRight } from 'lucide-react';

const STEPS = [
  { icon:FileText, title:'1. Candidature en ligne', text:'Remplissez le formulaire en moins de 10 minutes et joignez vos documents.' },
  { icon:MessageSquare, title:'2. Entretien & test', text:'Entretien de motivation et test de positionnement selon le programme.' },
  { icon:GraduationCap, title:'3. Inscription définitive', text:'Confirmation, paiement des frais et accès à votre espace étudiant.' }
];

export default function Admissions() {
  return (
    <>
      <Section eyebrow="Admissions" title="Rejoignez la promotion 2026"
        lead="Une procédure simple, transparente et accompagnée à chaque étape.">
        <div className="grid md:grid-cols-3 gap-5">
          {STEPS.map(({icon:Icon,title,text}) => (
            <Card key={title}><CardBody>
              <div className="w-12 h-12 rounded-xl bg-accent-50 text-accent-700 grid place-items-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{title}</h3>
              <p className="text-ink-soft mt-2 text-sm">{text}</p>
            </CardBody></Card>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/admissions/apply"><Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>Démarrer ma candidature</Button></Link>
          <Link to="/contact"><Button size="lg" variant="outline">Prendre rendez-vous</Button></Link>
        </div>
      </Section>

      <Section title="Documents à fournir" eyebrow="Dossier" className="bg-surface-muted">
        <div className="grid md:grid-cols-2 gap-5">
          {['Copie certifiée du baccalauréat','Relevés de notes des dernières années','Pièce d\'identité (CIN ou passeport)','CV à jour','Lettre de motivation','2 photos d\'identité récentes'].map(d => (
            <div key={d} className="p-5 bg-white rounded-2xl border border-slate-200/70">
              <p className="text-ink">{d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
