import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';

export default function CtaBand() {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 p-6 text-white sm:p-10 md:p-16">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">{t('ctaband.title')}</h2>
              <p className="mt-4 text-base text-primary-100/90 sm:text-lg">{t('ctaband.lead')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link to="/admissions/apply">
                <Button className="w-full sm:w-auto" size="xl" variant="accent" rightIcon={<ArrowRight className={cn("w-5 h-5", i18n.language === 'ar' && "rotate-180")} />}>
                  {t('ctaband.apply')}
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="xl" variant="outline" className="w-full border-white text-white hover:bg-white/10 sm:w-auto">
                  {t('ctaband.contact')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
