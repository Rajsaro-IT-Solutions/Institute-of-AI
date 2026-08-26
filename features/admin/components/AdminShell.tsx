"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/features/admin/components/AdminSidebar";
import AdminHeader from "@/features/admin/components/AdminHeader";
import { useAdminAuthStore } from "@/features/admin/utils/admin-auth";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/utils/cn";

function AdminLoading() {
  return (
    <div className="flex min-h-screen gap-6 bg-slate-50 p-6">
      <Skeleton className="hidden w-72 lg:block" />
      <div className="flex-1 space-y-4">
        <Skeleton className="h-16 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export default function AdminShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAdminAuthStore((s) => s.isAuthenticated);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Wait for localStorage hydration before deciding intent.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // Hydration detection is the standard exception to set-state-in-effect:
    // persistent auth must load from localStorage before rendering the shell.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!hydrated) return;

    if (!isLoginPage && !isAuthenticated) {
      router.replace("/admin/login");
    }
    if (isLoginPage && isAuthenticated) {
      router.replace("/admin/dashboard");
    }
  }, [hydrated, isAuthenticated, isLoginPage, router]);

  if (!hydrated) {
    return <AdminLoading />;
  }

  // Login page renders as its own focused screen (no sidebar shell).
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <AdminLoading />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50/70 text-slate-900">
      {/* Desktop sidebar */}
      <div className="hidden min-h-screen lg:block lg:shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-900/50 transition-opacity lg:hidden",
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 transition-transform lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <AdminSidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((value) => !value)}
        />
        <main className="flex-1 px-5 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}