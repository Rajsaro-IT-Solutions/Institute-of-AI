import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthSuccessState({
  actionHref,
  actionLabel,
  description,
  title,
}: Readonly<{
  actionHref: string;
  actionLabel: string;
  description: string;
  title: string;
}>) {
  return (
    <div className="rounded-[1.75rem] border border-emerald-200 bg-emerald-50 p-8 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
      <h2 className="mt-5 text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 text-base leading-7 text-slate-500">{description}</p>
      <Button asChild className="mt-6">
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    </div>
  );
}