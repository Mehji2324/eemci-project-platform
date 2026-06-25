import { cn } from '@/lib/cn';

type Tone = 'primary' | 'accent' | 'emerald' | 'teal' | 'rose' | 'slate' | 'white';

const tones: Record<Tone, string> = {
  primary: 'bg-primary-50  text-primary-700 border-primary-200',
  accent:  'bg-amber-50    text-amber-700   border-amber-200',
  emerald: 'bg-emerald-50  text-emerald-700 border-emerald-200',
  teal:    'bg-teal-50     text-teal-700    border-teal-200',
  rose:    'bg-rose-50     text-rose-700    border-rose-200',
  slate:   'bg-slate-100   text-slate-600   border-slate-200',
  white:   'bg-white/20    text-white       border-white/30',
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
      'chip border font-semibold',
      tones[tone],
      className
    )}
  >
    {children}
  </span>
);
