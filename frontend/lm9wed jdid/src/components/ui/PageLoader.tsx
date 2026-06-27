export default function PageLoader() {
  return (
    <div className="min-h-screen grid place-items-center bg-surface-muted">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-surface-border" />
          <div className="absolute inset-0 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
        </div>
        <p className="text-sm font-medium text-ink-soft animate-fade-in">Chargement…</p>
      </div>
    </div>
  );
}
