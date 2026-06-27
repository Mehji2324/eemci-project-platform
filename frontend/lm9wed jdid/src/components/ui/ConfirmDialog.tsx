import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Confirmer l\'action',
  message = 'Êtes-vous sûr de vouloir continuer ? Cette action est irréversible.',
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  variant = 'danger',
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center px-2 py-2">
        <div className={`grid h-12 w-12 place-items-center rounded-full ${variant === 'danger' ? 'bg-red-50 text-red-600' : 'bg-primary-50 text-primary-600'} mb-4`}>
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="font-display text-lg font-bold text-ink tracking-tight">{title}</h3>
        <p className="mt-2 text-sm text-ink-soft leading-relaxed max-w-xs">{message}</p>
        <div className="flex w-full gap-3 mt-6">
          <Button variant="secondary" size="md" onClick={onClose} className="flex-1" disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={variant} size="md" onClick={onConfirm} className="flex-1" loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
