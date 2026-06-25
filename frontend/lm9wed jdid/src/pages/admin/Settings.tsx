import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';

export default function Settings() {
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Paramètres" description="Configuration de l'institution et préférences de sécurité." />
      <Card>
        <CardHeader><CardTitle>Profil de l'institution</CardTitle></CardHeader>
        <CardBody className="space-y-4">
          <Input label="Nom de l'institution" defaultValue="EEMCI" />
          <Input label="Email de contact" defaultValue="contact@eemci.ma" />
          <Input label="Téléphone" defaultValue="05354-00417" />
          <Input label="Adresse" defaultValue="Rue Accra Imm 14, Ville Nouvelle, Meknès" />
          <div className="flex justify-end pt-2"><Button>Enregistrer</Button></div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader><CardTitle>Préférences</CardTitle></CardHeader>
        <CardBody className="space-y-4">
          {['Notifications email','Notifications SMS','Mode sombre','Authentification 2FA'].map(p => (
            <label key={p} className="flex items-center justify-between gap-4 rounded-lg border border-slate-100 px-4 py-3">
              <span className="text-sm font-medium text-ink">{p}</span>
              <input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-primary-600 accent-primary-600 focus:ring-primary-500" />
            </label>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
