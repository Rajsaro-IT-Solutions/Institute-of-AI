import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <Skeleton className="h-16 rounded-full" />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Skeleton className="h-[420px] rounded-[2rem]" />
          <Skeleton className="h-[420px] rounded-[2rem]" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-48 rounded-[1.75rem]" />
          <Skeleton className="h-48 rounded-[1.75rem]" />
          <Skeleton className="h-48 rounded-[1.75rem]" />
        </div>
      </div>
    </main>
  );
}
