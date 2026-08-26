import type { ReactNode } from "react";

export default function Table({
  headers,
  children,
}: Readonly<{
  headers: string[];
  children: ReactNode;
}>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.03)]">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/70">
            {headers.map((header) => (
              <th
                key={header}
                className="px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">{children}</tbody>
      </table>
    </div>
  );
}

export function TableCell({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className?: string;
}>) {
  return <td className={className ? className : "px-5 py-4 text-slate-700"}>{children}</td>;
}