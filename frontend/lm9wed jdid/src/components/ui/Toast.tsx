import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useToastStore } from '@/hooks/useToast';
import { cn } from '@/lib/cn';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 w-full max-w-sm" role="region" aria-label="Notifications">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, transition: { duration: 0.25 } }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            role="alert"
            className={cn(
              "p-4 rounded-xl shadow-lg border backdrop-blur-xl flex items-start gap-3",
              t.type === 'success' && "bg-emerald-50/90 border-emerald-200 text-emerald-900",
              t.type === 'error' && "bg-red-50/90 border-red-200 text-red-900",
              t.type === 'info' && "bg-primary-50/90 border-primary-200 text-primary-900"
            )}
          >
            {t.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />}
            {t.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />}
            {t.type === 'info' && <Info className="w-5 h-5 shrink-0 text-primary-600" />}
            
            <p className="text-sm font-medium flex-1">{t.message}</p>
            
            <button
              onClick={() => removeToast(t.id)}
              className="p-1 hover:bg-black/5 rounded-lg transition-colors duration-150"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
