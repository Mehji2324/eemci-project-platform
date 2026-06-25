// Safe mock/fallback Supabase client for demo data persistence without needing server credentials
type StoredRow = Record<string, unknown>;

export const supabase = {
  from(table: string) {
    return {
      async insert(rows: StoredRow[]) {
        try {
          if (table === 'applications') {
            const existing = JSON.parse(localStorage.getItem('eemci_applications') || '[]') as StoredRow[];
            const newRows = rows.map(row => ({
              id: 'app_' + Math.random().toString(36).substr(2, 9),
              created_at: new Date().toISOString(),
              ...row
            }));
            localStorage.setItem('eemci_applications', JSON.stringify([...existing, ...newRows]));
          }
          return { data: rows, error: null };
        } catch (e: unknown) {
          return { data: null, error: e };
        }
      },
      async select() {
        try {
          const existing = JSON.parse(localStorage.getItem(`eemci_${table}`) || '[]') as StoredRow[];
          return { data: existing, error: null };
        } catch (e: unknown) {
          return { data: null, error: e };
        }
      }
    };
  }
};
