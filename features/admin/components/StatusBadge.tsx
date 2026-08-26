import { cn } from "@/utils/cn";

type Status = string;

const STATUS_STYLES: Record<string, string> = {
  // Positive
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Published: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  // Neutral / informational
  Recruiting: "border-blue-200 bg-blue-50 text-blue-700",
  Running: "border-blue-200 bg-blue-50 text-blue-700",
  Upcoming: "border-blue-200 bg-blue-50 text-blue-700",
  Scheduled: "border-violet-200 bg-violet-50 text-violet-700",
  Draft: "border-slate-200 bg-slate-100 text-slate-600",
  Archived: "border-slate-200 bg-slate-100 text-slate-600",
  Inactive: "border-slate-200 bg-slate-100 text-slate-600",
  Refunded: "border-slate-200 bg-slate-100 text-slate-600",
  // Warnings / errors
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  "On Hold": "border-amber-200 bg-amber-50 text-amber-700",
  "On Leave": "border-amber-200 bg-amber-50 text-amber-700",
  Failed: "border-rose-200 bg-rose-50 text-rose-700",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        STATUS_STYLES[status] ?? "border-slate-200 bg-slate-50 text-slate-700"
      )}
    >
      {status}
    </span>
  );
}