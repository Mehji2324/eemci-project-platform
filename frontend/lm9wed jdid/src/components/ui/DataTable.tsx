import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Column<T> = {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  className?: string;
  headerClassName?: string;
};

export function DataTable<T>({
  columns,
  data,
  rowKey,
  emptyMessage = 'Aucune donnée disponible.',
  className,
}: {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
  className?: string;
}) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft">
            {columns.map((column) => (
              <th key={column.key} className={cn('whitespace-nowrap px-4 py-3 first:pl-0 last:pr-0', column.headerClassName)}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length ? data.map((row) => (
            <tr key={rowKey(row)} className="group transition-colors hover:bg-slate-50/80">
              {columns.map((column) => (
                <td key={column.key} className={cn('px-4 py-3.5 align-middle first:pl-0 last:pr-0', column.className)}>
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          )) : (
            <tr>
              <td colSpan={columns.length} className="py-10 text-center text-sm text-ink-soft">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
