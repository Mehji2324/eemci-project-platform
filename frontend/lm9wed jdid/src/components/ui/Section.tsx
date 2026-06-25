import { cn } from '@/lib/cn';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  eyebrow?: string;
  title?: string;
  lead?: string;
  centered?: boolean;
  titleClassName?: string;
}

export const Section = ({
  id, className, children, eyebrow, title, lead, centered = false, titleClassName,
}: SectionProps) => (
  <section id={id} className={cn('py-16 md:py-24 lg:py-28', className)}>
    <div className="container">
      {(eyebrow || title || lead) && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={cn('mb-10 md:mb-14', centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl')}
        >
          {eyebrow && (
            <p className="section-eyebrow mb-3">{eyebrow}</p>
          )}
          {title && (
            <h2 className={cn('section-title', titleClassName)}>{title}</h2>
          )}
          {lead && (
            <p className="section-lead mt-4">{lead}</p>
          )}
        </motion.div>
      )}
      {children}
    </div>
  </section>
);
