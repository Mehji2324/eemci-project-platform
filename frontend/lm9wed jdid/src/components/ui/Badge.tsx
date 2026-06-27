import { cn } from '@/lib/cn';

type Tone = 'primary' | 'accent' | 'emerald' | 'teal' | 'rose' | 'slate' | 'white';

const tones: Record<Tone, string> = {
  primary: 'badge-primary',
  accent:  'badge-accent',
  emerald: 'bg-emerald-50  text-emerald-700 border border-emerald-100',
  teal:    'badge-teal',
  rose:    'bg-rose-50     text-rose-700    border border-rose-100',
  slate:   'badge-neutral',
  white:   'bg-surface     text-ink         border border-surface-border shadow-xs',
};

export const Badge = ({
  tone = 'primary',
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) => (
  <span
    className={cn(
      tones[tone],
      className
    )}
  >
    {children}
  </span>
);
