export default function AuthDivider() {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="text-xs uppercase tracking-[0.28em] text-slate-400">
        Or continue with
      </span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}