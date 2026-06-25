import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from '../locales/fr.json';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

const getInitialLanguage = () => {
  try {
    const stored = localStorage.getItem('eemci-ui-storage');
    if (stored) {
      const { state } = JSON.parse(stored);
      return state.lang || 'fr';
    }
  } catch (e) {
    console.error('Error reading language from localStorage', e);
  }
  return 'fr';
};

const resources = {
  fr: { translation: fr },
  en: { translation: en },
  ar: { translation: ar }
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false
  }
});

// Update document direction on language change
i18n.on('languageChanged', (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

// Set initial direction
const initialLng = i18n.language || getInitialLanguage();
document.documentElement.dir = initialLng === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = initialLng;

export default i18n;
