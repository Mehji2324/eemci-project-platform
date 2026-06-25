import { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export const Card = ({ className, ...p }: HTMLAttributes<HTMLDivElement>) =>
  <div
    className={cn(
      'rounded-lg border border-slate-200/80 bg-white shadow-xs',
      'transition-colors duration-200',
      className
    )}
    {...p}
  />;

export const CardHeader = ({ className, ...p }: HTMLAttributes<HTMLDivElement>) =>
  <div className={cn('flex flex-col gap-1.5 border-b border-slate-100 px-5 py-4 sm:px-6', className)} {...p} />;

export const CardBody = ({ className, ...p }: HTMLAttributes<HTMLDivElement>) =>
  <div className={cn('p-5 sm:p-6', className)} {...p} />;

export const CardTitle = ({ className, ...p }: HTMLAttributes<HTMLHeadingElement>) =>
  <h3 className={cn('font-display text-base font-semibold text-ink sm:text-lg', className)} {...p} />;

export const CardDescription = ({ className, ...p }: HTMLAttributes<HTMLParagraphElement>) =>
  <p className={cn('text-sm text-ink-soft', className)} {...p} />;
