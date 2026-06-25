import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo = ({ variant = 'dark', size = 'md' }: LogoProps) => {
  const sizes = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20',
  };
  
  // variant='light' usually means the background is dark (e.g. footer), so we need the light logo if available.
  // We'll use the original logo for light variant (assuming it has white text) 
  // and the blue logo for the dark variant (assuming it has blue text for light backgrounds).
  const logoSrc = variant === 'light' ? '/logo-eemci-original.png' : '/logo-eemci-bleu.png';

  return (
    <Link to="/" className="inline-block group" aria-label="EEMCI – Accueil">
      <img 
        src={logoSrc} 
        alt="EEMCI Logo" 
        className={`${sizes[size]} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
      />
    </Link>
  );
};
