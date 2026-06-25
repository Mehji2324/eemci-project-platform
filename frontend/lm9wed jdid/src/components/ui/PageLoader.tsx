export default function PageLoader() {
  return (
    <div className="min-h-screen grid place-items-center bg-surface">
      <div className="flex items-center gap-3 text-primary-600">
        <div className="w-3 h-3 rounded-full bg-primary-600 animate-bounce" />
        <div className="w-3 h-3 rounded-full bg-accent-500 animate-bounce [animation-delay:.15s]" />
        <div className="w-3 h-3 rounded-full bg-emerald2-500 animate-bounce [animation-delay:.3s]" />
      </div>
    </div>
  );
}
