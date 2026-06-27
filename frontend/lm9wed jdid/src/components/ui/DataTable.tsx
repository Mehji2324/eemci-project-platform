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
          <tr className="border-b border-surface-border text-left text-xs font-bold uppercase tracking-wider text-ink-soft bg-surface-muted/30">
            {columns.map((column) => (
              <th key={column.key} className={cn('whitespace-nowrap px-5 py-3 first:pl-5 last:pr-5', column.headerClassName)}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border">
          {data.length ? data.map((row) => (
            <tr key={rowKey(row)} className="group transition-colors duration-200 hover:bg-surface-subtle/50">
              {columns.map((column) => (
                <td key={column.key} className={cn('px-5 py-4 align-middle first:pl-5 last:pr-5 text-ink', column.className)}>
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
