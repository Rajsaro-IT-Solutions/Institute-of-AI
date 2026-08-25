import { Badge } from "@/components/ui/Badge";

export default function SectionHeading({
  badge,
  title,
  description,
}: Readonly<{
  badge: string;
  title: string;
  description: string;
}>) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <Badge className="mb-5">{badge}</Badge>
      <h2 className="mb-5 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
        {title}
      </h2>
      <p className="text-lg leading-8 text-slate-600">{description}</p>
    </div>
  );
}
