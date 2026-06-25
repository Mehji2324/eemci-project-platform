import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useToastStore } from '@/hooks/useToast';
import { cn } from '@/lib/cn';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 w-full max-w-sm">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={cn(
              "p-4 rounded-2xl shadow-lg border backdrop-blur-xl flex items-start gap-3",
              t.type === 'success' && "bg-emerald-50/90 dark:bg-emerald-950/90 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100",
              t.type === 'error' && "bg-red-50/90 dark:bg-red-950/90 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100",
              t.type === 'info' && "bg-primary-50/90 dark:bg-primary-950/90 border-primary-200 dark:border-primary-800 text-primary-900 dark:text-primary-100"
            )}
          >
            {t.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />}
            {t.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />}
            {t.type === 'info' && <Info className="w-5 h-5 shrink-0 text-primary-600" />}
            
            <p className="text-sm font-medium flex-1">{t.message}</p>
            
            <button onClick={() => removeToast(t.id)} className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
