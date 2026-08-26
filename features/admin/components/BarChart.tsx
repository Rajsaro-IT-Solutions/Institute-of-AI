import { cn } from "@/utils/cn";

export default function BarChart({
  data,
  valueFormatter = (value) => `${value}`,
  barColor = "bg-gradient-to-t from-blue-600 to-cyan-400",
  heightClass = "h-44",
}: Readonly<{
  data: { label: string; value: number }[];
  valueFormatter?: (value: number) => string;
  barColor?: string;
  heightClass?: string;
}>) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div aria-label={data.map((d) => `${d.label}: ${d.value}`).join(", ")}>
      <div className={cn("flex items-end gap-2", heightClass)}>
        {data.map((d) => (
          <div key={d.label} className="flex h-full flex-1 flex-col justify-end">
            <div className="group relative">
              <span className="pointer-events-none absolute -top-7 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs font-semibold text-white group-hover:block">
                {valueFormatter(d.value)}
              </span>
              <div
                className={cn(
                  "w-full rounded-t-lg transition-all duration-300",
                  barColor
                )}
                style={{
                  height: `${Math.max((d.value / max) * 100, 3)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        {data.map((d) => (
          <span
            key={d.label}
            className="flex-1 text-center text-xs font-medium text-slate-500"
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}