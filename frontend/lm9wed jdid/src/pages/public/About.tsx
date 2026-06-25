import { Section } from '@/components/ui/Section';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Award, Building2, Target, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <>
      <Section eyebrow="L'École" title="EEMCI — Une école au service de l'excellence académique et professionnelle."
        lead="Fondée en 2011 à Meknès, l'EEMCI est née de la conviction qu'une formation supérieure de qualité doit être accessible et ancrée dans son territoire.">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img src="/campus-ai.png"
            alt="Campus" className="rounded-4xl w-full h-[420px] object-cover shadow-soft" />
          <div className="space-y-5 text-ink-soft text-lg leading-relaxed">
            <p>Au fil des années, l'EEMCI a bâti une institution rigoureuse, accréditée par l'État marocain et reconnue en Europe à travers un double diplôme franco-marocain.</p>
            <p>Avec l'ouverture de la nouvelle école d'Hôtellerie & Tourisme, deux écoles partagent désormais le même standard d'excellence et préparent leurs étudiants à réussir au Maroc et à l'international.</p>
            <div className="flex flex-wrap gap-2">
              <Badge tone="primary">Accrédité État marocain</Badge>
              <Badge tone="accent">Membre FEDE</Badge>
              <Badge tone="emerald">Partenaire WES'SUP</Badge>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Vision 2030" title="Devenir la référence africaine en management et innovation"
        lead="À l'horizon 2030, l'EEMCI ambitionne d'être reconnue comme l'école africaine de référence en Management, Commerce International et IT — formant une nouvelle génération de leaders interculturels.">
        <div className="grid md:grid-cols-4 gap-5">
          {[
            { icon: Award, title:'Excellence', text:'Une exigence académique constante et un suivi individualisé.' },
            { icon: Building2, title:'Ouverture', text:'Une école ouverte sur le monde, sur l\'Europe et sur l\'Afrique.' },
            { icon: Target, title:'Employabilité', text:'Une pédagogie centrée sur l\'insertion professionnelle.' },
            { icon: BookOpen, title:'Innovation', text:'Programmes alignés sur les enjeux contemporains.' }
          ].map(({icon:Icon,title,text}) => (
            <Card key={title}><CardBody>
              <Icon className="w-7 h-7 text-primary-600 mb-3" />
              <h3 className="font-display text-xl font-semibold">{title}</h3>
              <p className="text-ink-soft mt-2 text-sm">{text}</p>
            </CardBody></Card>
          ))}
        </div>
      </Section>
    </>
  );
}
