import { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title = 'Aucun résultat',
  description = 'Aucun élément à afficher pour le moment.',
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-up', className)}>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-surface-subtle text-ink-muted mb-4">
        {icon ?? <Inbox className="w-7 h-7" />}
      </div>
      <h3 className="font-display text-lg font-semibold text-ink tracking-tight">{title}</h3>
      <p className="mt-1.5 text-sm text-ink-soft max-w-sm leading-relaxed">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
