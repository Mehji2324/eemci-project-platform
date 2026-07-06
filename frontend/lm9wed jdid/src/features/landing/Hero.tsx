import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Globe2, BadgeCheck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';

const containerVar = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVar = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { t, i18n } = useTranslation();

  const TRUST_PILLS = [
    { icon: BadgeCheck, text: t('common.accredited') },
    { icon: Globe2,     text: t('common.double_degree') },
    { icon: Award,      text: t('common.fede_member') },
  ];

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
      {/* ── Background ────────────────────────────────── */}
      <div
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: 'var(--gradient-hero)' }}
      />
      <div className="absolute inset-0 -z-10 dot-bg opacity-60" />

      {/* ── Content ───────────────────────────────────── */}
      <div className="container flex flex-1 items-center py-12 sm:py-16 lg:py-20">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Left column */}
          <motion.div
            className="mx-auto max-w-3xl text-center lg:col-span-6 lg:mx-0 lg:text-start xl:col-span-7"
            variants={containerVar}
            initial="hidden"
            animate="show"
          >
            {/* Badge */}
            <motion.div variants={itemVar}>
              <Badge tone="accent" className="text-sm px-4 py-1.5 gap-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
                </span>
                {t('hero.badge')}
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVar}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-normal text-ink sm:text-5xl md:text-6xl xl:text-7xl"
            >
              {t('hero.title_part1')}{' '}
              <br className="hidden md:block" />
              {t('hero.title_part2')}{' '}
              <span className="relative inline-block">
                <span className="gradient-text">{t('hero.title_diff')}</span>
                <svg
                  className={cn(
                    'absolute -bottom-1 left-0 w-full',
                    i18n.language === 'ar' && "scale-x-[-1]"
                  )}
                  viewBox="0 0 220 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6 C60 2 160 2 218 6"
                    stroke="#D4A017"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={itemVar}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg md:text-xl lg:mx-0"
            >
              {t('hero.tagline')}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVar} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link to="/programs" className="sm:w-auto">
                <Button className="w-full sm:w-auto" size="xl" rightIcon={<ArrowRight className={cn("w-5 h-5", i18n.language === 'ar' && "rotate-180")} />}>
                  {t('hero.explore')}
                </Button>
              </Link>
              <Link to="/admissions/apply" className="sm:w-auto">
                <Button className="w-full sm:w-auto" size="xl" variant="accent">
                  {t('hero.apply_now')}
                </Button>
              </Link>
            </motion.div>

            {/* Trust pills */}
            <motion.div variants={itemVar} className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              {TRUST_PILLS.map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface/85 px-4 py-2 text-sm text-ink-soft shadow-xs"
                >
                  <Icon className="h-4 w-4 shrink-0 text-primary-600" />
                  {text}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column – image */}
          <motion.div
            className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none xl:col-span-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-gradient-to-br from-primary-100 to-accent-100/40 sm:rounded-[2rem]" />
              <div className="absolute -inset-6 -z-20 rounded-[2.25rem] bg-gradient-to-br from-primary-50 to-transparent opacity-60 sm:rounded-[2.5rem]" />

              {/* Main image */}
              <div className="relative overflow-hidden rounded-[1.5rem] border-4 border-surface shadow-lg sm:rounded-[2rem]">
                <img
                  src="/hero-ai.png"
                  alt={t('hero.img_alt')}
                  className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px] xl:h-[560px]"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent" />
              </div>

              {/* Floating card – graduates */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className={cn(
                  "absolute -bottom-5 glass rounded-2xl p-4 shadow-md border border-white/60 hidden md:block",
                  i18n.language === 'ar' ? "-right-5 md:-right-8" : "-left-5 md:-left-8"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 rtl:space-x-reverse">
                    {[
                      'from-primary-300 to-primary-600',
                      'from-accent-300 to-accent-500',
                      'from-teal-400 to-teal-600',
                    ].map((g, i) => (
                      <div
                        key={i}
                        className={`w-9 h-9 rounded-full bg-gradient-to-br ${g} border-2 border-white shadow-sm`}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-ink leading-none">{t('hero.graduates_count')}</p>
                    <p className="text-xs text-ink-soft mt-0.5">{t('hero.graduates_label')}</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card – experience */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className={cn(
                  "absolute -top-5 rounded-2xl bg-accent-500 px-5 py-3.5 shadow-glow-accent hidden md:block",
                  i18n.language === 'ar' ? "-left-5 md:-left-8" : "-right-5 md:-right-8"
                )}
              >
                <p className="font-display text-3xl font-extrabold text-primary-900 leading-none">
                  {t('hero.years_count')}<span className="text-base font-bold">{t('hero.years_label')}</span>
                </p>
                <p className="text-xs text-primary-800/80 font-medium mt-0.5">{t('hero.excellence')}</p>
              </motion.div>

              {/* Floating card – programs */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 glass rounded-xl px-4 py-3 shadow-md border border-white/60 hidden lg:block",
                  i18n.language === 'ar' ? "-left-5 md:-left-10" : "-right-5 md:-right-10"
                )}
              >
                <p className="font-display text-xl font-bold text-primary-700 leading-none">{t('hero.programs_count')}</p>
                <p className="text-xs text-ink-muted mt-0.5">{t('hero.programs_label')}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hidden md:flex justify-center pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <button
          onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-ink-muted hover:text-primary-600 transition animate-float"
          aria-label={t('hero.scroll_down')}
        >
          <span className="text-xs font-medium uppercase tracking-widest">{t('hero.discover')}</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}
