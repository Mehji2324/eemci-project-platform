import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiState {
  lang: 'fr' | 'en' | 'ar';
  setLang: (lang: 'fr' | 'en' | 'ar') => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      lang: 'fr',
      setLang: (lang) => set({ lang }),
    }),
    { name: 'eemci-ui-storage' }
  )
);
