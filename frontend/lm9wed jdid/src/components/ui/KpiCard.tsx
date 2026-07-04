import { cn } from '@/lib/cn';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ReactNode, isValidElement } from 'react';

export const KpiCard = ({ label, value, trend, icon: Icon, tone='primary' }:{
  label:string; value:string|number; trend?:number; icon?:LucideIcon|ReactNode;
  tone?:'primary'|'accent'|'emerald'|'red';
}) => {
  const tones = {
    primary: 'bg-primary-50 text-primary-600',
    accent:  'bg-accent-50 text-accent-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    red:     'bg-red-50 text-red-600',
  };
  return (
    <div className="card group p-5 sm:p-6 hover:shadow-md hover:border-primary-200">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-ink-soft">{label}</p>
        {Icon && (
          <div className={cn(
            'grid h-10 w-10 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110',
            tones[tone]
          )}>
            {isValidElement(Icon) ? Icon : <Icon className="h-5 w-5" />}
          </div>
        )}
      </div>
      <p className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{value}</p>
      {trend !== undefined && (
        <p className={cn('mt-2 flex items-center gap-1 text-xs font-semibold', trend>=0 ? 'text-emerald-600' : 'text-red-600')}>
          {trend>=0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {Math.abs(trend)}% vs mois dernier
        </p>
      )}
    </div>
  );
};
