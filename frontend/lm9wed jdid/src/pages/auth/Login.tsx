import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { auth } from '@/lib/auth';

export default function Login() {
  const nav = useNavigate();
  const [email,setEmail]=useState(''); const [pwd,setPwd]=useState(''); const [err,setErr]=useState('');

  const onSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setErr('');
    const u = await auth.login(email, pwd);
    if (!u) { setErr('Identifiants invalides. Vérifiez votre email et mot de passe.'); return; }
    const homeByRole = { admin: '/admin', teacher: '/teacher', student: '/portal' };
    nav(homeByRole[u.role]);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative bg-gradient-to-br from-primary-700 to-primary-900">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <Logo variant="light" />
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight">L'excellence académique mérite des outils à la hauteur.</h2>
            <p className="mt-4 text-primary-100/90">Accédez à votre espace EEMCI : cours, notes, planning et paiements en un clic.</p>
          </div>
          <p className="text-xs text-primary-100/60">© {new Date().getFullYear()} EEMCI</p>
        </div>
      </div>
      <div className="grid place-items-center p-8">
        <form onSubmit={onSubmit} className="w-full max-w-md space-y-5">
          <div className="lg:hidden mb-6"><Logo /></div>
          <div>
            <h1 className="font-display text-3xl font-semibold">Connexion</h1>
            <p className="text-ink-soft mt-1">Accédez à votre espace personnel</p>
          </div>
          <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="vous@eemci.ma" required />
          <Input label="Mot de passe" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} required />
          {err && <p className="text-sm text-red-600">{err}</p>}
          <Button type="submit" size="lg" className="w-full">Se connecter</Button>
          <p className="text-xs text-ink-soft text-center">
            Comptes démo : <code>admin@eemci.ma</code> / <code>teacher@eemci.ma</code> / <code>student@eemci.ma</code> · mdp <code>demo1234</code>
          </p>
          <Link to="/" className="block text-center text-sm text-primary-600 hover:underline">← Retour à l'accueil</Link>
        </form>
      </div>
    </div>
  );
}
