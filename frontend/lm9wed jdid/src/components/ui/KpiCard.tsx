import { cn } from '@/lib/cn';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ReactNode } from 'react';

export const KpiCard = ({ label, value, trend, icon, tone='primary' }:{
  label:string; value:string|number; trend?:number; icon?:ReactNode;
  tone?:'primary'|'accent'|'emerald'|'red';
}) => {
  const tones = { primary:'bg-primary-50 text-primary-700', accent:'bg-accent-50 text-accent-700',
    emerald:'bg-emerald-50 text-emerald-700', red:'bg-red-50 text-red-700' };
  return (
    <div className="rounded-lg border border-slate-200/80 bg-white p-5 shadow-xs transition-colors hover:border-primary-200 sm:p-6">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-ink-soft">{label}</p>
        {icon && <div className={cn('grid h-9 w-9 place-items-center rounded-lg', tones[tone])}>{icon}</div>}
      </div>
      <p className="mt-3 font-display text-2xl font-semibold tracking-normal text-ink sm:text-3xl">{value}</p>
      {trend !== undefined && (
        <p className={cn('mt-2 flex items-center gap-1 text-xs font-medium', trend>=0 ? 'text-emerald-600' : 'text-red-600')}>
          {trend>=0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(trend)}% vs mois dernier
        </p>
      )}
    </div>
  );
};
