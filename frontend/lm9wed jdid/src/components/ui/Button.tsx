import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'accent' | 'danger' | 'white';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:   'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm shadow-primary-500/20 border border-primary-600/50',
  secondary: 'bg-surface text-ink hover:bg-surface-subtle hover:text-ink border border-surface-border shadow-xs',
  ghost:     'text-ink-soft hover:text-ink hover:bg-surface-subtle',
  outline:   'border border-surface-border bg-surface text-ink hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 shadow-xs',
  accent:    'bg-accent-500 text-primary-950 hover:bg-accent-400 active:bg-accent-600 shadow-sm shadow-accent-500/20 border border-accent-500/50 font-semibold',
  danger:    'bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-600/20 border border-red-600/50',
  white:     'bg-white text-primary-700 hover:bg-primary-50 border border-surface-border shadow-soft',
};

const sizes: Record<Size, string> = {
  xs: 'h-8  px-3   text-xs  rounded-md gap-1.5',
  sm: 'h-9  px-4   text-sm  rounded-lg gap-2',
  md: 'h-10 px-4   text-sm  rounded-lg gap-2',
  lg: 'h-11 px-6   text-base rounded-xl gap-2',
  xl: 'h-12 px-8   text-base rounded-xl gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = 'primary', size = 'md', loading, leftIcon, rightIcon, children, disabled, ...rest }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out',
        'active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  )
);
Button.displayName = 'Button';
