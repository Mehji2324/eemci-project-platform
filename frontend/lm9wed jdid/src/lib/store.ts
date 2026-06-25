import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiState {
  theme: 'light' | 'dark';
  lang: 'fr' | 'en' | 'ar';
  setTheme: (theme: 'light' | 'dark') => void;
  setLang: (lang: 'fr' | 'en' | 'ar') => void;
  toggleTheme: () => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: 'light',
      lang: 'fr',
      setTheme: (theme) => set({ theme }),
      setLang: (lang) => set({ lang }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'eemci-ui-storage' }
  )
);
