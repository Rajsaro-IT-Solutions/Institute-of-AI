import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

type Feature = {
  title: string;
  description: string;
};

type Highlight = {
  label: string;
  value: string;
};

export default function MarketingPage({
  eyebrow,
  title,
  description,
  highlights,
  features,
  sidebarTitle,
  sidebarDescription,
  sidebarList,
  children,
}: Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  highlights: Highlight[];
  features: Feature[];
  sidebarTitle: string;
  sidebarDescription: string;
  sidebarList: string[];
  children?: ReactNode;
}>) {
  return (
    <section className="px-4 pb-24 pt-12 lg:px-6">
      <Container className="max-w-[86rem]">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div>
            <Badge className="mb-6">{eyebrow}</Badge>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-tight text-slate-900 md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {highlights.map((highlight) => (
                <Card key={highlight.label} className="border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {highlight.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">{highlight.value}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="h-fit border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#eff6ff_100%)] p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm uppercase tracking-[0.24em] text-blue-700">{sidebarTitle}</p>
            <p className="mt-4 text-base leading-8 text-slate-600">{sidebarDescription}</p>
            <ul className="mt-6 space-y-3">
              {sidebarList.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
              <h2 className="text-xl font-semibold text-slate-900">{feature.title}</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">{feature.description}</p>
            </Card>
          ))}
        </div>

        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </section>
  );
}
