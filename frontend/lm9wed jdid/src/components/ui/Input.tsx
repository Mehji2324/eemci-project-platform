import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
interface Props extends InputHTMLAttributes<HTMLInputElement> { label?:string; error?:string; hint?:string; }
export const Input = forwardRef<HTMLInputElement, Props>(({ label, error, hint, className, id, ...p }, ref) => {
  const inputId = id ?? p.name;
  return (
    <div className="space-y-1.5">
      {label && <label htmlFor={inputId} className="text-sm font-medium text-ink">{label}</label>}
      <input id={inputId} ref={ref}
        className={cn('h-10 w-full rounded-lg border bg-white px-3.5 text-sm text-ink placeholder:text-slate-400',
          'border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-100', className)} {...p} />
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';
