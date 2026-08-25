import { ArrowRight, BookOpenText, BrainCircuit, Briefcase, Trophy } from "lucide-react";
import Container from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import SectionHeading from "@/features/home/SectionHeading";

const milestones = [
  {
    title: "Learn the system",
    description: "Start with structured foundations, guided labs, and weekly accountability.",
    icon: BookOpenText,
  },
  {
    title: "Practice with feedback",
    description: "Ship assignments, get expert reviews, and refine how you build and explain.",
    icon: BrainCircuit,
  },
  {
    title: "Build for the real world",
    description: "Deliver capstones with product thinking, deployment, and performance in mind.",
    icon: ArrowRight,
  },
  {
    title: "Convert skill into opportunity",
    description: "Use our career workflows to improve positioning, interviews, and hiring readiness.",
    icon: Briefcase,
  },
];

export default function JourneySection() {
  return (
    <section className="section-padding px-6">
      <Container>
        <SectionHeading
          badge="Journey"
          title="A clear path from first principles to professional outcomes"
          description="The platform is designed as a progression, not a content dump, so learners keep moving toward measurable wins."
        />

        <div className="grid gap-6 lg:grid-cols-4">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;

            return (
              <Card key={milestone.title} className="h-full border-slate-200 bg-white">
                <div className="mb-5 flex items-center justify-between">
                  <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">{milestone.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{milestone.description}</p>
              </Card>
            );
          })}
        </div>

        <Card className="mt-6 flex flex-col gap-4 border-slate-200 bg-white md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-amber-50 p-3 text-amber-600">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Outcomes stay visible</h3>
              <p className="text-sm leading-7 text-slate-600">
                Learners track progress across projects, assignments, live sessions, and career readiness.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700">
            Weekly mentorship, leaderboard momentum, certificates, and AI support all work together.
          </div>
        </Card>
      </Container>
    </section>
  );
}
