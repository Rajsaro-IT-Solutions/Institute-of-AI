import { Loader2 } from "lucide-react";

export default function AuthLoadingState({
  message,
}: Readonly<{
  message: string;
}>) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{message}</span>
    </div>
  );
}