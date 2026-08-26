"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X, ExternalLink } from "lucide-react";
import { ADMIN_NAV_LINKS } from "@/constants/navigation";
import { useAdminAuthStore } from "@/features/admin/utils/admin-auth";
import { cn } from "@/utils/cn";

export default function AdminHeader({
  sidebarOpen,
  onToggleSidebar,
}: {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAdminAuthStore((s) => s.logout);

  const current =
    ADMIN_NAV_LINKS.find((link) => {
      if (link.href === "/admin/dashboard") return pathname === link.href;
      return pathname.startsWith(link.href);
    })?.label ?? "Admin";

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/92 px-5 backdrop-blur-xl lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 lg:hidden"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <div>
          <h1 className="text-lg font-semibold text-slate-900">{current}</h1>
          <p className="hidden text-xs text-slate-500 sm:block">
            University Of AI · Admin panel
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <ExternalLink className="h-4 w-4" />
          View site
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          )}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </header>
  );
}