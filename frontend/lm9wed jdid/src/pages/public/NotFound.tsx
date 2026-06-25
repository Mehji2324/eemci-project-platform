import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
export default function NotFound() {
  return (
    <div className="min-h-[70vh] grid place-items-center text-center">
      <div>
        <p className="font-display text-8xl font-semibold text-primary-700">404</p>
        <p className="mt-3 text-ink-soft text-lg">La page demandée est introuvable.</p>
        <Link to="/"><Button className="mt-6">Retour à l'accueil</Button></Link>
      </div>
    </div>
  );
}
