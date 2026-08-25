import { AlertTriangle } from "lucide-react";

export default function AuthErrorState({
  message,
}: Readonly<{
  message: string;
}>) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 flex-none" />
        <p>{message}</p>
      </div>
    </div>
  );
}