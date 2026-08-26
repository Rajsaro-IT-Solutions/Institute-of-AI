"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Layers,
  FileText,
  BarChart3,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { ADMIN_NAV_LINKS } from "@/constants/navigation";
import { BRAND } from "@/constants/brand";
import { cn } from "@/utils/cn";

const NAV_ICONS: Record<string, LucideIcon> = {
  Dashboard: LayoutDashboard,
  Students: Users,
  Instructors: GraduationCap,
  Courses: BookOpen,
  Batches: Layers,
  Blogs: FileText,
  Analytics: BarChart3,
  Payments: CreditCard,
};

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-72 flex-col border-r border-slate-200 bg-white px-4 py-6 max-xl:fixed max-xl:inset-y-0 max-xl:left-0 max-xl:z-40">
      <Link href="/admin/dashboard" className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#1d4ed8_0%,#2563eb_52%,#7c3aed_100%)] text-sm font-bold text-white shadow-lg shadow-blue-200">
          {BRAND.monogram}
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-900">
            Admin
          </p>
          <p className="text-[11px] text-slate-500">{BRAND.name}</p>
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        {ADMIN_NAV_LINKS.map((link) => {
          const Icon = NAV_ICONS[link.label] ?? LayoutDashboard;
          const active =
            pathname === link.href ||
            (link.href !== "/admin/dashboard" &&
              pathname.startsWith(`${link.href}/`));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon
                className={cn("h-[18px] w-[18px]", active ? "text-blue-600" : "text-slate-400")}
              />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          Quick tip
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-600">
          Admin data is mock content. Wire it to APIs when the backend is ready.
        </p>
      </div>
    </aside>
  );
}