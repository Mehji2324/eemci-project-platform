import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, Globe, GraduationCap, ChevronLeft, 
  CheckCircle2, FileText, Briefcase, Info, 
  CreditCard, ArrowRight, Download 
} from 'lucide-react';
import { PROGRAMS } from '../../types/program';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/utils';

export const ProgramDetails: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const program = PROGRAMS.find(p => p.slug === slug);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'curriculum' | 'careers' | 'admission'>('overview');

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-primary-900 mb-4">Programme non trouvé</h2>
          <Button onClick={() => navigate('/programs')}>Retour au catalogue</Button>
        </div>
      </div>
    );
  }

  const isManagement = program.school === 'Management & IT';

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      {/* Hero */}
      <div className="relative bg-primary-900 text-white pt-12 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={program.image} alt="" className="w-full h-full object-cover blur-sm" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/80 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            to="/programs" 
            className="inline-flex items-center gap-2 text-primary-100/60 hover:text-white mb-12 transition-colors group"
          >
            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            Retour au catalogue
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                  isManagement ? "bg-primary-500 text-white" : "bg-school-hospitality text-white"
                )}>
                  {program.school}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white backdrop-blur-md">
                  {program.level}
                </span>
                {program.accredited && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-success-500/20 text-success-500 border border-success-500/30">
                    Accrédité État
                  </span>
                )}
              </div>
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-8 leading-tight">
                {program.title}
              </h1>
              <div className="flex flex-wrap gap-8 text-primary-100/80">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-accent-400" />
                  <span className="font-medium">{program.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={20} className="text-accent-400" />
                  <span className="font-medium">Langue: {program.language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={20} className="text-accent-400" />
                  <span className="font-medium">Diplôme: {program.level}</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <div className="text-primary-100/60 text-sm uppercase tracking-widest font-bold mb-2">Inscription</div>
                <div className="text-4xl font-display font-bold mb-8">Ouverte</div>
                <Button variant="secondary" className="w-full h-14" asChild>
                  <Link to="/admissions/apply">Postuler maintenant</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
              <div className="flex border-b border-neutral-100 overflow-x-auto no-scrollbar">
                {[
                  { id: 'overview', label: 'Aperçu', icon: Info },
                  { id: 'curriculum', label: 'Programme', icon: FileText },
                  { id: 'careers', label: 'Débouchés', icon: Briefcase },
                  { id: 'admission', label: 'Admission', icon: CheckCircle2 },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'overview' | 'curriculum' | 'careers' | 'admission')}
                    className={cn(
                      "flex items-center gap-2 px-8 py-5 text-sm font-bold transition-all border-b-2 whitespace-nowrap",
                      activeTab === tab.id 
                        ? "text-primary-500 border-primary-500 bg-primary-50/30" 
                        : "text-neutral-400 border-transparent hover:text-neutral-600"
                    )}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-8 lg:p-12">
                {activeTab === 'overview' && (
                  <div className="animate-in fade-in duration-500">
                    <h2 className="text-2xl font-display font-bold text-primary-900 mb-6">Objectifs de la formation</h2>
                    <p className="text-neutral-500 leading-relaxed text-lg mb-8">
                      {program.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {program.admissionRequirements.map((req, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
                          <CheckCircle2 size={20} className="text-success-500 shrink-0" />
                          <span className="text-sm font-medium text-neutral-600">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div className="animate-in fade-in duration-500 space-y-8">
                    {program.curriculum.map((sem, i) => (
                      <div key={i} className="space-y-4">
                        <h3 className="font-display font-bold text-xl text-primary-900 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center text-xs">S{i+1}</span>
                          {sem.semester}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {sem.modules.map((mod, j) => (
                            <div key={j} className="p-4 border border-neutral-100 rounded-xl hover:border-primary-200 transition-colors">
                              <span className="text-sm font-medium text-neutral-700">{mod}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="pt-8">
                      <Button variant="outline" className="gap-2">
                        <Download size={18} /> Télécharger la brochure complète (PDF)
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === 'careers' && (
                  <div className="animate-in fade-in duration-500">
                    <h2 className="text-2xl font-display font-bold text-primary-900 mb-8">Métiers & Débouchés</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {program.careers.map((career, i) => (
                        <div key={i} className="group p-6 bg-white border border-neutral-200 rounded-2xl hover:border-primary-500 transition-all hover:shadow-xl hover:shadow-primary-500/5">
                          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 mb-4 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                            <Briefcase size={24} />
                          </div>
                          <h4 className="font-bold text-primary-900">{career}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'admission' && (
                  <div className="animate-in fade-in duration-500 space-y-8">
                    <h2 className="text-2xl font-display font-bold text-primary-900 mb-6">Conditions d'admission</h2>
                    <div className="space-y-4">
                      {program.admissionRequirements.map((req, i) => (
                        <div key={i} className="flex items-start gap-4 p-5 border border-neutral-100 rounded-2xl">
                          <div className="w-6 h-6 rounded-full bg-accent-50 text-accent-600 flex items-center justify-center text-xs font-bold shrink-0">{i+1}</div>
                          <span className="text-neutral-600 font-medium">{req}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-8 bg-primary-900 rounded-2xl text-white">
                      <h4 className="font-display font-bold text-xl mb-4 text-accent-400">Processus de sélection</h4>
                      <p className="text-primary-100/70 mb-6">L'admission se fait sur étude de dossier suivie d'un entretien individuel pour évaluer le projet professionnel du candidat.</p>
                      <Button variant="secondary" asChild>
                        <Link to="/admissions/apply">Démarrer ma candidature <ArrowRight size={18} className="ml-2" /></Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Tuition Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
              <h3 className="font-display font-bold text-xl text-primary-900 mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-primary-500" />
                Frais de scolarité
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Inscription annuelle</div>
                  <div className="text-3xl font-display font-bold text-primary-900">{program.tuition.inscription.toLocaleString()} <span className="text-sm font-sans font-medium text-neutral-400">MAD</span></div>
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Scolarité annuelle</div>
                  <div className="text-3xl font-display font-bold text-primary-900">{program.tuition.annual.toLocaleString()} <span className="text-sm font-sans font-medium text-neutral-400">MAD</span></div>
                </div>
                <div className="pt-6 border-t border-neutral-100">
                  <p className="text-xs text-neutral-500 leading-relaxed italic">
                    * Des facilités de paiement sont disponibles sur demande auprès de l'administration.
                  </p>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-accent-500 rounded-2xl p-8 text-primary-900">
              <h3 className="font-display font-bold text-xl mb-4">Besoin d'aide ?</h3>
              <p className="font-medium mb-8 opacity-80">Nos conseillers sont là pour vous guider dans votre choix d'orientation.</p>
              <div className="space-y-4">
                <Button variant="primary" className="w-full bg-primary-900 hover:bg-primary-800 text-white">Prendre RDV</Button>
                <Button variant="outline" className="w-full border-primary-900/20 text-primary-900 hover:bg-primary-900/5">Contactez-nous</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
