import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  User, BookOpen, FileUp, CheckCircle, 
  ChevronRight, ChevronLeft, Upload, Loader2 
} from 'lucide-react';
import { api } from '@/lib/api';
import { applicationSchema } from './schema';
import type { ApplicationFormData } from './schema';
import { PROGRAMS } from '../../types/program';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/cn';
import { supabase } from '../../lib/supabase';

const STEPS = [
  { id: 'personal', label: 'Infos Personnelles', icon: User },
  { id: 'program', label: 'Programme', icon: BookOpen },
  { id: 'documents', label: 'Documents', icon: FileUp },
  { id: 'review', label: 'Validation', icon: CheckCircle },
];

export const AdmissionFunnel: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [uploadedDocs, setUploadedDocs] = React.useState<Record<string, File>>({});

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onChange',
  });

  const selectedSchool = useWatch({ control, name: 'school' });
  const selectedGender = useWatch({ control, name: 'gender' });
  const selectedProgramId = useWatch({ control, name: 'programId' });
  const firstName = useWatch({ control, name: 'firstName' });
  const lastName = useWatch({ control, name: 'lastName' });
  const email = useWatch({ control, name: 'email' });
  const filteredPrograms = PROGRAMS.filter(p => p.school === selectedSchool);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      await api.post('/auth/register', {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        password: 'TempPass123!',
        password_confirmation: 'TempPass123!',
        date_of_birth: data.birthDate,
        place_of_birth: data.placeOfBirth || 'Non renseigné',
        gender: data.gender === 'Homme' ? 'M' : 'F',
        nationality: data.nationality || 'Marocain',
        address: data.address || 'Non renseigné',
        guardian_name: data.guardianName || null,
        guardian_phone: data.guardianPhone || null,
        school: data.school,
        programId: data.programId,
      });
      setIsSuccess(true);
    } catch (err: any) {
      console.error('API Error:', err.response?.data);
      const errors = err.response?.data?.errors;
      const message = errors
        ? Object.values(errors).flat().join(', ')
        : err.response?.data?.message || 'Une erreur est survenue';
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <div className="w-20 h-20 bg-success-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-500">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-display font-bold text-primary-900 mb-4">Candidature Envoyée !</h2>
        <p className="text-neutral-500 mb-10 leading-relaxed">
          Merci {firstName}, votre dossier a été transmis avec succès. Notre équipe pédagogique l'étudiera sous 48h. Vous recevrez un email pour fixer votre entretien de motivation.
        </p>
        <Button asChild variant="primary" className="h-14 px-10">
          <a href="/">Retour à l'accueil</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Stepper */}
        <div className="mb-12">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-200 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-primary-500 -translate-y-1/2 z-0 transition-all duration-500" 
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            />
            {STEPS.map((step, i) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                  i <= currentStep ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30" : "bg-neutral-200 text-neutral-400"
                )}>
                  <step.icon size={20} />
                </div>
                <span className={cn(
                  "absolute -bottom-8 whitespace-nowrap text-xs font-bold uppercase tracking-wider",
                  i <= currentStep ? "text-primary-900" : "text-neutral-400"
                )}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-primary-900/5 border border-neutral-200 overflow-hidden mt-16">
          <div className="p-8 lg:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Step 1: Personal Info */}
              {currentStep === 0 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="border-b border-neutral-100 pb-4">
                    <h2 className="text-2xl font-display font-bold text-primary-900">Informations Personnelles</h2>
                    <p className="text-neutral-500">Commençons par faire connaissance.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-700">Prénom</label>
                      <input {...register('firstName')} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
                      {errors.firstName && <p className="text-xs text-danger-500 font-medium">{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-700">Nom</label>
                      <input {...register('lastName')} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
                      {errors.lastName && <p className="text-xs text-danger-500 font-medium">{errors.lastName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-700">Email</label>
                      <input type="email" {...register('email')} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
                      {errors.email && <p className="text-xs text-danger-500 font-medium">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-700">Téléphone</label>
                      <input {...register('phone')} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
                      {errors.phone && <p className="text-xs text-danger-500 font-medium">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-700">Date de naissance</label>
                      <input type="date" {...register('birthDate')} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
                      {errors.birthDate && <p className="text-xs text-danger-500 font-medium">{errors.birthDate.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-700">Genre</label>
                      <div className="flex gap-4">
                        {['M', 'F'].map(g => (
                          <label key={g} className={cn(
                            "flex-1 flex items-center justify-center py-3 rounded-xl border-2 cursor-pointer transition-all font-bold",
                            selectedGender === g ? "bg-primary-50 border-primary-500 text-primary-600" : "bg-neutral-50 border-neutral-100 text-neutral-400"
                          )}>
                            <input type="radio" value={g} {...register('gender')} className="hidden" />
                            {g === 'M' ? 'Homme' : 'Femme'}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Program & Academics */}
              {currentStep === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="border-b border-neutral-100 pb-4">
                    <h2 className="text-2xl font-display font-bold text-primary-900">Choix du Programme</h2>
                    <p className="text-neutral-500">Quelle est votre ambition ?</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-700">École</label>
                      <select {...register('school')} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none">
                        <option value="">Sélectionner une école</option>
                        <option value="Management & IT">Management & IT</option>
                        <option value="Hôtellerie & Tourisme">Hôtellerie & Tourisme</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-700">Programme souhaité</label>
                      <select {...register('programId')} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none" disabled={!selectedSchool}>
                        <option value="">Sélectionner un programme</option>
                        {filteredPrograms.map(p => (
                          <option key={p.id} value={p.id}>{p.title} ({p.level})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-neutral-100">
                    <h3 className="font-bold text-primary-900 mb-6">Parcours Académique</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-700">Dernier diplôme obtenu</label>
                        <input {...register('lastDiploma')} placeholder="ex: Baccalauréat, Licence..." className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-700">Établissement</label>
                        <input {...register('institution')} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {currentStep === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="border-b border-neutral-100 pb-4">
                    <h2 className="text-2xl font-display font-bold text-primary-900">Documents Requis</h2>
                    <p className="text-neutral-500">Téléchargez vos pièces justificatives (PDF, JPG, PNG).</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { id: 'identityCard', label: 'Carte d\'Identité / Passeport' },
                      { id: 'diploma', label: 'Dernier Diplôme' },
                      { id: 'transcripts', label: 'Relevés de notes' },
                    ].map(doc => {
                      const file = uploadedDocs[doc.id];
                      return (
                        <label
                          key={doc.id}
                          className={`p-6 border-2 rounded-2xl flex flex-col items-center text-center group transition-all cursor-pointer ${
                            file
                              ? 'border-green-500 bg-green-50'
                              : 'border-dashed border-neutral-200 hover:border-primary-500 hover:bg-primary-50/30'
                          }`}
                        >
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const selectedFile = e.target.files?.[0];
                              if (selectedFile) {
                                setUploadedDocs(prev => ({ ...prev, [doc.id]: selectedFile }));
                              }
                            }}
                          />
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all ${
                              file
                                ? 'bg-green-500 text-white'
                                : 'bg-neutral-100 text-neutral-400 group-hover:bg-primary-500 group-hover:text-white'
                            }`}
                          >
                            {file ? <CheckCircle size={24} /> : <Upload size={24} />}
                          </div>
                          <h4 className="font-bold text-primary-900 text-sm mb-1">{doc.label}</h4>
                          <p className={`text-xs truncate max-w-full ${file ? 'text-green-600 font-medium' : 'text-neutral-400'}`}>
                            {file ? file.name : 'Glisser-déposer ou cliquer pour choisir'}
                          </p>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="border-b border-neutral-100 pb-4">
                    <h2 className="text-2xl font-display font-bold text-primary-900">Récapitulatif & Validation</h2>
                    <p className="text-neutral-500">Vérifiez vos informations avant l'envoi final.</p>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-2xl p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Candidat</label>
                        <div className="font-bold text-primary-900">{firstName} {lastName}</div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Email</label>
                        <div className="font-bold text-primary-900">{email}</div>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Programme</label>
                      <div className="font-bold text-primary-900">
                        {PROGRAMS.find(p => p.id === selectedProgramId)?.title || 'Non sélectionné'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-accent-50 rounded-xl border border-accent-100">
                    <CheckCircle className="text-accent-600" size={20} />
                    <p className="text-sm font-medium text-accent-700">En soumettant ce formulaire, vous confirmez l'exactitude des informations fournies.</p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-neutral-100">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={prevStep} 
                  disabled={currentStep === 0 || isSubmitting}
                  className="gap-2"
                >
                  <ChevronLeft size={18} /> Précédent
                </Button>
                
                {currentStep < STEPS.length - 1 ? (
                  <Button 
                    type="button" 
                    variant="primary" 
                    onClick={nextStep}
                    className="gap-2 px-8"
                  >
                    Continuer <ChevronRight size={18} />
                  </Button>
                ) : (
                  <>
                    {console.log('ERRORS:', errors)}
                    <Button 
                      type="submit" 
                      variant="secondary" 
                      disabled={isSubmitting}
                      className="gap-2 px-10 h-14"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirmer ma candidature'}
                    </Button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
        
        <p className="text-center text-neutral-400 text-sm mt-8">
          Besoin d'aide ? <button className="text-primary-500 font-bold underline underline-offset-4">Contactez le service des admissions</button>
        </p>
      </div>
    </div>
  );
};
