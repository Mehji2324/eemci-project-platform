import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
interface Props extends InputHTMLAttributes<HTMLInputElement> { label?:string; error?:string; hint?:string; }
export const Input = forwardRef<HTMLInputElement, Props>(({ label, error, hint, className, id, ...p }, ref) => {
  const inputId = id ?? p.name;
  return (
    <div className="space-y-1.5">
      {label && <label htmlFor={inputId} className="text-sm font-semibold text-ink">{label}</label>}
      <input id={inputId} ref={ref}
        className={cn('h-10 w-full rounded-xl border bg-surface px-3.5 text-sm text-ink placeholder:text-ink-muted shadow-xs transition-all duration-200',
          'border-surface-border focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-500/10', className)} {...p} />
      {hint && !error && <p className="text-xs text-ink-soft">{hint}</p>}
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';
