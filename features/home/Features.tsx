import type { LucideIcon } from "lucide-react";
import { Award, Brain, Infinity, Target, Users, Zap } from "lucide-react";
import Container from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { FEATURES } from "@/constants/stats";
import SectionHeading from "@/features/home/SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  Award,
  Brain,
  Infinity,
  Target,
  Users,
  Zap,
};

export default function FeaturesSection() {
  return (
    <section className="section-padding px-6">
      <Container>
        <SectionHeading
          badge="Why Institute of AI"
          title="A learning system engineered for real capability"
          description="Every part of the platform is designed to help learners go from curiosity to confident production work."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon] ?? Zap;

            return (
              <Card key={feature.title} className="h-full border-slate-200 bg-white">
                <div className="mb-5 inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-base leading-7 text-slate-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
