import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '@/lib/data';
import { useTranslation } from 'react-i18next';

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { i18n } = useTranslation();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let frame = 0;
    const step = (t: number) => {
      const progress = Math.min(1, (t - start) / dur);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setN(Math.floor(value * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n.toLocaleString(i18n.language === 'ar' ? 'ar-MA' : i18n.language === 'fr' ? 'fr-FR' : 'en-US')}
      {suffix}
    </span>
  );
}

export default function StatsStrip() {
  const { t } = useTranslation();

  return (
    <section id="stats" className="relative overflow-hidden py-12 sm:py-14">
      {/* Rich background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-800 via-primary-700 to-primary-800 -z-10" />
      <div className="absolute inset-0 grid-bg opacity-30 -z-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/15 rtl:md:divide-x-reverse">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center md:px-8"
            >
              {/* Subtle top accent on first stat */}
              {i === 0 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-accent-400 opacity-80" />
              )}

              <p className="font-display text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm md:text-base font-semibold text-white/90">{t(`stats.stat_${i}.label`)}</p>
              <p className="mt-1 text-xs text-primary-200/60">{t(`stats.stat_${i}.sub`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
